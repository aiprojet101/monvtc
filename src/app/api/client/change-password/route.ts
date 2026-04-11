import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";

function teamParam() {
  return VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
}

export async function POST(request: NextRequest) {
  try {
    const { slug, currentPassword, newPassword } = await request.json();

    if (!slug || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "6 caractères minimum" }, { status: 400 });
    }

    // 1. Get project env vars to verify current password
    const envRes = await fetch(`https://api.vercel.com/v9/projects/${slug}/env${teamParam()}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    if (!envRes.ok) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }
    const envData = await envRes.json();
    const adminEnv = envData.envs?.find((e: { key: string }) => e.key === "ADMIN_PASSWORD");

    if (!adminEnv) {
      return NextResponse.json({ error: "Pas de mot de passe configuré" }, { status: 400 });
    }

    // Vercel API doesn't return decrypted values, so we verify via the site's auth endpoint
    const siteUrl = `https://${slug}.vtc-site.fr`;
    const authRes = await fetch(`${siteUrl}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: currentPassword }),
    });
    if (!authRes.ok) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
    }

    // 2. Delete old ADMIN_PASSWORD
    await fetch(`https://api.vercel.com/v9/projects/${slug}/env/${adminEnv.id}${teamParam()}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });

    // 3. Create new ADMIN_PASSWORD
    await fetch(`https://api.vercel.com/v10/projects/${slug}/env${teamParam()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        key: "ADMIN_PASSWORD",
        value: newPassword,
        type: "plain",
        target: ["production", "preview"],
      }]),
    });

    // 4. Trigger redeploy via deploy hook
    const projRes = await fetch(`https://api.vercel.com/v9/projects/${slug}${teamParam()}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });
    const projData = await projRes.json();
    const hooks = projData.link?.deployHooks || [];
    if (hooks.length > 0) {
      await fetch(hooks[0].url, { method: "POST" });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
