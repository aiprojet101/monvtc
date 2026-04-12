"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, ArrowLeft } from "lucide-react";

type Motif =
  | ""
  | "question"
  | "support"
  | "facturation"
  | "cancel_formation"
  | "cancel_subscription"
  | "partenariat"
  | "presse"
  | "autre";

const MOTIFS: { value: Motif; label: string }[] = [
  { value: "", label: "-- Choisissez un motif --" },
  { value: "question", label: "Question generale sur les offres" },
  { value: "support", label: "Support technique (site, acces, bug)" },
  { value: "facturation", label: "Question sur ma facture ou paiement" },
  { value: "cancel_formation", label: "Resilier ma formation (remboursement sous 15j)" },
  { value: "cancel_subscription", label: "Resilier mon abonnement MonVTC" },
  { value: "partenariat", label: "Devenir partenaire / affiliation" },
  { value: "presse", label: "Presse / media" },
  { value: "autre", label: "Autre demande" },
];

export default function ContactPage() {
  const [motif, setMotif] = useState<Motif>("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  async function submitCancelFormation(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/formation/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, text: "Remboursement effectue. Vous recevrez un email de confirmation. Fonds visibles sur votre compte sous 5-10 jours." });
      } else {
        setResult({ ok: false, text: data.error || "Erreur" });
      }
    } catch {
      setResult({ ok: false, text: "Erreur reseau. Reessayez." });
    } finally {
      setLoading(false);
    }
  }

  async function submitCancelSubscription(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, text: `Resiliation enregistree. Votre abonnement prend fin le ${data.endDate}. Vous gardez l'acces jusqu'a cette date.` });
      } else {
        setResult({ ok: false, text: data.error || "Erreur" });
      }
    } catch {
      setResult({ ok: false, text: "Erreur reseau. Reessayez." });
    } finally {
      setLoading(false);
    }
  }

  function mailtoLink() {
    const subject = encodeURIComponent(MOTIFS.find((m) => m.value === motif)?.label || "Contact");
    const body = encodeURIComponent(`Email : ${email}\n\n${message}`);
    return `mailto:contact@vtc-site.fr?subject=${subject}&body=${body}`;
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
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </nav>

      <section className="py-20 px-6 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Nous <span className="text-gradient">contacter</span></h1>
          <p className="text-zinc-400 mb-10">Reponse sous 48h. Si votre demande est urgente et liee a votre site en production, ecrivez directement a contact@vtc-site.fr.</p>

          <div className="card p-6 mb-6">
            <label className="block text-sm font-bold mb-2">Motif de la demande</label>
            <select
              value={motif}
              onChange={(e) => { setMotif(e.target.value as Motif); setResult(null); }}
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none"
            >
              {MOTIFS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {motif === "cancel_formation" && (
            <form onSubmit={submitCancelFormation} className="card p-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Resilier la formation</h2>
                <p className="text-sm text-zinc-400">Si votre achat date de moins de 15 jours, le remboursement integral est automatique et sans condition. Au-dela, votre demande est transmise a notre equipe.</p>
              </div>
              <input
                type="email"
                required
                placeholder="Email utilise lors de l'achat"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none"
              />
              <textarea
                placeholder="Raison (optionnel — nous aide a ameliorer la formation)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none resize-none"
              />
              <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
                {loading ? "Traitement..." : "Resilier et etre rembourse"}
              </button>
            </form>
          )}

          {motif === "cancel_subscription" && (
            <form onSubmit={submitCancelSubscription} className="card p-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Resilier l'abonnement MonVTC</h2>
                <p className="text-sm text-zinc-400">L'abonnement est resilie a la fin de la periode en cours (aucun prorata). Vous gardez l'acces jusqu'a cette date. Aucun nouveau prelevement ensuite.</p>
              </div>
              <input
                type="email"
                required
                placeholder="Email du compte"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none"
              />
              <textarea
                placeholder="Raison (optionnel)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none resize-none"
              />
              <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
                {loading ? "Traitement..." : "Confirmer la resiliation"}
              </button>
            </form>
          )}

          {motif && !["cancel_formation", "cancel_subscription"].includes(motif) && (
            <div className="card p-6 space-y-4">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none"
              />
              <textarea
                placeholder="Votre message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] outline-none resize-none"
              />
              <a href={mailtoLink()} className="btn-primary inline-block w-full text-center !py-3">Envoyer par email</a>
              <p className="text-xs text-zinc-500 text-center">Ou ecrivez directement a contact@vtc-site.fr</p>
            </div>
          )}

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${result.ok ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
              {result.text}
            </div>
          )}

          <p className="text-xs text-zinc-600 mt-8 text-center">contact@vtc-site.fr &middot; Reponse sous 48h</p>
        </div>
      </section>
    </div>
  );
}
