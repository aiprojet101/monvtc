import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Conditions Générales de Vente — MonVTC" };

export default function CGV() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm"><ArrowLeft className="w-4 h-4" /> Retour</Link>
          <span className="font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10">Conditions Générales de Vente</h1>
        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Objet</h2>
            <p>Les présentes Conditions Générales de Vente régissent la fourniture par MonVTC d&apos;un service de <strong className="text-white">création et hébergement de sites internet</strong> destinés aux chauffeurs VTC professionnels. MonVTC est un prestataire technique et n&apos;exerce aucune activité de transport de personnes.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description du service</h2>
            <p>MonVTC fournit a ses clients :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Un site internet professionnel personnalisé avec système de réservation en ligne</li>
              <li>L&apos;intégration WhatsApp, Google Maps et SEO local</li>
              <li>Un tableau de bord de gestion des réservations</li>
              <li>L&apos;hébergement, la maintenance et les mises a jour du site</li>
              <li>Un support technique par WhatsApp et email</li>
              <li>Un sous-domaine (nom.vtc-site.fr) inclus</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Tarification</h2>
            <p><strong className="text-white">Offre Standard :</strong></p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Frais de mise en place : <strong className="text-white">199€ TTC</strong> (paiement unique)</li>
              <li>Abonnement mensuel : <strong className="text-white">29€ TTC/mois</strong></li>
            </ul>
            <p className="mt-2"><strong className="text-white">Offre Premium (noms de villes) :</strong></p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Frais de mise en place : <strong className="text-white">299€ TTC</strong> (paiement unique)</li>
              <li>Abonnement mensuel : <strong className="text-white">49€ TTC/mois</strong></li>
            </ul>
            <p className="mt-2">Les prix sont indiqués en euros TTC. MonVTC se réserve le droit de modifier ses tarifs a tout moment. Les nouveaux tarifs ne s&apos;appliquent qu&apos;aux nouvelles souscriptions.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Paiement</h2>
            <p>Le paiement s&apos;effectue par carte bancaire via la plateforme sécurisée <strong className="text-white">Stripe</strong>. Les frais de mise en place sont débités immédiatement. L&apos;abonnement mensuel est prélevé automatiquement chaque mois a la date anniversaire de la souscription.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Durée et résiliation</h2>
            <p>L&apos;abonnement est <strong className="text-white">sans engagement de durée</strong>. Le client peut résilier a tout moment depuis son espace Stripe ou en contactant MonVTC par email ou WhatsApp.</p>
            <p className="mt-2">En cas de résiliation :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Le site reste accessible jusqu&apos;a la fin de la période payée</li>
              <li>Les frais de mise en place ne sont <strong className="text-white">pas remboursables</strong></li>
              <li>Les données du client (réservations, informations) seront supprimées sous 30 jours</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Droit de rétractation</h2>
            <p>Conformément a l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne s&apos;applique pas aux contrats de fourniture de contenu numérique fourni sur un support immatériel dont l&apos;exécution a commencé avec l&apos;accord du consommateur.</p>
            <p className="mt-2">En souscrivant au service et en procédant au paiement, le client accepte que la création de son site commence immédiatement et renonce expressément a son droit de rétractation.</p>
            <p className="mt-2"><strong className="text-white">Garantie commerciale volontaire de 15 jours</strong> : indépendamment de l&apos;absence légale de droit de rétractation, MonVTC accorde une garantie commerciale de 15 jours a compter de l&apos;achat. Pendant cette période, le client peut demander le remboursement intégral de la formation ou des frais de mise en place du site (199€) via la page <a href="/contact" className="underline">/contact</a>. Remboursement automatique sous 48h ouvrées.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Obligations du client</h2>
            <p>Le client s&apos;engage a :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Être titulaire d&apos;une <strong className="text-white">carte professionnelle VTC valide</strong> délivrée par la préfecture</li>
              <li>Être <strong className="text-white">immatriculé</strong> (auto-entrepreneur, SASU, EURL ou autre) et inscrit au registre des VTC</li>
              <li>Disposer d&apos;une <strong className="text-white">assurance RC Professionnelle</strong> valide pour le transport de personnes</li>
              <li>Exercer son activité en <strong className="text-white">conformité avec la réglementation</strong> en vigueur</li>
              <li>Fournir des informations <strong className="text-white">exactes et a jour</strong> lors de l&apos;inscription</li>
              <li>Ne pas utiliser le site a des fins illicites ou contraires aux bonnes moeurs</li>
            </ul>
            <p className="mt-2">MonVTC se réserve le droit de <strong className="text-white">suspendre ou résilier</strong> le service sans préavis ni remboursement si le client exerce sans carte professionnelle VTC valide, sans assurance, ou en violation de la réglementation.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Responsabilité de MonVTC</h2>
            <p>MonVTC est un <strong className="text-white">prestataire technique</strong>. A ce titre :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>MonVTC <strong className="text-white">n&apos;est pas responsable</strong> de l&apos;activité de transport exercée par le client</li>
              <li>MonVTC <strong className="text-white">n&apos;est pas responsable</strong> des réservations, paiements ou litiges entre le client et ses passagers</li>
              <li>MonVTC <strong className="text-white">ne garantit pas</strong> un volume de réservations ou un chiffre d&apos;affaires</li>
              <li>MonVTC <strong className="text-white">n&apos;est pas responsable</strong> des conséquences d&apos;une activité exercée sans les autorisations requises</li>
              <li>MonVTC s&apos;engage a fournir un service d&apos;hébergement disponible 99,9% du temps (hors maintenance planifiée)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Propriété intellectuelle</h2>
            <p>Le code source, le design et l&apos;architecture technique des sites créés par MonVTC restent la <strong className="text-white">propriété de MonVTC</strong>. Le client dispose d&apos;un droit d&apos;usage pendant la durée de son abonnement.</p>
            <p className="mt-2">Le contenu personnalisé (nom de marque, textes spécifiques, images fournies par le client) reste la propriété du client.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Protection des données</h2>
            <p>Les données personnelles collectées lors de l&apos;inscription sont traitées conformément a notre <Link href="/confidentialite" className="text-[#3B82F6] hover:underline">politique de confidentialité</Link> et au RGPD.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Réclamations et litiges</h2>
            <p>Toute réclamation doit être adressée a <strong className="text-white">contact@vtc-site.fr</strong>. MonVTC s&apos;engage a répondre sous 48 heures.</p>
            <p className="mt-2">En cas de litige non résolu a l&apos;amiable, le client peut recourir a un médiateur de la consommation. Les présentes CGV sont soumises au droit français.</p>
          </section>
          <section>
            <p className="text-zinc-600">Dernière mise a jour : avril 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
