import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonVTC — Votre site VTC professionnel en moins de 24h",
  description:
    "Créez votre site de réservation VTC en moins de 24h. Réservation en ligne, WhatsApp, Google Maps, SEO local. Solution clé en main pour chauffeurs VTC indépendants. 199€ + 29€/mois.",
  keywords: [
    "site VTC", "site chauffeur VTC", "créer site VTC",
    "réservation VTC en ligne", "solution VTC clé en main",
    "site web chauffeur privé", "site VTC pas cher",
    "logiciel VTC", "application réservation VTC", "devenir chauffeur VTC",
    "formation VTC", "carte professionnelle VTC", "gestion VTC",
    "plateforme VTC", "site internet VTC", "module réservation VTC",
  ],
  openGraph: {
    title: "MonVTC — Votre site VTC professionnel en moins de 24h",
    description: "Solution clé en main pour chauffeurs VTC. Réservation, WhatsApp, SEO. 199€ + 29€/mois.",
    locale: "fr_FR",
    type: "website",
    siteName: "MonVTC",
    url: "https://vtc-site.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "MonVTC — Votre site VTC professionnel en moins de 24h",
    description: "Solution clé en main pour chauffeurs VTC. 199€ + 29€/mois.",
  },
  alternates: {
    canonical: "https://vtc-site.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "MonVTC — Site VTC professionnel",
    description: "Solution clé en main pour créer un site de réservation VTC en moins de 24h.",
    url: "https://vtc-site.fr",
    brand: { "@type": "Brand", name: "MonVTC" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "29",
      highPrice: "199",
      offerCount: "1",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
    },
  };

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
