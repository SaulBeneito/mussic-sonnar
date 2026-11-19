// DATOS DEMO de la Fase 1 (prototipo visual).
// Artistas, canciones y usuario inventados. En las fases 2 y 3 se sustituyen por datos reales del backend.

export type Mode = "parecidos" | "descubrimiento" | "fuera";

export interface SoundProfile {
  energy: number; // 0-1
  valence: number; // 0-1
  danceability: number; // 0-1
  acousticness: number; // 0-1
  tempo: number; // BPM
}

export interface Artist {
  slug: string;
  name: string;
  genres: string[];
  listeners: number; // oyentes mensuales (inventados)
  emerging: boolean;
  origin: string;
  bio: string;
  sound: SoundProfile;
  topTracks: string[];
  similar: string[]; // slugs
  hue: number; // tono de su portada generada
}

export interface Genre {
  slug: string;
  name: string;
  description: string;
  hue: number;
}

export interface Recommendation {
  artist: string; // slug
  reason: string;
  score: number; // 0-100
}

export interface Track {
  title: string;
  artist: string; // slug
  album: string;
  durationSec: number;
}

export interface Album {
  title: string;
  artist: string; // slug
  year: number;
}

export const genres: Genre[] = [
  { slug: "pop", name: "Pop", description: "Melodías que se quedan, desde el pop de dormitorio al más brillante.", hue: 285 },
  { slug: "rock", name: "Rock", description: "Guitarras, garaje y rock alternativo de bandas que empiezan.", hue: 265 },
  { slug: "hip-hop", name: "Hip hop", description: "Rimas, ritmos y productores con un sonido propio.", hue: 300 },
  { slug: "electronica", name: "Electrónica", description: "Sintetizadores, clubs pequeños y paisajes sonoros.", hue: 255 },
  { slug: "jazz", name: "Jazz", description: "Jazz contemporáneo, fusión y nuevas big bands.", hue: 275 },
  { slug: "acustico", name: "Acústico", description: "Voces cercanas, cuerdas y canciones de madrugada.", hue: 290 },
];

