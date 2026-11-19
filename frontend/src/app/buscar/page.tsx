import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArtistCard, PageHeader, SectionTitle, inputClass } from "@/components/ui";
import { formatListeners, searchDemo } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Buscar" };

async function Resultados({ searchParams }: { searchParams: PageProps<"/buscar">["searchParams"] }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const { artists, genres } = searchDemo(query);

  return (
    <>
      <form action="/buscar" role="search" className="max-w-xl">
        <label htmlFor="q" className="sr-only">
          Buscar música
        </label>
        <input id="q" name="q" type="search" defaultValue={query} placeholder="Buscar música, artistas, géneros..." className={inputClass} />
      </form>

      {query && (
        <p className="mt-6 text-sm text-muted">
          {artists.length + genres.length} resultados para «{query}»
        </p>
      )}

      {genres.length > 0 && (
        <section className="mt-8">
          <SectionTitle>Géneros</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <Link key={g.slug} href={`/explorar/${g.slug}`} className="rounded-full border border-accent/50 px-4 py-1.5 text-sm hover:bg-accent/10">
                {g.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section className="mt-8">
          <SectionTitle>Artistas</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {artists.map((a) => (
              <ArtistCard key={a.slug} artist={a} subtitle={`${a.genres[0]} · ${formatListeners(a.listeners)} oyentes`} />
            ))}
          </div>
        </section>
      )}

      {query && artists.length + genres.length === 0 && (
        <p className="mt-8 text-muted">
          No hay nada con ese nombre en los datos de prueba. Prueba con «indie», «rock» o «Luz Violeta».
        </p>
      )}
    </>
  );
}

export default function BuscarPage({ searchParams }: PageProps<"/buscar">) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      <PageHeader title="Buscar" />
      <Suspense fallback={<div className={`${inputClass} h-12 max-w-xl`} />}>
        <Resultados searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
