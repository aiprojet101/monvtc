import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTABanner({ strong = false }: { strong?: boolean }) {
  return (
    <div className={`card p-6 my-10 ${strong ? "border-[#3B82F6]/30 bg-[#3B82F6]/5" : "bg-[#111113]"}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-[#3B82F6]" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-1 text-sm">
            {strong
              ? "Vous êtes chauffeur VTC ? Créez votre site professionnel."
              : "Votre site VTC professionnel en 24h"}
          </h3>
          <p className="text-xs text-zinc-500 mb-3">
            {strong
              ? "Réservation en ligne, WhatsApp, Google Maps, SEO local. 199€ + 29€/mois, sans engagement."
              : "Recevez des réservations en direct, sans commission. Site premium avec réservation, WhatsApp et SEO."}
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] hover:text-[#60A5FA] transition"
          >
            Créer mon site VTC <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
