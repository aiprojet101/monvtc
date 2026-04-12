"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function NewsletterForm({ source = "blog", compact = false }: { source?: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.ok) setDone(true);
      else setError(data.error || "Erreur");
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className={`card ${compact ? "p-4" : "p-6"} border-green-500/30 bg-green-500/5 flex items-center gap-3`}>
        <Check className="w-5 h-5 text-green-500 shrink-0" />
        <div>
          <p className="font-bold text-sm">Inscription confirmée !</p>
          <p className="text-xs text-zinc-500">Vérifiez votre boîte mail — le premier guide arrive tout de suite.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`card ${compact ? "p-4" : "p-6"} border-[#3B82F6]/30 bg-[#3B82F6]/5`}>
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm mb-1">Recevez le guide VTC gratuit</h3>
          <p className="text-xs text-zinc-500">Formation, statut, véhicule, business. 8 emails sur 4 semaines.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#3B82F6] focus:outline-none transition"
        />
        <button type="submit" disabled={loading} className="btn-primary !py-2.5 !px-4 !text-xs flex items-center justify-center gap-1 disabled:opacity-50">
          {loading ? "..." : <>Recevoir <ArrowRight className="w-3 h-3" /></>}
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      <p className="text-xs text-zinc-700 mt-2">Zéro spam. Désinscription en 1 clic.</p>
    </form>
  );
}
