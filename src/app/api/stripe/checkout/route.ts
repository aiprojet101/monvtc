import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brand, city, region, department, postalCode, phone, email, pricePerKm, minPrice, zones, testMode } = body;

    // Create slug from brand name
    const slug = brand
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Format phone to international
    const cleanPhone = phone.replace(/\s/g, "");
    const phoneIntl = cleanPhone.startsWith("0")
      ? `+33${cleanPhone.slice(1)}`
      : cleanPhone.startsWith("+")
      ? cleanPhone
      : `+33${cleanPhone}`;
    const whatsapp = phoneIntl.replace("+", "");

    // Test mode: 0.50€ setup + 0.49€/mois
    const setupAmount = testMode ? 50 : PRICES.setup;
    const monthlyAmount = testMode ? 49 : PRICES.monthly;

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      phone,
      name: brand,
      metadata: {
        slug,
        brand,
        brandShort: brand.toUpperCase().replace(/[^A-Z0-9]/g, ""),
        city,
        region: region || city,
        department: department || "",
        postalCode: postalCode || "",
        phone,
        phoneIntl,
        whatsapp,
        email,
        pricePerKm: pricePerKm || "1.80",
        minPrice: minPrice || "15",
        zones,
        testMode: testMode ? "true" : "false",
      },
    });

    // Create checkout session with subscription + setup fee
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: testMode ? "MonVTC — TEST" : "MonVTC — Abonnement mensuel",
              description: testMode
                ? "Test de paiement"
                : "Site VTC professionnel — hébergement, maintenance, mises à jour, support",
            },
            unit_amount: monthlyAmount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { slug, brand },
      },
      invoice_creation: undefined,
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/inscription`,
      metadata: {
        slug,
        brand,
        setupAmount: String(setupAmount),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
