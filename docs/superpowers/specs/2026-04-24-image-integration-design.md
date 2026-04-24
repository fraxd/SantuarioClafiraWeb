# Diseño: Integración de imágenes reales en el sitio web

**Fecha:** 2026-04-24
**Estado:** Aprobado

## Contexto

El sitio web de Santuario Clafira tiene placeholders con emojis en todas sus secciones visuales (hero, about, tarjetas de animales, voluntariado). El directorio `contenido/` contiene 21 fotografías reales de alta calidad del santuario. Este diseño integra esas imágenes en el sitio y agrega 3 nuevas tarjetas de animales (burro, perro, gato) con un botón "Ver más" que revela las tarjetas adicionales.

## Alcance

- 4 secciones modificadas: Hero, Nosotros, Habitantes, Voluntariado
- 9 tarjetas de animales totales (6 existentes + 3 nuevas)
- 14 imágenes seleccionadas de las 21 disponibles
- Sin cambios de arquitectura ni de stack

---

## 1. Assets

### Directorio destino
```
public/images/animales/
```

### Mapeo de archivos

| Nombre destino | Archivo origen (contenido/) | Uso en el sitio |
|---|---|---|
| `hero-caballo.jpg` | `varios/...376555196.jpg` | Hero — imagen derecha (aspect-[4/5]) |
| `nosotros-burro-madre.jpg` | `varios/...376568375.jpg` | About — celda tall (aspect-[3/4]) |
| `nosotros-vaca.jpg` | `varios/...359807092.jpg` | About — celda top-right (aspect-[4/3]) |
| `nosotros-ciervos.jpg` | `varios/...368222703.jpg` | About — celda bottom-right (aspect-[4/3]) |
| `animal-valentina.jpg` | `varios/...368212783.jpg` | Tarjeta Valentina (vaca) |
| `animal-copete.jpg` | `varios/...636622053.jpg` | Tarjeta Copete (cerdo) |
| `animal-palomita.jpg` | `varios/...460455612.jpg` | Tarjeta Palomita (gallo/gallina) |
| `animal-cosimo.jpg` | `varios/...477235127.jpg` | Tarjeta Cósimo (cabro) |
| `animal-frida.jpg` | `varios/...477270621.jpg` | Tarjeta Frida (yegua) |
| `animal-bambi.jpg` | `varios/...561154437.jpg` | Tarjeta Bambi (cierva) |
| `animal-burro.jpg` | `varios/...359779738.jpg` | Tarjeta nueva — burro |
| `animal-perro.jpg` | `varios/...460448131.jpg` | Tarjeta nueva — perro |
| `animal-gato.jpg` | `varios/...628272356.jpg` | Tarjeta nueva — gato |
| `voluntariado.jpg` | `Voluntariado.jpg` | Sección Voluntariado — banner |

> Los nombres completos de archivo origen están abreviados. Ver el directorio `contenido/varios/` para los nombres exactos (prefijo `santuarioclafira_post_28_3_2026_10_30_00386280741...`).

---

## 2. Capa de datos (`src/app.service.ts`)

### 2a. Campo `image` en animales existentes

Se agrega `image: string` a cada objeto animal. Valor: ruta pública relativa (ej. `/images/animales/animal-valentina.jpg`).

### 2b. División de `animals.list`

`animals.list` se **elimina** y se reemplaza por dos arrays:
- `animals.featured`: los 6 animales actuales (siempre visibles)
- `animals.extra`: 3 nuevos animales (ocultos por defecto, revelados con "Ver más")

El campo `animals.cta` también se **elimina** y se reemplaza por tres campos: `ctaMore`, `ctaLess`, `ctaSponsor` (ver sección 3c).

### 2c. Tres nuevos animales

| Campo | Burro | Perro | Gato |
|---|---|---|---|
| `name` | Coco | Negra | Mochi |
| `species` ES | Burro | Perra | Gata |
| `species` EN | Donkey | Dog | Cat |
| `image` | `/images/animales/animal-burro.jpg` | `/images/animales/animal-perro.jpg` | `/images/animales/animal-gato.jpg` |
| `story` ES | Llegó recién nacido junto a su madre. Creció en el santuario y hoy es el más cariñoso del lugar. | Llegó al santuario asustada y flaca. Hoy es la guardiana más fiel del refugio. | Apareció un día sin avisar y decidió quedarse. Ahora reina sobre todos los habitantes. |
| `story` EN | He arrived newborn alongside his mother. He grew up at the sanctuary and today he's the most affectionate of all. | She arrived at the sanctuary scared and thin. Today she is the most loyal guardian of the refuge. | She showed up one day unannounced and decided to stay. Now she reigns over all the residents. |

