import { NextRequest, NextResponse } from "next/server";
import { createVercelProject, type DriverConfig } from "@/lib/vercel";
import { sendWelcomeEmail, sendAdminNotification } from "@/lib/email";
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
      // Ignore les achats de formation (geres par /api/formation/webhook)
      if (session.metadata?.type === "formation") {
        return NextResponse.json({ received: true, skipped: "formation" });
      }
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
        lieux: meta.lieux || "",
      };

      // Try to provision
      try {
        const result = await createVercelProject(slug, driverConfig);

        // Send emails
        try {
          await sendWelcomeEmail({
            email: meta.email,
            brand: meta.brand,
            city: meta.city,
            zones: meta.zones,
            phone: meta.phone,
            pricePerKm: meta.pricePerKm,
            siteUrl: result.projectUrl,
            adminPassword: result.adminPassword,
          });
          await sendAdminNotification({
            brand: meta.brand,
            city: meta.city,
            email: meta.email,
            phone: meta.phone,
            siteUrl: result.projectUrl,
            slug,
          });
        } catch (emailErr) {
          console.error("Email error:", emailErr);
        }

        return NextResponse.json({ received: true, status: "provisioned", siteUrl: result.projectUrl });
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ received: true, status: "provisioning_failed", error: msg });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ received: true, error: msg });
  }
}
