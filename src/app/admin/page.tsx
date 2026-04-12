"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, ExternalLink, Users, Euro, Check, X, Clock, Lock, Mail } from "lucide-react";

interface Client {
  subscriptionId: string;
  createdAt: string;
  status: string;
  brand: string;
  slug: string;
  city: string;
  email: string;
  phone: string;
  siteUrl: string;
  pricePerKm: string;
  amount: number;
}

export default function AdminPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [emailStats, setEmailStats] = useState<{ month: { sent: number; quota: number; percent: number }; today: { sent: number; quota: number; percent: number } } | null>(null);
  const [authError, setAuthError] = useState("");

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients`, { credentials: "same-origin" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setClients(data);
        setAuthenticated(true);
        setAuthError("");
        fetch(`/api/admin/email-stats`, { credentials: "same-origin" })
          .then(r => r.json())
          .then(d => { if (!d.error) setEmailStats(d); })
          .catch(() => {});
      }
      return data;
    } catch {
      // silencieux
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`/api/admin/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAuthError(data.error || "Mot de passe incorrect");
        return;
      }
      setPassword("");
      fetchClients();
    } catch {
      setAuthError("Erreur reseau");
    }
  }

  async function handleLogout() {
    await fetch(`/api/admin/auth`, { method: "DELETE", credentials: "same-origin" });
    setAuthenticated(false);
    setClients([]);
  }

  // Check session au chargement (cookie httpOnly verifie cote serveur)
  useEffect(() => {
    fetch(`/api/admin/auth`, { credentials: "same-origin" })
      .then(r => r.json())
      .then(d => {
        if (d.authenticated) {
          fetchClients();
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [fetchClients]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="card p-8 max-w-sm w-full">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Admin MonVTC</h1>
          <p className="text-xs text-zinc-500 text-center mb-6">Entrez le mot de passe admin</p>
          {authError && <p className="text-xs text-red-400 text-center mb-3">{authError}</p>}
          <input
            type="password"
            className="w-full bg-[#09090B] border border-[#1E1E22] rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:outline-none transition mb-4"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-primary w-full">Connexion</button>
          <p className="text-[10px] text-zinc-600 text-center mt-3">Session 7 jours, cookie httpOnly</p>
        </form>
      </div>
    );
  }

  const active = clients.filter(c => c.status === "active").length;
  const mrr = clients.filter(c => c.status === "active").reduce((sum, c) => sum + (c.amount || 29), 0);

  async function deleteClient(subscriptionId: string, slug: string, brand: string) {
    if (!confirm(`Supprimer ${brand} ? Cela annulera l'abonnement Stripe et supprimera le projet Vercel.`)) return;
    await fetch(`/api/admin/clients`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ subscriptionId, slug }),
    });
    fetchClients();
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#09090B] border-b border-[#1E1E22] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Mon<span className="text-[#3B82F6]">VTC</span> Admin</h1>
            <p className="text-xs text-zinc-600">Gestion des clients SaaS</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchClients()} className="p-2 rounded-lg bg-[#111113] border border-[#1E1E22] text-zinc-400 hover:text-white transition" title="Rafraichir">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={handleLogout} className="text-xs px-3 py-2 rounded-lg bg-[#111113] border border-[#1E1E22] text-zinc-400 hover:text-white transition">
              Deconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
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

        {/* Quota Resend */}
        {emailStats && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-xs text-zinc-500">Emails aujourd&apos;hui</span>
                </div>
                <span className={`text-xs font-bold ${emailStats.today.percent >= 80 ? "text-red-400" : emailStats.today.percent >= 50 ? "text-yellow-400" : "text-green-400"}`}>
                  {emailStats.today.percent}%
                </span>
              </div>
              <p className="text-2xl font-bold mb-2">{emailStats.today.sent} <span className="text-sm text-zinc-600 font-normal">/ {emailStats.today.quota}</span></p>
              <div className="h-1.5 bg-[#1E1E22] rounded-full overflow-hidden">
                <div className={`h-full transition-all ${emailStats.today.percent >= 80 ? "bg-red-500" : emailStats.today.percent >= 50 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(emailStats.today.percent, 100)}%` }} />
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-xs text-zinc-500">Emails ce mois</span>
                </div>
                <span className={`text-xs font-bold ${emailStats.month.percent >= 80 ? "text-red-400" : emailStats.month.percent >= 50 ? "text-yellow-400" : "text-green-400"}`}>
                  {emailStats.month.percent}%
                </span>
              </div>
              <p className="text-2xl font-bold mb-2">{emailStats.month.sent} <span className="text-sm text-zinc-600 font-normal">/ {emailStats.month.quota}</span></p>
              <div className="h-1.5 bg-[#1E1E22] rounded-full overflow-hidden">
                <div className={`h-full transition-all ${emailStats.month.percent >= 80 ? "bg-red-500" : emailStats.month.percent >= 50 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(emailStats.month.percent, 100)}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Client list */}
        {loading ? (
          <div className="text-center py-20 text-zinc-600">Chargement...</div>
        ) : clients.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">Aucun client pour le moment</div>
        ) : (
          <div className="space-y-3">
            {clients.map((c) => (
              <div key={c.subscriptionId} className="card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        c.status === "active" ? "bg-green-500/10 text-green-500" :
                        c.status === "canceled" ? "bg-red-500/10 text-red-500" :
                        "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {c.status === "active" ? "Actif" : c.status === "canceled" ? "Annulé" : c.status}
                      </span>
                      <span className="font-bold">{c.brand}</span>
                      <span className="text-xs text-zinc-600">{c.amount}€/mois</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mt-1">
                      {c.city && <span>{c.city}</span>}
                      {c.phone && <span>{c.phone}</span>}
                      {c.email && <span>{c.email}</span>}
                      {c.pricePerKm && <span>{c.pricePerKm}€/km</span>}
                    </div>
                    {c.siteUrl && (
                      <a href={`https://${c.siteUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#3B82F6] hover:underline mt-2">
                        {c.siteUrl} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => deleteClient(c.subscriptionId, c.slug, c.brand)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                      title="Supprimer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
