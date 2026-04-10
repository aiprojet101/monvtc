"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, ExternalLink, Users, Euro, Check, X, Clock, Lock } from "lucide-react";

interface Client {
  id: string;
  createdAt: string;
  status: string;
  brand: string;
  slug: string;
  city: string;
  email: string;
  phone: string;
  siteUrl: string;
  pricePerKm: string;
  zones: string;
}

export default function AdminPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const fetchClients = useCallback(async (s: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients?secret=${encodeURIComponent(s)}`);
      if (res.status === 401) {
        setAuthenticated(false);
        setAuthError(true);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setClients(data);
        setAuthenticated(true);
        setAuthError(false);
      }
    } catch {
      console.error("Erreur chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchClients(secret);
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="card p-8 max-w-sm w-full">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Admin MonVTC</h1>
          <p className="text-xs text-zinc-500 text-center mb-6">Entrez le mot de passe admin</p>
          {authError && <p className="text-xs text-red-400 text-center mb-3">Mot de passe incorrect</p>}
          <input
            type="password"
            className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition mb-4"
            placeholder="Mot de passe"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-primary w-full">Connexion</button>
        </form>
      </div>
    );
  }

  const active = clients.filter(c => c.status === "active").length;
  const mrr = active * 29;

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Mon<span className="text-[#3B82F6]">VTC</span> Admin</h1>
            <p className="text-xs text-zinc-600">Gestion des clients SaaS</p>
          </div>
          <button onClick={() => fetchClients(secret)} className="p-2 rounded-lg bg-[#111113] border border-[#1E1E22] text-zinc-400 hover:text-white transition">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-xs text-zinc-500">Clients</span>
            </div>
            <p className="text-2xl font-bold">{clients.length}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs text-zinc-500">Actifs</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{active}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-xs text-zinc-500">MRR</span>
            </div>
            <p className="text-2xl font-bold text-[#3B82F6]">{mrr}€</p>
          </div>
        </div>

        {/* Client list */}
        {loading ? (
          <div className="text-center py-20 text-zinc-600">Chargement...</div>
        ) : clients.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">Aucun client pour le moment</div>
        ) : (
          <div className="space-y-3">
            {clients.map((c) => (
              <div key={c.id} className="card p-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      c.status === "active" ? "bg-green-500/10 text-green-500" :
                      c.status === "failed" ? "bg-red-500/10 text-red-500" :
                      "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {c.status === "active" ? "Actif" : c.status === "failed" ? "Erreur" : "En cours"}
                    </span>
                    <span className="font-bold">{c.brand}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mt-1">
                    <span>{c.city}</span>
                    <span>{c.phone}</span>
                    <span>{c.email}</span>
                    <span>{c.pricePerKm}€/km</span>
                  </div>
                </div>
                {c.siteUrl && (
                  <a
                    href={`https://${c.siteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[#3B82F6] hover:underline"
                  >
                    {c.siteUrl} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
