"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { CoverArt } from "@/components/cover-art";
import { Tabs } from "@/components/tabs";
import { ArtistCard, TrackRow } from "@/components/ui";
import { favorites, formatDuration, getArtist } from "@/lib/demo-data";

type Tab = "artistas" | "canciones" | "albumes";

const tabs: { id: Tab; label: string }[] = [
  { id: "artistas", label: "Artistas" },
  { id: "canciones", label: "Canciones" },
  { id: "albumes", label: "Álbumes" },
];

export function ListaFavoritos() {
  const [tab, setTab] = useState<Tab>("artistas");
  return (
    <>
      <Tabs label="Tipo de favorito" tabs={tabs} value={tab} onChange={setTab} />
      <motion.div key={tab} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mt-6">
        {tab === "artistas" && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {favorites.artists.map((slug) => (
              <ArtistCard key={slug} artist={getArtist(slug)!} />
            ))}
          </div>
        )}
        {tab === "canciones" && (
          <ol>
            {favorites.tracks.map((t, i) => (
              <TrackRow key={t.title} index={i + 1} title={t.title} artistSlug={t.artist} album={t.album} duration={formatDuration(t.durationSec)} />
            ))}
          </ol>
        )}
        {tab === "albumes" && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {favorites.albums.map((al) => {
              const a = getArtist(al.artist)!;
              return (
                <div key={al.title}>
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <CoverArt seed={al.title} hue={a.hue} className="aspect-square w-full" />
                  </div>
                  <p className="mt-3 font-medium">{al.title}</p>
                  <Link href={`/artista/${a.slug}`} className="text-sm text-muted hover:text-accent-soft">
                    {a.name} · {al.year}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}
