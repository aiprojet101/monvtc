import crypto from "crypto";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GOOGLE_MAPS_SERVER_KEY = process.env.GOOGLE_MAPS_SERVER_KEY || "";
const MAX_PROJECTS_PER_REPO = 9; // Bascule au 9e pour garder 1 slot de marge

const headers = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
  "Content-Type": "application/json",
};

function teamParam() {
  return VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
}

export interface DriverConfig {
  brand: string;
  brandShort: string;
  city: string;
  region: string;
  department: string;
  postalCode: string;
  phone: string;
  phoneIntl: string;
  whatsapp: string;
  email: string;
  pricePerKm: string;
  minPrice: string;
  zones: string;
  domain?: string;
  forfaits?: string;
}

function repoName(index: number): string {
  return index === 1 ? "audovtc-clients" : `audovtc-clients-${index}`;
}

// Count how many Vercel projects are linked to a specific repo
async function countProjectsForRepo(repo: string): Promise<number> {
  const res = await fetch(`https://api.vercel.com/v9/projects${teamParam()}&limit=100`, {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  });
  if (!res.ok) return 0;
  const data = await res.json();
  const projects = data.projects || [];
  return projects.filter((p: { link?: { repo?: string } }) =>
    p.link?.repo === repo.split("/")[1]
  ).length;
}

// Create a new GitHub repo by copying from the template
async function createGitHubRepo(name: string): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;

  const res = await fetch("https://api.github.com/repos/aiprojet101/audovtc/generate", {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      owner: "aiprojet101",
      name,
      description: "VTC template auto-generated",
      private: false,
    }),
  });

  if (res.ok) {
    // Wait for GitHub to finish
    await new Promise((r) => setTimeout(r, 3000));
    return true;
  }
  return false;
}

// Check if a GitHub repo exists
async function repoExists(name: string): Promise<boolean> {
  const res = await fetch(`https://api.github.com/repos/aiprojet101/${name}`, {
    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
  });
  return res.ok;
}

// Find a repo with available slots (< 9 projects)
async function findAvailableRepo(): Promise<string> {
  for (let i = 1; i <= 50; i++) {
    const name = repoName(i);
    const fullRepo = `aiprojet101/${name}`;

    // Check if repo exists
    const exists = await repoExists(name);
    if (!exists) {
      // Try to create it
      const created = await createGitHubRepo(name);
      if (created) return fullRepo;
      // Can't create (no GITHUB_TOKEN) — stop searching
      break;
    }

    // Repo exists — count linked projects
    const count = await countProjectsForRepo(fullRepo);
    if (count < MAX_PROJECTS_PER_REPO) {
      return fullRepo;
    }
    // Full, try next
  }

  // Fallback
  return "aiprojet101/audovtc-clients";
}

async function generateForfaits(city: string, zones: string, pricePerKm: string): Promise<string> {
  const zoneList = zones.split(",").map(z => z.trim()).filter(Boolean);
  if (zoneList.length === 0) return "";

  const destinations = zoneList.join("|");
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(city)}&destinations=${encodeURIComponent(destinations)}&mode=driving&language=fr&key=${GOOGLE_MAPS_SERVER_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== "OK") return "";

    const pkm = parseFloat(pricePerKm) || 1.80;
    const minPrice = 15;
    const forfaits = [];

    for (let i = 0; i < zoneList.length; i++) {
      const el = data.rows?.[0]?.elements?.[i];
      if (el?.status !== "OK") continue;

      const km = Math.round(el.distance.value / 1000);
      const price = Math.max(Math.round(km * pkm), minPrice);
      const zoneSlug = zoneList[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");

      forfaits.push({
        id: `${zoneSlug}`,
        from: city,
        to: zoneList[i],
        km,
        price,
        category: "ville",
      });
    }

    return forfaits.length > 0 ? JSON.stringify(forfaits) : "";
  } catch {
    return "";
  }
}

