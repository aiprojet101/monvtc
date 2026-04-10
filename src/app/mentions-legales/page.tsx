import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Mentions légales — MonVTC" };

export default function MentionsLegales() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm"><ArrowLeft className="w-4 h-4" /> Retour</Link>
          <span className="font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10">Mentions légales</h1>
        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Éditeur du site</h2>
            <p>Le site vtc-site.fr (et monvtc.com) est édité par :</p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-zinc-300">Nom commercial :</span> MonVTC</li>
              <li><span className="text-zinc-300">Activité :</span> Prestation de services numériques — création de sites internet</li>
              <li><span className="text-zinc-300">SIRET :</span> En cours d&apos;immatriculation</li>
              <li><span className="text-zinc-300">Adresse :</span> France</li>
              <li><span className="text-zinc-300">Téléphone :</span> 07 43 28 93 93</li>
              <li><span className="text-zinc-300">Email :</span> contact@vtc-site.fr</li>
              <li><span className="text-zinc-300">Directeur de la publication :</span> Le responsable légal de MonVTC</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Hébergement</h2>
            <ul className="space-y-1">
              <li><span className="text-zinc-300">Vercel Inc.</span></li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>https://vercel.com</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Propriété intellectuelle</h2>
            <p>L&apos;ensemble des contenus du site vtc-site.fr (textes, images, logos, design, code source) sont la propriété exclusive de MonVTC. Toute reproduction totale ou partielle est interdite sans autorisation écrite préalable.</p>
            <p className="mt-2">Les sites créés pour les clients restent la propriété intellectuelle de MonVTC en ce qui concerne le code source et le design. Le contenu personnalisé (marque, textes, images) appartient au client.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Responsabilité</h2>
            <p>MonVTC est un <strong className="text-white">prestataire technique</strong> fournissant des services de création de sites internet. MonVTC n&apos;est en aucun cas un transporteur de personnes et n&apos;exerce aucune activité de transport.</p>
            <p className="mt-2">MonVTC ne peut être tenu responsable :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>De l&apos;activité de transport exercée par ses clients</li>
              <li>Du respect par ses clients de la réglementation VTC (carte professionnelle, assurance, immatriculation)</li>
              <li>Des contenus publiés par ses clients sur leurs sites</li>
              <li>Des transactions entre les clients et leurs propres clients (passagers)</li>
            </ul>
            <p className="mt-2">Chaque client est seul responsable de la conformité de son activité avec la réglementation en vigueur.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cookies</h2>
            <p>Le site vtc-site.fr n&apos;utilise <strong className="text-white">aucun cookie de suivi, d&apos;analyse ou de publicité</strong>. Seuls des cookies strictement nécessaires au fonctionnement du service de paiement (Stripe) peuvent être déposés. Ces cookies techniques sont exemptés du recueil de consentement conformément aux directives de la CNIL.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Droit applicable</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français sont seuls compétents.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
