import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, clientIp } from "@/lib/security";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TOKEN_SECRET = process.env.MONVTC_ADMIN_SECRET || "fallback-secret-change-me";

function signToken(payload: { email: string; plan: string; purchaseDate: string }): string {
  const withIat = { ...payload, iat: Math.floor(Date.now() / 1000) };
  const data = Buffer.from(JSON.stringify(withIat)).toString("base64url");
  const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const ip = clientIp(request);
    if (!checkRateLimit(`access:${ip}`, 10, 60 * 60 * 1000) ||
        !checkRateLimit(`access-email:${email.toLowerCase()}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Trop de tentatives. Reessayez dans 1h." }, { status: 429 });
    }

    // Cherche un checkout session payment completed chez Stripe pour ce email avec metadata type=formation
    const searchRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions?limit=100`,
      { headers: { Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}` } }
    );
    const data = await searchRes.json();
    const sessions = (data.data || []).filter((s: { customer_details?: { email?: string }; metadata?: { type?: string; planId?: string }; payment_status?: string; created: number }) =>
      s.customer_details?.email?.toLowerCase() === email.toLowerCase() &&
      s.metadata?.type === "formation" &&
      s.payment_status === "paid"
    );

    if (sessions.length === 0) {
      return NextResponse.json({ error: "Aucun achat trouve pour cet email" }, { status: 404 });
    }

    // Prend le plus recent
    const latest = sessions.sort((a: { created: number }, b: { created: number }) => b.created - a.created)[0];
    const planId = latest.metadata?.planId || "essentiel";
    const purchaseDate = new Date(latest.created * 1000).toISOString();

    const token = signToken({ email: email.toLowerCase(), plan: planId, purchaseDate });
    const accessUrl = `${request.nextUrl.origin}/cours?token=${token}`;

    // Envoie l'email avec le lien
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MonVTC <formation@vtc-site.fr>",
          to: email,
          subject: "Ton acces a la formation VTC",
          html: `
            <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#09090B;color:white;padding:40px 24px;">
              <h1 style="color:#3B82F6;margin:0 0 16px;">Bienvenue !</h1>
              <p style="color:#A1A1AA;line-height:1.6;">Voici ton lien d'acces personnel a la formation VTC. Il reste valide a vie. Garde-le precieusement.</p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${accessUrl}" style="display:inline-block;background:#3B82F6;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Acceder a la formation</a>
              </div>
              <p style="color:#71717A;font-size:12px;">Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur : ${accessUrl}</p>
              <p style="color:#71717A;font-size:11px;margin-top:32px;">MonVTC · Formation VTC</p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
