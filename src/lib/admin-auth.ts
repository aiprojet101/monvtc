import crypto from "crypto";

const ADMIN_SECRET = process.env.MONVTC_ADMIN_SECRET || "";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 jours

// Genere un token de session signe (HMAC du timestamp avec l'admin secret)
export function createAdminSession(): string {
  const iat = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ iat })).toString("base64url");
  const sig = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token: string | undefined): boolean {
  if (!token || !ADMIN_SECRET) return false;
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("base64url");
    const a = Buffer.from(expected);
    const b = Buffer.from(sig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { iat?: number };
    if (!data.iat) return false;
    if (Date.now() / 1000 - data.iat > SESSION_TTL_SECONDS) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(pwd: string): boolean {
  if (!ADMIN_SECRET || !pwd) return false;
  const a = Buffer.from(pwd);
  const b = Buffer.from(ADMIN_SECRET);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isAdminRequest(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)monvtc_admin=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : undefined;
  return verifyAdminSession(token);
}

export const ADMIN_COOKIE_NAME = "monvtc_admin";
export const ADMIN_COOKIE_MAX_AGE = SESSION_TTL_SECONDS;
