"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { inputClass } from "@/components/ui";
import { artists, genres, user } from "@/lib/demo-data";

// Gustos manuales (DEMO): se añaden y quitan en el navegador, no se guarda nada.
export function EditorGustos() {
  const [selected, setSelected] = useState<string[]>(user.favoriteGenres);
  const [query, setQuery] = useState("");

  const options = [...genres.map((g) => g.name), ...new Set(artists.flatMap((a) => a.genres)), ...artists.map((a) => a.name)];
  const q = query.trim().toLowerCase();
  const suggestions = q ? [...new Set(options)].filter((o) => o.toLowerCase().includes(q) && !selected.includes(o)).slice(0, 6) : [];

  const add = (v: string) => {
    setSelected((s) => [...s, v]);
    setQuery("");
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-2.5" aria-label="Tus gustos">
        <AnimatePresence initial={false}>
          {selected.map((g) => (
            <motion.li key={g} layout initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}>
              <button
                type="button"
                onClick={() => setSelected((s) => s.filter((x) => x !== g))}
                className="group inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-1.5 text-sm transition hover:border-accent hover:bg-accent/10"
                aria-label={`Quitar ${g}`}
              >
                {g}
                <span className="text-muted group-hover:text-foreground" aria-hidden="true">
                  ×
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="relative mt-4 max-w-sm">
        <label htmlFor="gustos" className="sr-only">
          Añadir artista o género
        </label>
        <input
          id="gustos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && suggestions[0] && add(suggestions[0])}
          placeholder="Añadir artista o género..."
          className={inputClass}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
            {suggestions.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => add(s)} className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/15">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
