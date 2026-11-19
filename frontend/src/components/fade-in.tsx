import type { ReactNode } from "react";

// Aparición suave al cargar. Solo CSS: el contenido se ve aunque falle el JavaScript,
// y "reducir movimiento" del sistema la desactiva (globals.css).
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`animate-fade-up ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