export async function createVercelProject(slug: string, config: DriverConfig) {
  // 1. Generate admin password
  const adminPassword = crypto.randomUUID().replace(/-/g, "").slice(0, 16);

  // 2. Generate forfaits from city + zones via Google Maps
  const forfaits = config.forfaits || await generateForfaits(config.city, config.zones, config.pricePerKm);

  // 3. Find available repo
  const repo = await findAvailableRepo();

  // 2. Create project
  const createRes = await fetch(`https://api.vercel.com/v10/projects${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: slug,
      framework: "nextjs",
      gitRepository: { type: "github", repo },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(`Failed to create project: ${JSON.stringify(err)}`);
  }

  const project = await createRes.json();
  const projectId = project.id;

  // 3. Set environment variables
  const envVars = [
    { key: "NEXT_PUBLIC_DRIVER_BRAND", value: config.brand },
    { key: "NEXT_PUBLIC_DRIVER_BRAND_SHORT", value: config.brandShort },
    { key: "NEXT_PUBLIC_DRIVER_TAGLINE", value: `Votre chauffeur privé à ${config.city}` },
    { key: "NEXT_PUBLIC_DRIVER_CITY", value: config.city },
    { key: "NEXT_PUBLIC_DRIVER_REGION", value: config.region },
    { key: "NEXT_PUBLIC_DRIVER_DEPARTMENT", value: config.department },
    { key: "NEXT_PUBLIC_DRIVER_POSTAL_CODE", value: config.postalCode },
    { key: "NEXT_PUBLIC_DRIVER_PHONE", value: config.phone },
    { key: "NEXT_PUBLIC_DRIVER_PHONE_INTL", value: config.phoneIntl },
    { key: "NEXT_PUBLIC_DRIVER_WHATSAPP", value: config.whatsapp },
    { key: "NEXT_PUBLIC_DRIVER_EMAIL", value: config.email },
    { key: "NEXT_PUBLIC_DRIVER_PRICE_PER_KM", value: config.pricePerKm },
    { key: "NEXT_PUBLIC_DRIVER_MIN_PRICE", value: config.minPrice },
    { key: "NEXT_PUBLIC_DRIVER_ZONES", value: config.zones },
    { key: "NEXT_PUBLIC_DRIVER_DOMAIN", value: `${slug}.vtc-site.fr` },
    { key: "NEXT_PUBLIC_DRIVER_DOMAIN_APP", value: `app-${slug}.vtc-site.fr` },
    { key: "GOOGLE_MAPS_SERVER_KEY", value: GOOGLE_MAPS_SERVER_KEY },
    { key: "ADMIN_PASSWORD", value: adminPassword },
  ];

  if (forfaits) {
    envVars.push({ key: "NEXT_PUBLIC_DRIVER_FORFAITS", value: forfaits });
  }

  await fetch(`https://api.vercel.com/v10/projects/${projectId}/env${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify(
      envVars.map((v) => ({
        key: v.key,
        value: v.value,
        type: "plain",
        target: ["production", "preview"],
      }))
    ),
  });

  // 4. Add subdomain
  await fetch(`https://api.vercel.com/v10/projects/${projectId}/domains${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: `${slug}.vtc-site.fr` }),
  });

  // 5. Create deploy hook and trigger
  const hookRes = await fetch(`https://api.vercel.com/v10/projects/${projectId}/deploy-hooks${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "auto-deploy", ref: "main" }),
  });
  const hookData = hookRes.ok ? await hookRes.json() : null;

  const hooks = hookData?.link?.deployHooks || [];
  const hookUrl = hooks.length > 0 ? hooks[hooks.length - 1].url : null;

  let deployment = null;
  if (hookUrl) {
    const triggerRes = await fetch(hookUrl, { method: "POST" });
    deployment = triggerRes.ok ? await triggerRes.json() : null;
  }

  return {
    projectId,
    projectUrl: `${slug}.vtc-site.fr`,
    deploymentUrl: deployment?.url || null,
    adminPassword,
  };
}
