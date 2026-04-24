# Santuario Clafira — Sitio Web

Sitio web oficial de **Santuario Clafira**, un refugio de animales de granja ubicado en Limache, Región de Valparaíso, Chile. Más de 170 habitantes de 14 especies distintas.

## Stack tecnológico

- **Backend:** NestJS 10 (TypeScript)
- **Plantillas:** Handlebars (`.hbs`) via `hbs` + NestJS Express
- **Estilos:** Tailwind CSS 3
- **Interactividad cliente:** Alpine.js 3 (CDN)
- **Runtime:** Node.js

## Estructura del proyecto

```
santuario-clafira/
├── src/
│   ├── main.ts              # Bootstrap NestJS + registra helpers Handlebars
│   ├── app.module.ts        # Módulo raíz
│   ├── app.controller.ts    # GET / con query ?lang=es|en
│   ├── app.service.ts       # Datos de la página (bilingüe ES/EN)
│   └── css/
│       └── globals.css      # Input Tailwind CSS
├── views/
│   └── index.hbs            # Plantilla principal (toda la SPA)
├── public/
│   ├── css/
│   │   └── styles.css       # Output compilado de Tailwind (no editar)
│   └── images/
│       ├── logo.png         # Logo oficial del santuario
│       └── animales/        # Fotos reales del santuario (14 imágenes)
│           ├── hero-caballo.jpg
│           ├── nosotros-burro-madre.jpg
│           ├── nosotros-vaca.jpg
│           ├── nosotros-ciervos.jpg
│           ├── animal-{nombre}.jpg  # Una por cada habitante
│           └── voluntariado.jpg
├── contenido/               # Fuente local de fotos originales (en .gitignore)
├── tailwind.config.js
├── postcss.config.js
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## Comandos

```bash
# Desarrollo (servidor + Tailwind en modo watch, paralelo)
npm run start:dev

# Solo compilar CSS (necesario después de cambiar views/*.hbs o agregar clases nuevas)
npm run build:css

# Build de producción
npm run build

# Iniciar en producción
npm run start:prod

# Build estático completo (lo que ejecuta Netlify)
npm run build:static
```

## Secciones del sitio

| Sección | ID | Descripción |
|---|---|---|
| Nav | — | Navbar fija, logo, links, toggle ES/EN, CTA "Donar ahora" |
| Hero | `#inicio` | Headline emocional, stats (170+ habitantes, 2012, 14 especies), 2 CTAs |
| Nosotros | `#nosotros` | Historia del santuario, grid de 3 fotos reales, valores |
| Habitantes | `#animales` | 9 tarjetas de animales con foto real e historia expandible; 6 visibles + 3 tras botón "Ver más" (Alpine.js) |
| Donar | `#donar` | Formulario interactivo: frecuencia (mensual/única), montos preset en CLP |
| Voluntariado | `#voluntariado` | Cards de redes sociales (Instagram, Facebook, TikTok) |
| Footer | — | Logo, ubicación, Instagram, copyright |

## Diseño / Paleta de colores

Basado en el logo oficial de Santuario Clafira:

| Variable | Hex | Uso |
|---|---|---|
| `teal` (primario) | `#3d9e8e` | Acentos, botones, badges |
| `teal-dark` | `#2c7a6c` | Hover de botones |
| `teal-light` | `#b2ddd7` | Scrollbar thumb |
| `teal-pale` | `#e8f5f3` | Fondos de cards, bordes suaves |
| Fondo página | `#f6faf9` | Fondo base (Bosque Claro) |
| Fondo sección | `#edf6f4` | Secciones alternas |
| Hero teal | `#e8f5f3` | Hero claro |
| Voluntariado | `#2c3a30` | Sección oscura |

**Tipografías:** `Nunito` (cuerpo) + `Lora` (titulares, clase `font-serif`)

## Internacionalización (ES/EN)

El idioma se controla via query string: `/?lang=es` o `/?lang=en`.

- El controlador pasa `lang` al servicio
- `AppService.getPageData(lang)` devuelve todos los textos en el idioma correcto
- El nav muestra un toggle que cambia entre idiomas
- Handlebars recibe `isEs: boolean` para condicionales en la plantilla

## Helpers Handlebars registrados

En `src/main.ts` se registran:
- `eq a b` — igualdad estricta (usado para condicionales de iconos en redes sociales)
- `lookup arr idx` — acceso por índice a arrays (usado en nav links/hrefs)

## Datos de animales (`app.service.ts`)

Los animales se dividen en dos arrays dentro del objeto `animals`:

- `animals.featured` — 6 animales siempre visibles: Valentina (vaca), Copete (cerdo), Palomita (gallina), Cósimo (cabro), Frida (yegua), Bambi (cierva)
- `animals.extra` — 3 animales ocultos por defecto: Coco (burro), Crush (perro), Mochi (gata)

Cada animal tiene: `id`, `name`, `species` (bilingüe), `image` (ruta `/images/animales/...`), `story` (bilingüe).

CTAs de la sección: `animals.ctaMore`, `animals.ctaLess`, `animals.ctaSponsor`.

## Interactividad (Alpine.js)

- **Nav:** scroll-aware (`x-data`, `x-init`, `:class`) + menú hamburguesa móvil
- **Animal cards:** `x-data="{ open: false }"` — click para expandir/colapsar historia
- **Show-more habitantes:** `x-data="{ showAll: false }"` en wrapper padre; las tarjetas extra se envuelven en `<div x-show="showAll" class="contents" style="display:none">` para participar en el CSS grid sin romper el layout
- **Formulario donación:** `x-data` con `freq`, `amount`, `custom`, computed `display`

## Repositorio y despliegue

| | URL |
|---|---|
| **GitHub** | https://github.com/fraxd/SantuarioClafiraWeb |
| **Netlify (producción)** | https://santuario-clafira.netlify.app |
| **Admin Netlify** | https://app.netlify.com/projects/santuario-clafira |

### Flujo de despliegue continuo

Cada `git push` a `main` dispara automáticamente:
```
git push origin main → Netlify ejecuta npm run build:static → dist-static/ publicado
```

### URLs por idioma (producción)
- Español: https://santuario-clafira.netlify.app/
- Inglés: https://santuario-clafira.netlify.app/en/

### Build estático (`dist-static/`)

El script `scripts/build-static.js` usa el NestJS compilado + Handlebars para pre-renderizar dos HTML estáticos:
- `dist-static/index.html` → español
- `dist-static/en/index.html` → inglés

La carpeta `dist-static/` está en `.gitignore`; Netlify la genera en cada deploy.

## Próximos pasos sugeridos

- [ ] **[PENDIENTE REVISAR]** Verificar y corregir el encuadre/posición de las imágenes integradas (hero, about grid, tarjetas de animales, voluntariado) — hay problemas visuales por revisar
- [ ] eliminar mensaje de "Ultimo rescate", dejarlo solamente con el nombre del habitante y su tiempo en el santuario tal vez. Ademas la imagen actual es de un Caballo.
- [ ] Integrar pasarela de pago (Flow, Webpay/Transbank) en el formulario de donación
- [ ] Confirmar y actualizar nombres reales de Coco (burro), y Mochi (gata) si difieren
- [ ] Agregar más habitantes a la galería (expandir `animals.extra`)
- [ ] Configurar links reales de Facebook y TikTok
- [ ] Añadir página de animales completa (todos los 170+ habitantes)
- [ ] Implementar formulario de contacto/voluntariado por email
- [ ] Agregar meta tags Open Graph para compartir en redes sociales
