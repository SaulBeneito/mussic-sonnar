"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export const navItems = [
  { href: "/", label: "Inicio", icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" },
  { href: "/descubrir", label: "Descubrir", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m3.5 5.5-2 5-5 2 2-5z" },
  { href: "/explorar", label: "Explorar", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { href: "/mi-musica", label: "Mi Música", icon: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0m11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0" },
  { href: "/favoritos", label: "Favoritos", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" strokeLinecap="round" />
      </svg>
      Mussic Sonnar
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-accent-soft" : "text-muted hover:text-foreground"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/12"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/ajustes"
            aria-label="Ajustes de cuenta"
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-colors ${isActive(pathname, "/ajustes") ? "border-accent text-accent-soft" : "border-line text-muted hover:border-accent/60 hover:text-foreground"}`}
          >
            AR
          </Link>
        </div>
      </header>

      {/* Barra inferior en móvil */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
        aria-label="Principal (móvil)"
      >
        <ul className="grid grid-cols-5">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${active ? "text-accent-soft" : "text-muted"}`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
