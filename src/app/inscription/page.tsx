"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Check, Loader2 } from "lucide-react";

export default function InscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brand: "",
    city: "",
    region: "",
    department: "",
    postalCode: "",
    phone: "",
    email: "",
    pricePerKm: "1.80",
    minPrice: "15",
    zones: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canSubmit = form.brand && form.city && form.phone && form.email && form.zones;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Erreur. Veuillez réessayer.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <span className="font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Créer mon site VTC</h1>
          <p className="text-zinc-500">Remplissez vos informations, on s&apos;occupe du reste.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identité */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[#3B82F6] uppercase tracking-wider">Votre marque</h2>
            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Nom de votre marque VTC *</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                placeholder="Ex: MehdiVTC, NordCab, EliteDriver..."
                value={form.brand}
                onChange={(e) => update("brand", e.target.value)}
              />
              <p className="text-xs text-zinc-700 mt-1">Ce sera le nom sur votre site et votre app</p>
            </div>
          </div>

          {/* Localisation */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[#3B82F6] uppercase tracking-wider">Localisation</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Ville principale *</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Lille"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Code postal (optionnel)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="59000"
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Région (optionnel)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Métropole lilloise"
                  value={form.region}
                  onChange={(e) => update("region", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Département (optionnel)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Nord"
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Zones desservies * (séparées par des virgules)</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                placeholder="Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq"
                value={form.zones}
                onChange={(e) => update("zones", e.target.value)}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[#3B82F6] uppercase tracking-wider">Contact</h2>
            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Téléphone / WhatsApp *</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                type="tel"
                placeholder="06 12 34 56 78"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-zinc-500 mb-1 block">Email *</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                type="email"
                placeholder="contact@mehdivtc.fr"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          {/* Tarifs */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[#3B82F6] uppercase tracking-wider">Tarification</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Prix au km (€)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  type="number"
                  step="0.10"
                  value={form.pricePerKm}
                  onChange={(e) => update("pricePerKm", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-500 mb-1 block">Minimum de course (€)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  type="number"
                  value={form.minPrice}
                  onChange={(e) => update("minPrice", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Récap prix */}
          <div className="card p-6 border-[#3B82F6]/30 bg-[#3B82F6]/5">
            <h2 className="font-semibold mb-4">Récapitulatif</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Mise en place (one-shot)</span>
                <span className="font-bold">199€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Abonnement mensuel</span>
                <span className="font-bold text-[#3B82F6]">29€/mois</span>
              </div>
              <hr className="border-[#1E1E22]" />
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Sans engagement — résiliable à tout moment</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-zinc-500">
              {["Site premium personnalisé", "Réservation + WhatsApp + Google Maps", "SEO local + PWA + Dashboard admin", "Hébergement + maintenance + support 7j/7"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Redirection vers le paiement...</>
            ) : (
              <>Payer et lancer mon site <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
