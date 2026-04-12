"use client";

import Link from "next/link";
import { Check, ArrowRight, Mail } from "lucide-react";

export default function MerciPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="card p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-black mb-3">Paiement confirme !</h1>
        <p className="text-zinc-400 mb-6">Merci pour ton inscription a la formation. Tu vas recevoir un email dans les 5 minutes avec ton acces a l&apos;espace membre.</p>
        <div className="card p-4 text-left text-sm mb-6 bg-[#09090B]">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Prochaines etapes</p>
              <p className="text-xs text-zinc-500">1. Verifie ta boite mail (et tes spams)<br/>2. Clique sur le lien d&apos;acces<br/>3. Commence le module 1 tout de suite</p>
            </div>
          </div>
        </div>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          Retour a l&apos;accueil <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
