# Mussic Sonnar

Buscador musical personalizado para descubrir artistas, canciones y géneros. *Find your next favorite sound.*

El documento del proyecto está en [docs/mussic-sonnar-documento-proyecto.md](docs/mussic-sonnar-documento-proyecto.md).

## Estructura

| Carpeta | Qué es | Puerto |
|---|---|---|
| `frontend/` | Next.js, React, TypeScript, Tailwind CSS | 3000 |
| `backend/` | NestJS, TypeScript, Prisma | 4000 |
| `docs/` | Documento del proyecto | — |
| `scripts/` | Pruebas y utilidades (p. ej. la prueba de ReccoBeats) | — |

## Puesta en marcha (local)

Requisitos: Node.js y PostgreSQL instalado como servicio.

1. **Base de datos** (una sola vez): crear el usuario `mussic` y la base `mussic_sonnar` como `postgres`:

   ```sql
   CREATE ROLE mussic WITH LOGIN PASSWORD 'una-contraseña' CREATEDB;
   CREATE DATABASE mussic_sonnar OWNER mussic;
   ```

2. **Variables de entorno:** copiar `backend/.env.example` a `backend/.env` (con esa contraseña en `DATABASE_URL`) y `frontend/.env.example` a `frontend/.env.local`.
3. **Dependencias:** `npm install` en la raíz (instala también frontend y backend).
4. **Migraciones:** `npm run db:migrate`.
5. **Arrancar:** `npm run dev` y abrir http://localhost:3000. La página indica si el backend y la base de datos están conectados.

Otros comandos: `npm test` (tests del backend), `npm run build`, `npm --prefix backend run db:studio` (ver la base de datos en el navegador).
