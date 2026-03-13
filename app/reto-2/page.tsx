'use client';

import { useRouter } from 'next/navigation';

export default function Reto2() {
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
              RETO 02
            </div>
          </div>

          <div className="w-16"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-mono bg-muted text-muted-foreground"
               style={{ boxShadow: '2px 2px 0 0 hsl(var(--border))' }}>
            PROXIMAMENTE
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Reto 2
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Este reto está en construcción. Pronto estarán disponibles los detalles y requerimientos.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-charcoal text-background font-bold hover:translate-y-[-2px] transition-transform duration-200"
            style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}
          >
            Volver al inicio
          </button>
        </div>
      </main>
    </div>
  );
}
