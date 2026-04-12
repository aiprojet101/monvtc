import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://vtc-site.fr${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-1 text-xs text-zinc-600 mb-6" aria-label="Fil d'Ariane">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-zinc-400 transition">{c.label}</Link>
            ) : (
              <span className="text-zinc-400">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
