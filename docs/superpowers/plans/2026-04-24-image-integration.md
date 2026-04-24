# Image Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar todos los placeholders con emoji del sitio con fotos reales del santuario, y agregar 3 nuevas tarjetas de animales (burro, perro, gato) con un botón "Ver más" que las revela.

**Architecture:** Las imágenes se copian de `contenido/` a `public/images/animales/` con nombres semánticos. Los datos en `app.service.ts` se reestructuran (split `animals.list` → `animals.featured` + `animals.extra`). El template usa Alpine.js `x-show` con un wrapper `display:contents` para revelar las tarjetas extra sin romper el grid CSS.

**Tech Stack:** NestJS 10, Handlebars (.hbs), Tailwind CSS 3, Alpine.js 3, Node.js

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `public/images/animales/` (nuevo dir) | 14 imágenes copiadas y renombradas |
| `.gitignore` | Agregar `contenido/` |
| `src/app.service.ts` | Campo `image` en animales, split featured/extra, 3 nuevos animales, nuevos CTAs |
| `views/index.hbs` | Hero, About grid, Animals section, Voluntariado |

---

## Task 1: Copiar y renombrar imágenes

**Files:**
- Create: `public/images/animales/` (14 archivos)
- Modify: `.gitignore`

- [ ] **Step 1: Crear directorio y copiar las 14 imágenes con nombres semánticos**

```bash
mkdir -p public/images/animales

# Hero
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413376555196.jpg" public/images/animales/hero-caballo.jpg

# About grid
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413376568375.jpg" public/images/animales/nosotros-burro-madre.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413359807092.jpg" public/images/animales/nosotros-vaca.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413368222703.jpg" public/images/animales/nosotros-ciervos.jpg

# Animal cards (6 existentes)
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413368212783.jpg" public/images/animales/animal-valentina.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413636622053.jpg" public/images/animales/animal-copete.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413460455612.jpg" public/images/animales/animal-palomita.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413477235127.jpg" public/images/animales/animal-cosimo.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413477270621.jpg" public/images/animales/animal-frida.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413561154437.jpg" public/images/animales/animal-bambi.jpg

# Animal cards (3 nuevas)
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413359779738.jpg" public/images/animales/animal-burro.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413460448131.jpg" public/images/animales/animal-perro.jpg
cp "contenido/varios/santuarioclafira_post_28_3_2026_10_30_003862807413628272356.jpg" public/images/animales/animal-gato.jpg

# Voluntariado
cp "contenido/Voluntariado.jpg" public/images/animales/voluntariado.jpg
```

- [ ] **Step 2: Verificar que los 14 archivos existen**

```bash
ls public/images/animales/
```

Resultado esperado: 14 archivos `.jpg` listados.

- [ ] **Step 3: Agregar `contenido/` al `.gitignore`**

Abrir `.gitignore` y agregar al final:

```
contenido/
```

- [ ] **Step 4: Commit**

```bash
git add public/images/animales/
git add .gitignore
git commit -m "feat: add real sanctuary photos to public/images/animales"
```

---

## Task 2: Actualizar capa de datos (`app.service.ts`)

**Files:**
- Modify: `src/app.service.ts`

- [ ] **Step 1: Reemplazar el bloque `animals` completo en `app.service.ts`**

Localizar el bloque que empieza en `animals: {` (línea ~71) y reemplazar todo ese objeto hasta su `},` de cierre con:

