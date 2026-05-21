# María José Mentana — Sitio Web Oficial

Sitio web oficial de la cantante de tango María José Mentana.
Desarrollado con **React 18 + Vite + GSAP**.

---

## 🚀 Instalación y puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Build para producción
npm run build

# 4. Preview del build
npm run preview
```

---

## 📁 Estructura del proyecto

```
mentana-web/
├── public/
│   └── images/          ← Todas las imágenes van acá
│       ├── logo.png
│       ├── maria-art.jpg
│       ├── maria-sonrisa.jpg
│       └── 1.jpg ... 99.jpg (fotos de galería)
│
├── src/
│   ├── App.jsx                    ← Rutas principales
│   ├── main.jsx                   ← Entry point
│   ├── context/
│   │   └── LangContext.js         ← Traducciones ES/EN + contexto
│   ├── styles/
│   │   └── globals.css            ← Variables CSS, tipografía, reset
│   └── components/
│       ├── Header/                ← Navegación fija con menú mobile
│       ├── Footer/                ← Footer con marquee animado
│       ├── Cursor/                ← Cursor dorado personalizado
│       ├── Hero/                  ← Sección hero principal (Home)
│       ├── About/                 ← Sección "La Artista" (Home)
│       ├── Biography/             ← Timeline horizontal (Home)
│       ├── Discography/           ← Grilla de álbumes (Home)
│       ├── Press/                 ← Reconocimientos (Home)
│       ├── Videos/                ← Player + playlist (Home)
│       ├── Music/                 ← Embed Spotify (Home)
│       ├── Contact/               ← Formulario de contacto (Home)
│       ├── Gallery/               ← Galería con lightbox (Página /galeria)
│       └── BiographyPage/         ← Página completa /biografia (NUEVA)
```

---

## 🗺️ Rutas

| Ruta         | Componente       | Descripción                          |
|--------------|------------------|--------------------------------------|
| `/`          | Home             | Todas las secciones en una página    |
| `/galeria`   | GalleryPage      | Galería de fotos con filtros         |
| `/biografia` | BiographyPage    | Página de biografía completa (nueva) |

---

## 🌐 Idiomas

El sitio soporta **Español** e **Inglés**.
Todas las traducciones se gestionan en `src/context/LangContext.js`.

Para agregar más idiomas, extender el objeto `t` con la nueva clave de idioma
y agregar el botón correspondiente en el componente `Header`.

---

## 📧 Formulario de contacto

El formulario usa **EmailJS** (no incluido por defecto).

Para activarlo:
```bash
npm install @emailjs/browser
```

Luego en `Contact.jsx`, descomentar y configurar:
```js
import emailjs from '@emailjs/browser'

emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current, 'PUBLIC_KEY')
```

---

## 🎨 Variables de diseño (globals.css)

| Variable          | Valor       | Uso                    |
|-------------------|-------------|------------------------|
| `--ink`           | `#0a0906`   | Fondo principal        |
| `--ink-soft`      | `#1a1711`   | Fondo secciones alt    |
| `--cream`         | `#f5f0e8`   | Texto principal        |
| `--gold`          | `#efc149`   | Acento dorado          |
| `--gold-light`    | `#d4af6a`   | Acento dorado suave    |
| `--font-display`  | Cormorant Garamond | Títulos         |
| `--font-body`     | DM Sans     | Cuerpo de texto        |

---

## ☁️ Imágenes en Cloudflare R2

Para servir fotos y portadas desde R2 (CDN), seguí la guía **[docs/R2-SETUP.md](./docs/R2-SETUP.md)**.

Resumen:

```bash
cp .env.example .env   # credenciales + VITE_ASSETS_BASE_URL
npm run r2:upload:dry
npm run r2:upload
npm run build
```

---

## 🖼️ Imágenes necesarias

Colocar en `/public/images/`:

- `logo.png` — Logo de la artista
- `maria-art.jpg` — Retrato principal (usado en Hero y BiographyPage)
- `maria-sonrisa.jpg` — Foto de perfil (usado en About)
- `1.jpg` a `99.jpg`, `32.jpeg`, `34.jpeg`, `35.jpeg`, `37.jpeg`, `38.JPG` — Galería

---

## 📦 Dependencias principales

| Paquete           | Versión  | Uso                            |
|-------------------|----------|--------------------------------|
| `react`           | ^18.3.1  | Framework UI                   |
| `react-dom`       | ^18.3.1  | Renderizado DOM                |
| `react-router-dom`| ^6.26.2  | Ruteo SPA                      |
| `gsap`            | ^3.12.5  | Animaciones y ScrollTrigger    |

---

## ✏️ Para agregar un nuevo álbum en Discography

En `LangContext.js`, dentro de `discography.albums`, agregar:

```js
{
  id: 'nuevo-album',
  year: '2026',
  title: 'Nombre del Álbum',
  note: { es: 'Descripción en español', en: 'Description in English' },
  tracks: ['Tema 1', 'Tema 2', 'Tema 3'],
  location: { es: 'Buenos Aires', en: 'Buenos Aires' },
  isLatest: true, // solo para el más reciente
},
```

---

## ✏️ Para agregar un nuevo video

En `LangContext.js`, dentro de `videos.list`, agregar:

```js
{
  id: 'vid-07',
  title: 'Nombre de la canción',
  subtitle: { es: 'Descripción es', en: 'Description en' },
  url: 'https://www.youtube.com/watch?v=XXXXXXXXXXXX',
  placeholder: false,
},
```

---

Desarrollado por **Clyra Studio**
