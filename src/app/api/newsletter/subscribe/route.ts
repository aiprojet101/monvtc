import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/newsletter";
import { NEWSLETTER_SEQUENCE } from "@/lib/newsletter-sequence";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const added = await addSubscriber(email, source);

    if (!added) {
      return NextResponse.json({ success: true, message: "Déjà inscrit" });
    }

    // Envoie l'email de bienvenue immédiatement (jour 0)
    const welcomeEmail = NEWSLETTER_SEQUENCE[0];
    if (RESEND_API_KEY && welcomeEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MonVTC <newsletter@vtc-site.fr>",
          to: email,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html(email),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
