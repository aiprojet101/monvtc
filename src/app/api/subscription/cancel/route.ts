import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/security";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

async function stripeGet(endpoint: string) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    headers: { Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}` },
  });
  return res.json();
}

async function stripePost(endpoint: string, params: Record<string, string>) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  return res.json();
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "MonVTC <contact@vtc-site.fr>", to, subject, html }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email, reason } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const ip = clientIp(request);
    if (!checkRateLimit(`cancel-sub:${ip}`, 5, 60 * 60 * 1000) ||
        !checkRateLimit(`cancel-sub-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 1h." }, { status: 429 });
    }

    // Trouve le customer Stripe
    const customersRes = await stripeGet(`customers?email=${encodeURIComponent(email)}&limit=1`);
    const customer = customersRes.data?.[0];
    if (!customer) {
      return NextResponse.json({ error: "Aucun compte trouvé pour cet email" }, { status: 404 });
    }

    // Trouve l'abonnement actif
    const subsRes = await stripeGet(`subscriptions?customer=${customer.id}&status=active&limit=1`);
    const sub = subsRes.data?.[0];
    if (!sub) {
      return NextResponse.json({ error: "Aucun abonnement actif trouvé" }, { status: 404 });
    }

    // Annule a la fin de la période en cours (pas de coupure immediate, pas de remboursement prorata)
    const canceled = await stripePost(`subscriptions/${sub.id}`, {
      cancel_at_period_end: "true",
      "metadata[cancel_reason]": reason || "non précisée",
    });

    if (canceled.error) {
      return NextResponse.json({ error: canceled.error.message }, { status: 500 });
    }

    const endDate = new Date(canceled.current_period_end * 1000).toLocaleDateString("fr-FR");

    await sendEmail(email, "Votre résiliation est enregistrée", `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#333;">
        <p>Bonjour,</p>
        <p>Votre abonnement MonVTC sera resilie a la fin de la période en cours, soit le <strong>${endDate}</strong>.</p>
        <p>Jusqu'à cette date vous gardez l'accès complet : site en ligne, support, hébergement. Aucun autre prélèvement ne sera effectué.</p>
        <p>Si vous changez d'avis, vous pouvez réactiver votre abonnement avant la date de fin en nous écrivant à contact@vtc-site.fr.</p>
        <p style="margin-top:24px;">L'équipe MonVTC</p>
      </div>
    `);

    await sendEmail("contact@vtc-site.fr", "Résiliation abonnement MonVTC", `
      <p>Email : ${email}</p>
      <p>Subscription : ${sub.id}</p>
      <p>Fin effective : ${endDate}</p>
      <p>Raison : ${reason || "(non précisée)"}</p>
    `);

    return NextResponse.json({ success: true, endDate });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
