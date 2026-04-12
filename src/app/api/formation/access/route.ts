import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const TOKEN_SECRET = process.env.MONVTC_ADMIN_SECRET || "fallback-secret-change-me";

const TOKEN_TTL_SECONDS = 2 * 365 * 24 * 60 * 60; // 2 ans, user peut renouveler via request-access

function verifyToken(token: string): { email: string; plan: string; purchaseDate: string; iat?: number } | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("base64url");
    // timingSafeEqual pour eviter timing attacks
    const a = Buffer.from(expected);
    const b = Buffer.from(sig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString());
    // Verifie TTL si iat present (tokens legacy sans iat restent valides pour compat)
    if (payload.iat && Date.now() / 1000 - payload.iat > TOKEN_TTL_SECONDS) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  return NextResponse.json(payload);
}
