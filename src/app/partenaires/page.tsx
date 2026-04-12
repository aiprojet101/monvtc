import Link from "next/link";
import { Car, ArrowRight, Building2, GraduationCap, Users, Percent, Handshake, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partenaires — Programme d'affiliation MonVTC",
  description: "Devenez partenaire MonVTC : agences web, centres de formation, influenceurs. Commissions attractives, marque blanche possible. Rejoignez le programme.",
  alternates: { canonical: "https://vtc-site.fr/partenaires" },
};

export default function PartenairesPage() {
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
          <a href="#contact" className="btn-primary !py-2 !px-5 !text-xs">Devenir partenaire</a>
        </div>
      </nav>

      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-xs text-[#3B82F6] mb-8">
            <Handshake className="w-3.5 h-3.5" />
            <span>Programme partenaires — ouvert</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
            Devenez <span className="text-gradient">partenaire</span> MonVTC
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Agences web, centres de formation VTC, influenceurs, cabinets comptables : recommandez MonVTC à vos clients et touchez jusqu&apos;à 30% de commission récurrente.
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-base !py-4 !px-8">
            Rejoindre le programme <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-4">Pour qui ?</h2>
          <p className="text-center text-zinc-500 mb-16">3 profils partenaires qui s&apos;associent avec MonVTC.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Agences web",
                desc: "Vous créez des sites pour des clients VTC ? Proposez-leur notre solution clé en main et gardez votre marge. Marque blanche possible.",
                commission: "20% récurrents",
              },
              {
                icon: GraduationCap,
                title: "Centres de formation VTC",
                desc: "Vos stagiaires ont besoin d'un site à la sortie. Offrez-leur MonVTC comme bonus de formation et touchez une commission.",
                commission: "25% récurrents",
              },
              {
                icon: Users,
                title: "Influenceurs / créateurs",
                desc: "Vous parlez aux chauffeurs VTC sur YouTube, TikTok, Instagram ? Code promo personnalisé + commission sur chaque client signé.",
                commission: "30% récurrents",
              },
            ].map((p) => (
              <div key={p.title} className="card p-8">
                <p.icon className="w-8 h-8 text-[#3B82F6] mb-4" />
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{p.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <Percent className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-bold text-green-400">{p.commission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-4">Comment ça marche ?</h2>
          <p className="text-center text-zinc-500 mb-16">4 étapes pour commencer à gagner avec MonVTC.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { step: "01", title: "Tu candidates", desc: "Remplis le formulaire ci-dessous avec ton profil et ton audience." },
              { step: "02", title: "On valide ensemble", desc: "Call de 15 min pour définir ta commission, code promo et matériel." },
              { step: "03", title: "Tu recommandes", desc: "Utilise ton lien ou code promo dans tes communications." },
              { step: "04", title: "Tu encaisses", desc: "Virement tous les mois sur chaque client signé grâce à toi. Récurrent tant qu'il paie." },
            ].map((s) => (
              <div key={s.step} className="card p-6 relative overflow-hidden">
                <p className="absolute -top-4 -left-2 text-6xl font-black text-[#3B82F6]/10">{s.step}</p>
                <div className="relative pt-6 pl-2">
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <div className="card p-10 border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/5 to-transparent">
            <TrendingUp className="w-8 h-8 text-[#3B82F6] mb-4" />
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Potentiel de revenu</h2>
            <p className="text-zinc-400 mb-6">Exemple concret pour une agence web qui signe 5 clients VTC par mois avec MonVTC :</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-zinc-400">Commission setup (5 × 199€ × 20%)</span>
                <span className="font-bold text-white">199€/mois one-shot</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-zinc-400">Commission abonnement mois 1 (5 × 29€ × 20%)</span>
                <span className="font-bold text-white">29€/mois</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-zinc-400">Commission abonnement cumulée au bout d&apos;1 an (60 clients × 29€ × 20%)</span>
                <span className="font-bold text-[#3B82F6]">348€/mois récurrents</span>
              </div>
              <div className="flex justify-between items-center pt-3 gap-3">
                <span className="text-white font-bold">Revenu an 2 (récurrent)</span>
                <span className="text-lg sm:text-2xl font-black text-gradient whitespace-nowrap">~5 000€/mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">Prêt à <span className="text-gradient">commencer</span> ?</h2>
          <p className="text-zinc-400 mb-10">Envoie-nous un message sur WhatsApp ou par email. Réponse sous 48h.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/33743289393?text=Bonjour%2C%20je%20souhaite%20devenir%20partenaire%20MonVTC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg text-sm transition"
            >
              Nous écrire sur WhatsApp
            </a>
            <a href="mailto:contact@vtc-site.fr?subject=Programme%20partenaires" className="text-sm text-zinc-400 hover:text-white transition">
              contact@vtc-site.fr
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#030305] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/formation" className="hover:text-zinc-400">Formation</Link>
      </footer>
    </div>
  );
}
