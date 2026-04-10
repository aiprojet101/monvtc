import Link from "next/link";
import { Car, Clock, ArrowLeft, Calendar } from "lucide-react";
import { getAllArticles, getArticle } from "@/lib/blog";
import CTABanner from "../components/CTABanner";
import ReadingProgress from "../components/ReadingProgress";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticle(slug);
    if (!article) return { title: "Article non trouvé" };
    return {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: `https://vtc-site.fr/blog/${slug}` },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.date,
        modifiedTime: article.updated,
      },
    };
  });
}

// Simple markdown to HTML (headings, lists, bold, paragraphs)
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: { type: string; content: string; level?: number }[] = [];
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      elements.push({ type: "p", content: currentParagraph.join(" ") });
      currentParagraph = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      elements.push({ type: "h2", content: trimmed.slice(3) });
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      elements.push({ type: "h3", content: trimmed.slice(4) });
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      elements.push({ type: "li", content: trimmed.slice(2) });
    } else {
      currentParagraph.push(trimmed);
    }
  }
  flushParagraph();

  return elements;
}

function formatText(text: string) {
  // Bold
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Article non trouvé</div>;
  }

  const elements = renderMarkdown(article.content);
  const headings = elements.filter((e) => e.type === "h2");

  // Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated,
    author: { "@type": "Organization", name: "MonVTC" },
    publisher: { "@type": "Organization", name: "MonVTC", url: "https://vtc-site.fr" },
    mainEntityOfPage: `https://vtc-site.fr/blog/${slug}`,
  };

  // FAQ Schema
  const faqIndex = elements.findIndex((e) => e.type === "h2" && e.content === "FAQ");
  const faqItems: { question: string; answer: string }[] = [];
  if (faqIndex > -1) {
    let currentQ = "";
    for (let i = faqIndex + 1; i < elements.length; i++) {
      const el = elements[i];
      if (el.type === "h3") currentQ = el.content;
      else if (el.type === "p" && currentQ) {
        faqItems.push({ question: currentQ, answer: el.content });
        currentQ = "";
      }
    }
  }

  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  let ctaInserted = false;

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <nav className="bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumbs */}
        <nav className="text-xs text-zinc-600 mb-6">
          <Link href="/" className="hover:text-zinc-400">Accueil</Link>
          {" / "}
          <Link href="/blog" className="hover:text-zinc-400">Blog</Link>
          {" / "}
          <span className="text-zinc-400">{article.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 text-xs text-zinc-600">
          <span className="px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-medium">{article.category}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">{article.title}</h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-12">{article.description}</p>

        {/* Table of contents */}
        {headings.length > 2 && (
          <div className="card p-5 mb-12 bg-[#111113]">
            <h2 className="text-sm font-bold mb-3 text-zinc-400 uppercase tracking-wider">Sommaire</h2>
            <ul className="space-y-1.5">
              {headings.map((h, i) => (
                <li key={i}>
                  <a href={`#${h.content.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="text-sm text-zinc-500 hover:text-[#3B82F6] transition">
                    {h.content}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        <div className="space-y-1">
          {elements.map((el, i) => {
            // Insert CTA after ~40% of the article
            const showCta = !ctaInserted && i > elements.length * 0.4 && el.type === "h2";
            if (showCta) ctaInserted = true;

            return (
              <div key={i}>
                {showCta && <CTABanner />}
                {el.type === "h2" && (
                  <h2 id={el.content.toLowerCase().replace(/[^a-z0-9]/g, "-")} className="text-2xl font-bold mt-12 mb-4 scroll-mt-20">
                    {el.content}
                  </h2>
                )}
                {el.type === "h3" && <h3 className="text-lg font-semibold mt-8 mb-3">{el.content}</h3>}
                {el.type === "p" && <p className="text-zinc-400 leading-relaxed mb-4 text-[15px]">{formatText(el.content)}</p>}
                {el.type === "li" && <div className="flex items-start gap-2 text-zinc-400 text-[15px] mb-1.5 ml-2"><span className="text-[#3B82F6]">-</span><span>{formatText(el.content)}</span></div>}
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <CTABanner strong />

        {/* Author */}
        <div className="card p-5 mt-12 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm">M</div>
          <div>
            <p className="text-sm font-medium">MonVTC</p>
            <p className="text-xs text-zinc-600">Expert en solutions digitales pour chauffeurs VTC</p>
          </div>
        </div>
      </article>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/blog" className="hover:text-zinc-400">Blog</Link> — <Link href="/inscription" className="hover:text-zinc-400">Inscription</Link>
      </footer>
    </div>
  );
}
