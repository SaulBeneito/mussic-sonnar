import type { Metadata } from "next";
import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import { FadeIn } from "@/components/fade-in";
import { ArtistCard, PageHeader, SectionTitle } from "@/components/ui";
import { artists, formatListeners, genres } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Explorar" };

export default function ExplorarPage() {
  const emergentes = [...artists].sort((a, b) => a.listeners - b.listeners).slice(0, 4);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Explorar" subtitle="Busca por género y encuentra tu sonido." />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {genres.map((g, i) => (
          <FadeIn key={g.slug} delay={i * 0.05}>
            <Link
              href={`/explorar/${g.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-line transition hover:border-accent/60"
            >
              <CoverArt seed={g.slug} hue={g.hue} variant="genre" className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105" />
              <span className="absolute bottom-3 left-4 text-lg font-semibold tracking-tight uppercase sm:bottom-5 sm:left-5 sm:text-2xl">
                {g.name}
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>

      <section className="mt-16">
        <SectionTitle>Artistas emergentes</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergentes.map((a) => (
            <ArtistCard key={a.slug} artist={a} subtitle={`${a.genres[0]} · ${formatListeners(a.listeners)} oyentes`} />
          ))}
        </div>
      </section>
    </main>
  );
}
