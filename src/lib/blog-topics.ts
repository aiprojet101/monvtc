// Sujets d'articles generes automatiquement — longue traine SEO
// Le cron pioche le prochain sujet non publie

export const BLOG_TOPICS = [
  // ===== VILLES — page principale VTC =====
  { slug: "vtc-paris", title: "VTC Paris : guide complet pour trouver un chauffeur privé", category: "Ville", keywords: ["vtc paris", "chauffeur privé paris", "vtc aéroport cdg", "vtc orly"] },
  { slug: "vtc-lyon", title: "VTC Lyon : réserver un chauffeur privé dans la métropole", category: "Ville", keywords: ["vtc lyon", "chauffeur privé lyon", "vtc aéroport lyon saint-exupéry"] },
  { slug: "vtc-marseille", title: "VTC Marseille : votre chauffeur privé en Provence", category: "Ville", keywords: ["vtc marseille", "chauffeur privé marseille", "vtc aéroport marseille provence"] },
  { slug: "vtc-toulouse", title: "VTC Toulouse : transport privé dans la ville rose", category: "Ville", keywords: ["vtc toulouse", "chauffeur privé toulouse", "vtc aéroport toulouse blagnac"] },
  { slug: "vtc-bordeaux", title: "VTC Bordeaux : chauffeur privé en Gironde", category: "Ville", keywords: ["vtc bordeaux", "chauffeur privé bordeaux", "vtc aéroport bordeaux mérignac"] },
  { slug: "vtc-lille", title: "VTC Lille : votre chauffeur privé dans les Hauts-de-France", category: "Ville", keywords: ["vtc lille", "chauffeur privé lille", "vtc gare lille europe"] },
  { slug: "vtc-nice", title: "VTC Nice : chauffeur privé sur la Côte d'Azur", category: "Ville", keywords: ["vtc nice", "chauffeur privé nice", "vtc aéroport nice"] },
  { slug: "vtc-nantes", title: "VTC Nantes : réserver un chauffeur privé en Loire-Atlantique", category: "Ville", keywords: ["vtc nantes", "chauffeur privé nantes", "vtc aéroport nantes atlantique"] },
  { slug: "vtc-strasbourg", title: "VTC Strasbourg : chauffeur privé dans le Grand Est", category: "Ville", keywords: ["vtc strasbourg", "chauffeur privé strasbourg", "vtc aéroport strasbourg"] },
  { slug: "vtc-montpellier", title: "VTC Montpellier : votre chauffeur privé en Occitanie", category: "Ville", keywords: ["vtc montpellier", "chauffeur privé montpellier"] },
  { slug: "vtc-rennes", title: "VTC Rennes : chauffeur privé en Bretagne", category: "Ville", keywords: ["vtc rennes", "chauffeur privé rennes"] },
  { slug: "vtc-reims", title: "VTC Reims : chauffeur privé en Champagne", category: "Ville", keywords: ["vtc reims", "chauffeur privé reims"] },
  { slug: "vtc-grenoble", title: "VTC Grenoble : chauffeur privé dans les Alpes", category: "Ville", keywords: ["vtc grenoble", "chauffeur privé grenoble"] },
  { slug: "vtc-dijon", title: "VTC Dijon : chauffeur privé en Bourgogne", category: "Ville", keywords: ["vtc dijon", "chauffeur privé dijon"] },
  { slug: "vtc-angers", title: "VTC Angers : chauffeur privé en Pays de la Loire", category: "Ville", keywords: ["vtc angers", "chauffeur privé angers"] },
  { slug: "vtc-tours", title: "VTC Tours : chauffeur privé en Indre-et-Loire", category: "Ville", keywords: ["vtc tours", "chauffeur privé tours"] },
  { slug: "vtc-clermont-ferrand", title: "VTC Clermont-Ferrand : chauffeur privé en Auvergne", category: "Ville", keywords: ["vtc clermont-ferrand", "chauffeur privé clermont"] },
  { slug: "vtc-le-havre", title: "VTC Le Havre : chauffeur privé en Normandie", category: "Ville", keywords: ["vtc le havre", "chauffeur privé le havre"] },
  { slug: "vtc-rouen", title: "VTC Rouen : chauffeur privé en Normandie", category: "Ville", keywords: ["vtc rouen", "chauffeur privé rouen"] },
  { slug: "vtc-metz", title: "VTC Metz : chauffeur privé en Lorraine", category: "Ville", keywords: ["vtc metz", "chauffeur privé metz"] },
  { slug: "vtc-nancy", title: "VTC Nancy : chauffeur privé en Lorraine", category: "Ville", keywords: ["vtc nancy", "chauffeur privé nancy"] },
  { slug: "vtc-toulon", title: "VTC Toulon : chauffeur privé dans le Var", category: "Ville", keywords: ["vtc toulon", "chauffeur privé toulon"] },
  { slug: "vtc-limoges", title: "VTC Limoges : chauffeur privé en Haute-Vienne", category: "Ville", keywords: ["vtc limoges", "chauffeur privé limoges"] },
  { slug: "vtc-perpignan", title: "VTC Perpignan : chauffeur privé dans les Pyrénées-Orientales", category: "Ville", keywords: ["vtc perpignan", "chauffeur privé perpignan"] },

  // ===== TRAJETS POPULAIRES (longue traine) =====
  { slug: "tarif-vtc-paris-cdg", title: "Tarif VTC Paris - Aéroport CDG : combien ça coûte en 2026 ?", category: "Tarifs", keywords: ["tarif vtc paris cdg", "prix vtc roissy", "vtc paris aéroport charles de gaulle"] },
  { slug: "tarif-vtc-paris-orly", title: "Tarif VTC Paris - Orly : prix et forfaits en 2026", category: "Tarifs", keywords: ["tarif vtc paris orly", "prix vtc orly", "vtc orly forfait"] },
  { slug: "vtc-paris-disneyland", title: "VTC Paris - Disneyland : réserver un chauffeur privé", category: "Trajets", keywords: ["vtc disneyland paris", "chauffeur disneyland", "transfert disneyland"] },
  { slug: "tarif-vtc-lyon-aeroport", title: "Tarif VTC Lyon - Aéroport Saint-Exupéry", category: "Tarifs", keywords: ["tarif vtc lyon aéroport", "prix vtc saint-exupéry"] },
  { slug: "tarif-vtc-nice-aeroport", title: "Tarif VTC Nice - Aéroport : prix en 2026", category: "Tarifs", keywords: ["tarif vtc nice aéroport", "prix vtc nice cote d'azur"] },
  { slug: "vtc-nice-monaco", title: "VTC Nice - Monaco : réserver un transfert privé", category: "Trajets", keywords: ["vtc nice monaco", "chauffeur privé monaco"] },
  { slug: "vtc-nice-cannes", title: "VTC Nice - Cannes : transfert privé sur la Côte d'Azur", category: "Trajets", keywords: ["vtc nice cannes", "chauffeur privé cannes"] },
  { slug: "vtc-marseille-cassis", title: "VTC Marseille - Cassis : escapade privée", category: "Trajets", keywords: ["vtc marseille cassis", "chauffeur cassis"] },
  { slug: "vtc-bordeaux-arcachon", title: "VTC Bordeaux - Arcachon : votre chauffeur privé", category: "Trajets", keywords: ["vtc bordeaux arcachon", "chauffeur arcachon"] },

  // ===== SEO LOCAL — creer son site par region =====
  { slug: "creer-site-vtc-ile-de-france", title: "Créer un site VTC en Île-de-France : guide 2026", category: "SEO", keywords: ["créer site vtc paris", "site vtc ile de france", "site internet vtc 75"] },
  { slug: "creer-site-vtc-lyon", title: "Créer un site VTC à Lyon : la solution clé en main", category: "SEO", keywords: ["créer site vtc lyon", "site vtc rhone-alpes"] },
  { slug: "creer-site-vtc-marseille", title: "Créer un site VTC à Marseille : pourquoi et comment", category: "SEO", keywords: ["créer site vtc marseille", "site vtc bouches-du-rhone"] },
  { slug: "creer-site-vtc-bordeaux", title: "Créer un site VTC à Bordeaux : le guide pratique", category: "SEO", keywords: ["créer site vtc bordeaux", "site vtc gironde"] },
  { slug: "creer-site-vtc-toulouse", title: "Créer un site VTC à Toulouse : méthode complète", category: "SEO", keywords: ["créer site vtc toulouse", "site vtc haute-garonne"] },
  { slug: "creer-site-vtc-lille", title: "Créer un site VTC à Lille : être visible sur Google local", category: "SEO", keywords: ["créer site vtc lille", "site vtc nord"] },

  // ===== REGIONS / DEPARTEMENTS =====
  { slug: "devenir-vtc-ile-de-france", title: "Devenir chauffeur VTC en Île-de-France : opportunités 2026", category: "Formation", keywords: ["devenir vtc paris", "formation vtc 75", "devenir vtc région parisienne"] },
  { slug: "devenir-vtc-paca", title: "Devenir chauffeur VTC en PACA : marché et formation", category: "Formation", keywords: ["devenir vtc paca", "formation vtc marseille", "vtc cote d'azur"] },
  { slug: "devenir-vtc-auvergne-rhone-alpes", title: "Devenir chauffeur VTC en Auvergne-Rhône-Alpes", category: "Formation", keywords: ["devenir vtc lyon", "formation vtc rhone-alpes"] },
  { slug: "devenir-vtc-hauts-de-france", title: "Devenir chauffeur VTC dans les Hauts-de-France", category: "Formation", keywords: ["devenir vtc nord", "formation vtc lille"] },
  { slug: "devenir-vtc-bretagne", title: "Devenir chauffeur VTC en Bretagne : conditions et formation", category: "Formation", keywords: ["devenir vtc bretagne", "formation vtc rennes"] },

  // ===== BUSINESS / MARKETING =====
  { slug: "uber-vs-independant-vtc", title: "Uber vs indépendant : quel modèle choisir pour un VTC ?", category: "Business", keywords: ["uber vtc", "quitter uber", "vtc indépendant vs uber"] },
  { slug: "trouver-clients-vtc", title: "Comment trouver des clients en tant que chauffeur VTC", category: "Marketing", keywords: ["trouver clients vtc", "clientèle vtc", "marketing vtc"] },
  { slug: "tarifs-vtc-fixer-prix", title: "Comment fixer ses tarifs VTC : guide de la tarification", category: "Business", keywords: ["tarif vtc", "prix vtc", "fixer prix vtc"] },
  { slug: "comptabilite-vtc-auto-entrepreneur", title: "Comptabilité VTC en auto-entrepreneur : guide simple", category: "Business", keywords: ["comptabilité vtc", "facture vtc", "déclaration urssaf vtc"] },
  { slug: "vtc-temps-partiel", title: "Devenir chauffeur VTC à temps partiel : est-ce rentable ?", category: "Guide", keywords: ["vtc temps partiel", "vtc soir weekend"] },
  { slug: "avis-google-vtc", title: "Comment obtenir des avis Google quand on est VTC", category: "Marketing", keywords: ["avis google vtc", "réputation vtc"] },
  { slug: "vtc-electrique-2026", title: "VTC électrique en 2026 : avantages et véhicules recommandés", category: "Guide", keywords: ["vtc électrique", "tesla vtc"] },
  { slug: "formation-vtc-prix-centres", title: "Formation VTC : prix, durée et meilleurs centres en France", category: "Formation", keywords: ["formation vtc prix", "centre formation vtc"] },
  { slug: "vtc-femme-chauffeure", title: "Devenir chauffeure VTC : témoignages et conseils", category: "Guide", keywords: ["femme vtc", "chauffeure vtc"] },
  { slug: "erreurs-chauffeur-vtc-debutant", title: "Les 10 erreurs à éviter quand on débute comme VTC", category: "Guide", keywords: ["erreurs vtc", "débuter vtc", "conseils vtc débutant"] },
  { slug: "instagram-vtc", title: "Instagram pour VTC : stratégie et exemples", category: "Marketing", keywords: ["instagram vtc", "réseaux sociaux chauffeur"] },
  { slug: "whatsapp-business-vtc", title: "WhatsApp Business pour VTC : guide complet", category: "Marketing", keywords: ["whatsapp vtc", "whatsapp business chauffeur"] },
  { slug: "google-business-vtc-optimisation", title: "Google Business Profile VTC : l'optimiser pour plus de clients", category: "Marketing", keywords: ["google business vtc", "google my business chauffeur"] },
  { slug: "site-vtc-vs-page-facebook", title: "Site VTC vs page Facebook : laquelle choisir ?", category: "Marketing", keywords: ["site vtc", "page facebook vtc"] },
  { slug: "referencement-local-vtc", title: "Référencement local VTC : apparaître en 1ère page", category: "Marketing", keywords: ["référencement vtc", "seo local vtc"] },

  // ===== VEHICULES (longue traine) =====
  { slug: "tesla-model-3-vtc", title: "Tesla Model 3 pour VTC : avantages et retour sur investissement", category: "Véhicule", keywords: ["tesla model 3 vtc", "tesla chauffeur privé"] },
  { slug: "tesla-model-y-vtc", title: "Tesla Model Y pour VTC : est-ce rentable ?", category: "Véhicule", keywords: ["tesla model y vtc"] },
  { slug: "mercedes-classe-e-vtc", title: "Mercedes Classe E pour VTC : le choix premium", category: "Véhicule", keywords: ["mercedes classe e vtc", "mercedes chauffeur privé"] },
  { slug: "mercedes-classe-c-vtc", title: "Mercedes Classe C pour VTC : analyse complète", category: "Véhicule", keywords: ["mercedes classe c vtc"] },
  { slug: "bmw-serie-5-vtc", title: "BMW Série 5 pour VTC : avantages et inconvénients", category: "Véhicule", keywords: ["bmw série 5 vtc", "bmw chauffeur privé"] },
  { slug: "toyota-camry-hybride-vtc", title: "Toyota Camry Hybride pour VTC : la fiabilité japonaise", category: "Véhicule", keywords: ["toyota camry vtc"] },
  { slug: "peugeot-508-vtc", title: "Peugeot 508 pour VTC : le made in France", category: "Véhicule", keywords: ["peugeot 508 vtc"] },
  { slug: "van-8-places-vtc", title: "Van 8 places pour VTC : quand l'investissement est-il rentable ?", category: "Véhicule", keywords: ["van vtc", "mercedes vito vtc", "vtc 8 places"] },
  { slug: "vtc-pas-cher-voiture", title: "Quelle voiture VTC pas chère en 2026 ?", category: "Véhicule", keywords: ["vtc pas cher", "voiture vtc pas cher"] },

  // ===== FORMATION / EXAMEN (longue traine) =====
  { slug: "preparer-examen-vtc", title: "Préparer l'examen VTC : méthode et planning", category: "Formation", keywords: ["préparer examen vtc", "révision examen vtc"] },
  { slug: "qcm-examen-vtc", title: "QCM examen VTC : exemples et astuces", category: "Formation", keywords: ["qcm examen vtc", "questions examen vtc"] },
  { slug: "examen-vtc-anglais", title: "Examen VTC épreuve d'anglais : comment réussir", category: "Formation", keywords: ["examen vtc anglais", "anglais chauffeur vtc"] },
  { slug: "examen-vtc-reglementation", title: "Examen VTC réglementation : l'épreuve qui compte", category: "Formation", keywords: ["examen vtc réglementation", "loi thévenoud"] },
  { slug: "examen-vtc-rater", title: "J'ai raté l'examen VTC : que faire ?", category: "Formation", keywords: ["rater examen vtc", "rattrapage vtc"] },
  { slug: "formation-vtc-cpf", title: "Financer sa formation VTC avec le CPF en 2026", category: "Formation", keywords: ["formation vtc cpf", "cpf vtc"] },
  { slug: "formation-vtc-pole-emploi", title: "Formation VTC financée par Pôle Emploi", category: "Formation", keywords: ["formation vtc pole emploi", "aif vtc"] },
  { slug: "formation-vtc-en-ligne", title: "Formation VTC en ligne : est-ce possible ?", category: "Formation", keywords: ["formation vtc en ligne", "formation vtc distance"] },

  // ===== STATUT / ADMINISTRATIF =====
  { slug: "auto-entrepreneur-vtc-2026", title: "Auto-entrepreneur VTC en 2026 : guide complet", category: "Business", keywords: ["auto-entrepreneur vtc", "micro-entreprise vtc 2026"] },
  { slug: "sasu-vtc-avantages", title: "SASU pour chauffeur VTC : avantages et inconvénients", category: "Business", keywords: ["sasu vtc", "société vtc"] },
  { slug: "tva-vtc-franchise", title: "TVA et VTC : comprendre la franchise en base", category: "Business", keywords: ["tva vtc", "franchise tva chauffeur"] },
  { slug: "urssaf-vtc-declaration", title: "Déclarer ses revenus VTC à l'URSSAF", category: "Business", keywords: ["urssaf vtc", "déclaration vtc"] },
  { slug: "plafond-auto-entrepreneur-vtc", title: "Plafond auto-entrepreneur VTC : que faire quand on le dépasse", category: "Business", keywords: ["plafond auto-entrepreneur vtc", "dépassement plafond vtc"] },
  { slug: "carte-vtc-renouvellement", title: "Renouveler sa carte professionnelle VTC : démarches 2026", category: "Administratif", keywords: ["renouveler carte vtc", "carte pro vtc renouvellement"] },
  { slug: "carte-vtc-delai-obtention", title: "Délai d'obtention de la carte VTC : combien de temps ?", category: "Administratif", keywords: ["délai carte vtc", "combien temps carte vtc"] },
  { slug: "registre-vtc-inscription", title: "Inscription au registre VTC : guide étape par étape", category: "Administratif", keywords: ["registre vtc", "inscription registre vtc"] },

  // ===== ASSURANCE / JURIDIQUE =====
  { slug: "assurance-vtc-pas-chere", title: "Assurance VTC pas chère : comment économiser en 2026", category: "Assurance", keywords: ["assurance vtc pas chere", "assurance vtc moins chère"] },
  { slug: "assurance-vtc-axa", title: "Assurance VTC AXA : offres et tarifs 2026", category: "Assurance", keywords: ["assurance vtc axa"] },
  { slug: "assurance-vtc-allianz", title: "Assurance VTC Allianz : comparatif 2026", category: "Assurance", keywords: ["assurance vtc allianz"] },
  { slug: "assurance-vtc-maif", title: "Assurance VTC MAIF : est-ce une bonne option ?", category: "Assurance", keywords: ["assurance vtc maif"] },
  { slug: "zego-assurance-vtc", title: "Zego pour VTC : l'assurance à l'usage expliquée", category: "Assurance", keywords: ["zego vtc", "assurance usage vtc"] },
  { slug: "rc-pro-vtc", title: "RC Pro VTC : ce que tu dois absolument savoir", category: "Assurance", keywords: ["rc pro vtc", "responsabilité civile vtc"] },

  // ===== TYPES DE COURSES (niches) =====
  { slug: "vtc-mariage", title: "VTC mariage : devenir le chauffeur de référence", category: "Niche", keywords: ["vtc mariage", "chauffeur mariage"] },
  { slug: "vtc-soiree-discotheque", title: "VTC soirée et discothèque : le créneau rentable", category: "Niche", keywords: ["vtc soirée", "vtc discothèque", "chauffeur soirée"] },
  { slug: "vtc-transport-medical", title: "VTC transport médical : conditions et opportunités", category: "Niche", keywords: ["vtc médical", "transport médical vtc"] },
  { slug: "vtc-entreprise-b2b", title: "VTC B2B : conquérir les clients entreprise", category: "Niche", keywords: ["vtc entreprise", "vtc b2b", "vtc compte entreprise"] },
  { slug: "vtc-touristique", title: "VTC touristique : devenir chauffeur pour touristes", category: "Niche", keywords: ["vtc touristique", "chauffeur privé tourisme"] },
  { slug: "vtc-luxe-premium", title: "VTC luxe : comment se positionner haut de gamme", category: "Niche", keywords: ["vtc luxe", "chauffeur luxe", "vtc premium"] },
  { slug: "vtc-aeroport-specialiste", title: "Spécialiste VTC aéroport : stratégie et tarifs", category: "Niche", keywords: ["vtc aéroport spécialiste", "transfert aéroport"] },

  // ===== COMPARATIFS =====
  { slug: "vtc-vs-taxi-prix", title: "VTC ou Taxi : lequel est moins cher en 2026 ?", category: "Comparatif", keywords: ["vtc ou taxi prix", "différence prix vtc taxi"] },
  { slug: "uber-bolt-marcel-comparatif", title: "Uber, Bolt, Marcel : quelle plateforme pour un VTC ?", category: "Comparatif", keywords: ["uber bolt marcel", "comparatif plateformes vtc"] },
  { slug: "heetch-vs-uber-chauffeur", title: "Heetch vs Uber pour un chauffeur : lequel choisir ?", category: "Comparatif", keywords: ["heetch vs uber", "heetch chauffeur"] },
  { slug: "vtc-loti-difference", title: "VTC vs LOTI : quelle différence en 2026 ?", category: "Comparatif", keywords: ["vtc loti", "loti différence vtc"] },

  // ===== SAISONS / ACTUALITE =====
  { slug: "vtc-hiver-conseils", title: "Chauffeur VTC en hiver : 10 conseils pour la saison", category: "Conseils", keywords: ["vtc hiver", "chauffeur vtc neige"] },
  { slug: "vtc-ete-saison-haute", title: "Saison haute VTC : comment profiter de l'été", category: "Business", keywords: ["vtc été", "saison haute vtc"] },
  { slug: "vtc-jeux-olympiques-2024-bilan", title: "Bilan VTC Jeux Olympiques 2024 : leçons pour 2026", category: "Business", keywords: ["vtc jeux olympiques", "jo 2024 vtc"] },
  { slug: "vtc-fetes-fin-annee", title: "VTC pendant les fêtes : maximiser ses revenus", category: "Business", keywords: ["vtc noel", "vtc nouvel an"] },

  // ===== TECHNIQUE / OUTILS =====
  { slug: "application-vtc-facturation", title: "Meilleures apps de facturation pour VTC", category: "Outils", keywords: ["application facturation vtc", "logiciel facture chauffeur"] },
  { slug: "gps-vtc-meilleur", title: "Quel GPS utiliser en tant que chauffeur VTC ?", category: "Outils", keywords: ["gps vtc", "meilleur gps chauffeur"] },
  { slug: "terminal-paiement-vtc-sumup", title: "Terminal de paiement VTC : SumUp, iZettle ou autre ?", category: "Outils", keywords: ["terminal paiement vtc", "sumup vtc"] },
  { slug: "stripe-paiement-en-ligne-vtc", title: "Accepter les paiements en ligne sur son site VTC", category: "Outils", keywords: ["stripe vtc", "paiement en ligne chauffeur"] },

  // ===== DIVERS SEO =====
  { slug: "combien-coute-site-vtc", title: "Combien coûte un site internet VTC en 2026 ?", category: "Guide", keywords: ["prix site vtc", "coût site internet chauffeur"] },
  { slug: "site-vtc-gratuit-ou-payant", title: "Site VTC gratuit ou payant : que choisir ?", category: "Guide", keywords: ["site vtc gratuit", "créer site vtc gratuit"] },
  { slug: "reservation-en-ligne-vtc", title: "Système de réservation en ligne VTC : ce qu'il faut savoir", category: "Outils", keywords: ["réservation en ligne vtc", "module réservation chauffeur"] },
  { slug: "vtc-independant-revenu", title: "Chauffeur VTC indépendant : revenu réel en 2026", category: "Business", keywords: ["revenu vtc indépendant", "combien gagne vtc indépendant"] },
  { slug: "reconversion-vtc-40-ans", title: "Reconversion VTC à 40 ans : témoignage et conseils", category: "Reconversion", keywords: ["reconversion vtc 40 ans", "devenir vtc reconversion"] },
  { slug: "reconversion-vtc-50-ans", title: "Reconversion VTC à 50 ans : est-ce une bonne idée ?", category: "Reconversion", keywords: ["reconversion vtc 50 ans"] },
];
