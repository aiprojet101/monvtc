import Link from "next/link";
import { Car, ArrowRight, BookOpen, CreditCard, FileText, GraduationCap, Scale, Shield, Users, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devenir chauffeur VTC en 2026 — Guide complet (formation, carte, statut)",
  description: "Comment devenir chauffeur VTC en France en 2026 ? Guide complet : formation, examen, carte professionnelle, statut juridique, assurance, véhicule. Tout ce qu'il faut savoir pour lancer votre activité VTC.",
  keywords: [
    "devenir chauffeur VTC", "formation VTC", "carte professionnelle VTC",
    "examen VTC", "comment devenir VTC", "permis VTC", "conditions VTC",
    "formation chauffeur VTC", "créer entreprise VTC", "statut VTC",
  ],
  alternates: { canonical: "https://vtc-site.fr/devenir-chauffeur-vtc" },
};

const ETAPES = [
  {
    icon: GraduationCap,
    title: "1. Obtenir la carte professionnelle VTC",
    content: [
      "Avoir un permis B depuis au moins 3 ans",
      "Passer l'examen VTC (7 épreuves : réglementation, gestion, sécurité, français, anglais, développement commercial, réglementation T3P)",
      "Suivre une formation VTC dans un centre agréé (250h environ, 1500-3000€)",
      "Obtenir votre carte professionnelle auprès de la préfecture",
      "La carte est valide 5 ans, renouvelable avec une formation continue de 14h",
    ],
  },
  {
    icon: Scale,
    title: "2. Choisir votre statut juridique",
    content: [
      "Auto-entrepreneur (micro-entreprise) : le plus simple pour démarrer, plafond de CA 77 700€/an",
      "SASU : plus de crédibilité, protection du patrimoine, dividendes possibles",
      "EURL : compromis entre simplicité et protection",
      "S'inscrire au registre des VTC sur le site du ministère des transports",
      "Obtenir un numéro SIRET auprès de l'URSSAF",
    ],
  },
  {
    icon: Car,
    title: "3. Choisir votre véhicule",
    content: [
      "Véhicule de moins de 7 ans avec 4 portes minimum",
      "Dimensions minimales : 4,50m de long, 1,70m de large",
      "Puissance minimale : 84 kW (environ 114 ch)",
      "Possibilité de louer via des plateformes spécialisées (2000-3000€/mois TTC)",
      "Penser à la motorisation hybride ou électrique (avantages fiscaux + image premium)",
    ],
  },
  {
    icon: Shield,
    title: "4. S'assurer",
    content: [
      "Assurance RC professionnelle obligatoire (transport de personnes)",
      "Assurance véhicule avec couverture professionnelle",
      "Compter 3000-5000€/an selon le véhicule et la couverture",
      "Comparer les offres : AXA, Allianz, MAIF proposent des contrats VTC",
    ],
  },
  {
    icon: FileText,
    title: "5. Les obligations administratives",
    content: [
      "Signalétique obligatoire sur le véhicule (vignette bleue VTC)",
      "Registre des courses à tenir",
      "Facturation obligatoire pour chaque course",
      "Déclaration de chiffre d'affaires mensuelle ou trimestrielle",
      "Cotisation URSSAF (environ 22% du CA en auto-entrepreneur)",
    ],
  },
  {
    icon: Users,
    title: "6. Trouver des clients",
    content: [
      "Créer votre site internet VTC avec réservation en ligne (MonVTC)",
      "Être référencé sur Google avec le SEO local",
      "Créer votre fiche Google Business Profile",
      "Utiliser les réseaux sociaux (Instagram, Facebook)",
      "S'inscrire sur les plateformes (Uber, Bolt) en complément au début",
      "Le bouche-à-oreille et les avis Google sont vos meilleurs alliés",
    ],
  },
];

