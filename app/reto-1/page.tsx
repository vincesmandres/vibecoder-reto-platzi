'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Reto1() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-charcoal bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-charcoal hover:translate-x-[-2px] transition-transform duration-200 font-mono text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          
          <div className="text-center">
            <div className="inline-block px-3 py-1 text-xs font-mono bg-khaki text-charcoal" 
                 style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}>
              RETO 01
            </div>
          </div>

          <div className="w-16"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border-2 border-charcoal bg-background p-6" 
                   style={{ boxShadow: '4px 4px 0 0 hsl(var(--charcoal))' }}>
                <h2 className="text-sm font-mono font-bold text-charcoal mb-4 uppercase">Info</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">ESTADO</p>
                    <span className="inline-block px-2 py-1 text-xs font-mono bg-khaki text-charcoal">
                      En progreso
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">DIFICULTAD</p>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 border-2 border-charcoal bg-charcoal"></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-2">STACK</p>
                    <div className="space-y-1">
                      {['Next.js', 'React', 'Tailwind CSS', 'Anime.js'].map((tech) => (
                        <div key={tech} className="text-xs px-2 py-1 border border-charcoal text-charcoal">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                  Landing Page Festival
                </h1>
                <p className="text-lg text-muted-foreground">
                  Diseño y desarrollo de una landing page interactiva para un festival de música con animaciones fluidas y experiencia minimalista estilo Lego.
                </p>
              </div>

              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Descripción</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p>
                    En este reto, construiremos una landing page profesional para un festival de música. El objetivo es combinar diseño minimalista con animaciones sofisticadas usando Anime.js.
                  </p>
                  <p>
                    La página debe incluir secciones de hero, lineup de artistas, agenda, ubicación, tickets y footer con una paleta de colores cálida (blanco hueso, khaki, charcoal).
                  </p>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Requerimientos</h2>
                <ul className="space-y-3">
                  {[
                    'Diseño responsivo (mobile, tablet, desktop)',
                    'Animaciones suaves con Anime.js',
                    'Paleta de colores minimalista (blanco, khaki, charcoal)',
                    'Secciones: Hero, Lineup, Agenda, Ubicación, Tickets, Footer',
                    'Interactividad en elementos (hover effects, scroll animations)',
                    'Optimización de performance (Next.js SSG)',
                  ].map((req, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-5 h-5 border-2 border-charcoal flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Resources */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Recursos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: 'Anime.js Docs', href: 'https://animejs.com' },
                    { label: 'Next.js Guide', href: 'https://nextjs.org' },
                    { label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
                    { label: 'Design System', href: '#' },
                  ].map((res) => (
                    <a
                      key={res.label}
                      href={res.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border-2 border-charcoal text-charcoal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-200 text-sm font-mono"
                      style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}
                    >
                      {res.label} →
                    </a>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="mt-12 p-6 border-2 border-charcoal bg-khaki text-charcoal"
                   style={{ boxShadow: '4px 4px 0 0 hsl(var(--charcoal))' }}>
                <p className="text-sm mb-4 font-mono">¿Listo para empezar?</p>
                <button className="w-full px-6 py-3 bg-charcoal text-background font-bold hover:translate-y-[-2px] transition-transform duration-200"
                        style={{ boxShadow: '2px 2px 0 0 hsl(var(--khaki))' }}>
                  Ver Proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
