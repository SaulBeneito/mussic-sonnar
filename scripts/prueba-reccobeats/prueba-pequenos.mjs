// Segunda prueba de cobertura de ReccoBeats: artistas pequeños elegidos al azar en MusicBrainz.
// La muestra no sale de ReccoBeats, así que los que falten son huecos reales de cobertura.
// Uso: node scripts/prueba-reccobeats/prueba-pequenos.mjs

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RB = "https://api.reccobeats.com/v1";
const MB = "https://musicbrainz.org/ws/2";
const UA = "MussicSonnar/0.1 (prueba-cobertura)";
const PAISES = ["ES", "MX", "AR", "US", "GB", "FR"];
const POR_PAIS = 8; // artistas con Spotify por país
const TOP = 10;

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, intentos = 5) {
  for (let i = 0; i < intentos; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (res.status === 429 || res.status >= 500) { await esperar(3000 * (i + 1)); continue; }
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${res.status} en ${url}`);
    return res.json();
  }
  throw new Error(`Sin respuesta: ${url}`);
}

// Barajado con semilla fija para que la muestra se pueda repetir
function barajar(arr, semilla = 42) {
  const a = [...arr];
  let s = semilla;
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

async function muestraDePais(pais) {
  const q = encodeURIComponent(`begin:[2018 TO 2025] AND country:${pais} AND type:group AND tag:(indie OR rock OR punk OR pop OR electronic OR alternative OR shoegaze OR folk)`);
  const r = await getJson(`${MB}/artist?query=${q}&fmt=json&limit=100`);
  await esperar(1600);
  const elegidos = [];
  for (const a of barajar(r?.artists ?? [])) {
    if (elegidos.length >= POR_PAIS) break;
    const det = await getJson(`${MB}/artist/${a.id}?inc=url-rels&fmt=json`);
    await esperar(1600);
    const url = (det?.relations ?? []).map((x) => x.url?.resource ?? "").find((u) => u.includes("open.spotify.com/artist/"));
    if (url) elegidos.push({ nombre: a.name, pais, inicio: a["life-span"]?.begin ?? null, spotifyId: url.split("/artist/")[1].split(/[?/]/)[0] });
  }
  return elegidos;
}

async function probar(art) {
  const fila = { ...art, encontrado: false, canciones: 0, probadas: 0, conFeatures: 0, popularidadMedia: null, popularidadMax: null };
  const r = await getJson(`${RB}/artist?ids=${art.spotifyId}`);
  const rb = r?.content?.[0];
  if (!rb) return fila;
  fila.encontrado = true;
  const todas = new Map();
  for (let page = 0; page < 5; page++) {
    const t = await getJson(`${RB}/artist/${rb.id}/track?size=50&page=${page}`);
    for (const x of t?.content ?? []) todas.set(x.id, x);
    if (!t || page + 1 >= t.totalPages) break;
  }
  const canciones = [...todas.values()].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  fila.canciones = canciones.length;
  const top = canciones.slice(0, TOP);
  fila.probadas = top.length;
  if (!top.length) return fila;
  fila.popularidadMax = top[0].popularity ?? 0;
  fila.popularidadMedia = Math.round(top.reduce((s, t) => s + (t.popularity ?? 0), 0) / top.length);
  const f = await getJson(`${RB}/audio-features?ids=${top.map((t) => t.id).join(",")}`);
  fila.conFeatures = f?.content?.length ?? 0;
  return fila;
}

const muestra = [];
for (const p of PAISES) {
  const m = await muestraDePais(p);
  console.log(`${p}: ${m.length} artistas con Spotify`);
  muestra.push(...m);
}

const resultados = [];
for (const art of muestra) {
  let fila;
  try { fila = await probar(art); } catch (e) { fila = { ...art, error: e.message }; }
  resultados.push(fila);
  console.log(`${fila.encontrado ? "OK " : "NO "} ${fila.pais} ${fila.nombre.slice(0, 26).padEnd(26)} canciones=${String(fila.canciones ?? 0).padStart(3)} features=${fila.conFeatures ?? 0}/${fila.probadas ?? 0} popMax=${fila.popularidadMax ?? "-"}${fila.error ? " ERROR " + fila.error : ""}`);
}

// Resumen por tamaño (popularidad de su canción más escuchada, 0-100)
const tramos = [["0-9", 0, 9], ["10-19", 10, 19], ["20-29", 20, 29], ["30+", 30, 100]];
console.log("\nTramo popMax | artistas | con perfil útil (≥5 canciones con features)");
for (const [et, a, b] of tramos) {
  const g = resultados.filter((r) => r.encontrado && r.popularidadMax >= a && r.popularidadMax <= b);
  console.log(`${et.padEnd(12)} | ${String(g.length).padStart(8)} | ${g.filter((r) => r.conFeatures >= 5).length}`);
}
const n = resultados.length;
console.log(`\nTotal: ${n} · en ReccoBeats: ${resultados.filter((r) => r.encontrado).length} · perfil útil: ${resultados.filter((r) => r.conFeatures >= 5).length} · algún feature: ${resultados.filter((r) => r.conFeatures > 0).length}`);

const dir = dirname(fileURLToPath(import.meta.url));
await writeFile(join(dir, "resultados-pequenos.json"), JSON.stringify({ fecha: new Date().toISOString(), resultados }, null, 2));
