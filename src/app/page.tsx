"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car, Globe, MapPin, MessageCircle, Phone, Search, Shield, Smartphone,
  Star, Zap, ArrowRight, Check, ChevronRight, Clock, CreditCard,
  BarChart3, Sparkles, Users, ExternalLink,
} from "lucide-react";

const FEATURES = [
  { icon: Globe, title: "Site premium", desc: "Landing page professionnelle avec votre marque, vos couleurs, votre identité" },
  { icon: Smartphone, title: "Réservation en ligne", desc: "Formulaire 3 étapes : trajet, infos, confirmation. Simple et rapide" },
  { icon: MessageCircle, title: "WhatsApp intégré", desc: "Bouton flottant + envoi auto du récap de réservation sur votre numéro" },
  { icon: MapPin, title: "Google Maps", desc: "Autocomplete d'adresses + calcul automatique de distance et prix" },
  { icon: Search, title: "SEO local", desc: "Optimisé pour Google : VTC + votre ville en 1ère page. Schema.org, sitemap..." },
  { icon: Smartphone, title: "PWA installable", desc: "Vos clients installent votre app sur leur écran d'accueil en 1 clic" },
  { icon: CreditCard, title: "Forfaits & tarifs", desc: "Vos forfaits personnalisés + tarif au km. Prix affichés, pas de surprises" },
  { icon: BarChart3, title: "Dashboard admin", desc: "Gérez vos réservations : stats, confirmation, annulation. Tout en un" },
  { icon: Shield, title: "Pages légales", desc: "Mentions légales et CGV conformes, générées automatiquement" },
];

const TESTIMONIALS = [
  { name: "AudoVTC", city: "Saint-Omer", text: "Mon site est en ligne depuis 24h et j'ai déjà reçu 3 réservations via WhatsApp. Le système est simple et mes clients adorent.", stars: 5 },
  { name: "NordVTC", city: "Lille", text: "Avant j'avais une page Facebook, maintenant j'ai un vrai site pro. Mes clients me trouvent sur Google et réservent en 30 secondes.", stars: 5 },
  { name: "CôteVTC", city: "Boulogne", text: "Le meilleur investissement que j'ai fait. 29€/mois pour un site qui me rapporte 10x plus. Le calcul est vite fait.", stars: 5 },
];

const STEPS = [
  { num: "01", title: "Vous nous contactez", desc: "Appelez ou envoyez un WhatsApp. On discute de vos besoins en 10 minutes." },
  { num: "02", title: "On configure tout", desc: "Votre marque, vos tarifs, vos zones, votre numéro. On s'occupe de tout." },
  { num: "03", title: "Votre site est en ligne", desc: "En 24h votre site est live, optimisé et prêt à recevoir des réservations." },
];

