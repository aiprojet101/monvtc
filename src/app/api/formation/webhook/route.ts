import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function verifySignature(payload: string, sig: string, secret: string): boolean {
  try {
    const cleanSecret = secret.trim();
    const parts: Record<string, string> = {};
    for (const item of sig.split(",")) {
      const idx = item.indexOf("=");
      if (idx > 0) parts[item.slice(0, idx).trim()] = item.slice(idx + 1).trim();
    }
    const t = parts["t"];
    const v1 = parts["v1"];
    if (!t || !v1) return false;
    const expected = crypto.createHmac("sha256", cleanSecret).update(`${t}.${payload}`, "utf8").digest("hex");
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(v1, "hex"));
  } catch {
    return false;
  }
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

async function stripeGet(endpoint: string) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    headers: { Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}` },
  });
  return res.json();
}

// Genere un code promo unique pour le parrain (ex: JEAN5F2A)
function generatePromoCode(email: string): string {
  const prefix = (email.split("@")[0] || "FRIEND").slice(0, 5).toUpperCase().replace(/[^A-Z0-9]/g, "");
  const suffix = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `${prefix}${suffix}`;
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
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  if (!verifySignature(body, sig, STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const meta = session.metadata || {};

  // Ne traite que les formations
  if (meta.type !== "formation") {
    return NextResponse.json({ received: true });
  }

  const email = session.customer_details?.email?.toLowerCase();
  if (!email) return NextResponse.json({ received: true });

  try {
    // 1. Detecte si un code de parrainage a ete utilise
    const sessionFull = await stripeGet(`checkout/sessions/${session.id}?expand[]=total_details.breakdown.discounts.discount.promotion_code`);
    const discountUsed = sessionFull.total_details?.breakdown?.discounts?.[0]?.discount;

    if (discountUsed?.metadata?.referrer_email) {
      // Parrainage utilise : crediter le parrain avec 1 mois offert sur MonVTC s'il est client
      const referrerEmail = discountUsed.metadata.referrer_email;
      await creditReferrer(referrerEmail);

      // Email au parrain pour le feliciter
      await sendEmail(referrerEmail, "Quelqu'un a utilise ton code de parrainage !", `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#09090B;color:white;">
          <h1 style="color:#3B82F6;">Bravo !</h1>
          <p>Quelqu'un vient d'acheter la formation VTC avec ton code de parrainage.</p>
          <p>Tu viens de recevoir <strong>1 mois gratuit sur ton abonnement MonVTC</strong> (ou 30€ d'avoir si tu n'es pas encore client).</p>
          <p style="margin-top:32px;"><a href="https://vtc-site.fr/inscription" style="background:#3B82F6;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Mon espace MonVTC</a></p>
          <p style="color:#71717A;font-size:12px;margin-top:32px;">Tu peux continuer a partager ton code, chaque parrainage est recompense.</p>
        </div>
      `);
    }

    // 2. Cree un code de parrainage personnel pour le nouveau client
    const code = generatePromoCode(email);

    // Coupon -20%
    const coupon = await stripePost("coupons", {
      percent_off: "20",
      duration: "once",
      name: `Parrainage ${email}`,
      "metadata[referrer_email]": email,
      "metadata[type]": "referral",
    });

    if (coupon.id) {
      // Code promo associe
      await stripePost("promotion_codes", {
        coupon: coupon.id,
        code,
        "metadata[referrer_email]": email,
      });
    }

    // 3. Envoie le code au nouveau client
    await sendEmail(email, "Ton code de parrainage — partage-le", `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#09090B;color:white;">
        <h1 style="color:#3B82F6;margin-bottom:16px;">Ton code de parrainage</h1>
        <p style="color:#A1A1AA;">Merci pour ton achat ! Voici ton code personnel :</p>
        <div style="background:#141414;border:2px dashed #3B82F6;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
          <p style="margin:0;color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Ton code</p>
          <p style="margin:8px 0 0;color:#3B82F6;font-size:32px;font-weight:900;letter-spacing:2px;">${code}</p>
        </div>
        <p style="color:#A1A1AA;">Partage-le avec tes amis chauffeurs VTC :</p>
        <ul style="color:#A1A1AA;line-height:1.8;">
          <li><strong style="color:white;">Ton ami paie -20%</strong> sur sa formation</li>
          <li><strong style="color:white;">Toi, tu recois 1 mois gratuit</strong> sur ton abonnement MonVTC a chaque utilisation</li>
          <li><strong style="color:white;">Illimite</strong> — plus tu partages, plus tu gagnes</li>
        </ul>
        <p style="margin-top:32px;"><a href="https://wa.me/?text=Je%20te%20conseille%20la%20formation%20VTC%20de%20MonVTC%20!%20Utilise%20mon%20code%20${code}%20pour%20-20%25%20%3A%20https%3A%2F%2Fvtc-site.fr%2Fformation" style="background:#25D366;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Partager sur WhatsApp</a></p>
      </div>
    `);

    return NextResponse.json({ received: true, code });
  } catch (error) {
    console.error("Formation webhook error:", error);
    return NextResponse.json({ received: true });
  }
}

async function creditReferrer(email: string) {
  // Cherche si le parrain est client MonVTC (subscription active)
  const customersRes = await stripeGet(`customers?email=${encodeURIComponent(email)}&limit=1`);
  const customer = customersRes.data?.[0];
  if (!customer) return;

  const subsRes = await stripeGet(`subscriptions?customer=${customer.id}&status=active&limit=1`);
  const sub = subsRes.data?.[0];

  if (sub) {
    // Credite 1 mois gratuit sur sa subscription existante
    const coupon = await stripePost("coupons", {
      amount_off: "2900", // 29€
      currency: "eur",
      duration: "once",
      name: "Parrainage — 1 mois offert",
    });
    if (coupon.id) {
      await stripePost(`subscriptions/${sub.id}`, {
        coupon: coupon.id,
      });
    }
  } else {
    // Pas encore client : credit sur son compte Stripe (utilisable plus tard)
    await stripePost(`customers/${customer.id}`, {
      "balance": "-3000", // 30€ d'avoir (negatif = credit)
    });
  }
}
