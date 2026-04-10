import Link from "next/link";
import { Car, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getAllArticles } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog VTC — Guides et conseils pour chauffeurs VTC | MonVTC",
  description: "Guides complets, conseils pratiques et actualités pour les chauffeurs VTC en France. Formation, examen, statut juridique, revenus, SEO local et plus.",
  alternates: { canonical: "https://vtc-site.fr/blog" },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen">
      <nav className="bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-[#3B82F6] font-medium">Blog</Link>
            <Link href="/inscription" className="btn-primary !py-2 !px-5 !text-xs">Créer mon site</Link>
          </div>
        </div>
      </nav>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[#3B82F6] text-sm mb-4">
            <BookOpen className="w-4 h-4" /> Blog VTC
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            Tout savoir sur le <span className="text-gradient">métier de VTC</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Guides complets, conseils pratiques et retours d&apos;expérience pour lancer et développer votre activité de chauffeur VTC.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={`card p-6 sm:p-8 block group hover:bg-[#151517] transition-all duration-300 ${i === 0 ? "border-[#3B82F6]/20" : ""}`}
              >
                <div className="flex items-center gap-3 mb-3 text-xs text-zinc-600">
                  <span className="px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-medium">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  <span>{article.date}</span>
                </div>
                <h2 className={`font-bold mb-2 group-hover:text-[#3B82F6] transition ${i === 0 ? "text-2xl" : "text-lg"}`}>
                  {article.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mb-3">{article.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6]">
                  Lire l&apos;article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/creer-site-vtc" className="hover:text-zinc-400">Créer un site VTC</Link> — <Link href="/devenir-chauffeur-vtc" className="hover:text-zinc-400">Devenir chauffeur VTC</Link>
      </footer>
    </div>
  );
}
