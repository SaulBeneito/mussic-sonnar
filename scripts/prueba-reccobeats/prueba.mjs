// Prueba de cobertura de ReccoBeats con 20 artistas emergentes.
// Uso: node scripts/prueba-reccobeats/prueba.mjs
// Sin claves: usa MusicBrainz (para obtener el ID de Spotify de cada artista) y ReccoBeats.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ARTISTAS = [
  // España
  { nombre: "Alcalá Norte", pais: "ES" },
  { nombre: "Depresión Sonora", pais: "ES" },
  { nombre: "Ginebras", pais: "ES" },
  { nombre: "Cupido", pais: "ES" },
  { nombre: "Biznaga", pais: "ES" },
  { nombre: "Repion", pais: "ES" },
  { nombre: "Shego", pais: "ES" },
  { nombre: "Mujeres", pais: "ES" },
  { nombre: "Merina Gris", pais: "ES" },
  { nombre: "Hoonine", pais: "ES" },
  // Internacional
  { nombre: "Wednesday", pais: "US" },
  { nombre: "Horsegirl", pais: "US" },
  { nombre: "Wishy", pais: "US" },
  { nombre: "Fcukers", pais: "US" },
  { nombre: "Ekko Astral", pais: "US" },
  { nombre: "Water From Your Eyes", pais: "US" },
  { nombre: "Feeble Little Horse", pais: "US" },
  { nombre: "Hotline TNT", pais: "US" },
  { nombre: "bar italia", pais: "GB" },
  { nombre: "Freak Slug", pais: "GB" },
];

const RB = "https://api.reccobeats.com/v1";
const MB = "https://musicbrainz.org/ws/2";
const UA = "MussicSonnar/0.1 (prueba-cobertura)";
const TOP = 10; // canciones con las que se calcula el perfil de sonido

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

async function getJson(url, intentos = 5) {
  for (let i = 0; i < intentos; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (res.status === 429 || res.status >= 500) {
      await esperar(3000 * (i + 1));
      continue;
    }
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${res.status} en ${url}`);
    return res.json();
  }
  throw new Error(`Sin respuesta tras ${intentos} intentos: ${url}`);
}

// MusicBrainz: nombre -> ID de Spotify (respetando 1 petición/segundo)
async function spotifyIdDesdeMusicBrainz({ nombre, pais }) {
  const q = encodeURIComponent(`artist:"${nombre}"`);
  const busqueda = await getJson(`${MB}/artist?query=${q}&fmt=json&limit=5`);
  await esperar(1600);
  const candidatos = (busqueda?.artists ?? [])
    .filter((a) => norm(a.name) === norm(nombre))
    .sort((a, b) => (b.country === pais) - (a.country === pais) || b.score - a.score);
  for (const c of candidatos.slice(0, 3)) {
    const det = await getJson(`${MB}/artist/${c.id}?inc=url-rels&fmt=json`);
    await esperar(1600);
    const url = (det?.relations ?? []).map((r) => r.url?.resource ?? "").find((u) => u.includes("open.spotify.com/artist/"));
    if (url) return { mbid: c.id, spotifyId: url.split("/artist/")[1].split(/[?/]/)[0] };
  }
  return null;
}

async function cancionesDeArtista(rbId) {
  const todas = new Map();
  for (let page = 0; page < 5; page++) {
    const r = await getJson(`${RB}/artist/${rbId}/track?size=50&page=${page}`);
    for (const t of r?.content ?? []) todas.set(t.id, t);
    if (!r || page + 1 >= r.totalPages) break;
  }
  return [...todas.values()];
}

// Si MusicBrainz no da el ID de Spotify: buscar por nombre y quedarse con el homónimo con más canciones
async function artistaPorNombre(nombre) {
  const r = await getJson(`${RB}/artist/search?searchText=${encodeURIComponent(nombre)}&size=25`);
  const exactos = (r?.content ?? []).filter((a) => norm(a.name) === norm(nombre));
  let mejor = null;
  for (const a of exactos) {
    const n = (await cancionesDeArtista(a.id)).length;
    if (!mejor || n > mejor.n) mejor = { ...a, n };
  }
  return mejor ? { artista: mejor, homonimos: exactos.length } : null;
}

async function probar(art) {
  const fila = { ...art, metodo: null, encontrado: false, homonimos: null, canciones: 0, conFeatures: 0, probadas: 0, popularidadMedia: null, perfil: null };
  try {
    let mb = null;
    try { mb = await spotifyIdDesdeMusicBrainz(art); } catch (e) { fila.avisoMB = e.message; }
    let rbArtista = null;
    if (mb) {
      fila.spotifyId = mb.spotifyId;
      const r = await getJson(`${RB}/artist?ids=${mb.spotifyId}`);
      rbArtista = r?.content?.[0] ?? null;
      if (rbArtista) fila.metodo = "ID de Spotify (MusicBrainz)";
    }
    if (!rbArtista) {
      const p = await artistaPorNombre(art.nombre);
      if (p) {
        rbArtista = p.artista;
        fila.metodo = "búsqueda por nombre";
        fila.homonimos = p.homonimos;
      }
    }
    if (!rbArtista) return fila;
    fila.encontrado = true;
    fila.rbId = rbArtista.id;

    const canciones = await cancionesDeArtista(rbArtista.id);
    fila.canciones = canciones.length;
    const top = canciones.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, TOP);
    fila.probadas = top.length;
    if (top.length) fila.popularidadMedia = Math.round(top.reduce((s, t) => s + (t.popularity ?? 0), 0) / top.length);
    if (!top.length) return fila;

    const f = await getJson(`${RB}/audio-features?ids=${top.map((t) => t.id).join(",")}`);
    const feats = f?.content ?? [];
    fila.conFeatures = feats.length;
    if (feats.length) {
      const media = (k) => +(feats.reduce((s, x) => s + x[k], 0) / feats.length).toFixed(3);
      fila.perfil = { energy: media("energy"), valence: media("valence"), danceability: media("danceability"), acousticness: media("acousticness"), tempo: +media("tempo").toFixed(1) };
    }
  } catch (e) {
    fila.error = e.message;
  }
  return fila;
}

const resultados = [];
for (const art of ARTISTAS) {
  const fila = await probar(art);
  resultados.push(fila);
  console.log(
    `${fila.encontrado ? "OK " : "NO "} ${fila.nombre.padEnd(22)} ${String(fila.metodo ?? "-").padEnd(28)} canciones=${String(fila.canciones).padStart(3)}  features=${fila.conFeatures}/${fila.probadas}  pop=${fila.popularidadMedia ?? "-"}${fila.homonimos > 1 ? `  (${fila.homonimos} homónimos)` : ""}${fila.error ? "  ERROR " + fila.error : ""}`
  );
}

const encontrados = resultados.filter((r) => r.encontrado).length;
const utiles = resultados.filter((r) => r.conFeatures >= 5).length;
console.log(`\nEncontrados: ${encontrados}/20 · Con perfil de sonido útil (≥5 canciones con features): ${utiles}/20`);

const dir = dirname(fileURLToPath(import.meta.url));
await writeFile(join(dir, "resultados.json"), JSON.stringify({ fecha: new Date().toISOString(), resultados }, null, 2));
console.log(`Resultados guardados en ${join(dir, "resultados.json")}`);
