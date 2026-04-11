import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";

// Mots réservés / trop courts / à valeur SEO
const BLOCKED_WORDS = [
  // Génériques
  "vtc", "taxi", "cab", "uber", "bolt", "test", "admin", "api", "www", "app", "site",
  "chauffeur", "driver", "transport", "transfert", "navette", "shuttle", "premium",
  "elite", "prestige", "luxe", "luxury", "express", "rapide", "pro", "privé", "prive",
  "france", "national", "europe", "mondial", "world", "best", "top", "first", "numero1",
  // Concurrents / marques
  "marcel", "heetch", "kapten", "freenow", "lecab", "allocab", "snapcar", "blacklane",
  "monvtc", "vtcsite", "vtc-site",
];

// Patterns VTC+lettre/chiffre réservés (vtc1, vtca, vtc62, vtc-pro, etc.)
const BLOCKED_PATTERNS = [
  /^vtc[a-z]$/,           // vtca, vtcb, vtcx...
  /^vtc\d+$/,             // vtc1, vtc62, vtc75...
  /^vtc-[a-z]$/,          // vtc-a, vtc-b...
  /^vtc-\d+$/,            // vtc-1, vtc-62...
  /^vtc-[a-z]{2,4}$/,     // vtc-pro, vtc-cab, vtc-vip...
  /^[a-z]-vtc$/,          // e-vtc, o-vtc...
  /^my-?vtc/,             // myvtc, my-vtc...
  /^mon-?vtc/,            // monvtc, mon-vtc...
  /^le-?vtc/,             // levtc, le-vtc...
  /^la-?vtc/,             // lavtc, la-vtc...
  /^vtc-france/,          // vtc-france...
  /^vtc-express/,
  /^vtc-premium/,
  /^vtc-elite/,
  /^vtc-luxe/,
  /^vtc-prestige/,
  /^vtc-plus/,
  /^vtc-direct/,
  /^vtc-facile/,
  /^taxi-/,               // taxi-xxx
  /^\d+vtc/,              // 1vtc, 62vtc...
];

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
  if (BLOCKED_PATTERNS.some((p) => p.test(slug))) return true;
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