```typescript
      animals: {
        sectionLabel: isEs ? 'Los habitantes' : 'Our residents',
        title: isEs
          ? 'Conoce a algunos de nuestros habitantes'
          : 'Meet some of our residents',
        sub: isEs
          ? 'Cada uno tiene nombre, historia y una personalidad única. Son la razón de cada día.'
          : 'Each one has a name, a story and a unique personality. They are the reason for every day.',
        ctaMore: isEs ? 'Ver más habitantes ↓' : 'See more residents ↓',
        ctaLess: isEs ? 'Ver menos ↑' : 'See less ↑',
        ctaSponsor: isEs ? 'Apadrina un habitante →' : 'Sponsor a resident →',
        featured: [
          {
            id: 1,
            name: 'Valentina',
            species: isEs ? 'Vaca' : 'Cow',
            image: '/images/animales/animal-valentina.jpg',
            story: isEs
              ? 'Valentina llegó al santuario después de escapar de un matadero. Hoy, sus mejores amigos son los humanos que la cuidan cada día.'
              : 'Valentina arrived at the sanctuary after escaping a slaughterhouse. Today, her best friends are the humans who care for her every day.',
          },
          {
            id: 2,
            name: 'Copete',
            species: isEs ? 'Cerdo' : 'Pig',
            image: '/images/animales/animal-copete.jpg',
            story: isEs
              ? 'Copete fue rescatado de una granja industrial. Ahora pasa sus días jugando en el barro y tomando siestas al sol.'
              : 'Copete was rescued from an industrial farm. He now spends his days playing in the mud and napping in the sun.',
          },
          {
            id: 3,
            name: 'Palomita',
            species: isEs ? 'Gallina' : 'Chicken',
            image: '/images/animales/animal-palomita.jpg',
            story: isEs
              ? 'Palomita nunca había pisado tierra hasta que llegó a Clafira. Hoy explora el patio con curiosidad infinita.'
              : 'Palomita had never touched ground until she arrived at Clafira. Today she explores the yard with infinite curiosity.',
          },
          {
            id: 4,
            name: 'Cósimo',
            species: isEs ? 'Cabro' : 'Goat',
            image: '/images/animales/animal-cosimo.jpg',
            story: isEs
              ? 'Cósimo es el más travieso del santuario. Escapa de cualquier corral y siempre encuentra la manera de meterse en problemas.'
              : 'Cósimo is the most mischievous in the sanctuary. He escapes any pen and always finds a way to get into trouble.',
          },
          {
            id: 5,
            name: 'Frida',
            species: isEs ? 'Yegua' : 'Mare',
            image: '/images/animales/animal-frida.jpg',
            story: isEs
              ? 'Frida llegó desnutrida y asustada. Hoy galopa libre por los potreros y tiene más energía que nadie.'
              : 'Frida arrived malnourished and scared. Today she gallops freely through the paddocks and has more energy than anyone.',
          },
          {
            id: 6,
            name: 'Bambi',
            species: isEs ? 'Cierva' : 'Deer',
            image: '/images/animales/animal-bambi.jpg',
            story: isEs
              ? 'Bambi fue encontrada herida en el campo. Su recuperación fue un milagro y hoy es el alma del santuario.'
              : 'Bambi was found injured in the field. Her recovery was a miracle and today she is the soul of the sanctuary.',
          },
        ],
        extra: [
          {
            id: 7,
            name: 'Coco',
            species: isEs ? 'Burro' : 'Donkey',
            image: '/images/animales/animal-burro.jpg',
            story: isEs
              ? 'Coco llegó recién nacido junto a su madre. Creció en el santuario y hoy es el más cariñoso del lugar.'
              : 'Coco arrived newborn alongside his mother. He grew up at the sanctuary and today he is the most affectionate of all.',
          },
          {
            id: 8,
            name: 'Negra',
            species: isEs ? 'Perra' : 'Dog',
            image: '/images/animales/animal-perro.jpg',
            story: isEs
              ? 'Negra llegó al santuario asustada y flaca. Hoy es la guardiana más fiel del refugio.'
              : 'Negra arrived at the sanctuary scared and thin. Today she is the most loyal guardian of the refuge.',
          },
          {
            id: 9,
            name: 'Mochi',
            species: isEs ? 'Gata' : 'Cat',
            image: '/images/animales/animal-gato.jpg',
            story: isEs
              ? 'Mochi apareció un día sin avisar y decidió quedarse. Ahora reina sobre todos los habitantes.'
              : 'Mochi showed up one day unannounced and decided to stay. Now she reigns over all the residents.',
          },
        ],
      },
```

