import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";

// Mots réservés / trop courts
const BLOCKED_WORDS = ["vtc", "taxi", "cab", "uber", "bolt", "test", "admin", "api", "www", "app", "site"];

// Top 100+ villes de France = offre premium
const PREMIUM_CITIES = [
  "paris", "marseille", "lyon", "toulouse", "nice", "nantes", "montpellier",
  "strasbourg", "bordeaux", "lille", "rennes", "reims", "toulon", "grenoble",
  "dijon", "angers", "nimes", "villeurbanne", "clermont-ferrand", "le-mans",
  "aix-en-provence", "brest", "tours", "amiens", "limoges", "perpignan",
  "metz", "besancon", "orleans", "rouen", "mulhouse", "caen", "nancy",
  "argenteuil", "montreuil", "saint-denis", "roubaix", "tourcoing",
  "avignon", "dunkerque", "valence", "aubervilliers", "colombes",
  "saint-etienne", "cannes", "antibes", "beziers", "la-rochelle",
  "saint-malo", "calais", "boulogne-sur-mer", "boulogne", "arras",
  "saint-omer", "lens", "douai", "cambrai", "bethune", "hazebrouck",
  "pau", "bayonne", "biarritz", "poitiers", "troyes", "chambery",
  "annecy", "thonon", "colmar", "charleville-mezieres", "laval",
  "quimper", "vannes", "lorient", "saint-brieuc", "cholet", "saumur",
  "la-baule", "saint-nazaire", "angouleme", "agen", "tarbes", "albi",
  "carcassonne", "sete", "ajaccio", "bastia", "cayenne", "fort-de-france",
  "pointe-a-pitre", "saint-pierre", "saint-denis-reunion", "noumea", "papeete",
  // Aéroports
  "cdg", "orly", "roissy", "lesquin", "saint-exupery", "marignane",
  "blagnac", "merignac", "beauvais",
];

function slugify(brand: string): string {
  return brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isPremiumName(slug: string): boolean {
  // Check if slug contains a premium city name
  for (const city of PREMIUM_CITIES) {
    if (slug === city || slug === `vtc-${city}` || slug.includes(city)) {
      return true;
    }
  }
  return false;
}

function isBlocked(slug: string): boolean {
  if (slug.length < 4) return true;
  if (BLOCKED_WORDS.includes(slug)) return true;
  return false;
}

export async function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get("brand") || "";
  if (brand.length < 2) {
    return NextResponse.json({ available: false, slug: "", reason: "too_short" });
  }

  const slug = slugify(brand);

  if (!slug || isBlocked(slug)) {
    return NextResponse.json({
      available: false,
      slug,
      reason: "blocked",
      message: "Ce nom est trop court ou réservé. Choisissez un nom plus spécifique.",
    });
  }

  if (isPremiumName(slug)) {
    return NextResponse.json({
      available: false,
      slug,
      reason: "premium",
      domain: `${slug}.vtc-site.fr`,
      message: `Ce nom de ville est disponible en offre Premium (299€ + 49€/mois). Votre site ${slug}.vtc-site.fr est déjà pré-construit et optimisé SEO.`,
    });
  }

  // Check if project exists on Vercel
  const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
  const res = await fetch(`https://api.vercel.com/v9/projects/${slug}${teamParam}`, {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  });

  const available = res.status === 404;

  return NextResponse.json({
    available,
    slug,
    domain: `${slug}.vtc-site.fr`,
    reason: available ? "available" : "taken",
    message: available ? null : "Ce nom est déjà pris. Essayez un autre.",
  });
}
