# Mussic Sonnar — Documento del proyecto

Versión editable con diagrama: https://claude.ai/artifact/Rs2kNXYeD77vBCHyasPt7i
Mockup: https://canva.link/oljdtql08t52i7b
Última actualización: 2026-11-19

## Estado actual y decisiones

- **Público inicial:** solo el autor y un grupo pequeño de amigos (máximo 5 usuarios con Spotify conectado). No es una web pública todavía.
- **Desarrollo:** con Claude Code en el ordenador del autor, dentro de la carpeta del proyecto. Este documento vive en `docs/`.
- **Por ahora, todo en local:** PostgreSQL (ya instalado, sin Docker), backend y frontend funcionan en el ordenador del autor. No se despliega nada.
  - Base de datos: PostgreSQL instalado en local, con una base de datos `mussic_sonnar`, usado por el backend a través de Prisma.
  - Sin terceros ni pagos (salvo las APIs musicales, que son gratuitas).
- **Despliegue: aplazado.** Se decidirá más adelante. La idea inicial es alojarlo en un ordenador propio y dar acceso a los amigos con Tailscale, pero no está decidido.
- **Ya disponible:** Node.js y PostgreSQL instalados, cuenta de GitHub.
- **Pendiente:**
  - Clave de API de Last.fm (solicitada, a la espera). No hace falta hasta la Fase 2.
  - Confirmar los pesos de los tres modos de recomendación.
- **Hecho:** prueba de cobertura de ReccoBeats con 20 artistas emergentes (2026-11-17): 20/20 con perfil de sonido. Segunda prueba con 48 artistas muy pequeños: 65 % con perfil útil. Ver "Prueba de ReccoBeats".
- **Fase 0 terminada (2026-11-19):** ver "Fase 0: qué hay montado".
- **Repositorio:** https://github.com/SaulBeneito/mussic-sonnar (privado, rama `main`).
- **Fase 1 terminada (2026-11-19):** ver "Fase 1: prototipo visual".
- **Siguiente paso:** Fase 2 (cuentas y funciones básicas). Necesita la clave de Last.fm y una cuenta SMTP para los emails.

## Idea y objetivo

Buscador musical personalizado para descubrir artistas, canciones y géneros que probablemente gusten al usuario aunque nunca los haya escuchado. No es un reproductor ni una copia de Spotify.

- Nombre: Mussic Sonnar
- Eslogan provisional: "Find your next favorite sound"
- Estética: moderna, minimalista, tecnológica y elegante; pocos elementos por pantalla.
- Colores: negro como base, morado como acento, blanco para textos, grises para lo secundario.
- Detalles visuales: animaciones suaves, tarjetas con portadas e imágenes de artistas, ondas sonoras discretas, diseño responsive (ordenador, tablet y móvil).
- Público: personas apasionadas por la música que quieren encontrar artistas nuevos y música menos comercial.

## Páginas

| Página | Contenido | Acceso |
|---|---|---|
| Inicio | Presentación, buscador, conectar Spotify, gustos manuales, botón para empezar | Pública |
| Descubrir | Recomendaciones con los 3 modos, artistas similares, canciones nuevas, descubrimientos del día | Privada |
| Explorar | Géneros, artistas emergentes, música alternativa, nuevos estilos | Pública |
| Mi Música | Perfil musical, artistas y géneros favoritos, estadísticas, evolución de gustos | Privada |
| Favoritos | Artistas, canciones, álbumes y recomendaciones guardadas | Privada |
| Login y registro | Crear cuenta, iniciar sesión, recuperar y restablecer contraseña | Pública |
| Ajustes de cuenta | Editar datos, conectar o desconectar Spotify, privacidad, cerrar sesión, eliminar cuenta | Privada |

Recorrido del usuario: entra, conecta Spotify o introduce sus gustos, la app analiza sus preferencias, genera su perfil musical, muestra recomendaciones y el usuario guarda lo que descubre.

## Funciones principales

