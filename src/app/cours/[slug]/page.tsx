"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckSquare, Square, Clock, FileText } from "lucide-react";
import { getModuleBySlug } from "@/lib/formation-modules";

export default function ModulePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Chargement...</div>}>
      <ModuleContent />
    </Suspense>
  );
}

function ModuleContent() {
  const params = useParams<{ slug: string }>();
  const module = getModuleBySlug(params.slug);
  const [activeLesson, setActiveLesson] = useState(0);
  const [authorized, setAuthorized] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const token = localStorage.getItem("formation_token");
    if (!token) {
      window.location.href = "/cours";
      return;
    }
    fetch(`/api/formation/access?token=${encodeURIComponent(token)}`)
      .then((r) => {
        if (r.ok) setAuthorized(true);
        else window.location.href = "/cours";
      });

    // Restore checklist
    if (module) {
      const saved = localStorage.getItem(`checklist-${module.slug}`);
      if (saved) setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, [module]);

  function toggleCheck(i: number) {
    if (!module) return;
    const newSet = new Set(checkedItems);
    if (newSet.has(i)) newSet.delete(i);
    else newSet.add(i);
    setCheckedItems(newSet);
    localStorage.setItem(`checklist-${module.slug}`, JSON.stringify([...newSet]));
  }

  if (!module) return <div className="min-h-screen flex items-center justify-center text-zinc-500">Module introuvable</div>;
  if (!authorized) return <div className="min-h-screen flex items-center justify-center text-zinc-500">Verification...</div>;

  const lesson = module.lessons[activeLesson];

  return (
    <div className="min-h-screen pb-20">
      <nav className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/cours" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour aux modules
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="w-3 h-3" /> {module.duration}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar lecons */}
        <aside className="lg:sticky lg:top-20 self-start">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-4">Module {module.id}</p>
          <h2 className="text-xl font-black mb-1">{module.title}</h2>
          <p className="text-xs text-zinc-500 mb-6">{module.subtitle}</p>
          <div className="space-y-1">
            {module.lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setActiveLesson(i)}
                className={`w-full text-left p-3 rounded-lg text-sm transition ${i === activeLesson ? "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20" : "text-zinc-400 hover:bg-[#141414]"}`}
              >
                <span className="flex items-start gap-2">
                  <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{l.title}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Checklist */}
          <div className="mt-8 pt-6 border-t border-[#1E1E22]">
            <h3 className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-3">Checklist action</h3>
            <div className="space-y-2">
              {module.checklist.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className="w-full flex items-start gap-2 text-left text-xs text-zinc-400 hover:text-white transition"
                >
                  {checkedItems.has(i) ? (
                    <CheckSquare className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span className={checkedItems.has(i) ? "line-through text-zinc-600" : ""}>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Contenu lecon */}
        <article className="prose prose-invert max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black mb-8">{lesson.title}</h1>
          <div className="text-zinc-300 leading-relaxed space-y-4 text-[15px]">
            {lesson.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-3 text-white">{trimmed.slice(3)}</h2>;
              if (trimmed.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-white">{trimmed.slice(4)}</h3>;
              if (trimmed.startsWith("# ")) return <h2 key={i} className="text-3xl font-bold mt-6 mb-4 text-white">{trimmed.slice(2)}</h2>;
              if (trimmed.startsWith("- ")) return <p key={i} className="ml-4">• {formatLine(trimmed.slice(2))}</p>;
              if (/^\d+\.\s/.test(trimmed)) return <p key={i} className="ml-4">{formatLine(trimmed)}</p>;
              if (trimmed.startsWith("|")) return null; // skip tables for simplicity
              return <p key={i}>{formatLine(trimmed)}</p>;
            })}
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#1E1E22]">
            <button
              onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
              disabled={activeLesson === 0}
              className="px-4 py-2 rounded-lg bg-[#141414] border border-[#1E1E22] text-zinc-400 text-sm disabled:opacity-30"
            >
              ← Precedent
            </button>
            <span className="text-xs text-zinc-500">Lecon {activeLesson + 1} / {module.lessons.length}</span>
            {activeLesson < module.lessons.length - 1 ? (
              <button
                onClick={() => setActiveLesson(activeLesson + 1)}
                className="btn-primary !py-2 !px-4 !text-xs"
              >
                Suivant →
              </button>
            ) : (
              <Link href="/cours" className="btn-primary !py-2 !px-4 !text-xs">
                Module suivant →
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function formatLine(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{p}</strong> : p);
}
