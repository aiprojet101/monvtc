import { NextRequest, NextResponse } from "next/server";
import { stripeRequest } from "@/lib/stripe";

const PLANS: Record<string, { amount: number; name: string; description: string }> = {
  essentiel: {
    amount: 4900,
    name: "Formation VTC — Essentiel",
    description: "6 modules texte + audio + PDF + acces a vie",
  },
  pro: {
    amount: 14900,
    name: "Formation VTC — Pro",
    description: "Essentiel + site MonVTC 1 mois + coaching WhatsApp 14j + certificat",
  },
  premium: {
    amount: 29700,
    name: "Formation VTC — Premium",
    description: "Pro + site MonVTC 6 mois + coaching illimite + appel 1-to-1 + garantie",
  },
};

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();
    const plan = PLANS[planId];
    if (!plan) return NextResponse.json({ error: "Formule invalide" }, { status: 400 });

    const origin = request.nextUrl.origin;
    const session = await stripeRequest("checkout/sessions", {
      mode: "payment",
      "payment_method_types[0]": "card",
      "line_items[0][price_data][currency]": "eur",
      "line_items[0][price_data][product_data][name]": plan.name,
      "line_items[0][price_data][product_data][description]": plan.description,
      "line_items[0][price_data][unit_amount]": String(plan.amount),
      "line_items[0][quantity]": "1",
      success_url: `${origin}/formation/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/formation`,
      "metadata[planId]": planId,
      "metadata[type]": "formation",
      allow_promotion_codes: "true",
      locale: "fr",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
