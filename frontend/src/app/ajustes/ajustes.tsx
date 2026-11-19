"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { inputClass } from "@/components/ui";
import { user } from "@/lib/demo-data";

function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2 text-sm">
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-accent" : "bg-line"}`}
      >
        <motion.span layout className={`absolute top-1 h-4 w-4 rounded-full bg-white ${on ? "right-1" : "left-1"}`} />
      </button>
    </label>
  );
}

export function Ajustes() {
  const [spotify, setSpotify] = useState(user.spotifyConnected);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Datos de la cuenta">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm">
              Nombre
            </label>
            <input id="name" defaultValue={user.name} className={inputClass} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm">
              Email
            </label>
            <input id="email" type="email" defaultValue={user.email} className={inputClass} autoComplete="email" />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-strong">
              Guardar cambios
            </button>
            {saved && <span className="text-sm text-muted">Guardado (solo en el prototipo)</span>}
          </div>
        </form>
      </Card>

      <Card title="Spotify" description="Solo leemos tus artistas y canciones más escuchados. Puedes desconectarlo cuando quieras.">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${spotify ? "bg-[#1ed760]" : "bg-muted/50"}`} />
            <span className="text-sm">{spotify ? "Conectado" : "No conectado"}</span>
          </div>
          <button
            type="button"
            onClick={() => setSpotify(!spotify)}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${spotify ? "border border-line hover:border-red-400/60 hover:text-red-300" : "bg-accent text-white hover:bg-accent-strong"}`}
          >
            {spotify ? "Desconectar" : "Conectar Spotify"}
          </button>
        </div>
      </Card>

      <Card title="Privacidad">
        <Toggle label="Usar mis favoritos para mejorar las recomendaciones" defaultOn />
        <Toggle label="Mostrar mi perfil musical a mis amigos" />
      </Card>

      <Card title="Sesión y cuenta">
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="rounded-xl border border-line px-5 py-2.5 text-sm hover:border-accent/60">
            Cerrar sesión
          </Link>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-xl border border-red-400/40 px-5 py-2.5 text-sm text-red-300 hover:bg-red-400/10"
          >
            Eliminar cuenta
          </button>
        </div>
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div role="alertdialog" aria-label="Confirmar eliminación" className="mt-4 rounded-xl border border-red-400/40 bg-red-400/5 p-4 text-sm">
                <p>Se borrarán tu cuenta, tu perfil musical, tus favoritos y la conexión con Spotify. No se puede deshacer.</p>
                <div className="mt-3 flex gap-3">
                  <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg border border-line px-4 py-2 hover:border-foreground/40">
                    Cancelar
                  </button>
                  <Link href="/" className="rounded-lg bg-red-500/80 px-4 py-2 text-white hover:bg-red-500">
                    Sí, eliminar (prototipo)
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
