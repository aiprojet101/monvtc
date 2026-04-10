import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.MONVTC_VERCEL_TOKEN || "";
const VERCEL_TEAM_ID = process.env.MONVTC_VERCEL_TEAM_ID || "";

export async function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get("brand") || "";
  if (brand.length < 2) {
    return NextResponse.json({ available: false, slug: "" });
  }

  const slug = brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    return NextResponse.json({ available: false, slug: "" });
  }

  // Check if project exists on Vercel
  const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
  const res = await fetch(`https://api.vercel.com/v9/projects/${slug}${teamParam}`, {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  });

  const available = res.status === 404;

  return NextResponse.json({ available, slug, domain: `${slug}.vtc-site.fr` });
}