export const artists: Artist[] = [
  {
    slug: "luz-violeta", name: "Luz Violeta", genres: ["Indie alternativo", "Dream pop"], listeners: 18400, emerging: true, origin: "Valencia",
    bio: "Trío de dream pop con guitarras llenas de reverb y letras sobre ciudades de noche.",
    sound: { energy: 0.58, valence: 0.41, danceability: 0.52, acousticness: 0.22, tempo: 118 },
    topTracks: ["Neón en la ventana", "Marea baja", "Antes de las tres"], similar: ["mar-abierto", "horizonte-neon", "niebla-sur"], hue: 280,
  },
  {
    slug: "mar-abierto", name: "Mar Abierto", genres: ["Pop atmosférico", "Indie pop"], listeners: 9200, emerging: true, origin: "A Coruña",
    bio: "Proyecto de una sola persona: sintetizadores suaves, voces dobladas y mucho espacio.",
    sound: { energy: 0.44, valence: 0.48, danceability: 0.57, acousticness: 0.35, tempo: 104 },
    topTracks: ["Faro", "Lo que trae la sal", "Domingo eterno"], similar: ["luz-violeta", "cometa-lenta", "lumen-drift"], hue: 260,
  },
  {
    slug: "eco-del-norte", name: "Eco del Norte", genres: ["Rock alternativo", "Post-punk"], listeners: 31500, emerging: true, origin: "Bilbao",
    bio: "Cuarteto de post-punk con bajo al frente y guitarras afiladas.",
    sound: { energy: 0.86, valence: 0.37, danceability: 0.46, acousticness: 0.04, tempo: 146 },
    topTracks: ["Hormigón", "Norte magnético", "Sin cobertura"], similar: ["ruido-blanco-club", "cristal-roto", "luz-violeta"], hue: 250,
  },
  {
    slug: "horizonte-neon", name: "Horizonte Neón", genres: ["Synthpop", "Electrónica"], listeners: 22800, emerging: true, origin: "Madrid",
    bio: "Synthpop nocturno con cajas de ritmos analógicas y estribillos enormes.",
    sound: { energy: 0.74, valence: 0.62, danceability: 0.78, acousticness: 0.03, tempo: 122 },
    topTracks: ["Autopista", "Luces de freno", "Club Andrómeda"], similar: ["satelite-azul", "luz-violeta", "lumen-drift"], hue: 300,
  },
  {
    slug: "niebla-sur", name: "Niebla Sur", genres: ["Shoegaze", "Indie alternativo"], listeners: 4100, emerging: true, origin: "Granada",
    bio: "Muros de guitarra y voces enterradas en la mezcla. Grabado en un garaje.",
    sound: { energy: 0.69, valence: 0.29, danceability: 0.33, acousticness: 0.08, tempo: 128 },
    topTracks: ["Bruma", "Polvo de tiza", "Kilómetro cero"], similar: ["luz-violeta", "cristal-roto", "eco-del-norte"], hue: 270,
  },
  {
    slug: "cristal-roto", name: "Cristal Roto", genres: ["Rock alternativo", "Noise pop"], listeners: 12700, emerging: true, origin: "Zaragoza",
    bio: "Canciones cortas, ruidosas y melódicas a la vez.",
    sound: { energy: 0.83, valence: 0.52, danceability: 0.49, acousticness: 0.06, tempo: 152 },
    topTracks: ["Esquirlas", "Verano de 2009", "Vidrio"], similar: ["eco-del-norte", "niebla-sur", "ruido-blanco-club"], hue: 245,
  },
  {
    slug: "cometa-lenta", name: "Cometa Lenta", genres: ["Folk", "Acústico"], listeners: 2600, emerging: true, origin: "Asturias",
    bio: "Guitarra, voz y una grabadora de cinta. Folk de madrugada.",
    sound: { energy: 0.27, valence: 0.39, danceability: 0.44, acousticness: 0.88, tempo: 92 },
    topTracks: ["Órbita", "Casa de piedra", "Ceniza"], similar: ["mar-abierto", "ana-de-la-sal", "lumen-drift"], hue: 290,
  },
  {
    slug: "satelite-azul", name: "Satélite Azul", genres: ["Electrónica", "House"], listeners: 15300, emerging: true, origin: "Barcelona",
    bio: "House melódico con samples de radios antiguas.",
    sound: { energy: 0.79, valence: 0.66, danceability: 0.84, acousticness: 0.02, tempo: 124 },
    topTracks: ["Frecuencia modulada", "Órbita baja", "Señal"], similar: ["horizonte-neon", "lumen-drift", "ruido-blanco-club"], hue: 255,
  },
  {
    slug: "lumen-drift", name: "Lumen Drift", genres: ["Ambient", "Electrónica"], listeners: 6800, emerging: true, origin: "Lisboa",
    bio: "Electrónica lenta y texturas para escuchar con cascos.",
    sound: { energy: 0.31, valence: 0.35, danceability: 0.4, acousticness: 0.41, tempo: 96 },
    topTracks: ["Deriva", "Luz de pantalla", "Hora azul"], similar: ["mar-abierto", "satelite-azul", "cometa-lenta"], hue: 265,
  },
  {
    slug: "ruido-blanco-club", name: "Ruido Blanco Club", genres: ["Post-punk", "Dance punk"], listeners: 8900, emerging: true, origin: "Sevilla",
    bio: "Post-punk para bailar: batería seca, bajo saltarín y gritos en el estribillo.",
    sound: { energy: 0.88, valence: 0.58, danceability: 0.71, acousticness: 0.03, tempo: 134 },
    topTracks: ["Estática", "Sala vacía", "Domingo de resaca"], similar: ["eco-del-norte", "cristal-roto", "satelite-azul"], hue: 310,
  },
  {
    slug: "ana-de-la-sal", name: "Ana de la Sal", genres: ["Jazz", "Soul"], listeners: 3300, emerging: true, origin: "Cádiz",
    bio: "Voz de soul sobre un trío de jazz. Grabado en directo.",
    sound: { energy: 0.38, valence: 0.55, danceability: 0.59, acousticness: 0.62, tempo: 88 },
    topTracks: ["Salitre", "Tres de la mañana", "Levante"], similar: ["cometa-lenta", "mc-orilla", "lumen-drift"], hue: 285,
  },
  {
    slug: "mc-orilla", name: "MC Orilla", genres: ["Hip hop", "Lo-fi"], listeners: 11200, emerging: true, origin: "Málaga",
    bio: "Rap pausado sobre bases lo-fi con samples de jazz.",
    sound: { energy: 0.52, valence: 0.46, danceability: 0.74, acousticness: 0.21, tempo: 86 },
    topTracks: ["Paseo marítimo", "Cuaderno", "Sin prisa"], similar: ["ana-de-la-sal", "satelite-azul", "horizonte-neon"], hue: 305,
  },
];

