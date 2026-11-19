import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/cover-art";
import { ArtistCard, DemoBadge } from "@/components/ui";
import { artistsForGenreSlug, formatListeners, genres } from "@/lib/demo-data";

export function generateStaticParams() {
  return genres.map((g) => ({ genero: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/explorar/[genero]">): Promise<Metadata> {
  const { genero } = await params;
  return { title: genres.find((g) => g.slug === genero)?.name ?? "Explorar" };
}

async function Genero({ params }: { params: PageProps<"/explorar/[genero]">["params"] }) {
  const { genero } = await params;
  const genre = genres.find((g) => g.slug === genero);
  if (!genre) notFound();
  const list = artistsForGenreSlug(genre.slug);

  return (
    <main className="pb-16">
      <div className="relative h-56 overflow-hidden border-b border-line sm:h-72">
        <CoverArt seed={genre.slug} hue={genre.hue} variant="genre" className="absolute inset-0 h-full w-full" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6">
          <Link href="/explorar" className="mb-auto pt-6 text-sm text-muted hover:text-foreground">
            ← Explorar
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight uppercase sm:text-6xl">{genre.name}</h1>
            <DemoBadge />
          </div>
          <p className="mt-2 max-w-xl text-foreground/80">{genre.description}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((a) => (
              <ArtistCard key={a.slug} artist={a} subtitle={`${a.genres.join(" · ")} · ${formatListeners(a.listeners)} oyentes`} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Todavía no hay artistas de este género en los datos de prueba.</p>
        )}
      </div>
    </main>
  );
}

// Leer los parámetros de la URL dentro de <Suspense> permite que la navegación sea instantánea (Next 16).
export default function Page({ params }: PageProps<"/explorar/[genero]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <Genero params={params} />
    </Suspense>
  );
}
