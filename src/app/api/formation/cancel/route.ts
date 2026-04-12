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
    body: JSON.stringify({ from: "MonVTC <formation@vtc-site.fr>", to, subject, html }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email, reason } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Rate limit : 3 tentatives par heure par IP + email
    const ip = clientIp(request);
    if (!checkRateLimit(`cancel-formation:${ip}`, 5, 60 * 60 * 1000) ||
        !checkRateLimit(`cancel-formation-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Trop de tentatives. Reessayez dans 1h ou ecrivez a contact@vtc-site.fr." }, { status: 429 });
    }

    // Cherche les sessions formation payees de cet email
    const sessionsRes = await stripeGet(`checkout/sessions?limit=100`);
    const sessions = (sessionsRes.data || []).filter((s: { customer_details?: { email?: string }; metadata?: { type?: string }; payment_status?: string; payment_intent?: string; amount_total?: number; created: number }) =>
      s.customer_details?.email?.toLowerCase() === email.toLowerCase() &&
      s.metadata?.type === "formation" &&
      s.payment_status === "paid"
    );

    if (sessions.length === 0) {
      return NextResponse.json({ error: "Aucun achat formation trouve pour cet email" }, { status: 404 });
    }

    const latest = sessions.sort((a: { created: number }, b: { created: number }) => b.created - a.created)[0];
    const now = Math.floor(Date.now() / 1000);
    const daysSince = (now - latest.created) / 86400;

    if (daysSince > 15) {
      // Hors delai : on informe l'equipe quand meme mais pas de remboursement auto
      await sendEmail("contact@vtc-site.fr", "Demande de resiliation formation HORS DELAI", `
        <p>Email : ${email}</p>
        <p>Jours depuis achat : ${daysSince.toFixed(0)}</p>
        <p>Raison : ${reason || "(non precisee)"}</p>
        <p>Session : ${latest.id}</p>
      `);
      return NextResponse.json({
        error: `Votre achat date de ${daysSince.toFixed(0)} jours. La garantie 15 jours est depassee, mais nous avons transmis votre demande a notre equipe.`
      }, { status: 400 });
    }

    // Remboursement automatique
    const pi = latest.payment_intent;
    if (!pi) {
      return NextResponse.json({ error: "Paiement introuvable" }, { status: 500 });
    }

    // Verifie qu'aucun remboursement n'existe deja sur ce payment_intent (anti-double click)
    const existingRefunds = await stripeGet(`refunds?payment_intent=${pi}&limit=5`);
    if ((existingRefunds.data || []).some((r: { status?: string }) => r.status === "succeeded" || r.status === "pending")) {
      return NextResponse.json({ error: "Un remboursement a deja ete effectue sur cet achat." }, { status: 400 });
    }

    const refund = await stripePost("refunds", {
      payment_intent: pi as string,
      "metadata[reason]": reason || "non precisee",
      "metadata[email]": email,
    });

    if (refund.error) {
      return NextResponse.json({ error: refund.error.message }, { status: 500 });
    }

    // Email client
    await sendEmail(email, "Votre remboursement a ete traite", `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#333;">
        <p>Bonjour,</p>
        <p>Nous confirmons l'annulation de votre formation MonVTC et le remboursement integral de votre achat.</p>
        <p>Le montant sera visible sur votre compte bancaire sous 5 a 10 jours ouvres selon votre banque.</p>
        <p>Si vous changez d'avis ou si nous pouvons ameliorer notre offre, ecrivez-nous a contact@vtc-site.fr.</p>
        <p style="margin-top:24px;">L'equipe MonVTC</p>
      </div>
    `);

    // Email equipe avec feedback
    await sendEmail("contact@vtc-site.fr", "Resiliation formation + remboursement automatique", `
      <p>Email : ${email}</p>
      <p>Montant : ${(latest.amount_total / 100).toFixed(2)} EUR</p>
      <p>Jours depuis achat : ${daysSince.toFixed(0)}</p>
      <p>Raison : ${reason || "(non precisee)"}</p>
      <p>Session : ${latest.id}</p>
      <p>Refund : ${refund.id}</p>
    `);

    return NextResponse.json({ success: true, refundId: refund.id });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