export const recommendations: Record<Mode, Recommendation[]> = {
  parecidos: [
    { artist: "luz-violeta", score: 94, reason: "Recomendado por tu gusto por el indie alternativo" },
    { artist: "mar-abierto", score: 91, reason: "Recomendado por tu gusto por el pop atmosférico" },
    { artist: "eco-del-norte", score: 89, reason: "Recomendado por tu gusto por el rock alternativo" },
    { artist: "niebla-sur", score: 86, reason: "Combina shoegaze e indie alternativo, dos estilos que aparecen en tus favoritos" },
    { artist: "cristal-roto", score: 84, reason: "Comparte la energía de Eco del Norte, uno de tus artistas favoritos" },
    { artist: "horizonte-neon", score: 82, reason: "Tiene el mismo brillo nocturno que tus canciones más escuchadas" },
  ],
  descubrimiento: [
    { artist: "niebla-sur", score: 88, reason: "Combina indie alternativo y shoegaze, y casi nadie lo ha descubierto aún" },
    { artist: "mar-abierto", score: 86, reason: "Tiene la misma energía tranquila que tus favoritos" },
    { artist: "cometa-lenta", score: 81, reason: "Un paso hacia lo acústico desde tu pop atmosférico" },
    { artist: "ruido-blanco-club", score: 79, reason: "Post-punk para bailar, cercano a tu rock alternativo" },
    { artist: "lumen-drift", score: 77, reason: "Texturas parecidas a Mar Abierto, con menos de 7.000 oyentes" },
    { artist: "cristal-roto", score: 76, reason: "Melodías de indie con más ruido del que sueles escuchar" },
  ],
  fuera: [
    { artist: "ana-de-la-sal", score: 72, reason: "Jazz y soul: un género que no tienes, con la misma melancolía que tus favoritos" },
    { artist: "mc-orilla", score: 69, reason: "Hip hop lo-fi con el tempo pausado de tus canciones tranquilas" },
    { artist: "satelite-azul", score: 67, reason: "House melódico: si te gusta Horizonte Neón, este es el siguiente paso" },
    { artist: "lumen-drift", score: 65, reason: "Ambient electrónico, un estilo vecino del pop atmosférico" },
    { artist: "cometa-lenta", score: 63, reason: "Folk acústico grabado en cinta, lejos de tus guitarras eléctricas" },
  ],
};

export const modes: { id: Mode; label: string; description: string }[] = [
  { id: "parecidos", label: "Parecidos", description: "Artistas muy cercanos a lo que ya te gusta." },
  { id: "descubrimiento", label: "Descubrimiento", description: "Equilibrio entre tus gustos y artistas poco conocidos." },
  { id: "fuera", label: "Fuera de mi zona", description: "Géneros vecinos que todavía no están en tu perfil." },
];

