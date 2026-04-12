import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const TOKEN_SECRET = process.env.MONVTC_ADMIN_SECRET || "fallback-secret-change-me";

function verifyToken(token: string): { email: string; plan: string; purchaseDate: string } | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(data).digest("base64url");
    if (expected !== sig) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString());
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
