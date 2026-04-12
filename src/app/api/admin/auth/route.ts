import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { checkRateLimit, clientIp } from "@/lib/security";

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  // Rate limit strict sur le login admin (brute-force)
  if (!checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop de tentatives. Reessayez dans 15 min." }, { status: 429 });
  }

  let body: { password?: string } = {};
  try { body = await request.json(); } catch {}
  if (!verifyAdminPassword(body.password || "")) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = createAdminSession();
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)monvtc_admin=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : undefined;
  const { verifyAdminSession } = await import("@/lib/admin-auth");
  return NextResponse.json({ authenticated: verifyAdminSession(token) });
}
