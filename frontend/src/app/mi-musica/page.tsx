import type { Metadata } from "next";
import { CoverArt } from "@/components/cover-art";
import { FadeIn } from "@/components/fade-in";
import { ArtistCard, PageHeader, SectionTitle } from "@/components/ui";
import { getArtist, user } from "@/lib/demo-data";
import { EditorGustos } from "./editor-gustos";

export const metadata: Metadata = { title: "Mi Música" };

const evolutionSeries = [
  { key: "indie", label: "Indie alternativo", className: "bg-accent" },
  { key: "pop", label: "Pop atmosférico", className: "bg-accent-soft" },
  { key: "rock", label: "Rock alternativo", className: "bg-[#5b3fa8]" },
] as const;

export default function MiMusicaPage() {
  const stats = [
    { value: user.stats.discovered, label: "artistas descubiertos" },
    { value: user.stats.saved, label: "guardados" },
    { value: user.stats.genres, label: "géneros escuchados" },
    { value: `${Math.round(user.stats.emergingShare * 100)}%`, label: "son emergentes" },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Mi Música" />

      <FadeIn className="flex items-center gap-5 sm:gap-7">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-accent/70 shadow-[0_0_40px_-6px] shadow-accent/60 sm:h-32 sm:w-32">
          <CoverArt seed={user.name} variant="avatar" className="h-full w-full" />
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{user.name}</p>
          <p className="mt-1 text-muted">{user.tagline}</p>
        </div>
      </FadeIn>

      <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-surface p-5">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <SectionTitle>Géneros y artistas de referencia</SectionTitle>
        <EditorGustos />
      </section>

      <section className="mt-12">
        <SectionTitle>Artistas favoritos</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {user.favoriteArtists.map((slug) => {
            const a = getArtist(slug)!;
            return <ArtistCard key={slug} artist={a} subtitle={a.genres[0]} />;
          })}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle>Evolución de tus gustos</SectionTitle>
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <div className="flex h-48 items-end gap-3 sm:gap-6">
            {user.evolution.map((m) => (
              <div key={m.month} className="flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex w-full max-w-14 flex-1 flex-col-reverse overflow-hidden rounded-lg">
                  {evolutionSeries.map((s) => (
                    <div key={s.key} className={s.className} style={{ height: `${m[s.key]}%` }} title={`${s.label}: ${m[s.key]}%`} />
                  ))}
                </div>
                <span className="text-xs text-muted">{m.month}</span>
              </div>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {evolutionSeries.map((s) => (
              <li key={s.key} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-sm ${s.className}`} />
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