> **Nota:** Se eliminan `animals.list` y `animals.cta`. Se reemplazan por `animals.featured`, `animals.extra`, `animals.ctaMore`, `animals.ctaLess`, `animals.ctaSponsor`.

- [ ] **Step 2: Commit**

```bash
git add src/app.service.ts
git commit -m "feat: restructure animals data — add images, split featured/extra, add burro/perro/gato"
```

---

## Task 3: Template — Sección Hero

**Files:**
- Modify: `views/index.hbs` (líneas ~128–135)

- [ ] **Step 1: Reemplazar el placeholder del hero**

Localizar este bloque en `views/index.hbs`:

```html
        <div class="rounded-2xl overflow-hidden aspect-[4/5] bg-teal/10 flex items-center justify-center">
          <div class="text-center p-8">
            <div class="text-8xl mb-4">🌿</div>
            <p class="text-[#4a7a72] font-semibold">Foto principal del santuario</p>
            <p class="text-sm text-[#7aaba4] mt-1">Próximamente</p>
          </div>
        </div>
```

Reemplazar con:

```html
        <div class="rounded-2xl overflow-hidden aspect-[4/5]">
          <img
            src="/images/animales/hero-caballo.jpg"
            alt="Yegua rescatada en el Santuario Clafira"
            class="w-full h-full object-cover"
          />
        </div>
```

- [ ] **Step 2: Verificar en el servidor de desarrollo**

```bash
npm run start:dev
```

Abrir http://localhost:3000 — la sección hero debe mostrar la foto de la yegua alazana en el lado derecho.

- [ ] **Step 3: Commit**

```bash
git add views/index.hbs
git commit -m "feat: replace hero placeholder with real horse photo"
```

---

## Task 4: Template — Sección About (grid de fotos)

**Files:**
- Modify: `views/index.hbs` (líneas ~150–168)

- [ ] **Step 1: Reemplazar los 3 placeholders del grid de fotos**

Localizar este bloque completo en `views/index.hbs`:

```html
      <!-- Photo grid -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-2xl overflow-hidden row-span-2 aspect-[3/4] bg-teal-pale flex items-center justify-center">
          <div class="text-center p-4">
            <div class="text-6xl mb-2">👥</div>
            <p class="text-xs text-[#3d6b64]">Equipo / fundadores</p>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-[#d0eeea] flex items-center justify-center">
          <div class="text-center p-4">
            <div class="text-5xl mb-1">🐾</div>
            <p class="text-xs text-[#3d6b64]">Animales en libertad</p>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-teal-pale flex items-center justify-center">
          <div class="text-center p-4">
            <div class="text-5xl mb-1">🌿</div>
            <p class="text-xs text-[#3d6b64]">Vida en el santuario</p>
          </div>
        </div>
      </div>
```

Reemplazar con:

```html
      <!-- Photo grid -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-2xl overflow-hidden row-span-2 aspect-[3/4]">
          <img
            src="/images/animales/nosotros-burro-madre.jpg"
            alt="Burro bebé con su madre en el Santuario Clafira"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div class="rounded-2xl overflow-hidden aspect-[4/3]">
          <img
            src="/images/animales/nosotros-vaca.jpg"
            alt="Vaca rescatada en el Santuario Clafira"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div class="rounded-2xl overflow-hidden aspect-[4/3]">
          <img
            src="/images/animales/nosotros-ciervos.jpg"
            alt="Ciervos alimentándose en el Santuario Clafira"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>
```

- [ ] **Step 2: Verificar en el servidor de desarrollo**

Con `npm run start:dev` corriendo, abrir http://localhost:3000/#nosotros — el grid de fotos debe mostrar: burro+madre (celda alta izquierda), vaca (celda top-right), ciervos (celda bottom-right).

- [ ] **Step 3: Commit**

```bash
git add views/index.hbs
git commit -m "feat: replace about section photo placeholders with real images"
```

---

## Task 5: Template — Sección Habitantes (tarjetas + "Ver más")

**Files:**
- Modify: `views/index.hbs` (líneas ~204–243)