export default function DevenirChauffeurVTC() {
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
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[#3B82F6] text-sm mb-4">
            <BookOpen className="w-4 h-4" /> Guide complet 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Devenir <span className="text-gradient">chauffeur VTC</span> en France
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10">
            Tout ce que vous devez savoir pour devenir chauffeur VTC en 2026 : formation, examen, carte professionnelle, statut juridique, véhicule, assurance et lancement de votre activité.
          </p>

          <div className="card p-6 mb-12 bg-[#3B82F6]/5 border-[#3B82F6]/20">
            <h3 className="font-bold mb-3">En résumé : les conditions pour devenir VTC</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                "Permis B depuis 3 ans minimum",
                "Casier judiciaire vierge (bulletin n°2)",
                "Examen VTC réussi (7 épreuves)",
                "Carte professionnelle VTC délivrée par la préfecture",
                "Véhicule conforme (4 portes, +4,50m, +84kW)",
                "Assurance RC professionnelle",
                "Inscription au registre des VTC",
                "Statut juridique (auto-entrepreneur, SASU...)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Etapes */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {ETAPES.map((etape) => (
            <div key={etape.title} className="card p-8">
              <div className="flex items-center gap-3 mb-4">
                <etape.icon className="w-6 h-6 text-[#3B82F6]" />
                <h2 className="text-xl font-bold">{etape.title}</h2>
              </div>
              <ul className="space-y-2">
                {etape.content.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-[#3B82F6] mt-1">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Quel budget pour devenir chauffeur VTC ?</h2>
          <div className="card p-6">
            <div className="space-y-3 text-sm">
              {[
                { poste: "Formation VTC (250h)", montant: "1 500 — 3 000€" },
                { poste: "Examen VTC", montant: "208€" },
                { poste: "Véhicule (achat occasion conforme)", montant: "15 000 — 30 000€" },
                { poste: "Véhicule (location mensuelle)", montant: "2 000 — 3 000€/mois" },
                { poste: "Assurance RC pro + véhicule", montant: "3 000 — 5 000€/an" },
                { poste: "Site internet VTC (MonVTC)", montant: "199€ + 29€/mois" },
                { poste: "Signalétique véhicule", montant: "50 — 100€" },
                { poste: "Comptabilité (auto-entrepreneur)", montant: "0 — 100€/mois" },
              ].map((l) => (
                <div key={l.poste} className="flex justify-between border-b border-[#1E1E22]/50 pb-2">
                  <span className="text-zinc-400">{l.poste}</span>
                  <span className="text-white font-medium">{l.montant}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-zinc-600 mt-4">Budget total pour démarrer (avec location véhicule) : environ 4 000 — 6 000€</p>
        </div>
      </section>

      {/* Revenus */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Combien gagne un chauffeur VTC ?</h2>
          <div className="prose prose-invert max-w-none text-zinc-400 text-sm space-y-4">
            <p>Le revenu d&apos;un chauffeur VTC dépend de nombreux facteurs : ville, nombre d&apos;heures, clientèle, tarifs.</p>
            <p>En moyenne en France en 2026 :</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Chiffre d&apos;affaires :</strong> 3 000 à 6 000€/mois</li>
              <li><strong className="text-white">Charges :</strong> 40-50% du CA (véhicule, assurance, URSSAF, essence)</li>
              <li><strong className="text-white">Revenu net :</strong> 1 500 à 3 000€/mois</li>
            </ul>
            <p>Les chauffeurs qui ont <strong className="text-white">leur propre site internet</strong> et une clientèle fidèle gagnent significativement plus que ceux qui dépendent uniquement des plateformes (Uber prend 25% de commission).</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes chauffeur VTC ?</h2>
          <p className="text-zinc-400 mb-8">Créez votre site professionnel en moins de 24h et commencez à recevoir des réservations en direct — sans commission.</p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2">
            Créer mon site VTC <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/creer-site-vtc" className="hover:text-zinc-400">Créer un site VTC</Link> — <Link href="/solution-vtc" className="hover:text-zinc-400">Solution VTC</Link>
      </footer>
    </div>
  );
}
