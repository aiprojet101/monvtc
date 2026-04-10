import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Politique de confidentialité — MonVTC" };

export default function Confidentialite() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm"><ArrowLeft className="w-4 h-4" /> Retour</Link>
          <span className="font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10">Politique de confidentialité</h1>
        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Responsable du traitement</h2>
            <p>Le responsable du traitement des données personnelles est MonVTC, joignable a l&apos;adresse <strong className="text-white">contact@vtc-site.fr</strong> ou au <strong className="text-white">07 43 28 93 93</strong>.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Données collectées</h2>
            <p>Lors de votre inscription, nous collectons :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><strong className="text-zinc-300">Données d&apos;identité :</strong> nom de marque, nom, email, téléphone</li>
              <li><strong className="text-zinc-300">Données professionnelles :</strong> ville, zones desservies, tarifs</li>
              <li><strong className="text-zinc-300">Données de paiement :</strong> traitées exclusivement par Stripe (nous ne stockons aucun numéro de carte)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Créer et configurer votre site VTC</li>
              <li>Gérer votre abonnement et la facturation</li>
              <li>Vous contacter pour le support technique</li>
              <li>Vous envoyer des communications liées au service (confirmations, mises a jour)</li>
            </ul>
            <p className="mt-2">Vos données ne sont <strong className="text-white">jamais vendues, louées ou partagées</strong> a des tiers a des fins commerciales.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base légale</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong className="text-zinc-300">Exécution du contrat :</strong> vos données sont nécessaires a la fourniture du service</li>
              <li><strong className="text-zinc-300">Obligation légale :</strong> conservation des factures (10 ans)</li>
              <li><strong className="text-zinc-300">Intérêt légitime :</strong> amélioration du service, support client</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Destinataires des données</h2>
            <p>Vos données sont accessibles uniquement a :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><strong className="text-zinc-300">MonVTC :</strong> pour la gestion du service</li>
              <li><strong className="text-zinc-300">Stripe :</strong> pour le traitement des paiements (certifié PCI DSS)</li>
              <li><strong className="text-zinc-300">Vercel :</strong> pour l&apos;hébergement des sites</li>
              <li><strong className="text-zinc-300">Resend :</strong> pour l&apos;envoi d&apos;emails transactionnels</li>
            </ul>
            <p className="mt-2">Ces prestataires sont situés aux États-Unis et offrent des garanties appropriées (clauses contractuelles types, certifications).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Durée de conservation</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong className="text-zinc-300">Données du compte :</strong> pendant la durée de l&apos;abonnement + 30 jours après résiliation</li>
              <li><strong className="text-zinc-300">Données de facturation :</strong> 10 ans (obligation légale)</li>
              <li><strong className="text-zinc-300">Données de contact :</strong> 3 ans après le dernier contact</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><strong className="text-zinc-300">Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong className="text-zinc-300">Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong className="text-zinc-300">Droit de suppression :</strong> demander l&apos;effacement de vos données</li>
              <li><strong className="text-zinc-300">Droit a la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-zinc-300">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong className="text-zinc-300">Droit de limitation :</strong> demander la limitation du traitement</li>
            </ul>
            <p className="mt-2">Pour exercer vos droits, contactez-nous a <strong className="text-white">contact@vtc-site.fr</strong>. Nous répondrons sous 30 jours maximum.</p>
            <p className="mt-2">Vous pouvez également introduire une réclamation auprès de la <strong className="text-white">CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) : www.cnil.fr.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cookies</h2>
            <p>Le site vtc-site.fr n&apos;utilise <strong className="text-white">aucun cookie de suivi, d&apos;analyse ou de publicité</strong>. Aucun outil de type Google Analytics, Facebook Pixel ou équivalent n&apos;est installé.</p>
            <p className="mt-2">Seuls des cookies strictement nécessaires au service de paiement Stripe peuvent être déposés. Ces cookies techniques sont exemptés du recueil de consentement (recommandation CNIL).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Sécurité</h2>
            <p>Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Chiffrement SSL/TLS sur toutes les communications</li>
              <li>Paiements sécurisés via Stripe (certifié PCI DSS niveau 1)</li>
              <li>Accès restreint aux données (principe du moindre privilège)</li>
              <li>Hébergement sur infrastructure Vercel (certifié SOC 2)</li>
            </ul>
          </section>
          <section>
            <p className="text-zinc-600">Dernière mise a jour : avril 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
