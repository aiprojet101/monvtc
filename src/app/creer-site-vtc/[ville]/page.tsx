import Link from "next/link";
import { Car, ArrowRight, Check, MapPin, Search, MessageCircle, Zap, Shield } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, CITY_POIS, getCityBySlug } from "@/lib/cities";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return CITIES.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return { title: "Ville non trouvée" };
  return {
    title: `Créer un site VTC à ${city.name} — Site internet chauffeur VTC en moins de 24h`,
    description: `Créez votre site VTC professionnel à ${city.name} (${city.departmentNumber}). Réservation en ligne, WhatsApp, Google Maps, SEO local pour apparaître sur Google. 199€ + 29€/mois.`,
    keywords: [
      `créer site vtc ${city.name.toLowerCase()}`,
      `site internet chauffeur vtc ${city.name.toLowerCase()}`,
      `site vtc ${city.department.toLowerCase()}`,
      `vtc ${city.name.toLowerCase()}`,
      `chauffeur privé ${city.name.toLowerCase()}`,
      `site vtc ${city.departmentNumber}`,
    ],
    alternates: { canonical: `https://vtc-site.fr/creer-site-vtc/${city.slug}` },
    openGraph: {
      title: `Créer un site VTC à ${city.name}`,
      description: `Votre site VTC professionnel à ${city.name} en moins de 24h.`,
      type: "website",
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Création de site VTC à ${city.name}`,
    provider: { "@type": "Organization", name: "MonVTC", url: "https://vtc-site.fr" },
    areaServed: { "@type": "City", name: city.name },
    description: `Création de sites internet professionnels pour chauffeurs VTC à ${city.name} et dans le ${city.department}.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "29",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "29", priceCurrency: "EUR", unitText: "MONTH" },
    },
  };

  // Villes voisines de la même région (pour le maillage interne)
  const nearby = CITIES
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  const pois = CITY_POIS[city.slug];

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Mon<span className="text-[#3B82F6]">VTC</span></span>
          </Link>
          <Link href="/inscription" className="btn-primary !py-2 !px-5 !text-xs">Créer mon site</Link>
        </div>
      </nav>

      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Breadcrumbs items={[
            { label: "Accueil", href: "/" },
            { label: "Créer un site VTC", href: "/creer-site-vtc" },
            { label: city.name },
          ]} />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-xs text-[#3B82F6] mb-6">
            <MapPin className="w-3 h-3" /> {city.name} · {city.department} ({city.departmentNumber})
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Créer un site VTC à<br/>
            <span className="text-gradient">{city.name}</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10">
            Votre site internet de chauffeur VTC à {city.name} ({city.departmentNumber}), prêt en moins de 24 heures. Réservation en ligne, SEO local optimisé pour apparaître sur Google quand un client cherche un VTC à {city.name}.
          </p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2 text-base !py-4 !px-8">
            Créer mon site à {city.name} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#08080A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pourquoi un site VTC à {city.name} ?</h2>
          <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
            <p>
              {city.name} ({city.population.toLocaleString("fr-FR")} habitants) fait partie des villes où la demande VTC ne cesse de croître. Aéroports, gares, entreprises, sorties — les clients sont là, ils cherchent un chauffeur privé sur <strong className="text-white">Google</strong> avant de réserver.
            </p>
            <p>
              Si vous n&apos;apparaissez pas en première page quand un client tape <em>&ldquo;VTC {city.name}&rdquo;</em>, vous perdez ces clients chaque jour. Avec un <Link href="/creer-site-vtc" className="text-[#3B82F6] hover:underline">site VTC professionnel</Link> optimisé pour le {city.department}, vous les captez.
            </p>
            <p>
              MonVTC crée votre site en moins de 24 heures : réservation en ligne, WhatsApp automatique, calcul des distances via Google Maps, SEO local optimisé pour <strong className="text-white">&ldquo;VTC {city.name}&rdquo;</strong>, et mentions légales conformes. Pas besoin de compétences techniques.
            </p>
          </div>
        </div>
      </section>

      {pois && (pois.airports || pois.trainStations || pois.events) && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Opportunités VTC à {city.name}</h2>
            <p className="text-sm text-zinc-500 mb-8">Les clients VTC de {city.name} viennent de ces lieux clés.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pois.airports && pois.airports.length > 0 && (
                <div className="card p-5">
                  <h3 className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold mb-3">Aéroports</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {pois.airports.map((a) => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
              )}
              {pois.trainStations && pois.trainStations.length > 0 && (
                <div className="card p-5">
                  <h3 className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold mb-3">Gares</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {pois.trainStations.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
              )}
              {pois.events && pois.events.length > 0 && (
                <div className="card p-5">
                  <h3 className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold mb-3">Événements</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {pois.events.map((e) => <li key={e}>• {e}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-600 mt-6">
              Un site VTC bien référencé à {city.name} capte les clients qui cherchent un chauffeur depuis ces lieux. Les forfaits personnalisés générés automatiquement incluent les distances vers chaque aéroport et gare.
            </p>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Ce qui est inclus pour votre site VTC à {city.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Search, title: `SEO local ${city.name}`, desc: `Optimisation pour apparaître sur "VTC ${city.name}" et dans Google Maps.` },
              { icon: MessageCircle, title: "WhatsApp intégré", desc: `Chaque réservation de client ${city.name.toLowerCase()} arrive directement sur votre WhatsApp.` },
              { icon: MapPin, title: "Google Maps auto", desc: "Distances et prix calculés automatiquement entre le client et la destination." },
              { icon: Zap, title: "En moins de 24h", desc: `Vous nous donnez vos infos, on met votre site en ligne le lendemain.` },
              { icon: Check, title: "Forfaits personnalisés", desc: `Vos trajets populaires depuis ${city.name} : gares, aéroports, discothèques.` },
              { icon: Shield, title: "Mentions légales", desc: "CGV et mentions légales conformes RGPD, générées automatiquement." },
            ].map((f) => (
              <div key={f.title} className="card p-5">
                <f.icon className="w-5 h-5 text-[#3B82F6] mb-3" />
                <h3 className="font-semibold mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="py-16 px-6 bg-[#08080A]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Autres villes de {city.region}</h2>
            <p className="text-sm text-zinc-500 mb-8">Nous créons aussi des sites VTC dans les villes voisines.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/creer-site-vtc/${c.slug}`}
                  className="card p-4 hover:border-[#3B82F6]/30 transition group"
                >
                  <p className="text-sm font-semibold group-hover:text-[#3B82F6] transition">{c.name}</p>
                  <p className="text-xs text-zinc-600">{c.department}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à lancer votre site VTC à {city.name} ?</h2>
          <p className="text-zinc-400 mb-8">199€ de mise en place + 29€/mois. Sans engagement. En ligne en moins de 24h.</p>
          <Link href="/inscription" className="btn-primary inline-flex items-center gap-2">
            Créer mon site maintenant <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 bg-[#08080A] text-center text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} MonVTC — <Link href="/" className="hover:text-zinc-400">Accueil</Link> — <Link href="/creer-site-vtc" className="hover:text-zinc-400">Créer un site VTC</Link> — <Link href="/blog" className="hover:text-zinc-400">Blog</Link>
      </footer>
    </div>
  );
}
