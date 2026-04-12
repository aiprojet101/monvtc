import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Mentions légales — MonVTC" };

export default function MentionsLegales() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
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
              <li><span className="text-zinc-300">Exploitant :</span> David PELERIN</li>
              <li><span className="text-zinc-300">Statut :</span> Entrepreneur individuel (micro-entreprise)</li>
              <li><span className="text-zinc-300">SIREN :</span> 398 603 548</li>
              <li><span className="text-zinc-300">SIRET :</span> 398 603 548 00056</li>
              <li><span className="text-zinc-300">Numéro TVA :</span> FR88398603548</li>
              <li><span className="text-zinc-300">RCS :</span> Boulogne-sur-Mer (inscrit le 30/03/2023)</li>
              <li><span className="text-zinc-300">Adresse :</span> 11 Allée Honoré de Balzac, 62219 Longuenesse, France</li>
              <li><span className="text-zinc-300">Email :</span> contact@vtc-site.fr</li>
              <li><span className="text-zinc-300">Téléphone :</span> 07 43 28 93 93</li>
              <li><span className="text-zinc-300">Directeur de la publication :</span> David PELERIN</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-zinc-300">Vercel Inc.</span></li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>https://vercel.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Activité</h2>
            <p>
              MonVTC propose une solution technique clé en main pour créer un site internet de réservation VTC professionnel, destiné aux chauffeurs VTC indépendants. L&apos;offre comprend : création et mise en ligne du site, hébergement, maintenance, support technique.
            </p>
            <p className="mt-2">
              MonVTC est un <strong className="text-white">prestataire technique</strong>. MonVTC n&apos;exerce aucune activité de transport de personnes et n&apos;est pas responsable de l&apos;activité, de la conformité réglementaire ou des prestations effectuées par ses clients (chauffeurs VTC).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur le site vtc-site.fr (textes, images, logos, code source, design) sont la propriété exclusive de David PELERIN, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Données personnelles (RGPD)</h2>
            <p>
              Les informations collectées lors de l&apos;inscription ou via les formulaires (nom, email, téléphone, informations d&apos;activité) sont utilisées exclusivement pour la fourniture du service MonVTC, la facturation et la communication liée au service.
            </p>
            <p className="mt-2">
              Elles ne sont ni cédées ni vendues à des tiers. Les paiements sont traités par Stripe (stripe.com). Les emails sont envoyés via Resend (resend.com).
            </p>
            <p className="mt-2">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : contact@vtc-site.fr.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Cookies</h2>
            <p>
              Le site vtc-site.fr n&apos;utilise pas de cookies de suivi, d&apos;analyse statistique ni de cookies publicitaires. Seuls des cookies techniques strictement nécessaires au fonctionnement du site (authentification, paiement Stripe) peuvent être déposés. Leur utilisation ne nécessite pas de consentement préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Responsabilité</h2>
            <p>
              MonVTC s&apos;efforce d&apos;assurer l&apos;exactitude et la disponibilité des informations publiées sur le site. Toutefois, MonVTC ne saurait être tenu responsable des omissions, inexactitudes ou interruptions temporaires de service.
            </p>
            <p className="mt-2">
              MonVTC décline toute responsabilité concernant l&apos;activité exercée par ses clients (chauffeurs VTC), leur conformité réglementaire (carte professionnelle, assurances, statut juridique, fiscalité), la qualité de leurs prestations de transport, ou tout litige entre un chauffeur et ses propres passagers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut de résolution amiable, compétence exclusive est attribuée aux tribunaux français.
            </p>
          </section>

          <section>
            <p className="text-zinc-600">Dernière mise à jour : avril 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
