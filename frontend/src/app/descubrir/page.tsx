import type { Metadata } from "next";
import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import { FadeIn } from "@/components/fade-in";
import { PageHeader, SectionTitle, TrackRow } from "@/components/ui";
import { formatDuration, formatListeners, getArtist, newTracks } from "@/lib/demo-data";
import { Recomendaciones } from "./recomendaciones";

export const metadata: Metadata = { title: "Descubrir" };

export default function DescubrirPage() {
  const delDia = getArtist("niebla-sur")!;
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Descubrir" subtitle="Recomendaciones para ti, cada una con su motivo." />
      <Recomendaciones />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <FadeIn>
          <SectionTitle>Descubrimiento del día</SectionTitle>
          <Link href={`/artista/${delDia.slug}`} className="group relative block overflow-hidden rounded-2xl border border-line">
            <CoverArt seed={delDia.slug + "-dia"} hue={delDia.hue} variant="genre" className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs tracking-[0.14em] text-accent-soft uppercase">{delDia.genres.join(" · ")}</p>
              <h3 className="mt-1 text-3xl font-semibold tracking-tight">{delDia.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {formatListeners(delDia.listeners)} oyentes · {delDia.origin}
              </p>
            </div>
          </Link>
        </FadeIn>
        <FadeIn delay={0.1}>
          <SectionTitle>Canciones nuevas</SectionTitle>
          <ol>
            {newTracks.map((t, i) => (
              <TrackRow key={t.title} index={i + 1} title={t.title} artistSlug={t.artist} album={t.album} duration={formatDuration(t.durationSec)} />
            ))}
          </ol>
        </FadeIn>
      </div>
    </main>
  );
}
