import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";

function teamParam() {
  return VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
}

export async function POST(request: NextRequest) {
  try {
    const { slug, currentPassword, pricePerKm, minPrice } = await request.json();

    if (!slug || !currentPassword) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const pkm = parseFloat(pricePerKm);
    const min = parseFloat(minPrice);
    if (isNaN(pkm) || pkm <= 0 || pkm > 10) {
      return NextResponse.json({ error: "Prix au km invalide (entre 0.01 et 10€)" }, { status: 400 });
    }
    if (isNaN(min) || min < 0 || min > 200) {
      return NextResponse.json({ error: "Minimum de course invalide (entre 0 et 200€)" }, { status: 400 });
    }

    // Verify current password via site auth endpoint
    const siteUrl = `https://${slug}.vtc-site.fr`;
    const authRes = await fetch(`${siteUrl}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: currentPassword }),
    });
    if (!authRes.ok) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Get project env vars
    const envRes = await fetch(`https://api.vercel.com/v9/projects/${slug}/env${teamParam()}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    if (!envRes.ok) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }
    const envData = await envRes.json();

    // Update price per km
    const pkmEnv = envData.envs?.find((e: { key: string; id: string }) => e.key === "NEXT_PUBLIC_DRIVER_PRICE_PER_KM");
    if (pkmEnv) {
      await fetch(`https://api.vercel.com/v9/projects/${slug}/env/${pkmEnv.id}${teamParam()}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      });
    }

    // Update min price
    const minEnv = envData.envs?.find((e: { key: string; id: string }) => e.key === "NEXT_PUBLIC_DRIVER_MIN_PRICE");
    if (minEnv) {
      await fetch(`https://api.vercel.com/v9/projects/${slug}/env/${minEnv.id}${teamParam()}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      });
    }

    // Create both new env vars
    await fetch(`https://api.vercel.com/v10/projects/${slug}/env${teamParam()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        { key: "NEXT_PUBLIC_DRIVER_PRICE_PER_KM", value: String(pkm), type: "plain", target: ["production", "preview"] },
        { key: "NEXT_PUBLIC_DRIVER_MIN_PRICE", value: String(min), type: "plain", target: ["production", "preview"] },
      ]),
    });

    // Trigger redeploy
    const projRes = await fetch(`https://api.vercel.com/v9/projects/${slug}${teamParam()}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    const projData = await projRes.json();
    const hooks = projData.link?.deployHooks || [];
    if (hooks.length > 0) {
      await fetch(hooks[0].url, { method: "POST" });
    }

    return NextResponse.json({ success: true, pricePerKm: pkm, minPrice: min });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug") || "";
    if (!slug) return NextResponse.json({ error: "slug manquant" }, { status: 400 });

    const envRes = await fetch(`https://api.vercel.com/v9/projects/${slug}/env${teamParam()}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    if (!envRes.ok) return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    const envData = await envRes.json();

    const pkm = envData.envs?.find((e: { key: string; value: string }) => e.key === "NEXT_PUBLIC_DRIVER_PRICE_PER_KM");
    const min = envData.envs?.find((e: { key: string; value: string }) => e.key === "NEXT_PUBLIC_DRIVER_MIN_PRICE");

    return NextResponse.json({
      pricePerKm: pkm?.value || "1.80",
      minPrice: min?.value || "15",
    });
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