- [ ] **Step 1: Reemplazar el bloque completo de tarjetas y CTA**

Localizar este bloque en `views/index.hbs` (desde `<!-- Animal cards -->` hasta `<!-- Bottom CTA -->` y su cierre):

```html
      <!-- Animal cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {{#each animals.list}}
        <div
          x-data="{ open: false }"
          @click="open = !open"
          :class="open ? 'ring-2 ring-teal shadow-[0_8px_40px_rgba(61,158,142,0.2)]' : 'shadow-md hover:-translate-y-1'"
          class="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
        >
          <!-- Animal placeholder image -->
          <div class="aspect-[4/3] bg-teal-pale flex items-center justify-center">
            <div class="text-center">
              <div class="text-7xl">{{this.emoji}}</div>
              <p class="text-xs text-[#7aaba4] mt-2 font-medium">{{this.name}}</p>
            </div>
          </div>
          <!-- Card content -->
          <div class="p-5">
            <div class="flex items-baseline gap-2 mb-2">
              <span class="font-serif font-bold text-xl text-[#142b28]">{{this.name}}</span>
              <span class="text-sm text-teal font-semibold">{{this.species}}</span>
            </div>
            <div x-show="open" x-transition class="text-sm text-[#3d6b64] leading-relaxed border-t border-teal-pale pt-3 mt-2">
              {{this.story}}
            </div>
            <div x-show="!open" class="text-sm text-teal mt-1">
              {{#if ../isEs}}Ver historia →{{else}}See story →{{/if}}
            </div>
          </div>
        </div>
        {{/each}}
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12">
        <a href="#donar" class="bg-teal-pale text-teal font-bold py-3 px-8 rounded-full hover:bg-teal/20 transition-colors inline-block">
          {{animals.cta}}
        </a>
      </div>
```

Reemplazar con:

```html
      <!-- Animal cards + ver más -->
      <div x-data="{ showAll: false }">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {{#each animals.featured}}
          <div
            x-data="{ open: false }"
            @click="open = !open"
            :class="open ? 'ring-2 ring-teal shadow-[0_8px_40px_rgba(61,158,142,0.2)]' : 'shadow-md hover:-translate-y-1'"
            class="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="{{this.image}}"
                alt="{{this.name}}, {{this.species}}"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-5">
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-serif font-bold text-xl text-[#142b28]">{{this.name}}</span>
                <span class="text-sm text-teal font-semibold">{{this.species}}</span>
              </div>
              <div x-show="open" x-transition class="text-sm text-[#3d6b64] leading-relaxed border-t border-teal-pale pt-3 mt-2">
                {{this.story}}
              </div>
              <div x-show="!open" class="text-sm text-teal mt-1">
                {{#if ../isEs}}Ver historia →{{else}}See story →{{/if}}
              </div>
            </div>
          </div>
          {{/each}}

          <div x-show="showAll" class="contents" style="display:none">
            {{#each animals.extra}}
            <div
              x-data="{ open: false }"
              @click="open = !open"
              :class="open ? 'ring-2 ring-teal shadow-[0_8px_40px_rgba(61,158,142,0.2)]' : 'shadow-md hover:-translate-y-1'"
              class="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  src="{{this.image}}"
                  alt="{{this.name}}, {{this.species}}"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-5">
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="font-serif font-bold text-xl text-[#142b28]">{{this.name}}</span>
                  <span class="text-sm text-teal font-semibold">{{this.species}}</span>
                </div>
                <div x-show="open" x-transition class="text-sm text-[#3d6b64] leading-relaxed border-t border-teal-pale pt-3 mt-2">
                  {{this.story}}
                </div>
                <div x-show="!open" class="text-sm text-teal mt-1">
                  {{#if ../isEs}}Ver historia →{{else}}See story →{{/if}}
                </div>
              </div>
            </div>
            {{/each}}
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center mt-12 flex flex-col items-center gap-4">
          <button
            x-show="!showAll"
            @click="showAll = true"
            class="bg-teal-pale text-teal font-bold py-3 px-8 rounded-full hover:bg-teal/20 transition-colors"
          >
            {{animals.ctaMore}}
          </button>
          <button
            x-show="showAll"
            @click="showAll = false"
            class="bg-teal-pale text-teal font-bold py-3 px-8 rounded-full hover:bg-teal/20 transition-colors"
          >
            {{animals.ctaLess}}
          </button>
          <a href="#donar" class="text-sm text-teal underline underline-offset-4 hover:text-teal-dark transition-colors">
            {{animals.ctaSponsor}}
          </a>
        </div>
      </div>
```

