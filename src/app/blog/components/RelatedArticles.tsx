import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/blog";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-[#1E1E22]">
      <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-6">À lire aussi</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="card p-5 hover:bg-[#151517] transition group"
          >
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-medium text-[10px]">{a.category}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {a.readTime}
              </span>
            </div>
            <h4 className="text-sm font-semibold mb-2 group-hover:text-[#3B82F6] transition line-clamp-2">
              {a.title}
            </h4>
            <span className="inline-flex items-center gap-1 text-xs text-[#3B82F6] font-medium">
              Lire <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
