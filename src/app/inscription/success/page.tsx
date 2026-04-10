"use client";

import Link from "next/link";
import { Check, ExternalLink, Clock } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="card p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Paiement confirmé !</h1>
        <p className="text-zinc-400 mb-8">
          Votre site VTC est en cours de création. Vous recevrez un email avec le lien de votre site dès qu&apos;il sera en ligne.
        </p>

        <div className="card p-4 text-left space-y-3 mb-8 bg-[#09090B]">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Déploiement en cours</p>
              <p className="text-xs text-zinc-500">Votre site sera accessible sous quelques minutes à l&apos;adresse votresite.vtc-site.fr</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Domaine personnalisé</p>
              <p className="text-xs text-zinc-500">Nous vous contacterons pour configurer votre nom de domaine (ex: votrenom-vtc.fr)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/33743289393?text=Bonjour%2C%20je%20viens%20de%20m%27inscrire%20sur%20MonVTC.%20Mon%20site%20est%20en%20cours%20de%20cr%C3%A9ation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg transition text-sm"
          >
            Une question ? WhatsApp
          </a>
          <Link href="/" className="btn-primary text-center text-sm">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