1. **Gustos manuales:** buscar artistas, añadir grupos y canciones, elegir géneros, varios artistas de referencia. Funciona sin Spotify y se construye primero.
2. **Conectar Spotify:** autorización oficial con OAuth 2.0 + PKCE para leer artistas y canciones más escuchados.
3. **Recomendaciones personalizadas:** artistas, grupos, canciones, álbumes y géneros.
4. **Artistas similares:** por género, estilo, sonido e influencias.
5. **Artistas desconocidos:** prioridad a emergentes y menos conocidos.
6. **Descubrimiento de géneros** que el usuario aún no conoce.
7. **Playlists personalizadas.**
8. **Perfil musical** y evolución de gustos.
9. **Favoritos.**
10. **Cuenta de usuario** con su propio perfil, recomendaciones y favoritos.

## Algoritmo de recomendación

Cada artista candidato recibe una puntuación de 0 a 100 que suma cuatro criterios. Los pesos se guardan en configuración, no en el código.

| Criterio | Peso inicial | Cálculo |
|---|---|---|
| Similitud de género | 30 % | Coincidencia de etiquetas de género con el perfil del usuario |
| Similitud musical | 30 % | Parecido del perfil de sonido (energía, valencia, bailabilidad, acústica, tempo) según ReccoBeats; si no hay datos, similitud de Last.fm |
| Artistas relacionados | 20 % | Cuántos favoritos del usuario están conectados con el candidato |
| Descubrimiento y variedad | 20 % | Más puntos cuanto menos conocido es el artista y si aún no se ha recomendado |

Perfil de sonido de un artista = media de las características de sus 5 a 10 canciones principales (ReccoBeats). Perfil del usuario = media de sus favoritos.

### Los tres modos (propuesta inicial, pendiente de confirmar)

| Modo | Género | Musical | Relacionados | Descubrimiento |
|---|---|---|---|---|
| Parecidos a mis gustos | 35 % | 35 % | 25 % | 5 % |
| Descubrimiento (por defecto) | 30 % | 30 % | 20 % | 20 % |
| Fuera de mi zona | 10 % | 20 % | 10 % | 60 % |

En "Fuera de mi zona" también se buscan géneros vecinos que el usuario no tiene en su perfil.

### Explicaciones y mejora

- Cada recomendación explica por qué aparece, por ejemplo: "Te recomendamos este artista porque combina indie rock y rock alternativo, dos estilos que aparecen entre tus preferencias" o "tiene la misma energía melancólica que tus favoritos".
- Los "me gusta", "no me interesa" y guardados se registran para ajustar los pesos más adelante.

## Fuentes de datos

