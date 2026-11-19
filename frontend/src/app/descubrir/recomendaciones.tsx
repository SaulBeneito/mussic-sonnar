"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tabs } from "@/components/tabs";
import { ArtistCard } from "@/components/ui";
import { getArtist, modes, recommendations, type Mode } from "@/lib/demo-data";

export function Recomendaciones() {
  // "Descubrimiento" es el modo por defecto (documento del proyecto)
  const [mode, setMode] = useState<Mode>("descubrimiento");
  const current = modes.find((m) => m.id === mode)!;

  return (
    <section>
      <Tabs label="Modo de recomendación" tabs={modes} value={mode} onChange={setMode} />
      <p className="mt-4 text-sm text-muted">{current.description}</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recommendations[mode].map((rec) => {
            const artist = getArtist(rec.artist)!;
            return <ArtistCard key={rec.artist} artist={artist} subtitle={rec.reason} score={rec.score} />;
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
