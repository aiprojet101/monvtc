import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "MonVTC — Votre site VTC professionnel en 24h",
  description:
    "Créez votre site de réservation VTC en 24h. Réservation en ligne, WhatsApp, Google Maps, SEO local. Solution clé en main pour chauffeurs VTC indépendants.",
  keywords: [
    "site VTC",
    "site chauffeur VTC",
    "réservation VTC en ligne",
    "créer site VTC",
    "solution VTC",
    "site web chauffeur privé",
  ],
  openGraph: {
    title: "MonVTC — Votre site VTC professionnel en 24h",
    description: "Solution clé en main pour chauffeurs VTC indépendants. Réservation, WhatsApp, SEO.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
