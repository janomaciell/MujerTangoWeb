# Cómo publicar el sitio en el hosting (mariajosementana.com)

El sitio es una SPA hecha con React + Vite. El navegador no entiende el código de
`src/`: hay que **compilarlo** primero y subir el resultado.

---

## Datos del hosting

| Dato | Valor |
|---|---|
| Servidor FTP | `ftp.mariajosementana.com` |
| Puerto | `21` |
| Cifrado | FTPS explícito (FTP sobre TLS) |
| Usuario | `infomariajosementana@mariajosementana.com` |
| Carpeta destino | `public_html` |
| Servidor | Apache con `mod_rewrite` activo |
| SSL | Ya emitido y activo |

La contraseña **no se guarda en este repo**. Está en el mail de la gente de hosting.

---

## Paso 1 — Compilar

Desde la carpeta `mentana-web`:

```bash
npm install
npm run build
```

Esto genera la carpeta **`dist/`**. Eso, y solo eso, es lo que va al hosting.

`dist/` ya incluye el `.htaccess` (viene de `public/.htaccess`, Vite lo copia solo).

---

## Paso 2 — Verificar antes de subir

```bash
npm run verify
```

Confirma que ninguna imagen o video referenciado en el código falte en `public/`.

---

## Paso 3 — Subir por FTP

Se sube **el CONTENIDO de `dist/`**, no la carpeta `dist` en sí.

En el servidor tiene que quedar así:

```
public_html/
├── .htaccess
├── index.html
├── assets/
├── web-mentana/
└── ... (el resto)
```

**MAL:** `public_html/dist/index.html` ← el sitio no va a andar.

En `public_html` puede haber un `index.html` o `index.php` de bienvenida del
hosting: hay que borrarlo. **No tocar** `cgi-bin` ni `.well-known` (esa última la
usa el certificado SSL para renovarse).

---

## Paso 4 — Probar

1. `https://mariajosementana.com` → tiene que cargar el home.
2. Navegar a una sección interna (ej. Biografía) y **recargar con F5**.
   Si carga bien, el `.htaccess` está funcionando.
   Si da 404, el `.htaccess` no se subió o no se está leyendo.
3. Probar `http://` (sin la s) → debe redirigir solo a `https://`.

---

## Actualizaciones futuras

1. `npm run build`
2. Subir de nuevo el contenido de `dist/` sobrescribiendo.
3. Borrar del servidor los archivos viejos de `assets/` (tienen un hash en el
   nombre y cambian en cada build, si no se acumulan).

---

## Sobre los assets

Las imágenes y videos se sirven **desde el propio hosting**, no desde un CDN
externo. Eso lo define `.env.production`, que deja `VITE_ASSETS_BASE_URL` vacío.

Los archivos de `public/` están optimizados (WebP y MP4 H.264). Los originales sin
comprimir quedaron en `assets-originales/`, que no se versiona ni se sube.
Para regenerar la optimización tras agregar fotos nuevas:

```bash
npm run optimize
```

---

## Alternativa: subir sin FileZilla

El proyecto incluye un script que hace la misma subida por FTPS usando Node.
Útil para las actualizaciones, que salen en un comando.

```bash
npm run deploy:list
```

La contraseña se lee de una variable de entorno que cargás vos en la terminal
(`$env:FTP_PASSWORD` en PowerShell). No se guarda en ningún archivo.

- `npm run deploy:dry` — lista qué se subiría, sin conectarse.
- `npm run deploy:list` — se conecta y muestra qué hay en el servidor. No sube nada.
- `npm run deploy` — sube `dist/` a `public_html` y verifica el resultado.

Si el servidor da error de certificado (común en hostings compartidos), agregar
`-- --insecure-tls` al final del comando.
