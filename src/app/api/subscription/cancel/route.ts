import { NextRequest, NextResponse } from "next/server";

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

    // Trouve le customer Stripe
    const customersRes = await stripeGet(`customers?email=${encodeURIComponent(email)}&limit=1`);
    const customer = customersRes.data?.[0];
    if (!customer) {
      return NextResponse.json({ error: "Aucun compte trouve pour cet email" }, { status: 404 });
    }

    // Trouve l'abonnement actif
    const subsRes = await stripeGet(`subscriptions?customer=${customer.id}&status=active&limit=1`);
    const sub = subsRes.data?.[0];
    if (!sub) {
      return NextResponse.json({ error: "Aucun abonnement actif trouve" }, { status: 404 });
    }

    // Annule a la fin de la periode en cours (pas de coupure immediate, pas de remboursement prorata)
    const canceled = await stripePost(`subscriptions/${sub.id}`, {
      cancel_at_period_end: "true",
      "metadata[cancel_reason]": reason || "non precisee",
    });

    if (canceled.error) {
      return NextResponse.json({ error: canceled.error.message }, { status: 500 });
    }

    const endDate = new Date(canceled.current_period_end * 1000).toLocaleDateString("fr-FR");

    await sendEmail(email, "Votre resiliation est enregistree", `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#333;">
        <p>Bonjour,</p>
        <p>Votre abonnement MonVTC sera resilie a la fin de la periode en cours, soit le <strong>${endDate}</strong>.</p>
        <p>Jusqu'a cette date vous gardez l'acces complet : site en ligne, support, hebergement. Aucun autre prelevement ne sera effectue.</p>
        <p>Si vous changez d'avis, vous pouvez reactiver votre abonnement avant la date de fin en nous ecrivant a contact@vtc-site.fr.</p>
        <p style="margin-top:24px;">L'equipe MonVTC</p>
      </div>
    `);

    await sendEmail("contact@vtc-site.fr", "Resiliation abonnement MonVTC", `
      <p>Email : ${email}</p>
      <p>Subscription : ${sub.id}</p>
      <p>Fin effective : ${endDate}</p>
      <p>Raison : ${reason || "(non precisee)"}</p>
    `);

    return NextResponse.json({ success: true, endDate });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