> Los nombres (Coco, Negra, Mochi) son placeholders. Actualizar con los nombres reales si se conocen.

---

## 3. Template (`views/index.hbs`)

### 3a. Sección Hero

Reemplazar el div placeholder (con emoji 🌿) por:
```html
<img
  src="/images/animales/hero-caballo.jpg"
  alt="Frida, yegua rescatada en el Santuario Clafira"
  class="w-full h-full object-cover object-center"
/>
```
El contenedor `rounded-2xl overflow-hidden aspect-[4/5] bg-teal/10` permanece igual; solo se reemplaza el contenido interno.

### 3b. Sección About — grid de fotos

Reemplazar los 3 divs con emojis por `<img>` con `object-cover`:

- **Celda tall** (`row-span-2 aspect-[3/4]`): `nosotros-burro-madre.jpg`, `object-center`
- **Celda top-right** (`aspect-[4/3]`): `nosotros-vaca.jpg`, `object-center`
- **Celda bottom-right** (`aspect-[4/3]`): `nosotros-ciervos.jpg`, `object-top`

Eliminar el `flex items-center justify-center` del contenedor (ya no se necesita para centrar texto).

### 3c. Sección Habitantes — tarjetas + "Ver más"

**Imagen en cada tarjeta:** El div `aspect-[4/3] bg-teal-pale flex items-center justify-center` se reemplaza por:
```html
<div class="aspect-[4/3] overflow-hidden">
  <img
    src="{{this.image}}"
    alt="{{this.name}}, {{this.species}}"
    class="w-full h-full object-cover"
  />
</div>
```

**Grid container** recibe `x-data="{ showAll: false }"`.

**Estructura del grid:**
```
{{#each animals.featured}}  ← 6 tarjetas, siempre visibles
{{/each}}

<div x-show="showAll" class="contents">  ← wrapper transparente al grid
  {{#each animals.extra}}   ← 3 tarjetas, ocultas por defecto
  {{/each}}
</div>
```

**Botón "Ver más / Ver menos"** (reemplaza el CTA actual):
```html
<div class="text-center mt-12 flex flex-col items-center gap-4">
  <button x-show="!showAll" @click="showAll = true"
    class="bg-teal-pale text-teal font-bold py-3 px-8 rounded-full hover:bg-teal/20 transition-colors">
    {{animals.ctaMore}}
  </button>
  <button x-show="showAll" @click="showAll = false"
    class="bg-teal-pale text-teal font-bold py-3 px-8 rounded-full hover:bg-teal/20 transition-colors">
    {{animals.ctaLess}}
  </button>
  <a href="#donar" class="text-sm text-teal underline underline-offset-4 hover:text-teal-dark transition-colors">
    {{animals.ctaSponsor}}
  </a>
</div>
```

Se agregan `ctaMore`, `ctaLess`, `ctaSponsor` al objeto `animals` en el service:
- `ctaMore` ES: `Ver más habitantes ↓` / EN: `See more residents ↓`
- `ctaLess` ES: `Ver menos ↑` / EN: `See less ↑`
- `ctaSponsor` ES: `Apadrina un habitante →` / EN: `Sponsor a resident →`

### 3d. Sección Voluntariado — banner

Reemplazar el div placeholder (con emoji 🤝) por:
```html
<img
  src="/images/animales/voluntariado.jpg"
  alt="Jornada de voluntariado en el Santuario Clafira"
  class="w-full h-full object-cover object-top"
/>
```
El contenedor `rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-[16/7]` permanece igual.

---

## 4. Consideraciones de build

- Las imágenes en `public/images/animales/` son servidas estáticamente por NestJS y copiadas al build estático por Netlify sin cambios adicionales.
- La carpeta `contenido/` permanece como fuente de verdad local; no se sube a git (agregar a `.gitignore` si no está ya).
- Las imágenes de `public/images/animales/` **sí** se suben a git (son assets del sitio).

---

## Archivos modificados

| Archivo | Tipo de cambio |
|---|---|
| `src/app.service.ts` | Datos: campo `image`, split featured/extra, 3 nuevos animales, nuevos CTAs |
| `views/index.hbs` | Template: 4 secciones, `x-data` en grid, wrapper `contents`, botones |
| `public/images/animales/` | Nuevo directorio con 14 imágenes copiadas y renombradas |
| `.gitignore` | Verificar que `contenido/` esté excluido |
