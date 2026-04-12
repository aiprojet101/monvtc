import { NextRequest, NextResponse } from "next/server";
import { getSubscribers, markEmailSent } from "@/lib/newsletter";
import { NEWSLETTER_SEQUENCE } from "@/lib/newsletter-sequence";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CRON_SECRET = process.env.MONVTC_CRON_SECRET || "";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") ||
    request.headers.get("authorization")?.replace("Bearer ", "") || "";
  if (!CRON_SECRET || secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    const now = Date.now();
    let sent = 0;

    for (const sub of subscribers) {
      if (sub.unsubscribed) continue;
      const daysSince = Math.floor((now - new Date(sub.subscribedAt).getTime()) / (1000 * 60 * 60 * 24));

      for (let i = 0; i < NEWSLETTER_SEQUENCE.length; i++) {
        const email = NEWSLETTER_SEQUENCE[i];
        if (daysSince >= email.day && !sub.emailsSent.includes(i)) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "MonVTC <newsletter@vtc-site.fr>",
              to: sub.email,
              subject: email.subject,
              html: email.html(sub.email),
            }),
          });
          await markEmailSent(sub.email, i);
          sent++;
        }
      }
    }

    return NextResponse.json({ success: true, sent });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
