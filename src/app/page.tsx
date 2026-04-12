"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car, ArrowRight, Check, X, Zap, Globe, MapPin, MessageCircle,
  Search, Smartphone, CreditCard, BarChart3, Shield, Sparkles,
  TrendingUp, Clock, Star, ExternalLink, ChevronRight, Flame,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const FAQ = [
  { q: "J'ai besoin de compétences techniques ?", a: "Aucune. On s'occupe de tout : création, configuration, mise en ligne, domaine. Vous nous donnez vos infos (nom, téléphone, tarifs, zones), on fait le reste. En moins de 24h votre site est live." },
  { q: "Est-ce que je peux modifier mes tarifs ?", a: "Oui, directement depuis votre dashboard. Vous changez votre prix au km et votre minimum de course en un clic. Mise à jour automatique sur votre site en 30 secondes, sans nous contacter." },
  { q: "Comment mes clients me paient ?", a: "Le paiement se fait en véhicule (carte via SumUp, espèces, virement). On peut aussi intégrer le paiement en ligne par carte (Stripe) en option." },
  { q: "Je peux résilier quand je veux ?", a: "Oui, sans engagement. Vous pouvez arrêter à tout moment. Pas de frais cachés, pas de piège." },
  { q: "Le site fonctionne sur téléphone ?", a: "100% responsive et optimisé mobile. Le site est même installable comme une app (PWA) sur l'écran d'accueil du téléphone." },
  { q: "Qu'est-ce qui est inclus dans les 29€/mois ?", a: "Tout : hébergement, maintenance, mises à jour, support WhatsApp 7j/7, SEO, certificat SSL, nom de domaine. Aucun coût caché." },
  { q: "Et si je ne suis pas satisfait ?", a: "Garantie 30 jours satisfait ou remboursé. Si le site ne vous convient pas, on vous rembourse les 199€ de mise en place, sans question." },
];

