import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createVercelProject, type DriverConfig } from "@/lib/vercel";
import { addClient } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Get customer metadata with all driver config
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      return NextResponse.json({ error: "Customer deleted" }, { status: 400 });
    }

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
      // Provision the site
      const result = await createVercelProject(slug, driverConfig);

      // Save client to DB
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

      // TODO: Send confirmation email via Resend
      console.log(`Site provisioned for ${meta.brand}: ${result.projectUrl}`);
    } catch (error) {
      console.error("Provisioning error:", error);
      // Save as failed
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

  // Handle subscription cancellation
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    console.log(`Subscription cancelled: ${subscription.id}`);
    // TODO: Disable or delete the Vercel project
  }

  return NextResponse.json({ received: true });
}
