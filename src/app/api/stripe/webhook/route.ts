import { NextRequest, NextResponse } from "next/server";
import { createVercelProject, type DriverConfig } from "@/lib/vercel";
import { addClient } from "@/lib/db";
import crypto from "crypto";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

function verifySignature(payload: string, sig: string, secret: string): boolean {
  const parts = sig.split(",").reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  return expected === signature;
}

async function stripeGet(endpoint: string) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}`,
    },
  });
  return res.json();
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  if (!verifySignature(body, sig, STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    const customer = await stripeGet(`customers/${customerId}`);
    const meta = customer.metadata;
    const slug = meta.slug;

    const driverConfig: DriverConfig = {
      brand: meta.brand,
      brandShort: meta.brandShort,
      city: meta.city,
      region: meta.region,
      department: meta.department,
      postalCode: meta.postalCode,
      phone: meta.phone,
      phoneIntl: meta.phoneIntl,
      whatsapp: meta.whatsapp,
      email: meta.email,
      pricePerKm: meta.pricePerKm,
      minPrice: meta.minPrice,
      zones: meta.zones,
    };

    try {
      const result = await createVercelProject(slug, driverConfig);

      await addClient({
        id: `CLI-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "active",
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        email: meta.email,
        phone: meta.phone,
        brand: meta.brand,
        brandShort: meta.brandShort,
        slug,
        city: meta.city,
        region: meta.region,
        department: meta.department,
        postalCode: meta.postalCode,
        whatsapp: meta.whatsapp,
        pricePerKm: meta.pricePerKm,
        minPrice: meta.minPrice,
        zones: meta.zones,
        siteUrl: result.projectUrl,
        vercelProjectId: result.projectId,
      });

      console.log(`Site provisioned for ${meta.brand}: ${result.projectUrl}`);
    } catch (error) {
      console.error("Provisioning error:", error);
      await addClient({
        id: `CLI-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "failed",
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        email: meta.email,
        phone: meta.phone,
        brand: meta.brand,
        brandShort: meta.brandShort,
        slug,
        city: meta.city,
        region: meta.region,
        department: meta.department,
        postalCode: meta.postalCode,
        whatsapp: meta.whatsapp,
        pricePerKm: meta.pricePerKm,
        minPrice: meta.minPrice,
        zones: meta.zones,
        siteUrl: "",
        vercelProjectId: "",
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    console.log(`Subscription cancelled: ${subscription.id}`);
  }

  return NextResponse.json({ received: true });
}
