// Portada abstracta generada a partir de un texto: resplandor morado, anillos de sonar y ondas.
// Sustituye a las fotos del mockup hasta que haya imágenes reales de artistas (Last.fm / Spotify).

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

// Redondeo para que el servidor y el navegador generen exactamente el mismo SVG
const r2 = (n: number) => Math.round(n * 100) / 100;

function rng(seed: number) {
  let s = seed || 1;
  return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)), (s >>> 0) / 4294967296);
}

export function CoverArt({
  seed,
  hue = 275,
  variant = "artist",
  className = "",
}: {
  seed: string;
  hue?: number;
  variant?: "artist" | "genre" | "avatar";
  className?: string;
}) {
  const r = rng(hash(seed));
  const id = `c${hash(seed + variant).toString(36)}`;
  const cx = r2(variant === "avatar" ? 50 : 25 + r() * 50);
  const cy = r2(variant === "genre" ? 30 + r() * 30 : variant === "avatar" ? 45 : 30 + r() * 25);
  const rings = 3 + Math.floor(r() * 3);
  const bars = Array.from({ length: 28 }, (_, i) => {
    const wave = Math.sin(i * 0.55 + r() * 2) * 0.5 + 0.5;
    return r2(4 + wave * (variant === "genre" ? 26 : 14) + r() * 6);
  });

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`} cx={`${cx}%`} cy={`${cy}%`} r="60%">
          <stop offset="0%" stopColor={`hsl(${hue} 95% 72%)`} stopOpacity="0.95" />
          <stop offset="35%" stopColor={`hsl(${hue} 80% 45%)`} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#07060b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07060b" stopOpacity="0" />
          <stop offset="100%" stopColor="#07060b" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="#0b0a10" />
      <rect width="100" height="100" fill={`url(#${id}-glow)`} />
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={8 + i * (variant === "avatar" ? 9 : 11)}
          fill="none"
          stroke={`hsl(${hue} 90% 80%)`}
          strokeOpacity={r2(0.35 - i * 0.06)}
          strokeWidth="0.4"
        />
      ))}
      {variant !== "avatar" && (
        <g fill={`hsl(${hue} 90% 78%)`} fillOpacity="0.55">
          {bars.map((h, i) => (
            <rect key={i} x={r2(1 + i * 3.55)} y={r2(100 - h)} width="1.6" height={h} rx="0.8" />
          ))}
        </g>
      )}
      <rect width="100" height="100" fill={`url(#${id}-fade)`} />
    </svg>
  );
}
