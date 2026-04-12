import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

// Quotas du plan gratuit Resend
const MONTHLY_QUOTA = 3000;
const DAILY_QUOTA = 100;

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: "Resend API key manquante" }, { status: 500 });
  }

  try {
    // Recupere les emails via l'API Resend (max 100 par page)
    let allEmails: { created_at: string; last_event?: string }[] = [];
    let page = 1;
    const maxPages = 10; // securite : max 1000 emails scannes

    while (page <= maxPages) {
      const res = await fetch(`https://api.resend.com/emails?limit=100`, {
        headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
      });
      if (!res.ok) break;
      const data = await res.json();
      const emails = data.data || [];
      if (emails.length === 0) break;
      allEmails = allEmails.concat(emails);
      if (emails.length < 100) break;
      page++;
    }

    // Compte les emails du mois en cours et du jour
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const monthCount = allEmails.filter((e) => new Date(e.created_at) >= startOfMonth).length;
    const dayCount = allEmails.filter((e) => new Date(e.created_at) >= startOfDay).length;

    return NextResponse.json({
      month: {
        sent: monthCount,
        quota: MONTHLY_QUOTA,
        percent: Math.round((monthCount / MONTHLY_QUOTA) * 100),
      },
      today: {
        sent: dayCount,
        quota: DAILY_QUOTA,
        percent: Math.round((dayCount / DAILY_QUOTA) * 100),
      },
    });
  } catch {
    return NextResponse.json({ error: "Erreur recuperation stats" }, { status: 500 });
  }
}
