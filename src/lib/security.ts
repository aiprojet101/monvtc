// Lightweight in-memory stores for security (resets at cold start — OK pour MVP).
// Pour scale sérieux, migrer vers Redis/Upstash.

const processedEvents = new Map<string, number>();
const rateLimits = new Map<string, number[]>();

const EVENT_TTL_MS = 24 * 60 * 60 * 1000;

export function isEventProcessed(eventId: string): boolean {
  const now = Date.now();
  // Purge vieilles entrées
  for (const [id, ts] of processedEvents.entries()) {
    if (now - ts > EVENT_TTL_MS) processedEvents.delete(id);
  }
  return processedEvents.has(eventId);
}

export function markEventProcessed(eventId: string): void {
  processedEvents.set(eventId, Date.now());
}

// Rate limit : max `limit` requetes par fenetre `windowMs` et par cle
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = rateLimits.get(key) || [];
  const recent = arr.filter((ts) => now - ts < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  rateLimits.set(key, recent);
  return true;
}

export function clientIp(req: Request): string {
  const h = (name: string) => req.headers.get(name) || "";
  return (
    h("x-forwarded-for").split(",")[0].trim() ||
    h("x-real-ip") ||
    "unknown"
  );
}
