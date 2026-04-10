# Prompt Claude Code — Blog VTC intégré à vtc-site.fr

## Contexte

Tu travailles sur le projet monvtc, un SaaS Next.js + TypeScript + Tailwind CSS déployé sur Vercel à l'adresse vtc-site.fr. Le site vend des sites web clé en main pour chauffeurs VTC indépendants (199 EUR + 29 EUR/mois).

Tu dois créer une section blog intégrée au site existant, accessible via vtc-site.fr/blog. Ce blog a deux objectifs : générer du trafic SEO organique massif sur la niche "devenir chauffeur VTC" (50 000+ recherches/mois) et convertir les visiteurs en clients du SaaS monvtc.

## Ta posture

Tu es le directeur éditorial et UX du meilleur blog élu en 2026. Tu appliques les standards suivants :

**Design & UX 2026 :**
- Content-first : le texte EST le design. Typographie large, expressive, presque monumentale pour les titres. Les mots deviennent l'élément visuel principal.
- White space généreux, mise en page aérée, zéro clutter. Chaque élément a une raison d'être.
- Micro-animations subtiles au scroll et au hover : transitions typographiques, feedback visuel doux qui guide sans distraire.
- Bento Grid Layout évolué pour les pages listing : grille flexible où certains éléments débordent de leur cadre pour casser la monotonie tout en gardant une hiérarchie de lecture claire.
- Mobile-first absolu : l'expérience mobile est la référence, le desktop est l'adaptation.
- Dark/light mode natif avec transition fluide.
- Temps de lecture estimé sur chaque article.
- Barre de progression de lecture (scroll progress).
- Table des matières sticky sur desktop, collapsible sur mobile.

**SEO 2026 :**
- Schema.org Article/BlogPosting/FAQPage sur chaque article.
- Méta title, description, Open Graph, Twitter Cards optimisés par article.
- URLs propres : /blog/devenir-chauffeur-vtc, /blog/examen-vtc-2026, etc.
- Sitemap XML dynamique incluant tous les articles.
- Fil d'Ariane (breadcrumbs) avec schema BreadcrumbList.
- Temps de chargement < 1.5s (LCP). Pas de JS superflu.
- Internal linking stratégique entre articles et vers la page d'inscription SaaS.
- Balises Hn structurées : un seul H1 par page, hiérarchie H2/H3 logique.

