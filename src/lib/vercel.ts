const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";
const TEMPLATE_REPO = "aiprojet101/audovtc-clients";
const GOOGLE_MAPS_SERVER_KEY = process.env.GOOGLE_MAPS_SERVER_KEY || "";

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

export async function createVercelProject(slug: string, config: DriverConfig) {
  // 1. Create project linked to template repo
  const createRes = await fetch(`https://api.vercel.com/v10/projects${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: slug,
      framework: "nextjs",
      gitRepository: {
        type: "github",
        repo: TEMPLATE_REPO,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(`Failed to create project: ${JSON.stringify(err)}`);
  }

  const project = await createRes.json();
  const projectId = project.id;

  // 2. Set environment variables
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
  ];

  if (config.forfaits) {
    envVars.push({ key: "NEXT_PUBLIC_DRIVER_FORFAITS", value: config.forfaits });
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

  // 3. Add subdomain
  await fetch(`https://api.vercel.com/v10/projects/${projectId}/domains${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: `${slug}.vtc-site.fr` }),
  });

  // 4. Create deploy hook and trigger it
  const hookRes = await fetch(`https://api.vercel.com/v10/projects/${projectId}/deploy-hooks${teamParam()}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "auto-deploy", ref: "main" }),
  });
  const hookData = hookRes.ok ? await hookRes.json() : null;

  // The response contains the full project with deployHooks array
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
  };
}
