import Link from "next/link";
import { ButtonLink, DemoBadge, inputClass } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

function SonarVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.55)_0%,rgba(124,58,237,0.18)_40%,transparent_70%)] blur-2xl" />
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border border-accent-soft/50"
          style={{ animation: "sonar 4.8s cubic-bezier(0.2,0.6,0.3,1) infinite", animationDelay: `${i * 1.2}s` }}
        />
      ))}
      <div className="absolute inset-[30%] rounded-full border border-accent/40" />
      <div className="absolute inset-[42%] rounded-full bg-accent/30 shadow-[0_0_80px_20px] shadow-accent/40" />
      <div className="absolute inset-x-[18%] top-1/2 flex h-24 -translate-y-1/2 items-center justify-center gap-[5px]">
        {Array.from({ length: 23 }, (_, i) => (
          <span
            key={i}
            className="w-[4px] origin-center rounded-full bg-gradient-to-t from-accent to-accent-soft"
            style={{
              height: `${30 + Math.round(Math.sin(i * 0.7) * 25 + 35)}%`,
              animation: `wave ${1.1 + (i % 5) * 0.18}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * -0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const steps = [
  { n: "01", title: "Conecta Spotify", text: "Leemos tus artistas y canciones más escuchados. Nada más.", href: "/ajustes", cta: "Conectar" },
  { n: "02", title: "O elige tus gustos", text: "Busca artistas y géneros de referencia, sin necesidad de Spotify.", href: "/mi-musica", cta: "Elegir gustos" },
  { n: "03", title: "Descubre", text: "Recomendaciones explicadas, con prioridad a artistas emergentes.", href: "/descubrir", cta: "Ver recomendaciones" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-[-20%] h-[700px] w-[700px] rounded-full bg-accent/10 blur-[140px]" />
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-20 md:pb-24">
        <FadeIn>
          <h1 className="text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Find your
            <br />
            next favorite
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">sound</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Artistas, canciones y géneros que probablemente te encanten aunque nunca los hayas escuchado.
          </p>
          <form action="/buscar" className="relative mt-8 max-w-md" role="search">
            <label htmlFor="q" className="sr-only">
              Buscar música
            </label>
            <input id="q" name="q" type="search" placeholder="Buscar música, artistas, géneros..." className={`${inputClass} pr-12`} />
            <button type="submit" aria-label="Buscar" className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-muted hover:text-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ButtonLink href="/descubrir">Empezar</ButtonLink>
            <Link href="/login" className="text-sm text-muted hover:text-foreground">
              Ya tengo cuenta
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <SonarVisual />
        </FadeIn>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-xs font-medium tracking-[0.14em] text-muted uppercase">Cómo funciona</h2>
          <DemoBadge />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.08}>
              <Link href={s.href} className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/50">
                <span className="font-mono text-sm text-accent-soft">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.text}</p>
                <span className="mt-6 text-sm text-accent-soft transition group-hover:translate-x-1">{s.cta} →</span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
