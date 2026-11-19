import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/cover-art";
import { ArtistCard, Chip, DemoBadge, SectionTitle } from "@/components/ui";
import { artists, favorites, formatListeners, getArtist, recommendations } from "@/lib/demo-data";
import { BotonFavorito } from "./boton-favorito";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/artista/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getArtist(slug)?.name ?? "Artista" };
}

const soundLabels = [
  { key: "energy", label: "Energía" },
  { key: "valence", label: "Positividad" },
  { key: "danceability", label: "Bailabilidad" },
  { key: "acousticness", label: "Acústica" },
] as const;

async function Artista({ params }: { params: PageProps<"/artista/[slug]">["params"] }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const reason = Object.values(recommendations).flat().find((r) => r.artist === slug)?.reason;
  const similar = artist.similar.map(getArtist).filter((a) => a !== undefined);

  return (
    <main className="pb-16">
      <div className="relative overflow-hidden border-b border-line">
        <CoverArt seed={artist.slug} hue={artist.hue} variant="genre" className="absolute inset-0 h-full w-full opacity-70" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-16 pb-10 sm:flex-row sm:items-end sm:px-6 sm:pt-24">
          <div className="h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-48 sm:w-48">
            <CoverArt seed={artist.slug} hue={artist.hue} className="h-full w-full" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-[0.14em] text-accent-soft uppercase">{artist.emerging ? "Artista emergente" : "Artista"}</p>
              <DemoBadge />
            </div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{artist.name}</h1>
            <p className="mt-2 text-foreground/80">
              {formatListeners(artist.listeners)} oyentes mensuales · {artist.origin}
            </p>
          </div>
          <BotonFavorito initial={favorites.artists.includes(artist.slug)} />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-10">
          {reason && (
            <section className="rounded-2xl border border-accent/40 bg-accent/[0.07] p-5">
              <p className="text-xs tracking-[0.14em] text-accent-soft uppercase">Por qué te lo recomendamos</p>
              <p className="mt-2 text-lg">{reason}.</p>
            </section>
          )}
          <section>
            <SectionTitle>Sobre el artista</SectionTitle>
            <p className="text-foreground/90">{artist.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {artist.genres.map((g) => (
                <Chip key={g}>{g}</Chip>
              ))}
            </div>
          </section>
          <section>
            <SectionTitle>Canciones principales</SectionTitle>
            <ol className="divide-y divide-line rounded-2xl border border-line">
              {artist.topTracks.map((t, i) => (
                <li key={t} className="flex items-center gap-4 px-4 py-3">
                  <span className="w-4 text-sm text-muted tabular-nums">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section>
          <SectionTitle>Perfil de sonido</SectionTitle>
          <div className="space-y-4 rounded-2xl border border-line bg-surface p-5">
            {soundLabels.map(({ key, label }) => {
              const v = artist.sound[key];
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted tabular-nums">{Math.round(v * 100)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-line">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-strong to-accent-soft" style={{ width: `${v * 100}%` }} />
                  </div>
                </div>
              );
            })}
            <p className="flex justify-between border-t border-line pt-4 text-sm">
              <span>Tempo medio</span>
              <span className="text-muted tabular-nums">{artist.sound.tempo} BPM</span>
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <SectionTitle>Artistas similares</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {similar.map((a) => (
            <ArtistCard key={a.slug} artist={a} subtitle={a.genres.join(" · ")} />
          ))}
        </div>
      </section>
    </main>
  );
}

// Leer los parámetros de la URL dentro de <Suspense> permite que la navegación sea instantánea (Next 16).
export default function Page({ params }: PageProps<"/artista/[slug]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <Artista params={params} />
    </Suspense>
  );
}
