import Link from "next/link";
import { Car, ArrowRight, Check, Globe, MapPin, MessageCircle, Search, Smartphone, CreditCard, BarChart3, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un site VTC professionnel — Site internet chauffeur VTC clé en main",
  description: "Créez votre site internet VTC avec réservation en ligne en moins de 24h. Solution clé en main pour chauffeurs VTC indépendants : réservation, WhatsApp, Google Maps, SEO local. À partir de 29€/mois.",
  keywords: [
    "créer site VTC", "site internet chauffeur VTC", "création site VTC",
    "site VTC avec réservation", "site internet VTC pas cher", "site VTC clé en main",
    "module réservation VTC", "site VTC SEO", "site VTC responsive",
  ],
  alternates: { canonical: "https://vtc-site.fr/creer-site-vtc" },
};

const AVANTAGES = [
  { icon: Globe, title: "Site premium personnalisé", desc: "Votre marque, vos couleurs, votre identité. Un vrai site professionnel, pas un template générique." },
  { icon: Smartphone, title: "Réservation en ligne intégrée", desc: "Vos clients réservent en 30 secondes depuis leur téléphone. Formulaire en 3 étapes, simple et efficace." },
  { icon: MessageCircle, title: "WhatsApp automatique", desc: "Chaque réservation arrive directement sur votre WhatsApp avec le récap complet. Pas d'app à installer." },
  { icon: MapPin, title: "Google Maps intégré", desc: "Autocomplete d'adresses et calcul automatique de la distance et du prix. Fini les approximations." },
  { icon: Search, title: "SEO local optimisé", desc: "Votre site apparaît sur Google quand un client cherche 'VTC + votre ville'. Schema.org, sitemap, meta tags." },
  { icon: Smartphone, title: "PWA installable", desc: "Vos clients installent votre site comme une app sur leur téléphone. Icône sur l'écran d'accueil." },
  { icon: CreditCard, title: "Forfaits et tarifs affichés", desc: "Vos forfaits personnalisés + tarif au km. Le client voit le prix avant de réserver. Transparence totale." },
  { icon: BarChart3, title: "Dashboard admin", desc: "Gérez toutes vos réservations depuis un tableau de bord simple : stats, confirmation, historique." },
  { icon: Shield, title: "Mentions légales conformes", desc: "CGV et mentions légales générées automatiquement, conformes à la réglementation VTC française." },
];

const COMPARAISON = [
  { critere: "Prix", nous: "199€ + 29€/mois", autres: "500€ à 2000€ + 50-100€/mois" },
  { critere: "Délai de livraison", nous: "24 heures", autres: "2 à 6 semaines" },
  { critere: "Réservation en ligne", nous: "Incluse", autres: "En supplément (200-500€)" },
  { critere: "WhatsApp intégré", nous: "Inclus", autres: "Rarement proposé" },
  { critere: "Google Maps", nous: "Inclus", autres: "En supplément" },
  { critere: "SEO local", nous: "Inclus et optimisé", autres: "Basique ou en supplément" },
  { critere: "PWA (app mobile)", nous: "Incluse", autres: "Non proposé" },
  { critere: "Support", nous: "WhatsApp 7j/7", autres: "Email, 48-72h" },
  { critere: "Engagement", nous: "Sans engagement", autres: "12 mois minimum" },
];

export default function CreerSiteVTC() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </Link>
          <Link href="/inscription" className="btn-primary !py-2 !px-5 !text-xs">Créer mon site</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Créer un <span className="text-gradient">site VTC</span> professionnel
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Votre site internet de chauffeur VTC avec réservation en ligne, prêt en moins de 24 heures. La solution clé en main la plus complète et la moins chère du marché.
          </p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2 text-base !py-4 !px-8">
            Créer mon site VTC maintenant <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Pourquoi un site VTC */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Pourquoi créer un site internet pour votre activité VTC ?</h2>
          <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-4 text-sm">
            <p>En 2026, <strong className="text-white">87% des clients recherchent un VTC sur Google</strong> avant de réserver. Si vous n&apos;avez pas de site internet, vous êtes invisible. Vos concurrents récupèrent vos clients.</p>
            <p>Un site VTC professionnel vous permet de :</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Être trouvé sur Google quand un client cherche &quot;VTC + votre ville&quot;</li>
              <li>Recevoir des réservations 24h/24 sans décrocher le téléphone</li>
              <li>Afficher vos tarifs et forfaits en toute transparence</li>
              <li>Inspirer confiance avec un site professionnel (vs. une simple page Facebook)</li>
              <li>Fidéliser vos clients avec un outil de réservation simple</li>
            </ul>
            <p>Avec <strong className="text-white">MonVTC</strong>, votre site est en ligne en moins de 24 heures, optimisé pour Google, avec un système de réservation intégré. Pas besoin de compétences techniques.</p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tout est inclus dans votre site VTC</h2>
          <p className="text-center text-zinc-500 mb-16">Pas d&apos;options cachées. Chaque fonctionnalité est incluse dans l&apos;offre.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AVANTAGES.map((a) => (
              <div key={a.title} className="card p-6">
                <a.icon className="w-6 h-6 text-[#3B82F6] mb-3" />
                <h3 className="font-semibold mb-1.5">{a.title}</h3>
                <p className="text-sm text-zinc-500">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">MonVTC vs. les autres solutions</h2>
          <p className="text-center text-zinc-500 mb-12">Comparez et jugez par vous-même.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E1E22]">
                  <th className="text-left py-3 px-4 text-zinc-500 font-medium">Critère</th>
                  <th className="text-left py-3 px-4 text-[#3B82F6] font-bold">MonVTC</th>
                  <th className="text-left py-3 px-4 text-zinc-500 font-medium">Agences / Concurrents</th>
                </tr>
              </thead>
              <tbody>
                {COMPARAISON.map((c) => (
                  <tr key={c.critere} className="border-b border-[#1E1E22]/50">
                    <td className="py-3 px-4 text-zinc-400">{c.critere}</td>
                    <td className="py-3 px-4 text-white font-medium">{c.nous}</td>
                    <td className="py-3 px-4 text-zinc-600">{c.autres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à créer votre site VTC ?</h2>
          <p className="text-zinc-400 mb-8">199€ de mise en place + 29€/mois. Sans engagement. En ligne en moins de 24h.</p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2">
            Créer mon site maintenant <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/devenir-chauffeur-vtc" className="hover:text-zinc-400">Devenir chauffeur VTC</Link> — <Link href="/solution-vtc" className="hover:text-zinc-400">Solution VTC</Link>
      </footer>
    </div>
  );
}
