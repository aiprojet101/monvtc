// Dictionnaire mot-clé → URL pour le maillage interne automatique
// Le premier match trouvé est remplacé par un lien discret, max 5 par article

export const INTERNAL_LINKS: { keyword: RegExp; url: string }[] = [
  // Piliers
  { keyword: /\b(créer (?:un |son )?site VTC)\b/i, url: "/creer-site-vtc" },
  { keyword: /\b(devenir chauffeur VTC|devenir VTC)\b/i, url: "/devenir-chauffeur-vtc" },
  { keyword: /\b(solution VTC|logiciel VTC|application VTC)\b/i, url: "/solution-vtc" },

  // Articles de blog existants
  { keyword: /\b(formation VTC)\b/i, url: "/blog/formation-vtc-prix-centres" },
  { keyword: /\b(examen VTC)\b/i, url: "/blog/examen-vtc-2026" },
  { keyword: /\b(carte (?:professionnelle |pro )?VTC)\b/i, url: "/blog/carte-professionnelle-vtc" },
  { keyword: /\b(statut juridique|auto-entrepreneur VTC)\b/i, url: "/blog/statut-juridique-vtc" },
  { keyword: /\b(choisir (?:son |un )?véhicule|véhicule VTC)\b/i, url: "/blog/choisir-vehicule-vtc" },
  { keyword: /\b(assurance VTC)\b/i, url: "/blog/assurance-vtc-comparatif" },
  { keyword: /\b(combien gagne|revenu.{0,5}VTC|salaire VTC)\b/i, url: "/blog/combien-gagne-chauffeur-vtc" },
  { keyword: /\b(VTC (?:vs|ou) taxi|différence.{0,15}taxi)\b/i, url: "/blog/vtc-vs-taxi-differences" },
  { keyword: /\b(créer (?:son )?entreprise VTC|ouvrir société VTC)\b/i, url: "/blog/creer-entreprise-vtc" },
  { keyword: /\b(SEO local|référencement local|Google Business)\b/i, url: "/blog/seo-local-chauffeur-vtc" },
];

// Transforme un texte en insérant jusqu'à maxLinks liens internes (1ère occurrence de chaque mot-clé)
export function injectInternalLinks(text: string, currentSlug: string, maxLinks = 5): { text: string; links: string[] } {
  let remaining = maxLinks;
  const used = new Set<string>();
  let result = text;
  const linksAdded: string[] = [];

  for (const { keyword, url } of INTERNAL_LINKS) {
    if (remaining <= 0) break;
    if (url === `/blog/${currentSlug}` || url.endsWith(`/${currentSlug}`)) continue; // skip self
    if (used.has(url)) continue;

    const match = result.match(keyword);
    if (match && match.index !== undefined) {
      const before = result.slice(0, match.index);
      const matched = match[0];
      const after = result.slice(match.index + matched.length);
      // Utilise un placeholder qui sera remplacé par un vrai lien dans le renderer
      result = `${before}[[LINK:${url}:${matched}]]${after}`;
      used.add(url);
      linksAdded.push(url);
      remaining--;
    }
  }

  return { text: result, links: linksAdded };
}
