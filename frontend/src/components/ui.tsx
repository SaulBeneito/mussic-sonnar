import Link from "next/link";
import type { ReactNode } from "react";
import { CoverArt } from "./cover-art";
import { getArtist, type Artist } from "@/lib/demo-data";

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      title="Datos de prueba: se sustituyen por datos reales en las fases 2 y 3"
      className={`inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wider text-accent-soft uppercase ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      Demo
    </span>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="pt-10 pb-6 sm:pt-14">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <DemoBadge />
      </div>
      {subtitle && <p className="mt-3 max-w-xl text-muted">{subtitle}</p>}
      {children}
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{children}</h2>
      {action}
    </div>
  );
}

export function Chip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm ${active ? "border-accent bg-accent/15 text-foreground" : "border-accent/50 text-foreground/90"}`}
    >
      {children}
    </span>
  );
}

export function ArtistCard({ artist, subtitle, score }: { artist: Artist; subtitle?: string; score?: number }) {
  return (
    <Link
      href={`/artista/${artist.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_-12px] hover:shadow-accent/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CoverArt seed={artist.slug} hue={artist.hue} className="h-full w-full transition duration-500 group-hover:scale-105" />
        {score !== undefined && (
          <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-accent-soft backdrop-blur">
            {score}% afinidad
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">{artist.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{subtitle ?? "Artista"}</p>
      </div>
    </Link>
  );
}

export function TrackRow({ index, title, artistSlug, album, duration }: { index: number; title: string; artistSlug: string; album: string; duration: string }) {
  const artist = getArtist(artistSlug);
  return (
    <li className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface">
      <span className="w-5 text-right text-sm text-muted tabular-nums">{index}</span>
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
        <CoverArt seed={album} hue={artist?.hue} className="h-full w-full" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        {artist && (
          <Link href={`/artista/${artist.slug}`} className="truncate text-sm text-muted hover:text-accent-soft">
            {artist.name}
          </Link>
        )}
      </div>
      <span className="hidden truncate text-sm text-muted sm:block sm:w-48">{album}</span>
      <span className="text-sm text-muted tabular-nums">{duration}</span>
    </li>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-strong shadow-[0_8px_30px_-8px] shadow-accent/60"
      : "border border-line text-foreground hover:border-accent/60";
  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-medium transition ${styles}`}>
      {children}
    </Link>
  );
}

export const inputClass =
  "w-full rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";
