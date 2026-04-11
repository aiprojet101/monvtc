"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Check, Loader2 } from "lucide-react";

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Chargement...</div>}>
      <InscriptionContent />
    </Suspense>
  );
}

function InscriptionContent() {
  const searchParams = useSearchParams();
  const testMode = searchParams.get("test") === "1";
  const [loading, setLoading] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{ available: boolean; slug: string; domain?: string; reason?: string; message?: string } | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const slugTimeout = useRef<ReturnType<typeof setTimeout>>(null);
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
    lieux: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBrandChange(value: string) {
    update("brand", value);
    setSlugStatus(null);
    if (slugTimeout.current) clearTimeout(slugTimeout.current);
    if (value.trim().length < 2) return;
    setCheckingSlug(true);
    slugTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-slug?brand=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSlugStatus(data);
      } catch {
        setSlugStatus(null);
      } finally {
        setCheckingSlug(false);
      }
    }, 500);
  }

  const [acceptCgv, setAcceptCgv] = useState(false);
  const canSubmit = form.brand.trim() && form.city.trim() && form.phone.trim() && form.email.trim() && form.zones.trim() && slugStatus?.available && acceptCgv;

  // Debug — à retirer après
  const missing = [
    !form.brand.trim() && "marque",
    !form.city.trim() && "ville",
    !form.phone.trim() && "téléphone",
    !form.email.trim() && "email",
    !form.zones.trim() && "zones",
  ].filter(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, testMode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur Stripe : " + (data.error || "Réponse invalide"));
        setLoading(false);
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
              <div className="relative">
                <input
                  className={`w-full bg-[#09090B] border rounded-lg px-4 py-3 text-white focus:outline-none transition ${
                    slugStatus === null ? "border-[#1E1E22] focus:border-[#3B82F6]" :
                    slugStatus.available ? "border-green-500/50 focus:border-green-500" :
                    "border-red-500/50 focus:border-red-500"
                  }`}
                  placeholder="Ex: MehdiVTC, NordCab, EliteDriver..."
                  value={form.brand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                />
                {form.brand.trim().length >= 2 && (
                  <div className="absolute right-3 top-3.5">
                    {checkingSlug ? (
                      <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
                    ) : slugStatus?.available ? (
                      <div className="w-4 h-4 rounded-full bg-green-500" title="Disponible" />
                    ) : slugStatus && !slugStatus.available ? (
                      <div className="w-4 h-4 rounded-full bg-red-500" title="Déjà pris" />
                    ) : null}
                  </div>
                )}
              </div>
              {slugStatus?.available && (
                <p className="text-xs text-green-500 mt-1">Disponible — votre site sera : {slugStatus.domain}</p>
              )}
              {slugStatus?.reason === "premium" && (
                <div className="mt-2 card p-4 border-[#C9A84C]/30 bg-[#C9A84C]/5">
                  <p className="text-xs text-[#C9A84C] font-bold mb-1">Offre Premium disponible</p>
                  <p className="text-xs text-zinc-400">{slugStatus.message}</p>
                  <a href={`https://wa.me/33743289393?text=${encodeURIComponent(`Bonjour, je suis intéressé par l'offre Premium pour le nom "${slugStatus.slug}". Pouvez-vous me donner plus d'infos ?`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#C9A84C] hover:text-[#E8D48B] transition">
                    Souscrire a l&apos;offre Premium →
                  </a>
                </div>
              )}
              {slugStatus?.reason === "taken" && (
                <p className="text-xs text-red-400 mt-1">{slugStatus.message}</p>
              )}
              {slugStatus?.reason === "blocked" && (
                <p className="text-xs text-red-400 mt-1">{slugStatus.message}</p>
              )}
              {!slugStatus && !checkingSlug && (
                <p className="text-xs text-zinc-700 mt-1">Ce sera le nom sur votre site et votre app</p>
              )}
            </div>
          </div>

          {/* Localisation */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[#3B82F6] uppercase tracking-wider">Localisation</h2>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Ville *</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Lille"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Code postal</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="59000 (optionnel)"
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Région</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Optionnel"
                  value={form.region}
                  onChange={(e) => update("region", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Département</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  placeholder="Optionnel"
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Villes desservies * (séparées par des virgules)</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                placeholder="Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq"
                value={form.zones}
                onChange={(e) => update("zones", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Lieux d&apos;intérêt (optionnel — discothèques, gares, aéroports, entreprises)</label>
              <input
                className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                placeholder="Le Macumba (Englos), Gare Lille-Flandres, Aéroport Lesquin"
                value={form.lieux}
                onChange={(e) => update("lieux", e.target.value)}
              />
              <p className="text-xs text-zinc-700 mt-1">Des forfaits seront créés automatiquement vers ces lieux</p>
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
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Prix au km (€)</label>
                <input
                  className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition"
                  type="number"
                  step="0.10"
                  value={form.pricePerKm}
                  onChange={(e) => update("pricePerKm", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Min. course (€)</label>
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
            {testMode && <p className="text-xs text-yellow-500 font-bold mb-3">MODE TEST — prix réduits</p>}
            <h2 className="font-semibold mb-4">Récapitulatif</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Abonnement mensuel</span>
                <span className="font-bold text-[#3B82F6]">{testMode ? "0,49€/mois" : "29€/mois"}</span>
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

          {/* Déclarations légales */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptCgv}
                onChange={(e) => setAcceptCgv(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#1E1E22] bg-[#09090B] accent-[#3B82F6]"
              />
              <span className="text-xs text-zinc-500 leading-relaxed">
                Je déclare être titulaire d&apos;une <strong className="text-zinc-300">carte professionnelle VTC valide</strong> et exercer en conformité avec la réglementation en vigueur (immatriculation, assurance RC Pro, inscription au registre VTC). J&apos;accepte les{" "}
                <a href="/cgv" target="_blank" className="text-[#3B82F6] hover:underline">CGV</a>,{" "}
                la <a href="/confidentialite" target="_blank" className="text-[#3B82F6] hover:underline">politique de confidentialité</a> et les{" "}
                <a href="/mentions-legales" target="_blank" className="text-[#3B82F6] hover:underline">mentions légales</a>.
              </span>
            </label>
          </div>

          {missing.length > 0 && !loading && (
            <p className="text-xs text-zinc-600 mb-2">Remplissez : {missing.join(", ")}</p>
          )}
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className={`btn-primary w-full flex items-center justify-center gap-2 ${!canSubmit || loading ? "opacity-30 cursor-not-allowed" : ""}`}
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
