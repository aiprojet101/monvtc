import { NextRequest, NextResponse } from "next/server";
import { getClients } from "@/lib/db";
import { stripeRequest } from "@/lib/stripe";

const ADMIN_SECRET = process.env.MONVTC_ADMIN_SECRET || "";
const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

function checkAuth(request: NextRequest): boolean {
  const secret = request.nextUrl.searchParams.get("secret") ||
    request.headers.get("authorization")?.replace("Bearer ", "") || "";
  return !!(ADMIN_SECRET && secret === ADMIN_SECRET);
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get clients from Stripe (source of truth)
  const res = await fetch("https://api.stripe.com/v1/subscriptions?limit=100&expand[]=data.customer", {
    headers: { Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}` },
  });
  const data = await res.json();

  const clients = (data.data || []).map((sub: {
    id: string;
    status: string;
    created: number;
    metadata?: Record<string, string>;
    customer?: { name?: string; email?: string; phone?: string; metadata?: Record<string, string> };
    items?: { data?: { price?: { unit_amount?: number } }[] };
  }) => {
    const meta = sub.customer?.metadata || sub.metadata || {};
    return {
      subscriptionId: sub.id,
      status: sub.status,
      brand: meta.brand || sub.customer?.name || "N/A",
      slug: meta.slug || "",
      email: sub.customer?.email || "",
      phone: meta.phone || sub.customer?.phone || "",
      city: meta.city || "",
      pricePerKm: meta.pricePerKm || "",
      siteUrl: meta.slug ? `${meta.slug}.vtc-site.fr` : "",
      createdAt: new Date(sub.created * 1000).toISOString(),
      amount: (sub.items?.data?.[0]?.price?.unit_amount || 0) / 100,
    };
  });

  return NextResponse.json(clients);
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subscriptionId, slug } = await request.json();

    // 1. Cancel Stripe subscription
    if (subscriptionId) {
      await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${Buffer.from(STRIPE_SECRET_KEY + ":").toString("base64")}` },
      });
    }

    // 2. Delete Vercel project
    if (slug) {
      const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
      await fetch(`https://api.vercel.com/v10/projects/${slug}${teamParam}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
