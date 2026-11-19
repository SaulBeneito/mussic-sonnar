"use client";

import { useState } from "react";
import { motion } from "motion/react";

// DEMO: el estado vive solo en el navegador. En la Fase 2 se guarda en el backend.
export function BotonFavorito({ initial }: { initial: boolean }) {
  const [saved, setSaved] = useState(initial);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => setSaved((s) => !s)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition ${saved ? "border border-accent bg-accent/15 text-accent-soft" : "bg-accent text-white hover:bg-accent-strong"}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10" strokeLinejoin="round" />
      </svg>
      {saved ? "En favoritos" : "Guardar en favoritos"}
    </motion.button>
  );
}