const FAQ = [
  { q: "J'ai besoin de compétences techniques ?", a: "Absolument pas. On s'occupe de tout : création, configuration, mise en ligne, domaine. Vous n'avez qu'à nous fournir vos infos (nom, téléphone, tarifs, zones)." },
  { q: "Est-ce que je peux modifier mes tarifs ?", a: "Oui, à tout moment. Un simple message et on met à jour vos forfaits, votre prix au km, ou toute autre info en quelques minutes." },
  { q: "Comment mes clients me paient ?", a: "Le paiement se fait en véhicule (carte via SumUp, espèces, virement). On peut aussi intégrer le paiement en ligne par carte (Stripe) en option." },
  { q: "Je peux résilier quand je veux ?", a: "Oui, sans engagement. Vous pouvez arrêter à tout moment. Pas de frais cachés, pas de piège." },
  { q: "Le site fonctionne sur téléphone ?", a: "100% responsive et optimisé mobile. Vos clients (et vous) pouvez tout faire depuis un smartphone. Le site est même installable comme une app." },
  { q: "Qu'est-ce qui est inclus dans les 29€/mois ?", a: "Tout : hébergement, maintenance, mises à jour, support, SEO, certificat SSL, nom de domaine. Aucun coût caché." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#tarifs" className="hidden sm:block text-sm text-zinc-400 hover:text-white transition">Tarifs</a>
            <a href="#demo" className="hidden sm:block text-sm text-zinc-400 hover:text-white transition">Démo</a>
            <a href="/inscription" className="btn-primary !py-2 !px-5 !text-xs">
              Lancer mon site
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-sm text-[#3B82F6] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Solution clé en main pour chauffeurs VTC
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] animate-fade-in-up animate-delay-1">
            Votre site VTC
            <br />
            <span className="text-gradient">en 24 heures</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-2">
            Un site de réservation professionnel, avec WhatsApp, Google Maps et SEO local.
            <br className="hidden sm:block" />
            Vos clients réservent en 30 secondes. Vous recevez sur votre téléphone.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-3">
            <a href="/inscription" className="btn-primary flex items-center gap-2 text-base !py-4 !px-8">
              Créer mon site VTC
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#demo" className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 hover:text-white transition border border-[#1E1E22] rounded-xl hover:border-[#3B82F6]/30">
              <ExternalLink className="w-4 h-4" />
              Voir la démo
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 sm:gap-10 animate-fade-in-up animate-delay-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#3B82F6]">24h</p>
              <p className="text-xs text-zinc-600 mt-1">Mise en ligne</p>
            </div>
            <div className="w-px h-10 bg-[#1E1E22]" />
            <div className="text-center">
              <p className="text-2xl font-bold">199€</p>
              <p className="text-xs text-zinc-600 mt-1">Setup unique</p>
            </div>
            <div className="w-px h-10 bg-[#1E1E22]" />
            <div className="text-center">
              <p className="text-2xl font-bold">29€</p>
              <p className="text-xs text-zinc-600 mt-1">/mois</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111113] to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">Démo live</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Voyez le résultat <span className="text-gradient">par vous-même</span></h2>
          <p className="text-center text-zinc-500 mb-12 max-w-lg mx-auto">Un vrai site en production, utilisé par un vrai chauffeur VTC.</p>

          <div className="card p-2 sm:p-3">
            <div className="bg-[#09090B] rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E22]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-zinc-600 bg-[#111113] px-4 py-1 rounded">audovtc.fr</span>
                </div>
              </div>
              <div className="p-8 sm:p-12 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A07D2E] flex items-center justify-center">
                  <Car className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">AudoVTC</h3>
                <p className="text-zinc-500 text-sm mb-6">Chauffeur VTC — Saint-Omer & Audomarois</p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {["Réservation en ligne", "WhatsApp", "Google Maps", "Forfaits", "PWA", "SEO"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <a
                  href="https://audovtc.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#A07D2E] text-black font-bold rounded-lg text-sm hover:opacity-90 transition"
                >
                  Voir le site live <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">Fonctionnalités</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Tout ce dont un chauffeur VTC <span className="text-gradient">a besoin</span></h2>
          <p className="text-center text-zinc-500 mb-16 max-w-lg mx-auto">Chaque site inclut ces fonctionnalités. Pas d&apos;options cachées, tout est inclus.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group card p-6 hover:bg-[#151517] transition-all duration-300">
                <div className="w-11 h-11 mb-4 rounded-xl bg-[#3B82F6]/10 group-hover:bg-[#3B82F6]/20 flex items-center justify-center transition">
                  <f.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#08080A] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">Comment ça marche</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">En ligne en <span className="text-gradient">3 étapes</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative group">
                <div className="text-6xl font-black text-[#3B82F6]/10 group-hover:text-[#3B82F6]/20 transition absolute -top-4 -left-2">{s.num}</div>
                <div className="relative pt-8 pl-2">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && <div className="hidden sm:block absolute top-12 -right-4 text-[#1E1E22]"><ChevronRight className="w-6 h-6" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Simple et <span className="text-gradient">transparent</span></h2>
          <p className="text-center text-zinc-500 mb-16 max-w-lg mx-auto">Pas de surprise, pas de frais cachés. Un tarif, tout inclus.</p>

          <div className="max-w-md mx-auto card p-8 border-[#3B82F6]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB]" />
            <div className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-medium">Offre de lancement</span>
              <div className="mt-6 flex items-end justify-center gap-1">
                <span className="text-5xl font-bold">199€</span>
                <span className="text-zinc-500 mb-2">setup</span>
              </div>
              <div className="mt-2 flex items-end justify-center gap-1">
                <span className="text-zinc-400">puis</span>
                <span className="text-3xl font-bold text-[#3B82F6]">29€</span>
                <span className="text-zinc-500 mb-1">/mois</span>
              </div>
              <p className="text-xs text-zinc-600 mt-2">Sans engagement — résiliable à tout moment</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "Site premium personnalisé à votre marque",
                "Réservation en ligne + WhatsApp",
                "Google Maps (autocomplete + distance)",
                "Forfaits personnalisés + tarif au km",
                "SEO local optimisé pour votre ville",
                "PWA installable sur téléphone",
                "Dashboard admin pour gérer les réservations",
                "Mentions légales + CGV conformes",
                "Hébergement + maintenance + mises à jour",
                "Support par WhatsApp 7j/7",
                "Nom de domaine inclus",
                "Certificat SSL (HTTPS)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            <a href="/inscription" className="btn-primary w-full flex items-center justify-center gap-2">
              Lancer mon site VTC
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#08080A]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">Témoignages</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Ils ont leur site <span className="text-gradient">VTC</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#3B82F6] fill-[#3B82F6]" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-zinc-600">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#3B82F6] text-sm font-medium uppercase tracking-widest text-center mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Questions <span className="text-gradient">fréquentes</span></h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-sm pr-4">{item.q}</span>
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

      {/* Contact / CTA */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/3 to-transparent" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Prêt à avoir <span className="text-gradient">votre site</span> ?</h2>
          <p className="text-zinc-400 mb-10 text-lg">Contactez-nous et votre site est en ligne sous 24h.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/33743289393?text=Bonjour%2C%20je%20suis%20chauffeur%20VTC%20et%20je%20souhaite%20cr%C3%A9er%20mon%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Nous écrire sur WhatsApp
            </a>
            <a href="tel:+33743289393" className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 hover:text-white transition border border-[#1E1E22] rounded-xl hover:border-[#3B82F6]/30">
              <Phone className="w-4 h-4" />
              07 43 28 93 93
            </a>
          </div>

          <p className="text-xs text-zinc-700">Réponse garantie sous 2h — 7j/7</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#08080A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
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
          </div>
          <div className="mt-4 text-center text-xs text-zinc-800">
            &copy; {new Date().getFullYear()} MonVTC — Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