> **Por qué `style="display:none"` en el wrapper:** Evita un flash visual de las 3 tarjetas extra antes de que Alpine.js se inicialice. Alpine sobreescribe este valor al montarse.

- [ ] **Step 2: Verificar comportamiento en el navegador**

Con `npm run start:dev` corriendo, abrir http://localhost:3000/#animales y verificar:
1. Se ven 6 tarjetas con fotos reales (sin emojis)
2. El botón "Ver más habitantes ↓" está visible
3. Click en el botón → aparecen las 3 tarjetas nuevas (Coco, Negra, Mochi) y el botón cambia a "Ver menos ↑"
4. Click en "Ver menos ↑" → las 3 tarjetas se ocultan
5. Click en cualquier tarjeta → se expande la historia del animal

- [ ] **Step 3: Verificar versión inglés**

Abrir http://localhost:3000/?lang=en#animales y verificar:
1. Botón dice "See more residents ↓" / "See less ↑"
2. Los species y stories están en inglés

- [ ] **Step 4: Commit**

```bash
git add views/index.hbs
git commit -m "feat: add real photos to animal cards, add show-more toggle for 3 new animals"
```

---

## Task 6: Template — Sección Voluntariado

**Files:**
- Modify: `views/index.hbs` (líneas ~369–376)

- [ ] **Step 1: Reemplazar el placeholder del banner de voluntariado**

Localizar este bloque en `views/index.hbs`:

```html
      <!-- Volunteer photo placeholder -->
      <div class="rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-[16/7] bg-white/[0.06] flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-2">🤝</div>
          <p class="text-white/40 text-sm">Foto jornada de voluntariado</p>
        </div>
      </div>
```

Reemplazar con:

```html
      <!-- Volunteer photo -->
      <div class="rounded-2xl overflow-hidden max-w-2xl mx-auto aspect-[16/7]">
        <img
          src="/images/animales/voluntariado.jpg"
          alt="Jornada de voluntariado en el Santuario Clafira"
          class="w-full h-full object-cover object-top"
        />
      </div>
```

- [ ] **Step 2: Verificar en el navegador**

Con `npm run start:dev` corriendo, abrir http://localhost:3000/#voluntariado — el banner debe mostrar la foto grupal de voluntarios sonriendo con herramientas.

- [ ] **Step 3: Commit**

```bash
git add views/index.hbs
git commit -m "feat: replace volunteer section placeholder with real group photo"
```

---

## Task 7: Build estático final y verificación

**Files:**
- Run: `npm run build:static`

- [ ] **Step 1: Ejecutar el build estático completo**

```bash
npm run build:static
```

Resultado esperado: sin errores. Se genera `dist-static/index.html` (ES) y `dist-static/en/index.html` (EN).

- [ ] **Step 2: Verificar que las imágenes están referenciadas correctamente en el HTML generado**

```bash
grep -c "animales/" dist-static/index.html
```

Resultado esperado: número ≥ 14 (una referencia por cada imagen usada en el template).

- [ ] **Step 3: Verificar que `contenido/` no aparece en git status**

```bash
git status
```

Resultado esperado: `contenido/` no aparece como untracked. Solo deben aparecer los archivos modificados del proyecto.

- [ ] **Step 4: Commit final si hay cambios pendientes**

```bash
git status
# Si hay algo sin commitear:
git add -A
git commit -m "chore: final verification — all images integrated"
```
