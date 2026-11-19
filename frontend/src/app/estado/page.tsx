import { Suspense } from "react";
import { connection } from "next/server";

// Página provisional de la Fase 0: comprueba que el frontend llega al backend y el backend a la base de datos.
// Desde la Fase 1 vive en /estado (el Inicio es la página del mockup).

type Estado = "ok" | "error";

async function comprobarBackend(): Promise<{ backend: Estado; database: Estado }> {
  await connection(); // se evalúa en cada petición, no al compilar
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(3000) });
    const data = (await res.json()) as { database?: Estado };
    return { backend: "ok", database: data.database === "ok" ? "ok" : "error" };
  } catch {
    return { backend: "error", database: "error" };
  }
}

function Indicador({ nombre, estado }: { nombre: string; estado: Estado }) {
  const ok = estado === "ok";
  return (
    <li className="flex items-center justify-between gap-6 rounded-xl bg-surface px-5 py-4">
      <span>{nombre}</span>
      <span className={`flex items-center gap-2 text-sm ${ok ? "text-accent" : "text-red-400"}`}>
        <span className={`h-2 w-2 rounded-full ${ok ? "bg-accent" : "bg-red-400"}`} />
        {ok ? "Conectado" : "Sin conexión"}
      </span>
    </li>
  );
}

async function EstadoConexiones() {
  const { backend, database } = await comprobarBackend();
  return (
    <ul className="mt-10 flex flex-col gap-3">
      <Indicador nombre="Frontend" estado="ok" />
      <Indicador nombre="Backend (API)" estado={backend} />
      <Indicador nombre="Base de datos" estado={database} />
    </ul>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-semibold tracking-tight">
          Mussic <span className="text-accent">Sonnar</span>
        </h1>
        <p className="mt-2 text-muted">Find your next favorite sound</p>
        <Suspense fallback={<p className="mt-10 text-sm text-muted">Comprobando conexiones…</p>}>
          <EstadoConexiones />
        </Suspense>
        <p className="mt-6 text-xs text-muted">Fase 0 · entorno local</p>
      </div>
    </main>
  );
}
