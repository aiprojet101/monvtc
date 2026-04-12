// Séquence de 8 emails envoyés automatiquement après l'inscription
// Chaque email est déclenché X jours après l'inscription

export interface NewsletterEmail {
  day: number;
  subject: string;
  html: (email: string) => string;
}

function baseTemplate(content: string, email: string) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;background:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background:white;">
    <div style="padding:32px 24px;background:#09090B;text-align:center;">
      <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#3B82F6,#2563EB);line-height:40px;font-size:20px;font-weight:900;color:white;margin-bottom:12px;">V</div>
      <div style="color:white;font-weight:800;font-size:18px;">Mon<span style="color:#3B82F6">VTC</span></div>
    </div>
    <div style="padding:32px 24px;color:#333;line-height:1.6;">
      ${content}
    </div>
    <div style="padding:24px;background:#fafafa;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;">
      <p style="margin:0 0 8px;">Vous recevez cet email car vous vous êtes inscrit sur vtc-site.fr</p>
      <p style="margin:0;"><a href="https://vtc-site.fr/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color:#999;">Se désabonner</a></p>
    </div>
  </div>
</body>
</html>`;
}

export const NEWSLETTER_SEQUENCE: NewsletterEmail[] = [
  {
    day: 0,
    subject: "Bienvenue — Votre guide VTC commence ici",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:24px;margin:0 0 16px;">Bienvenue !</h1>
      <p>Merci de vous être inscrit. Pendant les 4 prochaines semaines, vous allez recevoir tout ce qu'il faut savoir pour <strong>devenir chauffeur VTC</strong> ou <strong>développer votre activité</strong>.</p>
      <p style="margin:24px 0;"><strong>Au programme :</strong></p>
      <ul style="margin:0;padding-left:20px;color:#555;">
        <li>Les 6 étapes pour devenir VTC</li>
        <li>Comment choisir sa formation</li>
        <li>Le bon statut juridique</li>
        <li>Choisir son véhicule</li>
        <li>Trouver ses premiers clients</li>
        <li>Le secret des VTC qui gagnent le plus</li>
      </ul>
      <p style="margin-top:24px;">Bonne lecture.</p>
      <p>— L'équipe MonVTC</p>
      <p style="margin-top:32px;padding:16px;background:#F0F9FF;border-left:3px solid #3B82F6;color:#1E40AF;font-size:14px;">
        <strong>Déjà chauffeur VTC ?</strong><br>
        Lancez votre site de réservation en 24h. <a href="https://vtc-site.fr/inscription" style="color:#3B82F6;">Créer mon site →</a>
      </p>
    `, email),
  },
  {
    day: 2,
    subject: "Devenir VTC : les 6 étapes (rien de plus)",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">Les 6 étapes pour devenir VTC</h1>
      <p>Beaucoup pensent que c'est compliqué. En réalité, le parcours est clair :</p>
      <ol style="color:#555;padding-left:20px;">
        <li style="margin-bottom:8px;"><strong>Vérifier les conditions</strong> (permis depuis 3 ans, casier vierge)</li>
        <li style="margin-bottom:8px;"><strong>Suivre une formation</strong> dans un centre agréé (250h)</li>
        <li style="margin-bottom:8px;"><strong>Passer l'examen</strong> (7 épreuves, 60-70% de réussite)</li>
        <li style="margin-bottom:8px;"><strong>Obtenir la carte pro</strong> à la préfecture (1-3 mois)</li>
        <li style="margin-bottom:8px;"><strong>Choisir son statut</strong> (auto-entrepreneur pour démarrer)</li>
        <li style="margin-bottom:8px;"><strong>S'équiper</strong> : véhicule + assurance + site internet</li>
      </ol>
      <p>Compte <strong>3 à 6 mois</strong> du début de la formation à ta première course.</p>
      <p><a href="https://vtc-site.fr/blog/devenir-chauffeur-vtc" style="color:#3B82F6;">Lire le guide détaillé →</a></p>
    `, email),
  },
  {
    day: 5,
    subject: "Formation VTC : comment bien choisir son centre",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">Formation VTC : le choix qui compte</h1>
      <p>La qualité de ta formation détermine ta réussite à l'examen. Voici comment choisir :</p>
      <p><strong>3 critères essentiels :</strong></p>
      <ul style="color:#555;">
        <li><strong>Agrément préfecture</strong> (obligatoire, demande-le)</li>
        <li><strong>Taux de réussite</strong> à l'examen (idéalement 80%+)</li>
        <li><strong>Accompagnement post-formation</strong> (aide à la création d'entreprise)</li>
      </ul>
      <p><strong>Budget</strong> : 1 500 à 3 000€. Financement possible via CPF ou Pôle Emploi.</p>
      <p><strong>Attention</strong> aux centres "low cost" à 800€ : souvent des arnaques avec taux de réussite catastrophique.</p>
      <p><a href="https://vtc-site.fr/blog/examen-vtc-2026" style="color:#3B82F6;">Le détail des 7 épreuves →</a></p>
    `, email),
  },
  {
    day: 9,
    subject: "Quel statut juridique choisir pour votre activité VTC",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">Statut juridique : mon conseil</h1>
      <p>Auto-entrepreneur, SASU ou EURL ? Voici la règle simple :</p>
      <p><strong>Moins de 50 000€ de CA/an</strong> → Auto-entrepreneur. Simple, rapide, 21% de charges.</p>
      <p><strong>Plus de 50 000€ de CA/an</strong> → SASU. Plus complexe mais déduction des charges (véhicule, essence, assurance).</p>
      <p><strong>Plus de 77 700€</strong> → SASU obligatoire (plafond auto-entrepreneur).</p>
      <p>Mon conseil : démarrez en auto-entrepreneur. Vous pourrez toujours évoluer plus tard.</p>
      <p><a href="https://vtc-site.fr/blog/statut-juridique-vtc" style="color:#3B82F6;">Comparatif complet →</a></p>
    `, email),
  },
  {
    day: 14,
    subject: "Choisir son véhicule VTC — ne fais pas cette erreur",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">L'erreur qui coûte cher</h1>
      <p>Beaucoup choisissent un véhicule en regardant d'abord le prix d'achat. Erreur.</p>
      <p>Ce qui compte : <strong>le coût total sur 3 ans</strong> (achat + carburant + entretien + assurance).</p>
      <p><strong>Top 3 des véhicules les plus rentables en 2026 :</strong></p>
      <ul style="color:#555;">
        <li><strong>Tesla Model 3</strong> : image premium, coût au km imbattable</li>
        <li><strong>Toyota Camry Hybride</strong> : fiabilité, faible consommation</li>
        <li><strong>Mercedes Classe C</strong> : image luxe, clientèle haut de gamme</li>
      </ul>
      <p><strong>Astuce</strong> : la location longue durée (LLD) pour démarrer évite 20 000€ d'investissement initial.</p>
      <p><a href="https://vtc-site.fr/blog/choisir-vehicule-vtc" style="color:#3B82F6;">Guide d'achat complet →</a></p>
    `, email),
  },
  {
    day: 18,
    subject: "Premier client : la méthode qui marche vraiment",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">Ton premier client : voici comment</h1>
      <p>La plupart des débutants s'inscrivent sur Uber et Bolt. C'est facile, mais ça donne <strong>25% de commission</strong> à la plateforme.</p>
      <p>Les VTC qui gagnent vraiment bien ont compris autre chose :</p>
      <p><strong>3 canaux pour trouver des clients directs :</strong></p>
      <ol style="color:#555;">
        <li><strong>Google Business Profile</strong> — gratuit, apparaît sur Google Maps</li>
        <li><strong>Ton propre site</strong> avec réservation en ligne</li>
        <li><strong>Bouche-à-oreille</strong> — tes premiers clients satisfaits deviennent tes commerciaux</li>
      </ol>
      <p>Les plateformes ? Utilise-les pour démarrer, puis bascule progressivement sur tes clients directs.</p>
      <p><a href="https://vtc-site.fr/blog/seo-local-chauffeur-vtc" style="color:#3B82F6;">La méthode complète →</a></p>
    `, email),
  },
  {
    day: 23,
    subject: "Le secret des VTC qui gagnent 4000€+ par mois",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">Les top 5% font tous la même chose</h1>
      <p>J'ai analysé les revenus de dizaines de chauffeurs VTC. Les meilleurs (4000€+ net/mois) ont 3 points communs :</p>
      <ol style="color:#555;">
        <li><strong>Ils ne dépendent pas des plateformes</strong> (moins de 30% de leur CA)</li>
        <li><strong>Ils ont leur propre site internet</strong> qui bosse 24h/24</li>
        <li><strong>Ils ont 50+ avis Google 5 étoiles</strong></li>
      </ol>
      <p>Résultat : leurs clients les trouvent tout seuls. Ils remplissent leur planning sans stress. Ils gardent 100% de leur CA.</p>
      <p>Le site internet est le levier <strong>le plus rentable</strong> qu'un VTC puisse activer.</p>
      <p><a href="https://vtc-site.fr/blog/combien-gagne-chauffeur-vtc" style="color:#3B82F6;">Les vrais chiffres →</a></p>
    `, email),
  },
  {
    day: 28,
    subject: "Prêt à passer à l'action ?",
    html: (email) => baseTemplate(`
      <h1 style="color:#09090B;font-size:22px;margin:0 0 16px;">C'est le moment.</h1>
      <p>Pendant 4 semaines, tu as reçu tout ce qu'il faut savoir pour réussir en VTC.</p>
      <p>Maintenant, une question : <strong>est-ce que tu veux te lancer ou rester spectateur ?</strong></p>
      <p>Si tu veux te lancer, il te manque une seule chose : ton site internet.</p>
      <p style="padding:20px;background:#F0F9FF;border-left:3px solid #3B82F6;">
        <strong>MonVTC</strong> te crée un site pro complet en 24h :<br>
        - Réservation en ligne automatique<br>
        - Intégration WhatsApp<br>
        - Google Maps (autocomplete + distance)<br>
        - SEO local optimisé<br>
        - Dashboard admin<br>
        <br>
        <strong>199€ de mise en place + 29€/mois.</strong> Sans engagement.<br>
        <a href="https://vtc-site.fr/inscription" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#3B82F6;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Lancer mon site VTC →</a>
      </p>
      <p style="margin-top:24px;">Merci de m'avoir lu pendant ces 4 semaines. À toi de jouer maintenant.</p>
      <p>— L'équipe MonVTC</p>
    `, email),
  },
];