**Conversion vers le SaaS :**
- CTA contextuel intégré naturellement dans chaque article (pas un bandeau agressif, un encart élégant qui s'intègre au flow de lecture).
- CTA principal : "Vous êtes déjà chauffeur VTC ? Créez votre site pro en 5 minutes" avec lien vers /inscription.
- CTA secondaire en fin d'article : récap des bénéfices monvtc + bouton.
- Sidebar desktop avec widget sticky "Lancez votre site VTC" (discret, pas intrusif).
- Les articles "business" (revenus, rentabilité) ont des CTA plus directs car le lecteur est plus avancé dans le funnel.

## Architecture technique

```
src/app/blog/
  page.tsx                    # Page listing tous les articles (Bento Grid)
  [slug]/page.tsx             # Page article individuelle
  layout.tsx                  # Layout blog (navigation, sidebar)
  components/
    ArticleCard.tsx           # Carte article pour le listing
    ArticleContent.tsx        # Rendu du contenu MDX
    TableOfContents.tsx       # Table des matières sticky
    ReadingProgress.tsx       # Barre de progression scroll
    AuthorBio.tsx             # Bio auteur en fin d'article
    CTABanner.tsx             # Encart conversion SaaS
    CTASidebar.tsx            # Widget sidebar sticky
    Breadcrumbs.tsx           # Fil d'Ariane
    ShareButtons.tsx          # Partage social
    RelatedArticles.tsx       # Articles connexes en fin de page
    CategoryFilter.tsx        # Filtre par catégorie sur le listing
    SearchBar.tsx             # Recherche dans les articles

src/content/blog/             # Articles en MDX
  devenir-chauffeur-vtc.mdx
  examen-vtc-2026.mdx
  assurance-vtc-comparatif.mdx
  combien-gagne-chauffeur-vtc.mdx
  statut-juridique-vtc.mdx
  choisir-vehicule-vtc.mdx
  vtc-vs-taxi-differences.mdx
  creer-entreprise-vtc.mdx
  application-gestion-vtc.mdx
  seo-local-chauffeur-vtc.mdx
```

## Les 10 premiers articles à créer

Chaque article doit faire 1500-2500 mots, être structuré avec des H2/H3, inclure des FAQ en fin d'article (avec schema FAQPage), et avoir un ton expert mais accessible.

### 1. "Comment devenir chauffeur VTC en 2026 : le guide complet"
- Slug : devenir-chauffeur-vtc
- Mots-clés : devenir vtc, devenir chauffeur vtc, comment devenir vtc
- Volume : ~12 000 recherches/mois
- Contenu : prérequis, carte pro, formation, examen, inscription registre, véhicule, assurance, lancement activité
- CTA : "Votre carte VTC en poche ? Lancez votre site de réservation"

### 2. "Examen VTC 2026 : programme, épreuves et conseils pour réussir"
- Slug : examen-vtc-2026
- Mots-clés : examen vtc, épreuve vtc, programme examen vtc
- Volume : ~8 000/mois
- Contenu : les 7 épreuves, programme détaillé, taux de réussite, conseils révision, centres d'examen
- CTA : "Après l'examen, la prochaine étape : votre présence en ligne"

### 3. "Assurance VTC : comparatif et guide pour bien choisir"
- Slug : assurance-vtc-comparatif
- Mots-clés : assurance vtc, assurance chauffeur vtc, comparatif assurance vtc
- Volume : ~6 000/mois
- Contenu : RC Pro, assurance véhicule, couverture passagers, tarifs moyens, comparatif assureurs
- CTA : "Assuré et prêt ? Il vous manque un site pro pour vos clients"

### 4. "Combien gagne un chauffeur VTC en 2026 ? Revenus réels"
- Slug : combien-gagne-chauffeur-vtc
- Mots-clés : salaire vtc, combien gagne vtc, revenu chauffeur vtc
- Volume : ~5 000/mois
- Contenu : CA moyen, charges, net réel, comparaison plateformes vs indépendant, simulateur
- CTA : "Les indépendants avec leur propre site gagnent 30% de plus. Voici comment."

### 5. "Carte professionnelle VTC : démarches et obtention"
- Slug : carte-professionnelle-vtc
- Mots-clés : carte vtc, carte professionnelle vtc, obtenir carte vtc
- Volume : ~5 000/mois
- Contenu : conditions, dossier, préfecture, délais, renouvellement, perte/vol
- CTA : léger, informatif

### 6. "Quel statut juridique pour un chauffeur VTC ?"
- Slug : statut-juridique-vtc
- Mots-clés : statut vtc, auto-entrepreneur vtc, sasu vtc, eurl vtc
- Volume : ~3 000/mois
- Contenu : auto-entrepreneur vs SASU vs EURL, avantages/inconvénients, seuils, TVA, simulation
- CTA : "Statut choisi ? Passez à l'étape business : votre site de réservation"

### 7. "VTC vs Taxi : quelles différences en 2026 ?"
- Slug : vtc-vs-taxi-differences
- Mots-clés : vtc ou taxi, différence vtc taxi
- Volume : ~4 000/mois
- Contenu : réglementation, tarification, clientèle, avantages de chaque statut
- CTA : léger

### 8. "Choisir son véhicule VTC : guide d'achat 2026"
- Slug : choisir-vehicule-vtc
- Mots-clés : voiture vtc, véhicule vtc, meilleure voiture vtc
- Volume : ~3 000/mois
- Contenu : critères homologation, berlines recommandées, électrique vs hybride, budget
- CTA : "Véhicule choisi ? Créez le site qui va avec."

### 9. "Créer son entreprise VTC : les étapes de A à Z"
- Slug : creer-entreprise-vtc
- Mots-clés : créer entreprise vtc, ouvrir société vtc
- Volume : ~2 500/mois
- Contenu : business plan, financement, immatriculation, registre VTC, compte bancaire pro
- CTA : "Votre entreprise est créée. Maintenant, rendez-la visible en ligne."

### 10. "SEO local pour chauffeur VTC : apparaître en 1ère page Google"
- Slug : seo-local-chauffeur-vtc
- Mots-clés : référencement vtc, google my business vtc, seo chauffeur vtc
- Volume : ~1 500/mois
- Contenu : Google Business Profile, mots-clés locaux, avis clients, site optimisé, backlinks locaux
- CTA : direct et fort — cet article parle exactement de ce que monvtc résout

## Règles de style éditorial

- Ton : expert accessible, pas de jargon inutile, tutoiement
- Phrases courtes, paragraphes de 3-4 lignes max
- Listes à puces pour la scannabilité
- Chiffres concrets et sources quand possible (préfecture, DGITM, études)
- Pas d'emojis
- FAQ en fin d'article (3-5 questions) avec schema FAQPage
- Chaque article a : date de publication, date de mise à jour, temps de lecture, auteur "MonVTC"

## Contraintes techniques

- Le projet utilise Next.js (lire les docs dans node_modules/next/dist/docs/ avant de coder)
- TypeScript strict, Tailwind CSS, pas de librairies UI externes
- MDX pour le contenu des articles (installer @next/mdx si nécessaire)
- Images optimisées avec next/image, format WebP
- Métadonnées dynamiques avec generateMetadata() par article
- generateStaticParams() pour le build statique des articles
- Pas d'AdSense, pas de publicité tierce
- Performance : viser 95+ sur Lighthouse (Performance, SEO, Accessibility)
- Le blog doit s'intégrer visuellement au site existant (mêmes fonts Geist, mêmes couleurs)

## Livrable attendu

Un blog fonctionnel avec les 10 articles, le listing, le SEO complet, les CTA de conversion, et le design 2026. Prêt à déployer sur Vercel.
