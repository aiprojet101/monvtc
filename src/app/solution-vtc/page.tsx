import Link from "next/link";
import { Car, ArrowRight, Check, Zap, X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solution VTC complète — Logiciel de réservation et gestion VTC",
  description: "Solution VTC tout-en-un : site internet, réservation en ligne, gestion des courses, WhatsApp, Google Maps, SEO. Alternative aux logiciels VTC complexes. 29€/mois tout inclus.",
  keywords: [
    "solution VTC", "logiciel VTC", "application réservation VTC",
    "logiciel gestion VTC", "app VTC", "plateforme VTC",
    "gestion VTC", "facturation VTC", "logiciel taxi VTC",
    "module réservation en ligne VTC", "plateforme réservation VTC",
  ],
  alternates: { canonical: "https://vtc-site.fr/solution-vtc" },
};

const PROBLEMES = [
  { probleme: "Vous dépendez des plateformes (Uber, Bolt) qui prennent 25% de commission", solution: "Recevez vos réservations en direct, 0% de commission" },
  { probleme: "Vous n'avez pas de site internet ou il est obsolète", solution: "Site premium en ligne en moins de 24h, toujours à jour" },
  { probleme: "Vos clients ne peuvent pas réserver en dehors de vos heures de travail", solution: "Réservation en ligne 24h/24, 7j/7" },
  { probleme: "Vous perdez du temps à répondre au téléphone pour des devis", solution: "Le prix s'affiche automatiquement grâce à Google Maps" },
  { probleme: "Vous n'apparaissez pas sur Google quand on cherche un VTC dans votre ville", solution: "SEO local optimisé, vous remontez dans les résultats" },
  { probleme: "Les logiciels VTC coûtent 100-200€/mois et sont compliqués", solution: "29€/mois tout inclus, simple comme WhatsApp" },
];

const ALTERNATIVES = [
  { nom: "Agence web classique", prix: "1000-3000€ + 50-100€/mois", delai: "3-6 semaines", reservation: "Supplément", seo: "Basique", note: "Cher et lent" },
  { nom: "Wix / WordPress DIY", prix: "20-40€/mois", delai: "Vous le faites vous-même", reservation: "Plugin payant", seo: "Moyen", note: "Résultat amateur" },
  { nom: "Logiciel VTC (BCVTC, Logipax...)", prix: "80-200€/mois", delai: "1-2 semaines", reservation: "Incluse", seo: "Non inclus", note: "Complexe, sans site vitrine" },
  { nom: "MonVTC", prix: "199€ + 29€/mois", delai: "24 heures", reservation: "Incluse", seo: "Optimisé", note: "Tout inclus, simple" },
];

export default function SolutionVTC() {
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
          <Link href="/inscription" className="btn-primary !py-2 !px-5 !text-xs">Commencer</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            La <span className="text-gradient">solution VTC</span> tout-en-un
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Site internet + réservation en ligne + WhatsApp + Google Maps + SEO. Tout ce dont un chauffeur VTC a besoin pour recevoir des clients en direct. Sans commission. Sans complexité.
          </p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2 text-base !py-4 !px-8">
            Essayer MonVTC <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Problèmes / Solutions */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Vous vous reconnaissez ?</h2>
          <div className="space-y-4">
            {PROBLEMES.map((p) => (
              <div key={p.probleme} className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-400">{p.probleme}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-white">{p.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison alternatives */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">MonVTC vs. les alternatives</h2>
          <p className="text-center text-zinc-500 mb-12">Pourquoi MonVTC est le meilleur choix pour un chauffeur VTC indépendant.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E1E22]">
                  <th className="text-left py-3 px-3 text-zinc-500">Solution</th>
                  <th className="text-left py-3 px-3 text-zinc-500">Prix</th>
                  <th className="text-left py-3 px-3 text-zinc-500">Délai</th>
                  <th className="text-left py-3 px-3 text-zinc-500">Réservation</th>
                  <th className="text-left py-3 px-3 text-zinc-500">SEO</th>
                </tr>
              </thead>
              <tbody>
                {ALTERNATIVES.map((a) => (
                  <tr key={a.nom} className={`border-b border-[#1E1E22]/50 ${a.nom === "MonVTC" ? "bg-[#3B82F6]/5" : ""}`}>
                    <td className={`py-3 px-3 font-medium ${a.nom === "MonVTC" ? "text-[#3B82F6]" : "text-zinc-300"}`}>{a.nom}</td>
                    <td className="py-3 px-3 text-zinc-400">{a.prix}</td>
                    <td className="py-3 px-3 text-zinc-400">{a.delai}</td>
                    <td className="py-3 px-3 text-zinc-400">{a.reservation}</td>
                    <td className="py-3 px-3 text-zinc-400">{a.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Le calcul est simple</h2>
          <div className="card p-8 border-[#3B82F6]/20 bg-[#3B82F6]/5">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">Un chauffeur VTC qui fait <strong className="text-white">2 courses par semaine</strong> grâce à son site (au lieu de passer par Uber) :</p>
              <p className="text-zinc-400">Course moyenne : <strong className="text-white">35€</strong></p>
              <p className="text-zinc-400">Commission Uber évitée (25%) : <strong className="text-white">8,75€ par course</strong></p>
              <p className="text-zinc-400">Économie mensuelle : <strong className="text-white">2 x 4 x 8,75€ = 70€/mois</strong></p>
              <hr className="border-[#1E1E22]" />
              <p className="text-zinc-400">Coût MonVTC : <strong className="text-white">29€/mois</strong></p>
              <p className="text-lg"><strong className="text-[#3B82F6]">Bénéfice net : +41€/mois dès 2 courses par semaine.</strong></p>
              <p className="text-zinc-600 text-xs">Et la plupart des chauffeurs reçoivent bien plus que 2 courses par semaine via leur site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Arrêtez de donner 25% à Uber</h2>
          <p className="text-zinc-400 mb-8">Votre propre site VTC, vos propres clients, vos propres revenus. En moins de 24h.</p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2">
            Lancer mon site VTC <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/creer-site-vtc" className="hover:text-zinc-400">Créer un site VTC</Link> — <Link href="/devenir-chauffeur-vtc" className="hover:text-zinc-400">Devenir chauffeur VTC</Link>
      </footer>
    </div>
  );
}
