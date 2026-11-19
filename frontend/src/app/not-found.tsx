import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent-soft">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Aquí no suena nada</h1>
      <p className="mt-2 text-muted">La página que buscas no existe.</p>
      <div className="mt-8">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
      </div>
    </main>
  );
}