export const newTracks: Track[] = [
  { title: "Antes de las tres", artist: "luz-violeta", album: "Ciudades de noche", durationSec: 214 },
  { title: "Bruma", artist: "niebla-sur", album: "Garaje", durationSec: 263 },
  { title: "Faro", artist: "mar-abierto", album: "Costa", durationSec: 198 },
  { title: "Estática", artist: "ruido-blanco-club", album: "Estática", durationSec: 172 },
];

export const user = {
  name: "Alex Rivera",
  tagline: "Explorador de sonidos",
  email: "alex@ejemplo.com",
  spotifyConnected: false,
  favoriteGenres: ["Indie alternativo", "Pop atmosférico", "Rock alternativo"],
  favoriteArtists: ["luz-violeta", "eco-del-norte", "mar-abierto", "horizonte-neon"],
  stats: { discovered: 37, saved: 12, genres: 9, emergingShare: 0.68 },
  // Evolución de gustos: % de cada género en los últimos meses
  evolution: [
    { month: "Jun", indie: 52, pop: 28, rock: 20 },
    { month: "Jul", indie: 48, pop: 30, rock: 22 },
    { month: "Ago", indie: 44, pop: 33, rock: 23 },
    { month: "Sep", indie: 41, pop: 31, rock: 28 },
    { month: "Oct", indie: 39, pop: 30, rock: 31 },
    { month: "Nov", indie: 40, pop: 27, rock: 33 },
  ],
};

export const favorites = {
  artists: ["luz-violeta", "eco-del-norte", "mar-abierto", "horizonte-neon"],
  tracks: [
    { title: "Neón en la ventana", artist: "luz-violeta", album: "Ciudades de noche", durationSec: 231 },
    { title: "Hormigón", artist: "eco-del-norte", album: "Norte magnético", durationSec: 189 },
    { title: "Faro", artist: "mar-abierto", album: "Costa", durationSec: 198 },
    { title: "Autopista", artist: "horizonte-neon", album: "Luces de freno", durationSec: 246 },
    { title: "Bruma", artist: "niebla-sur", album: "Garaje", durationSec: 263 },
  ] satisfies Track[],
  albums: [
    { title: "Ciudades de noche", artist: "luz-violeta", year: 2025 },
    { title: "Norte magnético", artist: "eco-del-norte", year: 2024 },
    { title: "Costa", artist: "mar-abierto", year: 2026 },
    { title: "Luces de freno", artist: "horizonte-neon", year: 2025 },
  ] satisfies Album[],
};

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function artistsByGenre(genreName: string): Artist[] {
  const g = genreName.toLowerCase();
  return artists.filter((a) => a.genres.some((x) => x.toLowerCase().includes(g)));
}

// Artistas de un género del explorador, con equivalencias para géneros que no aparecen literalmente
const genreMatches: Record<string, string[]> = {
  pop: ["pop"],
  rock: ["rock", "punk", "shoegaze"],
  "hip-hop": ["hip hop", "lo-fi"],
  electronica: ["electrónica", "house", "ambient", "synthpop"],
  jazz: ["jazz", "soul"],
  acustico: ["acústico", "folk"],
};

export function artistsForGenreSlug(slug: string): Artist[] {
  const keys = genreMatches[slug] ?? [];
  return artists.filter((a) => a.genres.some((x) => keys.some((k) => x.toLowerCase().includes(k))));
}

export function searchDemo(query: string) {
  const q = normalize(query);
  if (!q) return { artists: [] as Artist[], genres: [] as Genre[] };
  return {
    artists: artists.filter((a) => normalize(a.name).includes(q) || a.genres.some((g) => normalize(g).includes(q))),
    genres: genres.filter((g) => normalize(g.name).includes(q)),
  };
}

function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function formatListeners(n: number) {
  return new Intl.NumberFormat("es-ES").format(n);
}

export function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}