| Fuente | Uso | Necesita |
|---|---|---|
| Last.fm API | Buscar artistas, similares, etiquetas de género, número de oyentes | Clave de API gratuita (solicitada) |
| MusicBrainz | Metadatos fiables e identificadores comunes | Sin clave; identificarse con nombre de app |
| [ReccoBeats](https://reccobeats.com/docs/documentation/introduction) | Características de sonido por canción; busca por ID de Spotify | API gratuita; revisar límites y condiciones |
| Spotify Web API | Leer artistas y canciones top del usuario conectado, imágenes | App en Spotify for Developers y cuenta Premium |

### Límites de Spotify

- Desde el 27/11/2024 las apps nuevas no pueden usar Related Artists, Recommendations, Audio Features ni Audio Analysis ([anuncio](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api)).
- Desde febrero de 2026 el modo desarrollo exige Spotify Premium y permite máximo 5 usuarios autorizados por app ([anuncio](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security)).
- Para el público actual (el autor y amigos) el modo desarrollo es suficiente.

### Notas

- Los datos externos se guardan en caché en la base de datos.
- ReccoBeats va detrás de una interfaz intercambiable (alternativa de pago: [Soundcharts](https://soundcharts.com/audio-features-api)).
- Si la web se vuelve comercial: revisar condiciones de Last.fm y ReccoBeats.

### Prueba de ReccoBeats (2026-11-17)

Script: `scripts/prueba-reccobeats/prueba.mjs` (resultados en `resultados.json`). Sin claves.

- **Método:** ID de Spotify del artista sacado de MusicBrainz → artista en ReccoBeats con ese ID → sus canciones → características de sonido de las 10 más populares.
- **Artistas:** 10 españoles (Alcalá Norte, Depresión Sonora, Ginebras, Cupido, Biznaga, Repion, Shego, Mujeres, Merina Gris, Hoonine) y 10 internacionales (Wednesday, Horsegirl, Wishy, Fcukers, Ekko Astral, Water From Your Eyes, Feeble Little Horse, Hotline TNT, bar italia, Freak Slug).
- **Resultado:** 20/20 encontrados y 20/20 con características para sus 10 canciones principales. Entre 11 y 142 canciones por artista. Popularidad media de sus canciones top entre 8 (Hoonine) y 60 (Fcukers).
- **Los perfiles distinguen estilos:** por ejemplo, Fcukers bailabilidad 0,80; Wednesday acústica 0,32 y valencia 0,32; Biznaga energía 0,91.
- **Conclusión:** ReccoBeats sirve para el criterio de similitud musical. Se mantiene Last.fm como respaldo.

Lecciones para la Fase 3:
- **Buscar por ID de Spotify, no por nombre.** Hay muchos homónimos (173 resultados para "Hinds"). La búsqueda por nombre solo hizo falta en 3 casos, cuando MusicBrainz no tenía el enlace a Spotify.
- **MusicBrainz limita a 1 petición por segundo** y devuelve 503 si se supera: esperar y reintentar, y guardar en caché.
- **`/v1/audio-features?ids=` acepta IDs de ReccoBeats o de Spotify,** varios por llamada.

#### Segunda prueba: artistas muy pequeños (2026-11-17)

Script: `scripts/prueba-reccobeats/prueba-pequenos.mjs` (resultados en `resultados-pequenos.json`).

- **Muestra:** 48 grupos elegidos al azar en MusicBrainz, no en ReccoBeats, para que los que falten sean huecos reales.
  - Formados entre 2018 y 2025, 8 por país (España, México, Argentina, EE. UU., Reino Unido y Francia).
  - Géneros indie, rock, punk, pop, electrónica o alternativa, y todos con enlace a Spotify.
- **Resultado:**

| | Artistas | % |
|---|---|---|
| Están en ReccoBeats | 38 de 48 | 79 % |
| Perfil de sonido útil (5 o más canciones con datos) | 31 de 48 | 65 % |
| Ausentes | 10 de 48 | 21 % |

- **Quiénes faltan:** artistas diminutos según su página de Spotify (de 0 a 1.100 oyentes mensuales), salvo Rebrote, con 12.500. Tampoco aparecen buscándolos por nombre.
- **Si un artista está, sus canciones tienen datos:** las 38 que están en ReccoBeats tienen características de sonido para todas las canciones que tienen registradas. El problema de los artistas muy pequeños es que solo tienen 1 a 4 canciones, no que falten datos.
- **Por tamaño** (popularidad de su canción más escuchada, de 0 a 100):

| Tamaño | Encontrados | Con perfil útil |
|---|---|---|
| 0 a 9 | 19 | 14 |
| 10 a 19 | 4 | 2 |
| 20 o más | 15 | 15 |

**Conclusión general:**
- Para artistas emergentes con algo de público, la cobertura es completa.
- Para artistas diminutos, solo hay perfil de sonido para unos dos de cada tres.

**Decisiones para la Fase 3:**
- El respaldo de Last.fm para la similitud musical es imprescindible, no opcional.
- Aceptar perfiles con 3 canciones como mínimo, marcándolos como de menor confianza.
- Los artistas sin perfil de sonido solo puntúan por género, artistas relacionados y descubrimiento. No hay que penalizarlos, porque son justo los que más interesan al modo "Fuera de mi zona".

## Arquitectura tecnológica

Frontend, backend y base de datos separados. El navegador solo habla con la API de NestJS; solo el backend accede a PostgreSQL y a las APIs externas.

```
Usuario (navegador)
   │ HTTPS
Frontend · Next.js (React, TypeScript, Tailwind CSS, Framer Motion)
   │ API REST (JSON)
Backend · NestJS + TypeScript
   [Auth] [Perfil] [Recomendación] [Favoritos] [Integraciones]
   │                 │                    │
PostgreSQL        Servicio de email     APIs musicales
(vía Prisma)      (recuperar contraseña) (Last.fm, MusicBrainz, ReccoBeats, Spotify)
```

| Capa | Tecnología | Dónde funciona (ahora) |
|---|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Framer Motion | Local (`localhost:3000`) |
| Backend | Node.js, NestJS, TypeScript, API REST | Local (`localhost:4000`) |
| Base de datos | PostgreSQL + Prisma ORM | PostgreSQL instalado en local (`localhost:5432`) |
| Autenticación | Propia en NestJS: JWT en cookies seguras, argon2, emails de recuperación | Dentro del backend |

Frontend y backend se arrancan con `npm run dev`; PostgreSQL funciona como servicio del sistema. Sin Docker.

**Autenticación:** crear cuenta, iniciar y cerrar sesión, recuperar y restablecer contraseña, mantener la sesión, gestionar los datos de la cuenta. Las páginas privadas se protegen en el backend (guards de NestJS) y en el frontend (middleware de Next.js).

**Coste de esta decisión:** separar frontend y backend escala mejor, pero supone más trabajo que una app solo con Next.js (dos proyectos, dos despliegues, login propio).

## Privacidad y seguridad

Necesario desde el principio, aunque el público sea pequeño:
- Contraseñas cifradas con argon2 o bcrypt.
- Sesiones con tokens en cookies seguras (httpOnly, Secure, SameSite).
- Sin contraseñas de Spotify; tokens OAuth cifrados; solo los permisos necesarios.
- Desconectar Spotify y eliminar la cuenta con todos sus datos.
- Secretos solo en variables de entorno (`.env` fuera de GitHub).
- Validación de datos y límite de peticiones en login y registro.
- PostgreSQL sin puerto expuesto a internet; solo el backend se conecta a él.

Cuando se despliegue:
- Copia de seguridad diaria automática de la base de datos (`pg_dump`) a otro disco.

Pueden esperar a que la web sea pública:
- Política de privacidad, aviso de cookies y condiciones de uso (RGPD).
- Descarga de datos del usuario.

## Plan de desarrollo por fases

| Fase | Qué se construye | Terminada cuando |
|---|---|---|
| 0. Base | Repositorio en GitHub, frontend Next.js, backend NestJS, PostgreSQL local con Prisma (primera migración), variables de entorno | Frontend y backend arrancan con `npm run dev` y el backend se conecta a PostgreSQL |
| 1. Prototipo visual | Todas las pantallas del mockup y la navegación, con datos marcados como DEMO | Se puede recorrer toda la web en ordenador y móvil |
| 2. Cuentas y funciones básicas | Registro, login, recuperar contraseña, búsqueda con Last.fm, selección de artistas y géneros, favoritos | Me registro, añado favoritos, cierro sesión, vuelvo y siguen ahí |
| 3. Recomendaciones reales | Algoritmo con pesos, 3 modos, explicaciones, perfiles de sonido con ReccoBeats, caché | Con 3 artistas de partida salen recomendaciones distintas en cada modo, cada una con su motivo |
| 4. Spotify | OAuth con PKCE, lectura de artistas y canciones top, desconexión | Conecto mi Spotify, mi perfil se rellena solo y puedo desconectarlo |
| 5. Mejoras | Estadísticas, playlists, evolución de gustos, ajustes con el feedback | Lo que se acuerde al cerrar la fase 4 |
| Más adelante: despliegue | Por decidir (idea inicial: servidor propio + Tailscale + copias de seguridad) | Mis amigos pueden usar la web desde su móvil |

## Fase 0: qué hay montado

- **Estructura:** `frontend/` (Next.js 16, React 19, Tailwind 4), `backend/` (NestJS 12, ESM, Vitest) y `package.json` en la raíz. `npm run dev` arranca los dos con concurrently. Instrucciones de arranque en el `README.md`.
- **Base de datos:** usuario `mussic` (propietario de la base `mussic_sonnar`, con permiso CREATEDB para la base temporal de las migraciones). Prisma 7.10.1 con adaptador `pg`; se evitó Prisma 8 porque aún es versión candidata.
- **Primera migración (`init`):** tabla `users` (id uuid, email único, password_hash, name, created_at, updated_at).
- **Comprobación:** `GET /health` en el backend consulta la base de datos. La página provisional de `localhost:3000` muestra si frontend, backend y base de datos están conectados.
- **Variables de entorno:** `backend/.env` (DATABASE_URL, API_PORT, FRONTEND_URL) y `frontend/.env.local` (API_URL), con plantillas `.env.example`. El puerto del backend usa `API_PORT` y no `PORT`, para no chocar con el del frontend.
- **Tests:** unitario de `/health` (`npm test`) y e2e contra la base real (`npm --prefix backend run test:e2e`).
- `prisma init` instaló skills de Prisma para agentes (`backend/.agents`, `.claude`, `.windsurf`). Quedan fuera de Git.

## Fase 1: prototipo visual

Todas las pantallas con datos inventados, marcados con la etiqueta DEMO (`frontend/src/lib/demo-data.ts`). No se guarda nada: formularios, favoritos y gustos solo cambian en el navegador.

| Ruta | Pantalla | Notas |
|---|---|---|
| `/` | Inicio | Titular, buscador, botón Empezar y "Cómo funciona" (Spotify, gustos manuales, descubrir) |
| `/descubrir` | Descubrir | Pestañas de los 3 modos (por defecto Descubrimiento, como dice este documento; el mockup marcaba Parecidos), % de afinidad, motivo de cada recomendación, descubrimiento del día y canciones nuevas |
| `/explorar`, `/explorar/[genero]` | Explorar | 6 géneros del mockup, artistas emergentes y página por género |
| `/mi-musica` | Mi Música | Perfil, estadísticas, editor de gustos manuales, artistas favoritos y evolución de gustos |
| `/favoritos` | Favoritos | Pestañas Artistas, Canciones y Álbumes |
| `/artista/[slug]` | Artista | No está en el mockup. Motivo de la recomendación, perfil de sonido, canciones, similares y botón de favorito |
| `/buscar` | Búsqueda | Resultados de artistas y géneros |
| `/login`, `/registro`, `/recuperar` | Cuenta | Formularios sin conexión al backend |
| `/ajustes` | Ajustes | Datos, Spotify, privacidad, cerrar sesión y eliminar cuenta (con confirmación) |
| `/estado` | Estado | La comprobación de conexiones de la Fase 0 |

- **Navegación:** barra superior en ordenador; barra inferior con iconos en móvil. Comprobado a 375 px sin scroll horizontal.
- **Imágenes:** las fotos del mockup son de Canva y su licencia no permite usarlas fuera del diseño. Se sustituyen por portadas abstractas generadas (resplandor morado, anillos de sonar y ondas) hasta tener imágenes reales de Last.fm o Spotify.
- **Animaciones:** aparición suave con CSS, pestañas y menú con Motion (antes Framer Motion). Se desactivan si el sistema pide reducir movimiento.

## Servicios y credenciales

| Servicio | Para qué | Variable de entorno | Fase | Estado |
|---|---|---|---|---|
| GitHub | Guardar el código ([SaulBeneito/mussic-sonnar](https://github.com/SaulBeneito/mussic-sonnar), privado) | — | 0 | Listo |
| Node.js | Ejecutar frontend y backend | — | 0 | Instalado |
| PostgreSQL local | Base de datos (usuario `mussic`, base `mussic_sonnar`) | `DATABASE_URL` | 0 | Listo |
| Last.fm | Datos y similitud de artistas | `LASTFM_API_KEY` | 2 | Solicitada |
| Email por SMTP (p. ej. una cuenta de Gmail con contraseña de aplicación, gratis) | Recuperar contraseña | `SMTP_USER`, `SMTP_PASSWORD` | 2 | Pendiente |
| ReccoBeats | Perfiles de sonido | Según su documentación | 3 | Pendiente de prueba |
| Spotify for Developers | Conectar la cuenta del usuario | `SPOTIFY_CLIENT_ID`, `SPOTIFY_REDIRECT_URI` | 4 | Pendiente (requiere Premium) |
| Despliegue (servidor, acceso remoto) | Que los amigos usen la web | — | Más adelante | Aplazado |

Secretos propios del backend, generados al azar: `JWT_SECRET` (sesiones) y `TOKEN_ENCRYPTION_KEY` (cifrar tokens de Spotify).
