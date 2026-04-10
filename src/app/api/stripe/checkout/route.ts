import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brand, city, region, department, postalCode, phone, email, pricePerKm, minPrice, zones } = body;

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
      },
    });

    // Create checkout session: 199€ setup + 29€/mois subscription
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          // Setup fee (one-time)
          price_data: {
            currency: "eur",
            product_data: {
              name: "MonVTC — Mise en place",
              description: `Site VTC professionnel pour ${brand}`,
            },
            unit_amount: PRICES.setup,
          },
          quantity: 1,
        },
        {
          // Monthly subscription
          price_data: {
            currency: "eur",
            product_data: {
              name: "MonVTC — Abonnement mensuel",
              description: "Hébergement, maintenance, mises à jour, support",
            },
            unit_amount: PRICES.monthly,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/inscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/inscription`,
      metadata: {
        slug,
        brand,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
  }
}
