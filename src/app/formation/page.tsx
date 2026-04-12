"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, ArrowRight, Check, Clock, Headphones, FileText, Award, Users, Flame, Star } from "lucide-react";
import { MODULES } from "@/lib/formation-modules";

const PLANS = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: 49,
    highlight: false,
    features: [
      "6 modules complets (texte + audio)",
      "30+ lecons detaillees",
      "PDF telechargeables",
      "Checklists par module",
      "Acces immediat apres paiement",
      "Acces a vie",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    highlight: true,
    features: [
      "Tout Essentiel +",
      "Site MonVTC offert 1 mois (29€ valeur)",
      "Coaching WhatsApp 14 jours",
      "Templates factures, devis, CGV",
      "Groupe Telegram etudiants",
      "Certificat de fin de formation",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 297,
    highlight: false,
    features: [
      "Tout Pro +",
      "Site MonVTC offert 6 mois (174€ valeur)",
      "Coaching WhatsApp illimite",
      "Appel 1-to-1 de 45 min",
      "Acces au groupe prive a vie",
      "Garantie reussite : remboursement si examen rate",
    ],
  },
];

export default function FormationLanding() {
  const [loading, setLoading] = useState<string | null>(null);

  async function buy(planId: string) {
    setLoading(planId);
    try {
      const res = await fetch("/api/formation/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur Stripe : " + (data.error || "inconnue"));
        setLoading(null);
      }
    } catch (e) {
      alert("Erreur reseau : " + (e instanceof Error ? e.message : "inconnue"));
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </Link>
          <a href="#pricing" className="btn-primary !py-2 !px-5 !text-xs">Commencer</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 mb-8">
            <Flame className="w-3.5 h-3.5" />
            <span>Offre de lancement — 50% de reduction</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
            Devenir chauffeur VTC<br />
            <span className="text-gradient">independant en 30 jours.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            La formation complete pour lancer ton activite VTC, trouver tes premiers clients, et devenir independant des plateformes. Sans perdre 6 mois a chercher.
          </p>
          <a href="#pricing" className="btn-primary inline-flex items-center gap-2 text-base !py-4 !px-8">
            Voir les formules <ArrowRight className="w-5 h-5" />
          </a>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#3B82F6]" /> 6 modules</span>
            <span className="flex items-center gap-2"><Headphones className="w-4 h-4 text-[#3B82F6]" /> Audio MP3</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#3B82F6]" /> Acces a vie</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#3B82F6]" /> Certificat inclus</span>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-4">Le programme <span className="text-gradient">complet</span></h2>
          <p className="text-center text-zinc-500 mb-12">Les modules se debloquent progressivement. Tu gardes l&apos;acces a vie.</p>

          <div className="space-y-4">
            {MODULES.map((m) => (
              <div key={m.id} className="card p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0 text-xl font-black text-[#3B82F6]">
                    {m.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{m.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E1E22] text-zinc-400">Jour {m.day}</span>
                      <span className="text-xs text-zinc-600">{m.duration}</span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-3">{m.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {m.lessons.map((l) => (
                        <span key={l.title} className="text-xs text-zinc-600">• {l.title}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-4">Choisis ta <span className="text-gradient">formule</span></h2>
          <p className="text-center text-zinc-500 mb-16">Paiement securise Stripe. Acces immediat. Garantie 30 jours.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.id} className={`card p-8 relative ${p.highlight ? "border-[#3B82F6]/50 bg-[#3B82F6]/5 scale-105" : ""}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-xs font-bold">
                    LE PLUS CHOISI
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-black">{p.price}€</span>
                  <span className="text-zinc-500 mb-2 text-sm">une fois</span>
                </div>
                <div className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => buy(p.id)}
                  disabled={loading !== null}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition disabled:opacity-50 ${p.highlight ? "btn-primary" : "bg-[#141414] border border-[#1E1E22] text-white hover:border-[#3B82F6]/40"}`}
                >
                  {loading === p.id ? "..." : `Commencer pour ${p.price}€`}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-500 inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C9A84C]" />
              Garantie 30 jours — satisfait ou rembourse
            </p>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Pour qui ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <Users className="w-6 h-6 text-[#3B82F6] mb-3" />
              <h3 className="font-bold mb-2">Tu veux devenir VTC</h3>
              <p className="text-sm text-zinc-500">Tu cherches a te reconvertir et a comprendre le metier avant d&apos;investir dans une formation a 2000€.</p>
            </div>
            <div className="card p-6">
              <Car className="w-6 h-6 text-[#3B82F6] mb-3" />
              <h3 className="font-bold mb-2">Tu es deja VTC mais tu rames</h3>
              <p className="text-sm text-zinc-500">Tu es bloque sur Uber/Bolt et tu veux basculer vers tes propres clients pour enfin gagner correctement ta vie.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#030305] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/cgv" className="hover:text-zinc-400">CGV</Link> — <Link href="/mentions-legales" className="hover:text-zinc-400">Mentions legales</Link>
      </footer>
    </div>
  );
}
