import { NextRequest, NextResponse } from "next/server";
import { createVercelProject, type DriverConfig } from "@/lib/vercel";
import crypto from "crypto";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

function verifySignature(payload: string, sig: string, secret: string): boolean {
  try {
    const cleanSecret = secret.trim();
    const parts: Record<string, string> = {};
    for (const item of sig.split(",")) {
      const idx = item.indexOf("=");
      if (idx > 0) {
        const key = item.slice(0, idx).trim();
        const val = item.slice(idx + 1).trim();
        parts[key] = val;
      }
    }

    const timestamp = parts["t"];
    const signature = parts["v1"];
    if (!timestamp || !signature) return false;

    const signedPayload = `${timestamp}.${payload}`;
    const expected = crypto.createHmac("sha256", cleanSecret).update(signedPayload, "utf8").digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex")
    );
  } catch {
    return false;
  }
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
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature") || "";

    if (!verifySignature(body, sig, STRIPE_WEBHOOK_SECRET)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerId = session.customer;

      // Get customer metadata
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

      // Try to provision — but always return 200 to Stripe
      try {
        const result = await createVercelProject(slug, driverConfig);
        console.log(`SUCCESS: Site provisioned for ${meta.brand}: ${result.projectUrl}`);
      } catch (error) {
        console.error(`PROVISIONING ERROR for ${meta.brand}:`, error instanceof Error ? error.message : error);
        // Don't throw — we still return 200 so Stripe stops retrying
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error instanceof Error ? error.message : error);
    // Always return 200 to prevent Stripe from retrying
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}
