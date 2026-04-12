"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, CheckCircle2, Clock, ArrowRight, Award } from "lucide-react";
import { MODULES, isModuleUnlocked } from "@/lib/formation-modules";

export default function CoursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Chargement...</div>}>
      <CoursContent />
    </Suspense>
  );
}

function CoursContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [access, setAccess] = useState<{ plan: string; purchaseDate: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (tokenFromUrl) {
      verifyToken(tokenFromUrl);
    } else {
      const saved = localStorage.getItem("formation_token");
      if (saved) verifyToken(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromUrl]);

  async function verifyToken(token: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/formation/access?token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const data = await res.json();
        setAccess(data);
        localStorage.setItem("formation_token", token);
      } else {
        localStorage.removeItem("formation_token");
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function requestAccess(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/formation/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage("Lien d'acces envoye ! Verifie ta boite mail (et tes spams).");
      } else {
        const data = await res.json();
        setMessage(data.error || "Email non trouve. As-tu bien achete la formation ?");
      }
    } catch {
      setMessage("Erreur. Reessaie.");
    } finally {
      setLoading(false);
    }
  }

  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={requestAccess} className="card p-8 max-w-sm w-full">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Espace formation</h1>
          <p className="text-xs text-zinc-500 text-center mb-6">Entre l&apos;email utilise pour acheter la formation. On t&apos;envoie un lien d&apos;acces.</p>
          {message && <p className={`text-xs text-center mb-3 ${message.includes("envoye") ? "text-green-500" : "text-red-400"}`}>{message}</p>}
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition mb-4"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "..." : "Recevoir mon lien"}
          </button>
          <p className="text-xs text-center text-zinc-600 mt-4">
            Pas encore achete ? <Link href="/formation" className="text-[#3B82F6] hover:underline">S&apos;inscrire a la formation</Link>
          </p>
        </form>
      </div>
    );
  }

  const purchaseDate = new Date(access.purchaseDate);
  const daysSince = Math.floor((Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen pb-20">
      <nav className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">Formation VTC — <span className="text-[#3B82F6]">{access.plan}</span></p>
            <p className="text-xs text-zinc-600">Jour {daysSince} depuis ton inscription</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem("formation_token"); setAccess(null); }}
            className="text-xs text-zinc-500 hover:text-white transition"
          >
            Deconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black mb-2">Bienvenue !</h1>
        <p className="text-zinc-400 mb-12">Les modules se debloquent progressivement. Tu peux revenir quand tu veux.</p>

        <div className="space-y-4">
          {MODULES.map((m) => {
            const unlocked = isModuleUnlocked(m, purchaseDate);
            return unlocked ? (
              <Link
                key={m.id}
                href={`/cours/${m.slug}`}
                className="card p-6 block hover:border-[#3B82F6]/30 transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0 text-xl font-black text-[#3B82F6]">
                    {m.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold group-hover:text-[#3B82F6] transition">{m.title}</h3>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-sm text-zinc-500 mb-3">{m.subtitle}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-600">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.duration}</span>
                      <span>{m.lessons.length} lecons</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ) : (
              <div key={m.id} className="card p-6 opacity-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1E1E22] flex items-center justify-center shrink-0 text-xl font-black text-zinc-600">
                    {m.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-zinc-500">{m.title}</h3>
                      <Lock className="w-4 h-4 text-zinc-600" />
                    </div>
                    <p className="text-sm text-zinc-600 mb-1">{m.subtitle}</p>
                    <p className="text-xs text-[#C9A84C]">Se debloque dans {m.day - daysSince} jour{m.day - daysSince > 1 ? "s" : ""}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {daysSince >= 28 && (
          <div className="card p-6 mt-8 border-[#C9A84C]/30 bg-[#C9A84C]/5 text-center">
            <Award className="w-10 h-10 text-[#C9A84C] mx-auto mb-3" />
            <h3 className="font-bold mb-2">Tu as termine la formation</h3>
            <p className="text-sm text-zinc-400 mb-4">Telecharge ton certificat et lance ton activite VTC.</p>
            <Link href="/inscription" className="btn-primary inline-flex items-center gap-2 text-sm">
              Lancer mon site VTC <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
