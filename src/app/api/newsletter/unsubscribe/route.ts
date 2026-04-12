import { NextRequest, NextResponse } from "next/server";
import { unsubscribe } from "@/lib/newsletter";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email") || "";
  if (!email) return NextResponse.json({ error: "Email manquant" }, { status: 400 });
  try {
    await unsubscribe(email);
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:system-ui;background:#09090B;color:white;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;"><div style="text-align:center;padding:40px;"><h1 style="color:#3B82F6">Desabonnement confirme</h1><p>Vous ne recevrez plus d'emails de MonVTC.</p><a href="https://vtc-site.fr" style="color:#3B82F6">Retour au site</a></div></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
