// 6 modules de la formation "Devenir chauffeur VTC independant en 30 jours"
// Chaque module se debloque X jours après l'achat (drip content)

export interface Module {
  id: number;
  day: number; // jour après achat ou le module se debloque
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  lessons: { title: string; content: string }[];
  checklist: string[];
}

export const MODULES: Module[] = [
  {
    id: 1,
    day: 0,
    slug: "avant-de-se-lancer",
    title: "Avant de se lancer",
    subtitle: "Les bases administratives et le choix de la formation",
    duration: "45 min",
    lessons: [
      {
        title: "Les conditions pour devenir VTC",
        content: `# Les 5 conditions obligatoires

Avant de te lancer dans la formation VTC, vérifie que tu remplis ces critères **obligatoires**. Si un seul manque, tu ne peux pas obtenir la carte professionnelle.

## 1. Le permis de conduire

Tu dois avoir un **permis B valide depuis au moins 3 ans** (2 ans si tu as fait la conduite accompagnee). Pas d'exception.

Vérifie aussi que ton permis n'a pas de restriction médicale qui contre-indiquerait le transport de personnes.

## 2. Un casier judiciaire vierge

Le bulletin n-2 de ton casier judiciaire doit être **vierge de toute condamnation** pour :
- Delits routiers graves (conduite sans permis, recidive alcool)
- Violences, agressions
- Crimes et delits divers incompatibles avec le transport de personnes

Tu peux demander ton extrait en ligne gratuitement sur casier-judiciaire.justice.gouv.fr.

## 3. L'aptitude physique

Une visite médicale chez un **médecin agréé par la préfecture** est obligatoire. Le médecin vérifie :
- Ta vision (acuite visuelle, champ visuel)
- Ton audition
- Ton etat cardiovasculaire
- Absence de pathologies incompatibles

Cout : 35-50 euros selon le médecin. Liste des médecins agréés sur le site de ta préfecture.

## 4. Le PSC1

La formation **Prevention et Secours Civiques niveau 1** est obligatoire. Duree : 7 heures sur 1 journee. Cout : 60-70 euros.

Ou suivre le PSC1 : Croix-Rouge, Protection Civile, pompiers volontaires.

## 5. La formation VTC

Obligatoire dans un **centre agréé par la préfecture**. Duree : environ 250 heures. Prix : 1 500 a 3 000 euros. Tu peux la financer via CPF ou Pôle Emploi (voir lecon suivante).

## Ce que tu NE dois PAS faire

- **Commencer la formation avant d'avoir vérifie ces conditions** (tu perds ton argent si tu ne peux pas passer l'examen)
- **Croire que tu peux contourner** (les contrôles sont stricts)
- **Négliger la visite médicale** (certains centres verifient)

**Prochaine etape** : vérifier ton casier judiciaire et prendre RDV chez un médecin agréé.`,
      },
      {
        title: "Choisir son centre de formation",
        content: `# Comment choisir le bon centre de formation VTC

Ton centre de formation determine ton taux de réussite a l'examen. Un mauvais centre = examen rate = 208 euros perdus + 3 mois de retard.

## Les 5 critères essentiels

### 1. L'agrement préfecture

**Obligatoire**. Sans agrement, ta formation ne vaut rien. Vérifie sur le site de ta préfecture ou demande directement au centre son numero d'agrement.

### 2. Le taux de réussite a l'examen

Demande-le au centre. Les bons centres ont **70-85% de réussite**. En dessous de 60%, fuis.

Les centres serieux affichent le chiffre sur leur site. Ceux qui refusent de te le donner : rouge.

### 3. L'expérience et la reputation

- Combien d'annees d'activité ?
- Combien de chauffeurs ils ont forme ?
- Quels sont les avis Google (5 etoiles c'est bien, mais regarde le contenu des avis — pas les etoiles seulement) ?

### 4. L'accompagnement post-formation

Les meilleurs centres offrent :
- Aide a la preparation du dossier préfecture
- Conseils pour la creation d'entreprise
- Mise en relation avec des partenaires (location véhicule, assurance)
- Suivi après l'examen

### 5. Le format de la formation

**Presentiel ou distance ?**
- Presentiel : meilleure interaction, apprentissage plus rapide
- Distance : plus flexible, moins cher, mais il faut de la discipline

**Rythme :**
- Intensif (3-4 semaines) : tu te concentres a 100%
- Etale (2-3 mois) : tu peux continuer a travailler a cote

## Les prix moyens

| Format | Prix |
|--------|------|
| Distance / e-learning | 800 - 1 500 EUR |
| Presentiel classique | 1 500 - 2 500 EUR |
| Presentiel premium + accompagnement | 2 500 - 3 500 EUR |

Au-dessus de 3 500 EUR, tu paies pour du marketing, pas de la qualite.

## Pieges a eviter

- **Les centres qui promettent 100% de réussite** (c'est faux, le taux national est 65%)
- **Les centres non agréés** (ta formation est nulle)
- **Les formations "express" a 300 EUR** (arnaque garantie)
- **Les centres qui ne te montrent pas leur taux de réussite**

## Ma methode pour choisir

1. Liste 3-5 centres agréés dans ton departement
2. Appelle chacun et pose les 5 questions du checklist
3. Demande leur programme detaille par email
4. Lis les avis Google en detail
5. Visite le centre si possible avant de signer

**Prochaine etape** : obtenir 3 devis comparables.`,
      },
      {
        title: "Financer sa formation VTC",
        content: `# Les 4 solutions de financement

La formation coute entre 1 500 et 3 000 euros. Plusieurs solutions existent pour reduire ce cout, voire le rendre gratuit.

## 1. Le CPF (Compte Personnel de Formation)

**Le plus accessible.**

- Tu as accumule des droits CPF pendant ta vie active (500 EUR/an, plafond 5 000 EUR)
- La formation VTC est **eligible au CPF** dans la plupart des centres agréés
- Inscription sur moncompteformation.gouv.fr
- Reste a charge : 100 EUR minimum depuis 2024

Pour 2 000 EUR de formation, tu paies 100 EUR et le CPF finance 1 900 EUR.

### Comment vérifier tes droits CPF

1. Connecte-toi sur moncompteformation.gouv.fr
2. Créé ton compte avec ton numero de sécurité sociale
3. Tu vois ton solde disponible

## 2. Pôle Emploi

**Si tu es demandeur d'emploi.**

### Aide Individuelle a la Formation (AIF)

Pôle Emploi peut financer tout ou partie de ta formation si :
- La formation correspond a ton projet professionnel valide
- Le centre est agréé
- Tu fais une demande via ton conseiller Pôle Emploi avant de t'inscrire

### Autres aides Pôle Emploi

- **AREF** : maintien de l'allocation chomage pendant la formation
- **RFF** : remuneration de fin de formation si tes droits chomage s'arretent avant la fin
- **Aide a la mobilite** : transport/hebergement si la formation est loin

## 3. L'OPCO (pour salariés)

**Si tu es déjà salarié et veux te reconvertir.**

Ton entreprise cotise a un OPCO (Operateur de Competences) qui peut financer une formation de reconversion. Demande a ton service RH.

### Projet de Transition Professionnelle (PTP)

Ex-CIF. Permet de quitter ton emploi temporairement pour te former, avec maintien partiel du salaire.

## 4. Financement personnel

Si rien de ce qui precede ne fonctionne :

- **Paiement en plusieurs fois** : la plupart des centres acceptent 3-10 mensualites
- **Pret bancaire** : pret personnel a 3-5% d'interets
- **Pret entre particuliers** : Younited Credit, Cetelem

## Tableau récapitulatif

| Situation | Solution recommandee | Reste a charge typique |
|-----------|---------------------|------------------------|
| Actif avec CPF | CPF | 100 EUR |
| Demandeur d'emploi | AIF Pôle Emploi | 0 - 500 EUR |
| Salarié en reconversion | OPCO + PTP | Variable |
| Sans aucune aide | Paiement 3x sans frais | 2 000 EUR echelonnes |

## Mon conseil

**Combine les aides.** Exemple :
- CPF : 1 500 EUR
- AIF Pôle Emploi : 500 EUR
- Reste a charge : 0 EUR

Ca demande un peu de paperasse, mais 2 000 EUR economises, c'est 2 mois de carburant.

**Prochaine etape** : vérifier ton solde CPF et prendre RDV avec ton conseiller Pôle Emploi si tu es demandeur d'emploi.`,
      },
    ],
    checklist: [
      "Vérifier que mon permis B est valide depuis au moins 3 ans",
      "Demander mon bulletin n-2 du casier judiciaire",
      "Prendre rendez-vous chez un médecin agréé préfecture",
      "M'inscrire a une formation PSC1",
      "Contacter 3 centres de formation VTC agréés",
      "Comparer les prix, taux de réussite, accompagnement",
      "Vérifier mon solde CPF sur moncompteformation.gouv.fr",
      "Si demandeur d'emploi : prendre RDV avec mon conseiller Pôle Emploi",
    ],
  },
  {
    id: 2,
    day: 3,
    slug: "réussir-examen-vtc",
    title: "Réussir l'examen VTC",
    subtitle: "Les 7 épreuves, pieges a eviter, methode de révision",
    duration: "50 min",
    lessons: [
      {
        title: "Les 7 épreuves decortiquees",
        content: `# L'examen VTC : 7 épreuves, 65% de réussite national

L'examen VTC est organise par la Chambre des Métiers et de l'Artisanat (CMA). Il se compose de 7 épreuves ecrites sur 1 demi-journee.

**Condition de réussite** : moyenne generale de 10/20, aucune note inferieure a 6/20.

## Épreuve 1 : Réglementation du transport (coef 3)

**La plus importante.** Elle porte sur :
- Code des transports
- Loi Thevenoud (2014) et ses modifications
- Obligations du chauffeur VTC
- Difference VTC / taxi / LOTI
- Sanctions en cas d'infraction
- Registre des VTC

**Conseil** : maîtrise les articles de loi cles. Si tu echoues ici, difficile de rattraper ailleurs.

## Épreuve 2 : Gestion d'entreprise (coef 2)

- Statuts juridiques (auto-entrepreneur, SASU, EURL)
- Comptabilité de base
- TVA, charges sociales
- Facturation, devis
- Business plan

**Conseil** : meme si tu comptes être auto-entrepreneur, apprends les bases de SASU/EURL. Les questions comparatives sont courantes.

## Épreuve 3 : Sécurité routiere (coef 3)

- Code de la route approfondi
- Conduite preventive
- Premiers secours (lien PSC1)
- Equipements de sécurité
- Responsabilite en cas d'accident

**Conseil** : coef 3. Ne neglige pas. Revise le code en profondeur.

## Épreuve 4 : Français (coef 2)

- Comprehension de texte
- Expression ecrite
- Vocabulaire professionnel
- Redaction email client, reclamation

**Conseil** : l'épreuve la plus facile pour un francophone. Soigne orthographe et syntaxe.

## Épreuve 5 : Anglais (coef 1)

- Vocabulaire transport
- Comprehension texte simple
- Phrases types pour accueillir un client anglophone
- Directions en anglais

**Conseil** : niveau B1 suffit. Apprends 50-100 phrases types liees au transport.

## Épreuve 6 : Développement commercial (coef 2)

- Relation client
- Fidelisation
- Marketing digital
- Gestion des reclamations
- Tarification et devis

**Conseil** : pense concret. Comment trouver et garder des clients.

## Épreuve 7 : Réglementation VTC specifique (coef 3)

- Conditions d'exercice
- Carte professionnelle
- Véhicule (normes, contrôle technique)
- Assurances obligatoires
- Obligations de facturation
- Sous-traitance, centrales de reservation

**Conseil** : coef 3. Apprends les chiffres (dimensions véhicule, puissance, age max).

## Stratégie globale

**Priorite absolue sur les coefficients 3** (réglementation transport, sécurité, réglementation VTC specifique). Ces 3 épreuves = 9 points sur 16 de coefficients. Si tu les maitrises, tu as quasi reussi.

**Prochaine etape** : organiser ton planning de révision.`,
      },
      {
        title: "Les pieges a eviter",
        content: `# Les 10 pieges qui font rater l'examen VTC

Après avoir analyse des centaines d'examens, voici les erreurs qui coutent cher.

## 1. Ne pas connaître les chiffres

L'examen adore les chiffres. Ils tombent a chaque session :

- Dimensions minimales véhicule : 4,50m x 1,70m
- Puissance minimale : 84 kW
- Age max véhicule : 7 ans
- Validité carte VTC : 5 ans
- Formation continue : 14h tous les 5 ans
- Delai obtention carte : 1-3 mois
- Plafond auto-entrepreneur : 77 700 EUR/an
- Frais examen : 208 EUR
- TVA non applicable jusqu'a 36 800 EUR CA

**Apprends-les par coeur.** C'est 5-10 points garantis.

## 2. Confondre VTC et taxi

Les questions comparatives tombent souvent. A ne pas confondre :

| Critère | VTC | Taxi |
|---------|-----|------|
| Reservation | Obligatoire | Spontanee OU reservation |
| Tarifs | Libres | Reglementes |
| Licence | Carte pro gratuite | ADS payante (jusqu'a 300k EUR) |
| Vignette | Bleue | Rouge |
| Voies bus | Non | Oui |

## 3. Sous-estimer l'anglais

Coef 1, mais si tu as moins de 6/20, tu es recale. Apprends au minimum :

- Greetings : "Good morning, where are you going ?"
- Directions : "Turn left, straight, at the next intersection"
- Prices : "The fare is 25 euros"
- Questions : "Do you have luggage ?", "Is this your first time in Paris ?"

## 4. Mal gérer son temps

Tu as environ 40 min par épreuve. Ne reste pas bloque. Reponds a ce que tu sais en 1er, reviens après sur les questions difficiles.

## 5. Oublier la loi Thevenoud

C'est LE texte a maîtriser :
- Interdiction de la maraude pour les VTC
- Obligation de reservation prealable
- Retour a la base après chaque course (supprime depuis)
- Sanctions en cas de non-respect

## 6. Ne pas maîtriser les statuts juridiques

Meme si tu comptes être auto-entrepreneur, des questions comparatives tombent sur SASU, EURL, SAS. Apprends les bases.

## 7. Croire qu'il suffit de connaître le code de la route

La sécurité routiere (coef 3) va plus loin : conduite preventive, eco-conduite, responsabilite en cas d'accident, assistance aux victimes.

## 8. Négliger la geographie

Dans certaines régions, on te demande de connaître les principales villes, aeroports, gares TGV. A revoir pour ta zone.

## 9. Stresser le jour J

Dors 8h la nuit d'avant. Mange normalement. Arrive 30 min en avance. Apporte ta piece d'identite et une calculette (si autorisee).

## 10. Rejouer les annales sans reflechir

Les QCM d'entrainement, c'est bien. Mais comprends **pourquoi** une reponse est juste. Sinon tu bloques des que la question est formulee differemment.

**Prochaine etape** : QCM d'entrainement et planning de révision.`,
      },
      {
        title: "Methode de révision 4 semaines",
        content: `# Le planning qui fait passer l'examen

4 semaines intensives. Adapte selon ton rythme.

## Semaine 1 — Fondations

**Objectif** : acquerir les bases de chaque matiere.

- **Lundi-Mardi** : Réglementation transport + code des transports (8h)
- **Mercredi-Jeudi** : Sécurité routiere + code de la route (8h)
- **Vendredi** : Réglementation VTC specifique (4h)
- **Week-end** : repos + 1 QCM blanc pour evaluer

**Objectif semaine 1** : 50-60% a ton premier QCM blanc.

## Semaine 2 — Approfondissement

- **Lundi** : Gestion d'entreprise — statuts juridiques (4h)
- **Mardi** : Gestion d'entreprise — comptabilité, TVA (4h)
- **Mercredi** : Français — expression ecrite, comprehension (2h)
- **Jeudi** : Anglais — vocabulaire transport, phrases types (4h)
- **Vendredi** : Développement commercial (4h)
- **Week-end** : 2eme QCM blanc

**Objectif** : 65-70% au QCM blanc.

## Semaine 3 — Revision intensive

- Focus total sur les épreuves coef 3 (réglementation, sécurité, réglementation VTC)
- 2-3 QCM blancs par jour
- Identifie tes points faibles, revise les specifiquement
- Apprentissage par coeur des chiffres cles

**Objectif** : 75% minimum aux QCM blancs.

## Semaine 4 — Finalisation

- **Lundi-Mardi** : révision ciblees sur tes points faibles
- **Mercredi** : dernier QCM blanc grandeur reelle (temps limite)
- **Jeudi** : relecture des fiches, chiffres cles
- **Vendredi** : repos, lecture legere des fiches
- **Week-end avant examen** : repos total

## Ressources d'entrainement

**Gratuites** :
- QCM sur le site de la CMA de ta région
- Groupes Facebook "Examen VTC" (partage de sujets)
- Annales des sessions precedentes

**Payantes** :
- Sites specialises (25-50 EUR/mois)
- Applications mobile dediees

## Organisation pratique

- **Fiches de révision** : une par theme, synthetique
- **Planning papier ou agenda numerique** : coche ce que tu fais
- **Environnement calme** : bibliotheque, cafe tranquille
- **Pauses regulieres** : 10 min toutes les heures

## La veille et le jour J

**La veille** :
- Relis tes fiches synthetiques (pas d'apprentissage nouveau)
- Prepare ton sac : piece d'identite, convocation, stylo, calculette (si autorisee), bouteille d'eau
- Dors 8h

**Le jour J** :
- Arrive 30 min en avance
- Ne stresse pas : tu as revise, tu es pret
- Lis chaque question attentivement
- Ne reste pas bloque : passe a la suivante et reviens

## Si tu echoues

- Tu peux repasser les épreuves ou tu as moins de 10/20
- Les épreuves reussies sont conservees 1 an
- Frais : 208 EUR par session
- Taux de réussite 2eme tentative : 80%+

**La majorite de ceux qui echouent a la 1ere reussissent a la 2eme.** Pas de panique.

**Prochaine etape** : decider quand tu passes l'examen et reserver ta session.`,
      },
    ],
    checklist: [
      "Me procurer les annales des examens VTC recents",
      "M'inscrire a une plateforme de QCM en ligne",
      "Créer mon planning de révision sur 4 semaines",
      "Apprendre les chiffres cles par coeur",
      "Faire 1 QCM blanc par semaine",
      "Reviser specifiquement les épreuves coef 3",
      "Preparer des phrases types en anglais transport",
      "Reserver ma session d'examen aupres de la CMA",
    ],
  },
  {
    id: 3,
    day: 7,
    slug: "créer-son-entreprise",
    title: "Créer son entreprise",
    subtitle: "Statut juridique, immatriculation, compte bancaire",
    duration: "40 min",
    lessons: [
      {
        title: "Auto-entrepreneur ou SASU : le bon choix",
        content: `# Le bon statut juridique pour ton activité VTC

Ce choix impacte tes charges, ta fiscalité, ta protection sociale. Voici comment decider.

## Auto-entrepreneur (micro-entreprise)

**Le statut le plus utilise par les VTC qui demarrent.**

### Avantages
- Creation en 24h sur autoentrepreneur.urssaf.fr
- Charges sociales : **21,1% du CA**
- Pas de TVA jusqu'a 36 800 EUR de CA
- Comptabilité ultra-simplifiée (livre de recettes)
- Pas de comptable obligatoire
- Plafond : 77 700 EUR/an

### Inconvenients
- Impossible de deduire les charges (véhicule, essence, assurance)
- Protection sociale limitee (indemnites journalieres faibles)
- Responsabilite illimitee sur le patrimoine personnel
- Image moins "serieuse" pour les clients entreprise

**Ideal pour** : debut, temps partiel, CA sous 50 000 EUR/an.

## SASU (Société par Actions Simplifiée Unipersonnelle)

### Avantages
- Pas de plafond de CA
- Deduction de toutes les charges
- Dividendes possibles (flat tax 30% vs charges sociales 45%)
- Responsabilite limitee au capital social
- Credibilite client entreprise
- Regime social general (meilleure protection)

### Inconvenients
- Charges sociales sur salaire : ~45%
- Comptable obligatoire : 150-300 EUR/mois
- Formalites creation : 200-500 EUR
- Bilan annuel, AG, comptabilité complexe

**Ideal pour** : CA superieur a 50 000 EUR/an, activité a temps plein etablie.

## EURL

Le compromis entre les deux :
- Charges sociales ~40%
- Responsabilite limitee
- Choix IS ou IR
- Moins flexible que SASU sur les dividendes

## Comparatif chiffre

Simulation pour un CA de 54 000 EUR/an :

### Auto-entrepreneur
- Cotisations URSSAF (21,1%) : -11 394 EUR
- Charges non déductibles payees sur le net
- Revenu disponible : ~42 600 EUR/an
- Après IR : environ **35 000 - 38 000 EUR net/an**

### SASU
- Charges déductibles : -18 000 EUR (véhicule, essence, assurance, comptable)
- Benefice : 36 000 EUR
- Salaire dirigeant 24 000 EUR brut
- Charges sociales 45% : -10 800 EUR
- Net verse : 13 200 EUR
- Dividendes 12 000 EUR - flat tax : 8 400 EUR
- Total : **~18 600 EUR net/an** (pour 54 000 EUR CA)

La SASU devient avantageuse a partir de **70 000 - 80 000 EUR CA/an**.

## Mon conseil

1. **CA prévu < 50 000 EUR/an** : auto-entrepreneur, sans hesiter
2. **CA 50 000 - 77 700 EUR/an** : auto-entrepreneur + simulation SASU avec un comptable
3. **CA > 77 700 EUR/an** : SASU obligatoire (plafond micro depasse)

**Tu peux toujours evoluer.** Commence en auto-entrepreneur, bascule en SASU quand tu depasses les 60 000 EUR de CA.

**Prochaine etape** : créer effectivement ton entreprise.`,
      },
      {
        title: "Créer son auto-entreprise en 24h",
        content: `# Pas a pas : créer ton auto-entreprise VTC

Je detaille les etapes exactes. 24h chrono de la declaration au SIRET.

## Etape 1 : Preparer les documents

- **Piece d'identite** (CNI ou passeport) recto-verso, scannee
- **Justificatif de domicile** de moins de 3 mois
- **RIB** personnel (tu pourras ouvrir un compte pro plus tard)

## Etape 2 : Declarer ton activité

1. Va sur **autoentrepreneur.urssaf.fr**
2. Clique "Declarer mon auto-entreprise"
3. Créer ton compte avec ton email
4. Identification personnelle : nom, prenom, date et lieu de naissance
5. Adresse d'activité (domicile autorise)
6. **Activité** : selectionne **"Transport de voyageurs par voitures de tourisme avec chauffeur (VTC)"**
7. **Code APE** : **49.32Z**
8. Date de debut d'activité : aujourd'hui ou date future

## Etape 3 : Options fiscales

### Regime d'imposition
- **Versement liberatoire de l'IR** : tu paies l'IR en meme temps que les cotisations (environ 1,7% du CA). Recommande si tu as peu d'autres revenus.
- **Sans versement liberatoire** : IR classique, base sur ta declaration annuelle.

### TVA
- Laisse la franchise en base par defaut (pas de TVA jusqu'a 36 800 EUR)

## Etape 4 : Validation

1. Relis tout attentivement
2. Signe electroniquement
3. Tu recois un email de confirmation
4. Ton **SIRET** arrive sous 1-2 semaines par courrier

**Cout : 0 EUR.** C'est entierement gratuit.

## Etape 5 : Inscription au registre des VTC

**Obligatoire** pour exercer. Se fait APRES avoir obtenu ta carte professionnelle VTC.

1. Va sur **registre-vtc.développement-durable.gouv.fr**
2. Créé ton compte
3. Remplis le formulaire :
   - Numero SIRET
   - Carte professionnelle VTC
   - Attestation d'assurance RC Pro
   - Carte grise du véhicule
   - Adresse de stationnement du véhicule
4. Paiement : **50 EUR** environ
5. Validation sous 1-4 semaines

Tu recois un numero d'inscription au registre VTC. **C'est ce numero qui prouve que tu es en regle.**

## Etape 6 : Ouvrir un compte bancaire dedie

**Obligatoire** si ton CA depasse 10 000 EUR/an pendant 2 ans consecutifs. En pratique, ouvre-en un des le depart.

### Options recommandees

- **Qonto** : 9 EUR/mois, carte Mastercard, interface moderne
- **Shine** : 7,90 EUR/mois, pense pour les auto-entrepreneurs
- **Boursorama Pro** : gratuit sous conditions (CA minimum)
- **N26 Business** : 9,90 EUR/mois

Tu peux aussi utiliser un compte courant classique dedie a l'activité, mais les neobanques sont plus pratiques.

## Etape 7 : Souscrire les assurances

**Avant** de prendre ton premier client :
- Assurance véhicule avec mention "transport VTC"
- RC Professionnelle
- Garantie conducteur (recommande)

Budget : 250-450 EUR/mois.

## Checklist finale

Avant ta première course, tu dois avoir :
- Carte professionnelle VTC valide
- Numero SIRET
- Inscription au registre des VTC
- Vignette VTC bleue sur le pare-brise
- Assurance véhicule + RC Pro
- Contrôle technique a jour
- Compte bancaire dedie
- Facturier (papier ou application)

**Prochaine etape** : gestion administrative au quotidien.`,
      },
      {
        title: "Facturation, URSSAF, comptabilité",
        content: `# La gestion administrative au quotidien

Comptabilité, facturation, declarations : voici comment tout gérer simplement.

## La facturation

### Ce qui doit figurer sur chaque facture

**Obligatoire en VTC :**
- Tes coordonnees (nom, adresse, SIRET, numero TVA si applicable)
- Coordonnees du client (ou "client particulier" si C2C)
- Date de la course
- Date d'emission de la facture
- Numero de facture (sequentiel, sans interruption)
- Description : "Transport de voyageurs" + date + trajet
- Montant HT, TVA (si applicable), TTC
- Mention "TVA non applicable, art. 293 B du CGI" si franchise en base

### Outils de facturation

**Gratuits :**
- Tiime
- Freebe (version gratuite limitee)
- Excel/Google Sheets

**Payants, plus pratiques :**
- Indy : 12 EUR/mois, automatique
- Freebe Premium : 10 EUR/mois
- Tiime Premium : 20 EUR/mois

## Le livre de recettes

**Obligatoire en auto-entrepreneur.** Un simple tableau avec :

| Date | Numero facture | Client | Montant encaisse | Mode paiement |
|------|----------------|--------|------------------|---------------|
| 12/04 | F2026-0012 | M. Durand | 35 EUR | CB |
| 13/04 | F2026-0013 | Mme Martin | 48 EUR | Espece |

Tu peux le tenir sur Excel ou dans l'application de facturation.

## Declaration URSSAF

### Frequence

- **Mensuelle** (recommandee pour debuter) : declare le CA du mois precedent avant le dernier jour du mois suivant
- **Trimestrielle** : declare le CA du trimestre precedent avant le dernier jour du mois suivant

### Comment declarer

1. Va sur **autoentrepreneur.urssaf.fr**
2. Connecte-toi
3. "Declarer mon chiffre d'affaires"
4. Saisis le CA encaisse (pas facture)
5. Le montant des cotisations s'affiche : 21,1% du CA
6. Paiement par prelevement automatique ou manuel

**Important** : declare **0 EUR** si tu n'as rien encaisse. Pas de declaration = radiation.

## Gestion de la TVA (si CA > 36 800 EUR)

Si tu depasses le seuil de franchise :
1. Tu dois facturer la TVA (20% sur le transport de personnes)
2. Tu peux **deduire** la TVA sur tes achats professionnels (essence, véhicule, assurance)
3. Tu declares la TVA chaque mois ou trimestre

**Avantage** : recuperation de TVA sur 30 000 EUR de véhicule = 5 000 EUR economises.

## Outils pratiques

### Applications mobiles pour VTC

- **Flex** : suivi des courses + facturation + compta
- **Cab Tracker** : suivi simple
- **Logiciel interne du site MonVTC** : dashboard integre

### Logiciels comptables

Si tu passes en SASU :
- **Indy** : 39 EUR/mois, bilan annuel inclus
- **Dougs** : 49 EUR/mois, comptable humain dispo
- **Tiime Compta** : 79 EUR/mois, le plus complet

## Mon organisation recommandee

1. **Facturation** : Indy (12 EUR/mois) — auto, tu fais une facture en 30 secondes
2. **Encaissement** : SumUp (TPE 29 EUR) + espece + virements
3. **Suivi** : dashboard du site MonVTC pour les reservations en ligne
4. **Declaration** : URSSAF mensuelle en ligne
5. **Compte bancaire** : Qonto (9 EUR/mois)

**Cout total gestion** : environ 21 EUR/mois. Rentabilise des la 1ere course.

## Les erreurs a eviter

- **Oublier de declarer son CA** : amende + radiation
- **Melanger perso et pro** sur un seul compte : cauchemar en cas de contrôle
- **Payer en espece sans facture** : illegal
- **Ne pas declarer les pourboires** : techniquement imposables
- **Perdre ses factures** : obligation de conservation 10 ans

**Prochaine etape** : s'equiper intelligemment (véhicule, assurance, materiel).`,
      },
    ],
    checklist: [
      "Choisir mon statut juridique (auto-entrepreneur recommande pour debuter)",
      "Créer mon compte sur autoentrepreneur.urssaf.fr",
      "Declarer mon activité avec le code APE 49.32Z",
      "Attendre la reception de mon SIRET",
      "M'inscrire au registre des VTC",
      "Ouvrir un compte bancaire dedie (Qonto, Shine...)",
      "Choisir un outil de facturation (Indy recommande)",
      "Programmer mes declarations URSSAF mensuelles",
    ],
  },
  {
    id: 4,
    day: 14,
    slug: "s-equiper-intelligemment",
    title: "S'equiper intelligemment",
    subtitle: "Véhicule, assurance, materiel indispensable",
    duration: "45 min",
    lessons: [
      {
        title: "Choisir son véhicule VTC",
        content: `# Le véhicule : ton outil de travail principal

Le véhicule represente 40-50% de tes couts. Bien le choisir, c'est assurer ta rentabilite.

## Les normes obligatoires VTC

**Vérifie avant l'achat :**
- 4 portes minimum + coffre
- Longueur minimale : 4,50 m
- Largeur minimale : 1,70 m
- Puissance minimale : 84 kW (environ 114 chevaux)
- Moins de 7 ans (date première mise en circulation)
- Contrôle technique a jour

Un véhicule non conforme = refus d'inscription au registre VTC. Catastrophe.

## Les meilleurs véhicules VTC en 2026

### Premium (image haut de gamme)

**Tesla Model 3** — 35 000 - 45 000 EUR neuf
- Couts d'usage imbattables (electricite)
- Entretien quasi nul
- Image moderne
- Autonomie 400-600 km

**Mercedes Classe E** — 40 000 - 60 000 EUR neuf
- Image luxe
- Confort passager maximal
- Mais entretien cher

### Bon rapport qualite-prix

**Toyota Camry Hybride** — 35 000 - 40 000 EUR
- Consommation 4-5L/100km
- Fiabilite japonaise legendaire
- Confort, silence

**Peugeot 508** — 30 000 - 38 000 EUR
- Made in France
- Bon equipement
- Valeur de revente correcte

### Economique (demarrer sans se ruiner)

**Renault Megane E-Tech** (electrique) — 30 000 EUR avec bonus
- Vérifie dimensions normes VTC

**Citroen C5 X** — 30 000 - 38 000 EUR
- Confort exceptionnel
- Image moins premium

## Achat, LLD, LOA, ou location VTC ?

| Formule | Mensualite | Apport | Proprietaire |
|---------|-----------|--------|--------------|
| Achat comptant | 0 | 20 000 - 45 000 EUR | Oui |
| Credit 48 mois | 400 - 800 EUR | 5 000 EUR | Oui après |
| LLD | 500 - 900 EUR | 2 000 - 5 000 EUR | Non |
| LOA | 600 - 1 000 EUR | 2 000 - 5 000 EUR | Oui a la fin |
| Location VTC specialisee | 1 800 - 3 000 EUR | 0 - 1 500 EUR | Non (tout inclus) |

### Mon conseil par profil

- **Debutant sans capital** : location VTC specialisee (Marcel Cars, Kymono, etc.). Tout inclus, pas d'engagement long.
- **Debutant avec capital** : LLD 3 ans. Mensualites fixes, pas de revente a gérer.
- **Confirme avec capital** : LOA ou achat credit. Tu possedes le véhicule a la fin.
- **Experimente rentable** : achat comptant occasion (-2 ans). Zero mensualite après amortissement.

## Electrique, hybride ou thermique ?

### Electrique
**Pour** : cout au km 3x moins cher, bonus ecolo, entretien quasi nul, image moderne
**Contre** : autonomie a gérer, recharge a anticiper
**Verdict** : ideal en ville, parfait si tu as une borne a domicile

### Hybride
**Pour** : consommation 4-5L/100km, pas de recharge, fiabilite (Toyota)
**Contre** : moins economique que l'electrique
**Verdict** : le meilleur compromis pour demarrer

### Thermique
**Pour** : prix d'achat bas, choix large de véhicules
**Contre** : cout au km eleve, ZFE qui se multiplient
**Verdict** : a eviter en 2026, sauf occasion tres intéressante

## Calcul du cout total de possession (TCO)

Sur 3 ans pour un Peugeot 508 hybride :
- Achat credit : 15 000 EUR (après apport)
- Carburant : 4 500 EUR (60 000 km)
- Assurance : 12 000 EUR (4 000 EUR/an)
- Entretien : 4 500 EUR
- Pneus : 1 500 EUR
- **Total : 37 500 EUR sur 3 ans** soit 1 041 EUR/mois

Pour une Tesla Model 3 :
- Achat credit : 20 000 EUR
- Electricite : 1 500 EUR (60 000 km)
- Assurance : 11 000 EUR
- Entretien : 1 000 EUR
- Pneus : 2 000 EUR
- **Total : 35 500 EUR sur 3 ans** soit 986 EUR/mois

L'electrique est **plus cher a l'achat** mais **moins cher a l'usage**. Rentable a partir de 40 000 km/an.

**Prochaine etape** : choisir son assurance.`,
      },
      {
        title: "L'assurance VTC : ne pas se tromper",
        content: `# L'assurance VTC : comment payer moins cher sans se faire avoir

L'assurance represente 10-15% de ton CA. Un choix strategique.

## Les 3 assurances obligatoires

### 1. Assurance véhicule professionnelle

**Ton assurance auto perso NE couvre PAS le VTC.** Il te faut une assurance specifique avec la mention **"usage professionnel — transport de personnes a titre onereux"**.

Couvre :
- Dommages materiels au véhicule
- Vol, incendie, bris de glace
- Assistance depannage

### 2. RC Professionnelle (Responsabilite Civile Pro)

Obligatoire pour couvrir les dommages causes aux passagers et aux tiers pendant le transport.

### 3. Garantie conducteur

**Souvent oubliee mais essentielle.** Elle te couvre TOI en cas d'accident responsable :
- Incapacite temporaire de travail
- Invalidite permanente
- Deces

Sans cette garantie, accident responsable = pas d'indemnisation pour toi.

## Les tarifs moyens en 2026

Pour un Peugeot 508, 35 ans, 3 ans de permis, zone Lille :

| Formule | Prix annuel |
|---------|-------------|
| Tiers + RC Pro | 2 500 - 3 500 EUR |
| Tiers etendu + RC Pro | 3 000 - 4 500 EUR |
| Tous risques + RC Pro | 3 500 - 5 500 EUR |
| Tous risques + RC Pro + garantie conducteur + protection juridique | 4 500 - 6 500 EUR |

**Soit 200-550 EUR/mois.**

## Les assureurs VTC en France

### AXA
- Leader, reseau dense
- Tarifs eleves (4 000 - 5 500 EUR/an)
- Bon service, gestion sinistre rapide

### Allianz
- Bon compromis qualite-prix (3 500 - 5 000 EUR/an)
- Assistance 24h/24

### MAIF
- Tarifs competitifs (3 000 - 4 500 EUR/an)
- Conditions strictes d'adhesion

### GMF
- Prix bas (3 000 - 4 000 EUR/an)
- Couverture de base

### Zego
- **Assurance a l'usage** : tu paies quand tu travailles
- Ideal temps partiel
- Application moderne

## Comment payer moins cher

### 1. Compare 4-5 devis

Ne prends JAMAIS la première offre. Les prix varient de 30-50% entre assureurs.

Comparateurs pro : AssurOne Pro, April Pro, courtiers VTC specialises.

### 2. Augmente ton bonus

Chaque annee sans sinistre baisse ton tarif de 5%. En 5 ans = -25%.

### 3. Choisis une franchise plus elevee

Franchise 1 500 EUR au lieu de 500 EUR = tarif 15-20% moins cher. Mais attention : si sinistre, plus a payer.

### 4. Regroupe tes assurances

Auto + RC Pro + habitation chez le meme assureur = -10-15%.

### 5. Installe un dashcam

Certains assureurs offrent 5-10% de reduction.

### 6. Paye a l'annee

Payer en une fois coute 5-10% moins cher qu'en mensuel.

### 7. Passe a l'electrique

Véhicules electriques : tarifs 10-20% moins chers.

## Pieges a eviter

### Rouler avec une assurance perso
**Illegal**. En cas d'accident : non-couverture totale + suspension carte VTC.

### Choisir le moins cher sans lire les exclusions
Un contrat pas cher avec exclusions partout te coute cher au premier sinistre.

### Sous-estimer la franchise
Franchise 2 000 EUR = tu paies les petits sinistres de ta poche.

### Oublier la garantie conducteur
Ta protection personnelle. Indispensable.

## Ce qu'il faut vérifier dans le contrat

- Plafond de garantie RC Pro : **minimum 1 million EUR**
- Franchises (vol, bris de glace, tous risques)
- Exclusions (véhicule non conforme, conduite sous alcool, etc.)
- Prestations d'assistance (véhicule de remplacement, depannage)
- Delais de declaration de sinistre

## Ma methode pour optimiser

1. **An 1** : commence avec une formule standard chez un grand assureur
2. **An 2** : refais 5 devis pour comparer
3. Change d'assureur si tu trouves -500 EUR/an
4. Accumule du bonus
5. **An 5** : tu dois payer 30-40% moins cher qu'au debut

**Economie potentielle sur 5 ans** : 5 000 - 10 000 EUR. Enorme.

**Prochaine etape** : equipement complementaire.`,
      },
      {
        title: "Le materiel indispensable",
        content: `# L'equipement complet d'un chauffeur VTC

Au-dela du véhicule, voici tout ce dont tu as besoin au quotidien.

## Equipement obligatoire (conformite)

### Vignette VTC bleue
- A coller sur le pare-brise
- Fournie par la préfecture avec ta carte pro
- Cout : 10 EUR

### Carte professionnelle VTC
- A avoir sur toi en permanence
- Les forces de l'ordre peuvent la demander

### Numero de registre VTC
- Doit apparaître sur tes factures
- Et souvent affiche a l'intérieur du véhicule

### Assurances (voir lecon precedente)
- Attestations a avoir dans le véhicule

### Contrôle technique a jour
- Original ou copie dans le véhicule

## Equipement confort passager (professionnalisme)

### Chargeur universel
- USB-C + Lightning + micro-USB
- Les clients adorent recharger pendant le trajet
- Cout : 20-30 EUR

### Bouteilles d'eau
- Petites 33cl, proposees au client
- Cout : 0,20 EUR/bouteille

### Mouchoirs
- Boite dans la console centrale
- Petit detail qui impressionne

### Parapluie
- 2 parapluies : 1 pour toi, 1 pour le client
- Indispensable en hiver

### Sacs en plastique
- Pour les bagages mouilles, les dechets
- Discrets, utiles

### Sac poubelle propre
- Vide a chaque course
- Les VTC sales font fuir les clients

### Sieges enfants
- **Proposer 2 types** : groupe 1 (9-18kg) et rehausseur (15-36kg)
- Obligatoire si tu acceptes les courses avec enfants
- Cout : 50-150 EUR pour les 2

## Equipement technologique

### Téléphone dedie VTC
- Ne melange pas perso et pro
- Numero pro specifique
- Forfait avec beaucoup de données (GPS consomme)

### Support téléphone voiture
- Magnetique ou a clips
- Ventilation ou pare-brise
- Cout : 15-30 EUR

### GPS / Applications

**GPS recommandes :**
- **Waze** (gratuit) : meilleur en ville avec le trafic en temps reel
- **Google Maps** (gratuit) : polyvalent, excellent
- **Coyote** (payant, 59 EUR/an) : radars et alertes

### Terminal de paiement

**Indispensable** : les clients adorent payer par carte.

- **SumUp Air** : 39 EUR, pas d'abonnement, 1,75% par transaction
- **iZettle (Zettle)** : 29 EUR, 1,75% par transaction
- **myPOS Go** : 49 EUR, 1,2% par transaction

Mon choix : **SumUp**. Simple, fiable, integre a ta compta.

### Dashcam

- Protection en cas de litige ou accident
- Prix : 80-200 EUR
- Qualite 1080p minimum
- Avec GPS integre et mode parking
- Reduction assurance chez certains assureurs

## Equipement personnel chauffeur

### Tenue professionnelle
- Chemise ou polo noir/bleu marine
- Pantalon de costume
- Chaussures fermees propres
- Pas de baskets sauf si clientèle tres decontractee

### Badge ou plaque siege
- Avec ton nom
- Rassure les clients

### Tablette ou cahier
- Pour noter les courses, numeros, preferences
- Backup si le téléphone tombe en rade

## Equipement de sécurité

- Gilet jaune (obligatoire)
- Triangle de sécurité
- Kit de premiers secours
- Extincteur
- Gants, lampe torche
- Eponge, chiffons, gel hydroalcoolique
- Glaciere pour les courses longues (eau fraiche pour toi)

## Systeme de reservation / site web

**Indispensable en 2026 pour ne pas dependre des plateformes.**

Avec **MonVTC** :
- Site internet professionnel
- Reservation en ligne 24h/24
- WhatsApp integre
- Google Maps automatique
- SEO local

Cout : 199 EUR + 29 EUR/mois. Rentabilise des la 1ere course directe.

## Budget total equipement

Pour demarrer correctement :

| Poste | Budget |
|-------|--------|
| Accessoires confort | 100 EUR |
| Sieges enfants | 150 EUR |
| Terminal de paiement | 40 EUR |
| Support téléphone | 25 EUR |
| Dashcam | 150 EUR |
| Tenue (x2) | 200 EUR |
| Site internet (1er mois MonVTC) | 228 EUR |
| Divers | 100 EUR |
| **Total demarrage** | **~1 000 EUR** |

Puis couts recurrents : 50-100 EUR/mois (consommables + abonnements).

**Prochaine etape** : trouver ses premiers clients.`,
      },
    ],
    checklist: [
      "Choisir le mode d'acquisition du véhicule (achat / LLD / LOA / location VTC)",
      "Selectionner un modele conforme aux normes VTC",
      "Comparer 4-5 devis d'assurance",
      "Souscrire assurance auto + RC Pro + garantie conducteur",
      "Commander la vignette VTC bleue",
      "M'equiper du confort passager (chargeurs, eau, mouchoirs)",
      "Acheter un terminal de paiement (SumUp recommande)",
      "Installer une dashcam",
      "Preparer ma tenue professionnelle",
    ],
  },
  {
    id: 5,
    day: 21,
    slug: "trouver-ses-clients",
    title: "Trouver ses premiers clients",
    subtitle: "Google, site web, reseaux sociaux, partenariats",
    duration: "55 min",
    lessons: [
      {
        title: "Google Business Profile : la base",
        content: `# Google Business Profile : le canal N-1 pour un VTC

**87% des clients VTC cherchent sur Google** avant de reserver. Si tu n'apparais pas sur Google Maps, tu es invisible.

## Pourquoi c'est indispensable

- **Gratuit** : zero euro
- **Ultra efficace** : trafic qualifie, intention d'achat forte
- **Local** : les clients de ta ville te trouvent
- **Avis** : les etoiles rassurent et convertissent

Un VTC avec une fiche Google optimisee + 20 avis 5 etoiles recoit 2-3 appels/semaine gratuitement.

## Créer ta fiche

### Etape 1 : Aller sur business.google.com

1. Connecte-toi avec ton compte Google
2. "Ajouter votre etablissement a Google"
3. Choisis **"Zone de service"** (pas "etablissement physique" pour un VTC)
4. Nom de ton entreprise : "[TaMarque] — Chauffeur VTC"

### Etape 2 : Categorie

**Categorie principale** : "Service de chauffeur prive" ou "Service VTC"
**Categories secondaires** :
- Service de taxi
- Service de transport
- Transfert aeroport

### Etape 3 : Zone de service

Coche toutes les villes ou tu accepte de rouler. Ton fief + 50 km autour.

### Etape 4 : Contact

- Numero de téléphone (dedie VTC de preference)
- Site web (ton site MonVTC)

### Etape 5 : Horaires

**Ouvert 24h/24 7j/7** est tres attractif. Si tu dors, mets simplement tes horaires reels.

### Etape 6 : Validation

Google t'envoie un code par SMS ou courrier. **Sans validation, ta fiche n'apparait PAS dans les résultats.**

## Optimiser la fiche

### Description (750 caracteres)

Inclure imperativement :
- Le mot "VTC"
- Ta ville principale
- Tes zones couvertes
- Tes services (aeroport, gare, soiree, business)

Exemple pour un VTC a Lille :
> "[NordVTC], votre chauffeur VTC a Lille et dans la metropole lilloise. Transferts aeroport Lille-Lesquin, gare Lille-Europe, Roubaix, Tourcoing, Villeneuve-d'Ascq. Reservation en ligne 24h/24. Forfaits fixes, paiement securise. Egalement soirees et evenements."

### Photos (minimum 10)

- Photo du véhicule exterieur propre (jour, lumiere naturelle)
- Photo intérieur (sieges, propretee)
- Photo de toi en tenue pro (visage souriant)
- Logo de ta marque
- Photos de courses (avec accord des clients)

**Les fiches avec 10+ photos recoivent 42% plus d'appels.**

### Services

Liste tes prestations :
- Transfert aeroport (CDG, Orly, Lesquin selon ta zone)
- Transfert gare
- Courses locales
- Soirees et evenements
- Transport business
- Courses longue distance

### Produits

Tu peux ajouter tes forfaits :
- "Lille - Aeroport Lesquin : 65 EUR"
- "Lille - Paris : 290 EUR"
- "Lille - Bruxelles : 180 EUR"

## Obtenir des avis 5 etoiles

**Les avis sont le critère N-1 pour le ranking local.**

### La methode qui marché

1. A la fin de chaque course satisfaisante, demande directement
2. Envoie le lien Google Maps de ta fiche par SMS ou WhatsApp
3. Le lien : "Merci pour votre course ! Un avis sur Google me ferait plaisir : [lien]"

### Comment generer le lien direct vers les avis

1. Va sur ta fiche Google Business
2. "Obtenir plus d'avis"
3. Copie le lien court
4. Sauvegarde-le dans un template SMS/WhatsApp

### Objectif de volumes

- **Mois 1-3** : 10 avis 5 etoiles
- **Mois 3-6** : 30 avis
- **Mois 6-12** : 50+ avis

Avec 50 avis 4,8/5, tu rankeras dans le top 3 local sur "VTC + ta ville".

### Repondre aux avis

**Toujours.** Meme aux 5 etoiles ("Merci !"). Et surtout aux mauvais avis (restez professionnel, proposez une solution).

## Astuces avancees

### Posts reguliers

Publie 1 post/semaine sur ta fiche Google :
- Nouveau forfait
- Temoignage client
- Astuce voyage

Les fiches actives rankent mieux.

### Messages directs

Active la fonction "Messages" : les clients peuvent te contacter direct depuis Google.

### Question / reponse

Ajoute toi-meme les questions frequentes et leurs reponses sur ta fiche.

## Combinaison Google + site MonVTC

Google amene des clients. Le site MonVTC les convertit (reservation en ligne, forfaits, WhatsApp).

Le duo imbattable :
- **Google Business** : visibilite gratuite
- **Site MonVTC** : reservation 24/7 + SEO local + crédibilite

**Prochaine etape** : le site internet professionnel.`,
      },
      {
        title: "Ton site internet professionnel",
        content: `# Le site web : ton commercial qui bosse 24h/24

Un site VTC professionnel, c'est le complement indispensable de Google Business. Pendant que tu dors, il encaisse.

## Pourquoi tu dois avoir un site

### 1. Credibilite
Un site pro rassure le client. Une page Facebook ou un numero Uber-style fait amateur.

### 2. Independance des plateformes
Uber prend 25% de ton CA. Bolt aussi. Un site = 0% de commission.

### 3. SEO (referencement naturel)
Sur des requetes type "VTC [ta ville]" ou "transfert aeroport [ville]", un site bien fait capte du trafic gratuit.

### 4. Fidelisation
Un client qui a déjà reserve sur ton site revient directement, sans passer par une appli.

### 5. Professionnalisme
Tu peux mettre tes tarifs, ton offre, ton image, tes partenariats, tes specialites.

## Que doit avoir un bon site VTC

### Fonctionnalites essentielles

1. **Formulaire de reservation en ligne**
   - Points A et B (avec autocompletion Google Maps)
   - Date et heure
   - Nombre de passagers et bagages
   - Coordonnees client

2. **Calcul automatique du tarif**
   - Distance calculee via Google Maps
   - Prix affiche instantanement

3. **Paiement en ligne** (optionnel)
   - Stripe ou equivalent
   - Acompte ou paiement complet

4. **Forfaits** (trajets populaires)
   - Aeroport, gares, villes voisines
   - Prix fixes affiches

5. **Integration WhatsApp**
   - Bouton "Reserver sur WhatsApp" bien visible
   - Reception des demandes en direct

6. **Mentions legales + CGV** (obligatoires)

7. **SEO local optimise**
   - Titre page : "VTC [Ville] — [Ta marque]"
   - Meta descriptions
   - Schema.org LocalBusiness
   - Contenu adapte a ta zone

### Design

- Mobile-first (70% du trafic vient du téléphone)
- Vitesse de chargement rapide (<2 secondes)
- Couleurs sobres et pro
- Photos de qualite
- Call-to-action clairs ("Reserver maintenant", "Appeler")

## Les solutions possibles

### Option 1 : Site gratuit DIY
**Exemples** : Wix, Wordpress free
**Cout** : 0 EUR
**Mais** : pas de reservation integree, pas de SEO local serieux, design amateur, subdomain gratuit (nomdomaine.wix.com)
**Verdict** : a eviter. Tu fais du VTC, pas du web design.

### Option 2 : Freelance / agence
**Cout** : 2 000 - 10 000 EUR + maintenance 50-200 EUR/mois
**Pour** : personnalisation extreme
**Contre** : tres cher, long (2-6 mois), maintenance a payer

### Option 3 : Solutions cles en main VTC (recommande)
**Exemple** : MonVTC (vtc-site.fr)
**Cout** : 199 EUR setup + 29 EUR/mois
**Inclut** : site complet + reservation + SEO + WhatsApp + Google Maps + hebergement + support
**Delai** : 24-48h
**Verdict** : le meilleur rapport qualite-prix pour un chauffeur VTC independant.

## Comment MonVTC fonctionne

1. Tu t'inscris sur vtc-site.fr
2. Tu donnes tes infos (nom, ville, tarifs, zones, téléphone)
3. En moins de 24h, ton site est en ligne sur tonnom.vtc-site.fr
4. Tu peux avoir ton propre nom de domaine (tonnom-vtc.fr) plus tard
5. Les reservations arrivent sur ton WhatsApp
6. Tu gagnes en credibilite et en visibilite

## Le nom de domaine

Ideal : **tonNom-vtc.fr** ou **nomDeVille-vtc.fr**

Exemples :
- mehdivtc.fr
- nordvtc.fr
- lillevtc.com

Cout : 10-15 EUR/an chez OVH ou Gandi.

## Contenu essentiel a mettre sur le site

### Page d'accueil
- Hero avec phrase d'accroche + photo du véhicule
- Presentation rapide
- Formulaire de reservation
- Forfaits populaires
- Temoignages

### Page "Tarifs"
- Prix au km
- Forfaits detailles
- Modalites de paiement

### Page "Zones"
- Toutes les villes couvertes
- Aeroports et gares desservis

### Page "Qui sommes-nous"
- Presentation du chauffeur (toi)
- Photo professionnelle
- Annees d'expérience
- Valeurs (ponctualite, confort, sécurité)

### Blog (optionnel)
- Articles sur les evenements de ta région
- Astuces voyage
- Actualites locales
- Renforce le SEO local

## Integration avec les reseaux sociaux

Liens vers :
- Ta page Facebook
- Instagram (photos du véhicule, itineraires)
- LinkedIn (pour le B2B)

## Le piege du "site pas assez bien"

Certains chauffeurs font un "site vite fait" avec des outils gratuits. Résultat : ils ne rankent jamais, ne recoivent aucun client via leur site, et pensent que "ca marché pas".

**Un site pro = un investissement rentable.** Pas un cout.

**Prochaine etape** : reseaux sociaux et partenariats.`,
      },
      {
        title: "Reseaux sociaux et partenariats locaux",
        content: `# Demultiplier ses sources de clients

Un VTC qui reussit a 3-5 canaux d'acquisition de clients. Voici comment construire ton ecosysteme.

## Les reseaux sociaux pour un VTC

### Facebook
**Utile** pour :
- Groupes locaux ("Entre habitants de [Ville]")
- Annonces gratuites sur Marketplace
- Publications evenements locaux

**Astuces** :
- Rejoins les groupes "Bon plans [Ville]"
- Poste (avec moderation) quand quelqu'un cherche un VTC
- N'importunes pas les groupes avec du spam

### Instagram
**Utile** pour :
- Photos du véhicule
- Ambiance soirees / mariages
- Stories de ton quotidien (sans visage client)
- Contenu lifestyle local

**Contenu a poster** :
- Photos du véhicule dans de beaux endroits locaux
- Avant/après nettoyage
- Ta cliente "equipement VIP" (bouteilles, charger)
- Temoignages clients (avec accord)

**Objectif** : 500-2000 abonnes locaux en 6 mois.

### TikTok
Marché super bien pour les VTC qui racontent :
- Anecdotes de courses (pas d'identification clients)
- Astuces de chauffeur
- Conseils pour clients
- Coulisses (preparation matin, pause dej, etc.)

Un compte TikTok local peut vraiment exploser. Plusieurs VTC français atteignent 50k+ abonnes.

### LinkedIn
Indispensable pour le **B2B** :
- Chefs d'entreprise locaux
- Cadres commerciaux qui bougent
- Consultants / formateurs

Publie :
- Ton offre "Compte entreprise VTC"
- Temoignages B2B
- Actualites business locales

Un seul compte B2B qui commande 10 courses/mois = 2 000 EUR/mois de CA fixe.

### YouTube
Long terme, excellent pour le SEO. Exemples de videos :
- "Comment fonctionne un VTC a Lille ?"
- "Les 5 meilleurs restaurants accessibles en VTC a Lyon"
- "Je fais une course Paris-Londres : tout ce qu'il faut savoir"

## Les partenariats locaux

**La stratégie la plus rentable pour un VTC.**

### Hotels
Approche : visite 3-4 hotels 3/4 etoiles de ta ville. Dis-leur :
> "Je suis chauffeur VTC professionnel a [Ville]. Je propose aux hotels de mon reseau un partenariat : vos clients me contactent directement, je leur offre une course confort et ponctuelle, et je vous remercie avec une commission de 10% ou une course offerte par semaine."

Imprime des **cartes de visite de qualite** a deposer a la reception.

**Résultats moyens** : 2-5 courses/semaine par hotel partenaire.

### Restaurants haut de gamme
Les restaurants gastronomiques recoivent des clients qui dinent, boivent, et veulent rentrer en VTC. Partenariat similaire.

**Astuce** : propose au restaurateur un QR code avec ta fiche, scotche sur le menu ou l'addition.

### Entreprises locales
Cibles :
- PME/ETI
- Cabinets d'avocats
- Etudes notariales
- Agences de communication

Propose un "Compte entreprise" avec facturation mensuelle.

### Agences evenementielles
Mariages, seminaires, soirees VIP. Un seul evenement peut te rapporter 1 000-3 000 EUR.

### Salles de mariage, DJ, wedding planners
Reseau de recommandations croisees.

### Cliniques esthetiques / medicales
Les patients après chirurgie ne peuvent pas conduire. Marché discret mais constant.

### Coaches sportifs, kines, osteopathes
Leurs clients se deplacent, souvent a heures fixes.

### Hotels en residence/airbnb
Partenariat avec des hotes Airbnb locaux qui accueillent des etrangers.

## Le bouche-a-oreille : ton vrai or

**70% des clients fideles viennent du bouche-a-oreille.**

Pour le declencher :
1. **Offre un service irreprochable a 100% de tes clients**
2. **Remets une carte de visite a la fin de chaque course**
3. **Propose un programme de parrainage** : "5 EUR de reduction pour vous + 5 EUR pour votre ami"
4. **Reste en contact** : SMS tous les 2 mois ("Juste pour vous souhaiter...")

### Tes cartes de visite

- Qualite premium (carton epais, finition mate)
- QR code vers ton site
- Photo du véhicule
- Numero de téléphone ET WhatsApp
- Site web

Prix : 30 EUR pour 500 cartes sur Vistaprint / Moo.

## Le SEO local

En plus de Google Business, optimiser pour :
- "VTC [ville]"
- "Transfert aeroport [ville]"
- "Chauffeur prive [ville]"
- "VTC [gare principale]"
- Longue traine : "VTC Lille pas cher", "VTC Lyon aeroport weekend"

Un site MonVTC te couvre déjà sur ces requetes. Complete avec des articles de blog locaux.

## Publicite payante

### Google Ads
Coute cher en VTC (2-5 EUR le clic) mais efficace en ROI.
Budget debut : 10 EUR/jour = 300 EUR/mois.

### Facebook/Instagram Ads
Moins cher (0,50-2 EUR le clic) mais moins qualifie.

**Attention** : teste petits budgets (10-50 EUR) avant de scaler. Et calcule toujours ton coût d'acquisition client.

## La stratégie 80/20

Sur 10 unites d'effort, repartis ainsi :
- **3** : Google Business Profile (gratuit, enorme ROI)
- **3** : Site web + SEO (via MonVTC)
- **2** : Partenariats locaux (hotels, restaurants)
- **1** : Reseaux sociaux (Instagram, TikTok)
- **1** : Publicite payante (test)

**Ne pas se disperser.** Mieux vaut être excellent sur 3 canaux que moyen sur 10.

**Prochaine etape** : développer ton activité et fideliser.`,
      },
    ],
    checklist: [
      "Créer ma fiche Google Business Profile",
      "Valider ma fiche par SMS ou courrier",
      "Uploader 10 photos de qualite (véhicule, toi, intérieur)",
      "Optimiser ma description avec mots-cles et ville",
      "Commander mes cartes de visite (500 minimum)",
      "Contacter 5 hotels et 5 restaurants de ma ville",
      "Créer mon site MonVTC",
      "Ouvrir un compte Instagram dedie VTC",
      "Demander un avis Google après chaque course reussie",
    ],
  },
  {
    id: 6,
    day: 28,
    slug: "développer-fideliser",
    title: "Développer et fideliser",
    subtitle: "Tarifs, spécialisation, avis, 100% clients directs",
    duration: "50 min",
    lessons: [
      {
        title: "Fixer ses tarifs intelligemment",
        content: `# La tarification : le choix qui fait ou defait ta rentabilite

Trop cher, tu perds les clients. Trop bas, tu t'epuises pour rien. Voici la methode.

## Les modeles de tarification

### 1. Tarif au kilometre
- Simple, transparent
- Prix/km : 1,50 - 2,50 EUR selon la zone
- Minimum de course : 15-20 EUR

### 2. Tarifs forfaitaires
- Prix fixe pour les trajets populaires (aeroports, gares)
- Rassure le client (pas de mauvaise surprise)
- Majoration nuit/weekend possible (+20% typique)

### 3. Tarif horaire (mise a disposition)
- Pour les clients VIP, business, evenements
- 45-80 EUR/heure selon la zone et le service

### 4. Abonnements / packages
- "10 courses aeroport prepayes"
- Comptes entreprise avec tarif negocie

## Analyse des prix dans ta zone

**Avant de fixer tes tarifs, etudie la concurrence.**

### Methode
1. Liste tes 5 principaux concurrents VTC locaux
2. Note leurs tarifs (site web, Google Business, appel test)
3. Calcule la moyenne
4. Positionne-toi selon ta stratégie :
   - **Leader prix bas** : -10 a -20% de la moyenne (volume)
   - **Milieu de marché** : prix moyen (equilibre)
   - **Premium** : +20 a +50% (clientèle aisee, service exceptionnel)

### Attention aux plateformes

Uber et Bolt affichent des prix souvent inferieurs a ce qui est rentable en independant (ils compensent avec le volume massif). Ne t'aligne pas dessus.

## Ton coût de revient

**Tu dois connaître ton prix minimum au km.**

### Calcul
- Véhicule (amortissement, credit, location) : X EUR/mois
- Assurance : X EUR/mois
- Carburant : X EUR/km
- Entretien : 0,10 EUR/km
- Charges URSSAF (21,1%) : X% du CA
- Site, téléphone, divers : 100-200 EUR/mois

Exemple pour un Peugeot 508 hybride en LLD :
- Véhicule : 600 EUR/mois
- Assurance : 350 EUR/mois
- Carburant : 0,08 EUR/km
- Entretien : 0,10 EUR/km
- Divers : 150 EUR/mois
- **Charges fixes mensuelles** : 1 100 EUR
- **Charges variables** : 0,18 EUR/km

Si tu fais 3 000 km/mois :
- Cout total : 1 100 + 540 = 1 640 EUR
- + URSSAF 21,1% du CA

Pour degager 2 000 EUR net, tu as besoin d'un CA de ~5 000 EUR/mois.

**Cout de revient/km minimum** : 1,10 - 1,40 EUR selon ton véhicule.
**Ne vends jamais en dessous de 1,80 EUR/km** (sinon tu paies pour travailler).

## Les tarifs qui marchent

### Ville / departement moyen

- Prix/km : 1,80 - 2,00 EUR
- Minimum course : 15 EUR
- Attente : 30 EUR/h au-dela de 15 min gratuites

### Ile-de-France / grandes metropoles

- Prix/km : 2,00 - 2,50 EUR
- Minimum course : 20 EUR
- Transfert CDG depuis Paris : 70-90 EUR
- Transfert Orly depuis Paris : 50-70 EUR

### Zones tendues (luxe, Cote d'Azur)

- Prix/km : 2,50 - 3,50 EUR
- Tarif horaire : 80-120 EUR

## Majoration et reductions

### Majorations justifiables
- **Nuit (22h-6h)** : +20-30%
- **Dimanches et jours feries** : +20%
- **Attente > 15 min** : 30 EUR/h au prorata
- **Bagages exceptionnels (vélos, skis)** : +10 EUR

### Reductions strategiques
- **Compte entreprise** : -10-15%
- **Aller-retour dans la journee** : -5-10%
- **Reservation > 48h avant** : -5%
- **Parrainage** : 5 EUR de reduction au parraine

## Afficher vos tarifs clairement

**Transparence = confiance.** Affiche tes tarifs sur :
- Ton site web (MonVTC le fait automatiquement)
- Ta fiche Google Business
- Dans tes cartes de visite (tarifs des forfaits populaires)

## Pourboires et extras

Les pourboires sont legaux mais non obligatoires. Astuces :
- Ne les demande jamais
- Si on t'en donne, remercie simplement
- Pour le TVA : techniquement imposables, mais flou fiscal

## L'erreur a ne pas faire

**Ajuster son tarif pour chaque client.** Résultat : clients qui comparent, negocient, insatisfaits.

Un tarif juste et transparent. Point.

## Ma recommandation

### Demarrage (mois 1-3)
- Prix moyen du marché local
- Forfaits populaires alignés sur la concurrence
- Attire des clients, construis ton portefeuille

### Consolidation (mois 3-12)
- Augmente les tarifs de 5-10% tous les 6 mois
- Selectionne progressivement les clients (garde les fideles, perds les grincheux)

### Après 1 an
- Positionnement premium si tes avis sont excellents
- Clientèle d'habitues

**Prochaine etape** : obtenir des avis 5 etoiles systematiquement.`,
      },
      {
        title: "Obtenir 50 avis 5 etoiles",
        content: `# La methode pour collectionner les avis 5 etoiles

Les avis sont le leveir N-1 du ranking Google et de la conversion. Voici comment atteindre 50 avis en 6 mois.

## Pourquoi les avis changent tout

### Ranking Google
Ta fiche Google Business rank principalement sur :
1. Pertinence (ton activité correspond a la recherche)
2. Distance (le client est proche)
3. **Notoriete** : nombre et qualite des avis

Avec 50 avis 4,8/5, tu passes devant des concurrents avec de meilleurs emplacements.

### Conversion
88% des consommateurs font autant confiance aux avis en ligne qu'aux recommandations personnelles. Une fiche avec 50 avis 5 etoiles convertit 3-5x plus qu'une fiche vide.

## La methode infaillible

### Regle 1 : Demande systematiquement

Ne laisse jamais un client satisfait partir sans demander son avis.

### Regle 2 : Demande au bon moment

**Le meilleur moment** : dans les 5 minutes après avoir depose le client.

Pourquoi ? L'expérience est encore fraiche, positive, et le client a du temps (il attend quelqu'un, monte dans son bureau, etc.).

### Regle 3 : Facilite l'action

Envoie un SMS/WhatsApp avec le lien DIRECT vers le formulaire d'avis.

### Template SMS parfait

> "Merci pour votre course ! Si le trajet s'est bien passe, un avis Google me ferait enormement plaisir : [lien court]. Excellente journee !"

### Generer ton lien d'avis

1. Va sur ta fiche Google Business
2. Clique "Obtenir plus d'avis"
3. Copie le lien court (type g.page/r/CXxxx/review)
4. Enregistre-le dans un modele SMS sur ton téléphone

### Automatiser l'envoi

Avec MonVTC, après chaque course terminee dans ton dashboard, un SMS d'avis peut partir automatiquement. Tu ne fais rien, les avis arrivent tout seul.

## Le timeline realiste

### Mois 1-2
- 10-15 avis
- Travaille chaque client comme un VIP
- Demande a 100% des clients (sans exception)

### Mois 3-4
- 25-30 avis cumules
- Les clients reguliers deviennent des ambassadeurs
- Le bouche-a-oreille commence

### Mois 5-6
- 50+ avis
- Tu deviens reference locale
- Les demandes affluent via Google

## Gérer les avis negatifs

**Inevitable.** Voici la regle :

### Les 4 etapes

1. **Ne pas repondre a chaud.** Laisse 24h passer.
2. **Reponse publique professionnelle** :
   > "Bonjour [Prenom], je suis desole de lire votre retour. Pourriez-vous me contacter au [tel] pour que je comprenne ce qui s'est passe et puisse trouver une solution ?"
3. **Contacte le client directement**. Ecoute sa doleance, presente des excuses si justifie.
4. **Si la situation est resolue**, demande-lui gentiment de modifier son avis.

### Les avis clairement abusifs
Un client mechant sans raison valable peut être signale a Google. Taux de succes : 40-60%. Essaie au moins.

### Les avis 1-2 etoiles sans commentaire
Parfois des clients cliquent accidentellement. Tu peux les signaler aussi.

## Les avis sur d'autres plateformes

Ne neglige pas :
- **Tripadvisor** (pour les touristes)
- **Facebook** (si tu as une page)
- **Pages Jaunes**

Mais **priorise Google Business a 90%**. C'est la ou tout le monde cherche.

## Les techniques avances

### Le QR code "avis"

Colle un petit QR code dans ton véhicule (par-soleil passager, dossier de siege) qui mene direct au formulaire d'avis.

### La carte "merci"

A la fin de la course, donne une petite carte :
> "Merci pour votre course ! Si vous avez aime, un avis Google sur [QR code] serait precieux. Bonne journee !"

### Le follow-up par email

Si tu as l'email du client (reservation en ligne), envoie 1 email 24h après la course :
> "Bonjour [Prenom], merci d'avoir choisi [TaMarque] hier. J'espere que le trajet etait confortable. Si oui, votre avis sur Google nous aiderait enormement : [lien]. Merci beaucoup !"

### Le parrainage

> "Offrez 5 EUR a un ami + recevez 5 EUR : demandez-lui de laisser un avis après sa première course."

## Ce qu'il NE faut PAS faire

### Acheter des avis
**Illegal.** Google detecte et penalise. Risque : suppression totale de ta fiche.

### Demander seulement aux meilleurs clients
**Stratégie biaisee.** Demande a tout le monde et laisse la moyenne se faire naturellement.

### Repondre aggressivement
Meme a un avis injuste, reste pro. Les prospects lisent ta reponse autant que l'avis.

### Oublier de remercier les avis positifs
Chaque avis merite une reponse. 10 secondes par avis. Ca montre que tu es engage.

## Résultat attendu a 6 mois

- **50-80 avis**
- **Note moyenne 4,8-5,0**
- **Top 3 local sur "VTC [ta ville]"**
- **5-15 appels entrants/semaine via Google**

**Prochaine etape** : se specialiser sur un creneau rentable.`,
      },
      {
        title: "Se specialiser : la voie des meilleurs",
        content: `# La spécialisation : comment gagner 2-3x plus

Les VTC generalistes se battent sur le prix. Les VTC specialises facturent plus cher et fidelisent mieux.

## Pourquoi se specialiser

### Avantages
- **Tarifs plus eleves** (+30-100% vs generaliste)
- **Clientèle fidele** (tu deviens "le" chauffeur de...)
- **Differenciation** (plus de concurrence sur le prix)
- **Marketing plus efficace** (cible precise)
- **Confort** (trajets previsibles, routine)

### Inconvenients
- **Marché plus petit** (moins de clients potentiels)
- **Dependance a un secteur** (si ce secteur baisse, toi aussi)

## Les meilleures niches VTC

### 1. Transfert aeroport / gare
**Le plus rentable.**

Prix moyen : 70-150 EUR par course
Frequence : matin tres tot (5-8h) et soir (18-22h)
Clientèle : voyageurs business, vacanciers

**Avantages** :
- Tarifs forfaitaires (prix clair)
- Courses longues (plus rentables)
- Reservations a l'avance (previsibilite)
- Clientèle business fidele

**Comment se specialiser** :
- Partenariats avec hotels a proximite des aeroports
- Positionnement SEO "VTC aeroport [ville]"
- Offre "a l'heure dite" (garantie)

### 2. Clientèle business / entreprise

**Tres stable et recurrent.**

Prix moyen : comptes mensuels a 500-3 000 EUR/mois
Frequence : reguliere

**Cibles** :
- PME locales (cadres dirigeants)
- Cabinets d'avocats, notaires
- Agences de conseil
- Banques privees

**Offre** :
- Comptes entreprise (facturation mensuelle)
- Chauffeur prive dedie
- Voiture premium (Mercedes Classe E, Tesla Model S)

### 3. Mariages et evenements

**Prestation premium.**

Prix : 300-800 EUR par evenement
Frequence : saisonnier (mai-septembre surtout)

**Comment se positionner** :
- Partenariat avec salles de mariage, wedding planners
- Véhicule tres haut de gamme
- Service impeccable (costume, fleurs, chocolats)
- Package photo possible

### 4. Tourisme haut de gamme

**Ville a fort tourisme : Paris, Nice, Cannes, Bordeaux, Lyon.**

Prix : 70-150 EUR/heure
Frequence : saisonnier

**Offre** :
- Visites guidees privees
- Tours de la ville
- Routes des vins (Bordeaux, Alsace)
- Chauffeur bilingue (anglais, chinois, russe selon clientèle)

### 5. Transport medical

**Stable et regulier.**

Prix : rembourse par la Sécurité sociale (conditions)
Frequence : quotidienne pour certains patients

**Attention** : agreement prefectoral specifique pour le conventionne Sécurité sociale.

### 6. Soirees et discotheques

**Week-end intensif.**

Prix : 30-60 EUR/course
Frequence : vendredi-samedi soir

**Clientèle** : jeunes, groupes d'amis
**Avantage** : tarif de nuit majore, pourboires frequents

### 7. Luxe / VIP

**Le summum.**

Prix : 100-250 EUR/heure
Frequence : a la demande

**Cibles** : celebrities, dirigeants grandes entreprises, personnalites politiques
**Exigences** : discretion absolue, véhicule ultra-premium, habillement impeccable

## Comment choisir sa niche

### Critères
1. **Marché local** : existe-il une demande dans ta ville ?
2. **Tes preferences** : tu aimes parler ? Tu preferes l'aeroport ?
3. **Ton véhicule** : est-il adapte a cette niche ?
4. **Concurrence** : y a-t-il déjà beaucoup de specialistes ?
5. **Marge** : est-ce rentable ?

### Methode pratique

1. Fais une liste de 3-4 niches possibles dans ta ville
2. Etudie la concurrence sur chacune (Google, avis)
3. Evalue la demande (recherches Google sur la requete type)
4. Choisis la niche ou la demande est forte et la concurrence faible

## Passer generaliste a specialise

### Etape 1 : Continuer le generaliste a 80%
Ne coupe pas ton flux de revenus actuel.

### Etape 2 : Investir 20% de ton temps sur la niche
- Marketing dedie (site, Google Ads)
- Partenariats specifiques
- Contenus reseaux sociaux cibles

### Etape 3 : Basculer progressivement
Après 3-6 mois, si la niche rapporte, passe a 50/50. Puis 80% niche / 20% generaliste.

### Etape 4 : 100% specialiste
Après 1-2 ans, tu peux être 100% sur ta niche.

## Marketing par niche

### Aeroport
- Site avec meta "VTC aeroport [ville]"
- Google Ads sur "transfert CDG pas cher"
- Partenariat hotels proches aeroport

### Business
- Compte LinkedIn actif
- Flyer pro a deposer dans les halls d'entreprise
- Offre "1er essai offert"

### Mariage
- Instagram dedie "MariageVTC[Ville]"
- Partenariats wedding planners / salles
- Book photo avec véhicule decore

### Tourisme
- Site en anglais
- Listing sur GetYourGuide, Viator
- Offres "package full day"

## Combien tu peux gagner

Avec une niche bien choisie et bien travaillee :

- **Aeroport** : 5 000 - 8 000 EUR/mois
- **Business** : 4 000 - 10 000 EUR/mois (comptes fideles)
- **Mariage** : 3 000 - 6 000 EUR/mois (haute saison)
- **Tourisme luxe** : 6 000 - 15 000 EUR/mois (villes touristiques)
- **Generaliste** : 3 000 - 5 000 EUR/mois

La spécialisation peut facilement doubler tes revenus en 12 mois.

**Prochaine etape** : couper le cordon avec les plateformes.`,
      },
      {
        title: "Basculer 100% vers les clients directs",
        content: `# La liberte totale : 0% commission, 100% clients directs

C'est l'objectif de tout chauffeur VTC ambitieux. Voici la methode en 12 mois.

## Pourquoi quitter les plateformes

### Le cout invisible d'Uber et consorts

- **25% de commission** sur chaque course
- **Tarifs imposes** (souvent trop bas)
- **Clients anonymes** (impossible de les fideliser)
- **Dependance totale** (si ils coupent ton compte, tu es a sec)
- **Notes arbitraires** (un client mal lune peut ruiner ta moyenne)
- **Peu de contrôle** (annulations, plaintes injustes)

### Calcul concret

Un VTC qui fait 5 000 EUR/mois sur Uber :
- CA reel encaisse : 3 750 EUR (après 25% commission)
- Net après charges URSSAF : ~3 000 EUR
- **Manque a gagner vs client direct** : 1 250 EUR/mois = 15 000 EUR/an

En 5 ans : **75 000 EUR perdus** en commissions.

## La transition en 12 mois

### Mois 1-3 : Fondations

- Créer fiche Google Business + 10 premiers avis
- Lancer site MonVTC
- Imprimer cartes de visite
- Reseaux sociaux (Instagram + Facebook local)

**Repartition CA** :
- Plateformes : 95%
- Direct : 5%

### Mois 3-6 : Construction du reseau

- Partenariats hotels (2-3)
- Partenariats restaurants (2-3)
- Atteindre 30 avis Google
- Publicite payante locale legere (50-100 EUR/mois)

**Repartition CA** :
- Plateformes : 70%
- Direct : 30%

### Mois 6-9 : Acceleration

- Comptes entreprise (3-5 dejà signes)
- Bouche-a-oreille installe
- 50 avis Google
- Top 5 Google Maps local

**Repartition CA** :
- Plateformes : 40%
- Direct : 60%

### Mois 9-12 : Transition finale

- Baisse progressive des heures sur les plateformes
- Augmentation du taux horaire en direct
- Specialisation amorcee

**Repartition CA** :
- Plateformes : 10-20%
- Direct : 80-90%

### Après 12 mois

- **100% clients directs** (ou 5-10% plateformes en complement saisonnier)

## Les 5 canaux d'acquisition a actionner

### 1. Google (gratuit)
Google Business Profile + site web + SEO.
Volume : 40-60% de tes clients.

### 2. Partenariats locaux (moyen effort, gros rendement)
Hotels, restaurants, agences. Volume : 20-30% de tes clients.

### 3. Bouche-a-oreille (passif, exponentiel)
Clients fideles qui parlent de toi. Volume : 15-25% de tes clients.

### 4. Reseaux sociaux (tempsfort, ROI moyen)
Instagram + TikTok local. Volume : 5-15%.

### 5. Publicite payante (payant, scalable)
Google Ads + Facebook Ads local. Volume : 5-10%.

## Les erreurs a eviter

### Couper les plateformes trop tot
Tu casses ton revenu. Attends d'avoir 60%+ en direct.

### Ne pas investir dans les outils
Site pas pro, pas de terminal CB, pas d'assurance pro = clients qui passent leur tour.

### Sous-estimer le temps
12 mois, c'est le rythme realiste. Pas 3 mois.

### Ne pas demander d'avis
Sans avis, Google ne te fait pas confiance, et les prospects non plus.

### Rester generaliste
La spécialisation accelere la transition.

## Outils indispensables

| Outil | Role | Cout |
|-------|------|------|
| MonVTC | Site + reservation + SEO | 29 EUR/mois |
| Google Business | Visibilite locale | 0 EUR |
| Indy | Comptabilité + facturation | 12 EUR/mois |
| SumUp | Paiement CB | 0 EUR + 1,75%/tx |
| Qonto | Compte bancaire pro | 9 EUR/mois |
| Canva | Visuels reseaux sociaux | 0 EUR (free) |

**Cout total** : ~50 EUR/mois. Rentabilise des le 1er client direct.

## Le role du site MonVTC dans cette bascule

Le site MonVTC joue un role central :

1. **Capture Google** : SEO local optimise = trafic gratuit
2. **Reservation 24/7** : les clients reservent meme quand tu dors
3. **Credibilite** : site pro rassure vs "juste un numero"
4. **Integration WhatsApp** : conversation fluide avec les clients
5. **Facturation** : factures envoyees automatiquement
6. **Fidelisation** : clients reviennent sur ton site directement
7. **Marketing** : base pour tes cartes, reseaux sociaux, publicites

Sans site, la transition est 3x plus longue et tu perds beaucoup de clients potentiels.

## Le pouvoir de la recurrence

Un client direct satisfait vaut **10x plus** qu'un client plateforme :

- Il revient 5-20 fois par an
- Il te recommande a 2-3 personnes
- Il paie au tarif plein (pas de bataille de prix)
- Il devient un "client VIP" tolerant en cas de petit souci
- Il te laisse un avis Google

**1 client plateforme** = 1 course, 15% net.
**1 client direct** = 10 courses/an + 3 recommandations, 100% du CA.

## Le cas des comptes entreprise

**L'eldorado du VTC direct.**

Un seul compte entreprise peut valoir :
- 10-30 courses/mois garanties
- Facturation mensuelle (pas de gestion paiement)
- Prix negociable mais rentable
- Visibilite sur la marque entreprise

**3 comptes entreprise = 2 000-5 000 EUR/mois stable.** Ton rêve.

## La liberte retrouvee

Après 1 an en 100% direct :

- **Plus de boss** (ni Uber ni Bolt)
- **Contrôle total** sur tes tarifs, horaires, clients
- **Image pro** etablie localement
- **Revenus 30-50% plus eleves** a CA equivalent
- **Clients fideles** qui te soutiennent

**C'est l'aboutissement.** Tu n'es plus "chauffeur Uber". Tu es **entrepreneur VTC**.

## Ton plan d'action après cette formation

1. **Mois 1** : si pas encore VTC, formation + examen. Si déjà VTC, optimisations (Google Business + site MonVTC)
2. **Mois 2-3** : les 30 premiers avis + partenariats locaux
3. **Mois 4-6** : premiers comptes entreprise + spécialisation amorce
4. **Mois 7-12** : bascule vers 70%+ en direct

**Dans 1 an, tu seras a une place que 95% des chauffeurs VTC n'atteignent jamais.**

Bonne route !`,
      },
    ],
    checklist: [
      "Definir ma stratégie de prix (aligne marché / premium / volume)",
      "Calculer mon cout de revient/km exact",
      "Mettre en place un process 100% automatique de demande d'avis",
      "Atteindre 10 avis dans le 1er mois",
      "Atteindre 50 avis en 6 mois",
      "Choisir ma spécialisation (aeroport, business, mariage...)",
      "Signer 3 partenariats locaux (hotels, restaurants)",
      "Signer 3 comptes entreprise d'ici 12 mois",
      "Basculer a 70%+ de clients directs en 12 mois",
    ],
  },
  {
    id: 7,
    day: 45,
    slug: "optimiser-son-activité",
    title: "Optimiser son activité",
    subtitle: "Fiscalité, comptabilité, gestion du temps",
    duration: "40 min",
    lessons: [
      {
        title: "Optimiser sa fiscalité",
        content: `# Optimiser sa fiscalité de chauffeur VTC

Passer en micro-entreprise ou en EURL/SASU selon ton CA. Au-dela de 77 700 euros, la micro devient inadaptee.

## Abattement micro-BNC

50% d'abattement automatique si tu es prestataire de services (VTC = BNC). Impôt sur le revenu calcule sur la moitie de ton CA uniquement.

## Versement liberatoire

Si ton RFR < 27 086 euros en 2024, tu peux opter pour le versement liberatoire : 2,2% d'impôt preleve en meme temps que les cotisations sociales. Simplicite maximale.

## Quand passer en société

- CA > 77 700 euros : micro BNC plus possible
- Tu veux optimiser tes revenus (dividendes vs salaire)
- Tu veux te développer (recruter, investir)

EURL = simple, 1 seul associé (toi). SASU = plus flexible pour future croissance.

## Frais déductibles en société

Carburant, peages, entretien, assurance, téléphone, formation continue, abonnement MonVTC, partie du loyer si home office... Tout est déductible du résultat.`,
      },
      {
        title: "Tenir sa comptabilité sans comptable",
        content: `# Comptabilité pour micro-entreprise VTC

En micro, c'est simple : tu dois tenir un **livre de recettes** et c'est tout.

## Le livre de recettes

Tableau Excel ou Google Sheets avec : date, client, montant, mode de paiement. C'est une obligation legale.

## Declarations URSSAF

Mensuel ou trimestriel, selon ton choix. 21,2% sur ton CA (cotisations sociales + impôt si versement liberatoire).

## Facturation

Tu dois facturer **chaque course**. Apps VTC (Uber, Bolt) le font automatiquement. Clients directs : génère tes factures via MonVTC ou un outil gratuit (Freebe, Henrri).

## TVA

En micro, tu es en franchise de TVA jusqu'a 36 800 euros de CA. Au-dela, tu dois facturer la TVA (10% transport de personnes) et la reverser.

## Cas ou un expert-comptable vaut le coup

- Tu passes en EURL/SASU
- Ton CA depasse 60k euros
- Tu n'as pas le temps (tarif : 80-150 euros/mois pour une EURL VTC)`,
      },
      {
        title: "Gérer son temps et eviter le burnout",
        content: `# Ne pas tomber dans le piege des 70h/semaine

Beaucoup de chauffeurs debutants font 12h par jour 6j/7 pour "maximiser". Résultat : burnout en 6 mois, marge reduite, accidents en hausse.

## La regle des 50h

Max 50h de conduite par semaine. Au-dela, tu perds en vigilance, tu conduis moins bien, les clients le sentent.

## Planifier ses creneaux rentables

Analyse tes courses sur 30 jours : identifie tes 20% de courses qui genrerent 80% de ton CA. Concentre-toi dessus.

**Creneaux habituellement rentables :**
- Mercredi-vendredi soir (sorties, restos)
- Samedi nuit
- Dimanche matin (aeroports)
- Matins de semaine (business)

**A eviter :** Lundi matin, dimanche après-midi (peu de demande).

## Batch les courses

Prendre 3 courses d'affilee dans le meme quartier > prendre 3 courses eparpilles en 8h. Optimise tes trajets.

## Repos obligatoire

Minimum 1 jour off par semaine complet. Sinon tu vas tenir 6 mois et t'arreter.`,
      },
    ],
    checklist: [
      "Choisir mon regime fiscal (micro vs EURL/SASU)",
      "Activer le versement liberatoire si eligible",
      "Mettre en place mon livre de recettes",
      "Planifier mes creneaux rentables sur 1 mois",
      "Fixer mes jours off et les respecter",
      "Faire un bilan trimestriel CA/dépenses",
    ],
  },
  {
    id: 8,
    day: 60,
    slug: "scaler-et-deleguer",
    title: "Scaler et deleguer",
    subtitle: "Passer au niveau superieur : flotte, salariés, investissements",
    duration: "40 min",
    lessons: [
      {
        title: "Embaucher un second chauffeur",
        content: `# Passer de 1 a 2 chauffeurs

Après 12-18 mois solo, si tu refuses des courses faute de temps, c'est le signe qu'il faut embaucher.

## Les 2 options

**Option 1 : Salarié CDI** (le plus simple legalement)
- Cout total employeur : ~2 800 euros/mois pour 1 800 euros net
- Charges : ~45% sur le brut
- Avantages : tu gardes tout le CA

**Option 2 : Sous-traitance avec un autre VTC independant**
- Tu lui laisses 70-75% du CA des courses que tu lui transferes
- Pas de charges salariales
- Attention au marchandage de main d'oeuvre (interdit)

## Le calcul de rentabilite

Ton chauffeur doit generer min 5 000 euros de CA/mois pour être rentable en CDI. Soit environ 6-7h de conduite/jour, 6 jours/semaine.

## Les obligations

- Mutuelle obligatoire
- Visite médicale d'embauche
- Contrat de travail (CDI conseille)
- Assurance auto usage pro avec le nom du salarié

Passer d'independant a employeur change ton statut : tu deviens dirigeant de société. EURL/SASU obligatoire.`,
      },
      {
        title: "Diversifier ses revenus",
        content: `# Au-dela de la course VTC

A 3 000-4 000 euros net/mois, tu plafonnes vite si tu restes que sur la course. Voici les leviers pour passer a 6 000+.

## 1. Les comptes entreprise

Signer des contrats avec des boites pour leurs deplacements clients/salariés. Paiement mensuel sur facture (30 jours mais recurrent et predictible).

**Comment demarcher :** contacte directement les assistantes de direction (LinkedIn), propose une demo gratuite avec 1 course offerte.

## 2. Les navettes evenementielles

Mariages, seminaires, conferences. Forfait journee 400-800 euros. Beaucoup moins stressant que les courses a la demande.

## 3. Le transport medical (TAP/VSL)

Si tu as la licence, les courses medicales sont payees par la secu. Tarifs reguliers, clients fideles, creneaux en journee (plus tranquille).

## 4. La location de ton véhicule

Tu peux louer ton véhicule a d'autres chauffeurs VTC pendant tes jours off. Revenus passifs 50-80 euros/jour.

## 5. La formation / le coaching

Après 2-3 ans d'expérience, tu peux former d'autres chauffeurs debutants. Le partage d'expérience se vend bien (programme d'affiliation MonVTC par exemple).`,
      },
      {
        title: "Investir pour reduire ses impôts",
        content: `# Optimisation patrimoniale pour chauffeur VTC

A partir de 40k euros de revenus annuels, tu commences a payer vraiment des impôts. Voici comment les reduire legalement.

## PER (Plan Épargne Retraite)

Versement sur ton PER = déductible de ton revenu imposable (jusqu'a 10% de tes revenus pros). Si tu gagnes 50k et que tu verses 5k sur ton PER, tu n'es imposer que sur 45k.

## LMNP (Location Meublee Non Professionnelle)

Acheter un studio et le louer meuble. Les revenus locatifs bénéficient d'un abattement de 50% en micro-BIC, ou 100% déductible en reel (amortissement du bien + charges).

## PEA / Assurance-vie

Épargne long terme defiscalisee après 5 ans (PEA) ou 8 ans (assurance-vie).

## Achat de ton véhicule pro

Si tu es en EURL/SASU, acheter ton VTC via la société permet :
- Amortir le cout sur 5 ans
- Deduire le carburant, entretien, assurance
- Recuperer la TVA (si VTC = 10,3 sieges max)

## Ne pas faire

- Investir plus que tu ne peux te permettre
- Suivre des "conseils" de gourous TikTok (crypto, trading)
- Mettre tous tes oeufs dans le meme panier

Regle simple : garde 3 mois de trésorerie dispo sur ton compte avant de faire tout investissement.`,
      },
    ],
    checklist: [
      "Evaluer mes besoins d'embauche (nb de courses refusees / semaine)",
      "Contacter 5 entreprises pour un contrat business",
      "Ouvrir un PER si revenu imposable > 30k",
      "Faire un bilan patrimoine annuel",
      "Planifier mon passage en EURL/SASU si CA > 60k",
      "Diversifier au moins 1 source de revenu secondaire",
    ],
  },
];

// Helper pour obtenir un module par slug
export function getModuleBySlug(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}

// Helper pour savoir si un module est debloque selon la date d'achat
export function isModuleUnlocked(module: Module, purchaseDate: Date): boolean {
  const now = Date.now();
  const unlockDate = new Date(purchaseDate).getTime() + module.day * 24 * 60 * 60 * 1000;
  return now >= unlockDate;
}
