import { NextRequest, NextResponse } from "next/server";
import { stripeRequest, PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brand, city, region, department, postalCode, phone, email, pricePerKm, minPrice, zones, testMode } = body;

    const slug = brand
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const cleanPhone = phone.replace(/\s/g, "");
    const phoneIntl = cleanPhone.startsWith("0")
      ? `+33${cleanPhone.slice(1)}`
      : cleanPhone.startsWith("+")
      ? cleanPhone
      : `+33${cleanPhone}`;
    const whatsapp = phoneIntl.replace("+", "");

    const monthlyAmount = testMode ? 49 : PRICES.monthly;

    // 1. Create customer
    const customer = await stripeRequest("customers", {
      email,
      phone,
      name: brand,
      "metadata[slug]": slug,
      "metadata[brand]": brand,
      "metadata[brandShort]": brand.toUpperCase().replace(/[^A-Z0-9]/g, ""),
      "metadata[city]": city,
      "metadata[region]": region || city,
      "metadata[department]": department || "",
      "metadata[postalCode]": postalCode || "",
      "metadata[phone]": phone,
      "metadata[phoneIntl]": phoneIntl,
      "metadata[whatsapp]": whatsapp,
      "metadata[email]": email,
      "metadata[pricePerKm]": pricePerKm || "1.80",
      "metadata[minPrice]": minPrice || "15",
      "metadata[zones]": zones,
      "metadata[testMode]": testMode ? "true" : "false",
    });

    // 2. Add setup fee as pending invoice item (will be charged on first invoice)
    const setupAmount = testMode ? 50 : PRICES.setup;
    await stripeRequest("invoiceitems", {
      customer: customer.id,
      amount: String(setupAmount),
      currency: "eur",
      description: testMode ? "MonVTC — TEST setup" : "MonVTC — Mise en place du site VTC",
    });

    // 3. Create checkout session (subscription + setup fee on first invoice)
    const origin = request.nextUrl.origin;
    const session = await stripeRequest("checkout/sessions", {
      customer: customer.id,
      mode: "subscription",
      "payment_method_types[0]": "card",
      "line_items[0][price_data][currency]": "eur",
      "line_items[0][price_data][product_data][name]": testMode ? "MonVTC — TEST abo" : "MonVTC — Abonnement mensuel",
      "line_items[0][price_data][product_data][description]": testMode
        ? "Test de paiement"
        : "Site VTC professionnel — hébergement, maintenance, mises à jour, support",
      "line_items[0][price_data][unit_amount]": String(monthlyAmount),
      "line_items[0][price_data][recurring][interval]": "month",
      "line_items[0][quantity]": "1",
      "subscription_data[metadata][slug]": slug,
      "subscription_data[metadata][brand]": brand,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/inscription`,
      "metadata[slug]": slug,
      "metadata[brand]": brand,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
