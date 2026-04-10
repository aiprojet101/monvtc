const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = "MonVTC <noreply@vtc-site.fr>";
const ADMIN_EMAIL = "101etoiletriangle@gmail.com";

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
}

export async function sendWelcomeEmail(data: {
  email: string;
  brand: string;
  city: string;
  zones: string;
  phone: string;
  pricePerKm: string;
  siteUrl: string;
}) {
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #09090B; color: #F5F5F5; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #3B82F6, #2563EB); line-height: 48px; text-align: center; font-size: 24px; font-weight: 900; color: white;">V</div>
        <h1 style="margin: 16px 0 0; font-size: 24px; color: white;">Votre site VTC est en ligne !</h1>
      </div>

      <p style="color: #A1A1AA; line-height: 1.6;">Bonjour,<br>Votre site <strong style="color: white;">${data.brand}</strong> est prêt et accessible dès maintenant.</p>

      <div style="background: #111113; border: 1px solid #1E1E22; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px; color: #3B82F6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Vos liens</h3>
        <p style="margin: 8px 0;"><strong style="color: #A1A1AA;">Votre site :</strong> <a href="https://${data.siteUrl}" style="color: #3B82F6; text-decoration: none;">https://${data.siteUrl}</a></p>
        <p style="margin: 8px 0;"><strong style="color: #A1A1AA;">Page réservation :</strong> <a href="https://${data.siteUrl}/reservation" style="color: #3B82F6; text-decoration: none;">https://${data.siteUrl}/reservation</a></p>
        <p style="margin: 8px 0;"><strong style="color: #A1A1AA;">Dashboard admin :</strong> <a href="https://${data.siteUrl}/admin" style="color: #3B82F6; text-decoration: none;">https://${data.siteUrl}/admin</a></p>
      </div>

      <div style="background: #111113; border: 1px solid #1E1E22; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px; color: #3B82F6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Récapitulatif</h3>
        <p style="margin: 8px 0; color: #A1A1AA;">Marque : <strong style="color: white;">${data.brand}</strong></p>
        <p style="margin: 8px 0; color: #A1A1AA;">Ville : <strong style="color: white;">${data.city}</strong></p>
        <p style="margin: 8px 0; color: #A1A1AA;">Zones : <strong style="color: white;">${data.zones}</strong></p>
        <p style="margin: 8px 0; color: #A1A1AA;">Tarif : <strong style="color: white;">${data.pricePerKm}€/km</strong></p>
      </div>

      <div style="background: #111113; border: 1px solid #1E1E22; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="margin: 0 0 12px; color: #3B82F6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Prochaines étapes</h3>
        <p style="margin: 8px 0; color: #A1A1AA;">1. Partagez le lien de votre site avec vos clients</p>
        <p style="margin: 8px 0; color: #A1A1AA;">2. Testez une réservation pour vérifier que tout fonctionne</p>
        <p style="margin: 8px 0; color: #A1A1AA;">3. Pour un domaine personnalisé (ex: votrenom-vtc.fr), contactez-nous</p>
      </div>

      <p style="color: #71717A; font-size: 13px; margin-top: 32px; text-align: center;">
        Une question ? Contactez-nous sur <a href="https://wa.me/33743289393" style="color: #3B82F6;">WhatsApp</a> ou par email à <a href="mailto:contact@vtc-site.fr" style="color: #3B82F6;">contact@vtc-site.fr</a>
      </p>
    </div>
  `;

  await sendEmail(data.email, `${data.brand} — Votre site VTC est en ligne !`, html);
}

export async function sendAdminNotification(data: {
  brand: string;
  city: string;
  email: string;
  phone: string;
  siteUrl: string;
  slug: string;
}) {
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; padding: 20px;">
      <h2>Nouveau client MonVTC</h2>
      <ul>
        <li><strong>Marque :</strong> ${data.brand}</li>
        <li><strong>Ville :</strong> ${data.city}</li>
        <li><strong>Email :</strong> ${data.email}</li>
        <li><strong>Téléphone :</strong> ${data.phone}</li>
        <li><strong>Site :</strong> <a href="https://${data.siteUrl}">${data.siteUrl}</a></li>
        <li><strong>Vercel :</strong> <a href="https://vercel.com/aiprojet101s-projects/${data.slug}">Dashboard</a></li>
      </ul>
    </div>
  `;

  await sendEmail(ADMIN_EMAIL, `Nouveau client : ${data.brand} (${data.city})`, html);
}