const OBJECTIONS = [
  { q: "\"J'ai pas le temps pour ça.\"", a: "C'est justement pour ça que ton site doit travailler à ta place. 10 minutes pour s'inscrire. En moins de 24h c'est en ligne. Après ? Tu conduis, ton site encaisse." },
  { q: "\"29€/mois c'est cher.\"", a: "Une course de 20 km rembourse le mois. Les plateformes prélèvent 25% de TOUT ton CA. Le calcul est vite fait." },
  { q: "\"Mes clients ne sont pas sur internet.\"", a: "87% des gens cherchent un VTC sur Google avant de réserver. Tes clients y sont. Ils cherchent juste quelqu'un d'autre que toi." },
  { q: "\"Je suis pas geek.\"", a: "Ni nous. On a fait ce SaaS pour ça. Tu remplis un formulaire. On fait le reste. Zéro compétence technique requise." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [uberLoss, setUberLoss] = useState(0);
  const [ca, setCa] = useState(4000);

  useEffect(() => {
    setUberLoss(Math.round(ca * 0.25));
  }, [ca]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#030305]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030305]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight">Mon<span className="text-gradient-blue">VTC</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="hidden sm:block text-sm text-zinc-400 hover:text-white transition">Tarifs</a>
            <a href="#blog" className="hidden sm:block text-sm text-zinc-400 hover:text-white transition">Blog</a>
            <Link href="/inscription" className="btn-glow !py-2 !px-5 !text-xs">
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — GROS, AUDACIEUX */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6">
        {/* Gradient background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#3B82F6]/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[150px] animate-pulse-slow-delayed" />
          <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs text-zinc-300 mb-8 animate-fade-in-up">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Nouveau — Mise en ligne en moins de 24h garantie</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.95] mb-8 animate-fade-in-up animate-delay-1">
            Garde <span className="text-gradient-blue">100%</span>
            <br />
            de ton <span className="italic font-light text-zinc-400">chiffre.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animate-delay-2">
            Les plateformes prennent <span className="text-white font-bold">25% de ton CA.</span>{" "}
            Avec ton propre site de réservation, tu gardes tout. Prêt en moins de 24h.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animate-delay-3">
            <Link href="/inscription" className="btn-glow text-base !py-4 !px-10 flex items-center gap-2 group">
              Créer mon site VTC
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <a href="#demo" className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-zinc-400 hover:text-white transition">
              Voir une démo
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-4">
            {[
              { num: "24h", label: "Mise en ligne" },
              { num: "0%", label: "Commission" },
              { num: "+1800€", label: "/mois en moyenne" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-5xl font-black text-gradient-blue mb-1">{s.num}</p>
                <p className="text-xs text-zinc-600 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLÈME — CALCULATEUR VISUEL */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">Le vrai coût des plateformes</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Tu travailles <span className="text-gradient-red">pour elles.</span>
              <br />
              <span className="text-zinc-500">Pas pour toi.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calculateur */}
            <div className="card-modern p-8 border-red-500/20 bg-gradient-to-br from-red-950/20 to-transparent">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Calcul en temps réel</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">Combien tu perds chaque mois ?</h3>

              <label className="text-xs text-zinc-500 block mb-2">Ton CA mensuel</label>
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={ca}
                  onChange={(e) => setCa(parseInt(e.target.value))}
                  className="flex-1 accent-red-500"
                />
                <span className="text-2xl font-black text-white w-28 text-right">{ca}€</span>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Commission plateformes (25%)</span>
                  <span className="text-xl font-bold text-red-400">-{uberLoss}€</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Par an</span>
                  <span className="text-xl font-bold text-red-400">-{uberLoss * 12}€</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-zinc-300">Sur 5 ans</span>
                  <span className="text-3xl font-black text-red-400">-{(uberLoss * 60).toLocaleString("fr-FR")}€</span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 mt-6 italic">C'est ce que les plateformes te prennent. Chaque année. Chaque mois.</p>
            </div>

            {/* Avec MonVTC */}
            <div className="card-modern p-8 border-[#3B82F6]/30 bg-gradient-to-br from-blue-950/20 to-transparent">
              <div className="flex items-center gap-2 mb-6">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-xs text-green-400 font-bold uppercase tracking-wider">Avec MonVTC</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">Ce que tu gagnes à la place</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Commission <span className="text-green-400">0%</span></p>
                    <p className="text-xs text-zinc-500">Tu gardes chaque euro facturé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Clients en direct, fidèles</p>
                    <p className="text-xs text-zinc-500">Ils réservent sur TON site, avec TON nom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Coût total : <span className="text-green-400">29€/mois</span></p>
                    <p className="text-xs text-zinc-500">Fixe, prévisible, sans surprise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Tu décides tes prix, tes horaires</p>
                    <p className="text-xs text-zinc-500">Liberté totale — t'es ton propre patron</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-zinc-500 mb-2">Tu économises par mois (par rapport aux plateformes) :</p>
                <p className="text-4xl font-black text-gradient-green">+{uberLoss - 29}€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DÉMO — VISUEL GROS */}
      <section id="demo" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">Vrai site. Vrai chauffeur.</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
              Voici à quoi ressemble <br/><span className="text-gradient-blue">ton futur site.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Pas un mockup. Un vrai site en production, utilisé tous les jours par un chauffeur VTC.</p>
          </div>

          <div className="relative">
            <div className="card-modern p-2 sm:p-3 bg-gradient-to-br from-[#C9A84C]/10 to-transparent border-[#C9A84C]/20">
              <div className="bg-[#0A0A0A] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#262626] bg-[#0A0A0A]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs text-zinc-500 bg-[#141414] px-4 py-1 rounded font-mono">audovtc.fr</span>
                  </div>
                </div>
                <iframe
                  src="https://audovtc.fr"
                  className="w-full h-[600px] bg-white"
                  loading="lazy"
                  title="Exemple de site VTC"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://audovtc.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#60A5FA] transition font-semibold"
              >
                Explorer le site complet <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LES 3 PILIERS */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">Ce que tu obtiens</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Tout ce qu'un VTC
              <br />
              <span className="text-gradient-blue">pro a besoin.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Réservation 24/24",
                desc: "Tes clients réservent même à 3h du matin. Le site encaisse pour toi.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp + Google Maps",
                desc: "Chaque réservation arrive sur ton WhatsApp. Distance et prix calculés auto.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Search,
                title: "SEO local premium",
                desc: "Apparais sur Google quand un client cherche 'VTC + ta ville'.",
                color: "from-orange-500 to-red-500",
              },
            ].map((p) => (
              <div key={p.title} className="card-modern p-8 hover:scale-[1.02] transition-all duration-500 group">
                <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition`}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Autres features en liste compacte */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Globe, text: "Site premium" },
              { icon: Smartphone, text: "App mobile (PWA)" },
              { icon: BarChart3, text: "Dashboard admin" },
              { icon: Shield, text: "Mentions légales" },
              { icon: CreditCard, text: "Tarifs & forfaits" },
              { icon: Sparkles, text: "Mises à jour auto" },
            ].map((f) => (
              <div key={f.text} className="card-modern px-3 py-3 flex items-center gap-2">
                <f.icon className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span className="text-xs text-zinc-400">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-32 px-6 bg-[#06070A] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">Ils témoignent</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
              Les chauffeurs qui ont
              <br />
              <span className="text-gradient-blue">fait le switch.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Morgan", city: "Saint-Omer", brand: "AudoVTC",
                text: "En 3 mois j'ai remplacé 80% de mon CA Uber par des clients directs. +1400€/mois dans ma poche.",
                stars: 5, metric: "+1400€/mois",
              },
              {
                name: "Mehdi", city: "Lille", brand: "NordVTC",
                text: "Mon site tourne depuis 2 mois, j'ai déjà 47 avis Google 5 étoiles. Les clients me trouvent tout seuls maintenant.",
                stars: 5, metric: "47 avis 5★",
              },
              {
                name: "Chloé", city: "Bordeaux", brand: "CoteVTC",
                text: "Je facturais 12€/h via Uber. Maintenant 28€/course en direct. La même journée, 2x plus de revenus.",
                stars: 5, metric: "x2 revenus",
              },
            ].map((t) => (
              <div key={t.name} className="card-modern p-7 hover:border-[#3B82F6]/30 transition group">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.brand} · {t.city}</p>
                  </div>
                  <span className="text-sm font-black text-gradient-blue">{t.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">Tarification</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Un tarif. <span className="text-gradient-blue">Zéro surprise.</span>
            </h2>
          </div>

          <div className="card-modern p-10 sm:p-14 border-[#3B82F6]/40 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-[#8B5CF6]/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4]" />
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-xs font-bold">OFFRE LANCEMENT</span>
            </div>

            <div className="text-center mb-10">
              <div className="flex items-end justify-center gap-2 mb-3">
                <span className="text-7xl sm:text-8xl font-black">199€</span>
                <span className="text-zinc-400 mb-3 text-sm">de mise en place</span>
              </div>
              <p className="text-zinc-500 text-sm">puis</p>
              <div className="flex items-end justify-center gap-2 mt-2">
                <span className="text-5xl font-black text-gradient-blue">29€</span>
                <span className="text-zinc-400 mb-1 text-sm">/mois tout inclus</span>
              </div>
              <p className="text-xs text-zinc-600 mt-4">Sans engagement · Résiliable à tout moment</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                "Site premium personnalisé à votre marque",
                "Réservation en ligne + WhatsApp automatique",
                "Google Maps (autocomplete + distance)",
                "Forfaits personnalisés + tarif au km",
                "SEO local — apparaître sur Google",
                "PWA — app installable sur téléphone",
                "Dashboard admin pour vos réservations",
                "Mentions légales + CGV conformes RGPD",
                "Hébergement illimité + certificat SSL",
                "Nom de domaine inclus",
                "Support WhatsApp 7j/7",
                "Mises à jour automatiques à vie",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Garantie */}
            <div className="mb-8 p-5 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-green-400 mb-1">Garantie 30 jours — satisfait ou remboursé</p>
                <p className="text-xs text-zinc-500">Si le site ne te convient pas dans les 30 premiers jours, on te rembourse les 199€. Zéro question.</p>
              </div>
            </div>

            <Link href="/inscription" className="btn-glow w-full flex items-center justify-center gap-2 !py-5 text-base">
              Lancer mon site maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="py-32 px-6 bg-[#06070A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">On a entendu ça cent fois</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Les <span className="text-gradient-blue">vraies</span> réponses
              <br />
              à tes vraies <span className="italic font-light text-zinc-400">objections.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {OBJECTIONS.map((o) => (
              <div key={o.q} className="card-modern p-6 hover:border-[#3B82F6]/30 transition">
                <p className="text-lg font-bold mb-2 text-zinc-300">{o.q}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CAPTURE */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-3">Pas prêt à t'inscrire ?</h2>
            <p className="text-zinc-500 text-sm">Reçois gratuitement le guide complet pour réussir en VTC. On t'envoie 8 emails sur 4 semaines.</p>
          </div>
          <NewsletterForm source="landing-home" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
              Toutes tes <span className="text-gradient-blue">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="card-modern overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition"
                >
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <ChevronRight className={`w-5 h-5 text-zinc-600 shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/15 rounded-full blur-[180px] animate-pulse-slow" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>Offre limitée — mise en ligne 24h garantie</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
            Ton site est <span className="text-gradient-blue">prêt</span>
            <br />
            à décoller.
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-12">
            Rejoins les chauffeurs qui ont arrêté de donner 25% de leur CA. Aujourd'hui.
          </p>

          <Link href="/inscription" className="btn-glow text-base !py-5 !px-12 inline-flex items-center gap-2 group">
            Lancer mon site VTC
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>

          <p className="text-xs text-zinc-600 mt-6">199€ + 29€/mois · Sans engagement · Garantie 30 jours</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#030305]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-black">Mon<span className="text-gradient-blue">VTC</span></span>
                <p className="text-xs text-zinc-700">Sites VTC professionnels — France</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="tel:+33743289393" className="hover:text-[#3B82F6] transition">07 43 28 93 93</a>
              <a href="mailto:contact@monvtc.fr" className="hover:text-[#3B82F6] transition">contact@monvtc.fr</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-4 text-xs text-zinc-700">
            <Link href="/creer-site-vtc" className="hover:text-zinc-400 transition">Créer un site VTC</Link>
            <Link href="/devenir-chauffeur-vtc" className="hover:text-zinc-400 transition">Devenir chauffeur VTC</Link>
            <Link href="/solution-vtc" className="hover:text-zinc-400 transition">Solution VTC</Link>
            <Link href="/blog" className="hover:text-zinc-400 transition">Blog</Link>
            <Link href="/inscription" className="hover:text-zinc-400 transition">Inscription</Link>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-zinc-800">
            <Link href="/mentions-legales" className="hover:text-zinc-500 transition">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-zinc-500 transition">CGV</Link>
            <Link href="/confidentialite" className="hover:text-zinc-500 transition">Confidentialité</Link>
            <Link href="/v1" className="hover:text-zinc-500 transition">V1</Link>
          </div>
          <div className="mt-4 text-center text-xs text-zinc-800">
            &copy; {new Date().getFullYear()} MonVTC — Tous droits réservés — Propulsé par <a href="https://dal-ai.com" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-[#3B82F6] transition">DAL-AI</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
