# RESONANCIA - Landing Page del Festival

Landing page premium y minimalista para el festival de música, arte y tecnología **RESONANCIA**.

## Características

✨ **Diseño Editorial Premium**
- Paleta de colores limitada: Negro, Blanco, Gris y Cyan
- Tipografía moderna: Space Grotesk + Inter
- Spacing generoso y jerarquía visual clara
- Sin gradientes ni decoraciones excesivas

📱 **Responsive y Mobile-First**
- Experiencia fluida en todos los dispositivos
- Hamburger menu en mobile
- Grid adaptativo para lineup
- Agenda con tabs en mobile

🎨 **Componentes**
- **Header**: Navegación sticky con smooth scroll
- **Hero**: Animación de ondas sutiles, CTA principal
- **Lineup**: Grid de artistas con 14 nombres internacionales
- **Agenda**: Timeline de 3 días (tabs en mobile, grid en desktop)
- **Location**: Info del venue con mapa placeholder
- **Tickets**: Tabla de precios (tabla en desktop, cards en mobile)
- **Footer**: Links, redes y legal

⚡ **Tecnología**
- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS
- Datos mockeados (sin backend)
- Estático y SSG-ready

## Estructura

```
reto-1/
├── app/
│   ├── layout.tsx          # Root layout con fuentes
│   ├── page.tsx            # Home page principal
│   └── globals.css         # Estilos globales y animaciones
├── components/
│   ├── Header.tsx          # Navegación sticky
│   ├── Hero.tsx            # Sección hero con ondas
│   ├── Lineup.tsx          # Grid de artistas
│   ├── Agenda.tsx          # Timeline de eventos
│   ├── Location.tsx        # Información de ubicación
│   ├── Tickets.tsx         # Tabla/cards de entradas
│   └── Footer.tsx          # Footer con redes
├── lib/
│   └── data.ts             # Datos mockeados (artistas, agenda, tickets)
├── package.json
├── tailwind.config.ts      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
├── next.config.ts          # Configuración de Next.js
└── postcss.config.mjs      # Configuración de PostCSS
```

## Instalación y Ejecución Local

### Requisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos

```bash
# 1. Ir a la carpeta del proyecto
cd reto-1

# 2. Instalar dependencias
npm install
# o: yarn install / pnpm install / bun install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

### Compilar para producción

```bash
npm run build
npm start
```

## Por qué esta implementación es estable para Vercel

1. **Next.js Static Generation (SSG)**
   - No tiene dependencias de backend
   - No usa API routes dinámicas
   - Los datos son mockeados en `lib/data.ts`
   - Se pre-renderiza completamente en build time

2. **Cero Dependencias Complejas**
   - Solo usa React, Next.js, TypeScript y Tailwind
   - Sin librerías pesadas (maps, carruseles, etc.)
   - Sin scripts externos obligatorios

3. **Vercel-First Architecture**
   - Usa App Router (recomendado por Vercel)
   - TypeScript con strict mode
   - No requiere variables de entorno
   - Optimizado para Turbopack (default en Next.js 16)

4. **Performance**
   - CSS Modules y Tailwind (tree-shaking automático)
   - Imágenes optimizadas (SVG inline)
   - Font optimization con next/font
   - Minimal JavaScript

5. **Despliegue en Vercel**
   ```bash
   # Simplemente conectar el repo a Vercel
   # Detectará automáticamente Next.js
   # No requiere secrets ni configuración adicional
   # Deploy con cada push a main/create-folder
   ```

6. **Escalabilidad**
   - Estructura modular (fácil agregar secciones)
   - Datos separados (`lib/data.ts`)
   - Componentes reutilizables
   - Listo para conectar a CMS o API en el futuro

## Customización

### Cambiar Datos
Edita `/lib/data.ts`:
```typescript
export const artists = [
  { name: 'Tu Artista', country: 'País', genre: 'Género' },
  // ...
];
```

### Cambiar Colores
Edita `tailwind.config.ts`:
```typescript
colors: {
  accent: '#tu-color', // Reemplaza cyan
  // ...
}
```

### Cambiar Tipografía
Edita `app/layout.tsx` para importar diferentes fuentes de Google Fonts.

## Notas

- El mapa en Location es un placeholder (puedes integrar Leaflet o Mapbox después)
- Los botones "Comprar" pueden enlazar a un checkout externo
- Los links de redes sociales pueden apuntar a URLs reales
- Toda la sección es responsive y funciona sin JavaScript (excepto hamburger menu)

---

**Festival RESONANCIA 2024** 🎵
