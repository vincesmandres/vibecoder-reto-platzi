'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import VacioDrawer, { VacioDrawerToggle } from '@/components/LeftNavPanel';

export default function VacioLanding() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    // Optional: show confirmation or proceed to checkout
    console.log('Selected ticket:', ticketId);
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <main className="w-full bg-bone text-charcoal">
      {/* Back navigation */}
      <Link 
        href="/"
        className="fixed top-6 right-6 z-20 text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal transition-colors"
      >
        ← Inicio
      </Link>

      {/* Unified Drawer */}
      <VacioDrawer 
        isOpen={drawerOpen} 
        onClose={closeDrawer}
        onTicketSelect={handleTicketSelect}
      />
      <VacioDrawerToggle onClick={openDrawer} />

      {/* Hero Section */}
      <section id="overview" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Festival Name - Enhanced Typography with Electronic Edge */}
          <div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-charcoal mb-6 leading-none" style={{ letterSpacing: '-0.03em' }}>
              VACIO
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-charcoal/40" />
              <div className="w-1 h-1 bg-charcoal/40 rounded-full" />
              <div className="w-12 h-px bg-charcoal/40" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-light text-charcoal/70 leading-relaxed max-w-md mx-auto">
            Entra en el pulso. Sale de lo ordinario.
          </p>

          {/* Date and Location */}
          <div className="space-y-2 text-sm text-charcoal/60 uppercase tracking-[0.15em] font-light">
            <p>18–19 de Octubre, 2026</p>
            <p>Manta, Ecuador</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={openDrawer}
              className="px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              Comprar entradas
            </button>
            <a 
              href="#lineup"
              className="px-8 py-3 border-2 border-charcoal/30 text-charcoal hover:border-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light text-center"
            >
              Ver artistas
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 text-charcoal/40 text-xs uppercase tracking-[0.2em] animate-pulse">
          Desplaza para más
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Section header with geometric accent */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-charcoal/40" />
              <h2 className="text-4xl md:text-5xl font-light text-charcoal">
                Artistas
              </h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-charcoal/30 to-transparent" />
          </div>

          {/* Lineup organized by stage */}
          <div className="space-y-12">
            {/* Main Stage */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-charcoal rounded-full" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                  Escenario Principal
                </h3>
              </div>
              <div className="space-y-4 pl-4 border-l-2 border-charcoal/10">
                {['Hardwell', 'Maddix', 'Martin Garrix', 'Dimitri Vegas & Like Mike'].map((artist, idx) => (
                  <div key={idx} className="group">
                    <p className="text-lg font-medium text-charcoal group-hover:text-charcoal/70 transition-colors">
                      {artist}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider with geometric accent */}
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex-1 h-px bg-charcoal/10" />
              <div className="w-1 h-1 bg-charcoal/30 rounded-full" />
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Techno Arena */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-charcoal rounded-full" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                  Arena Techno
                </h3>
              </div>
              <div className="space-y-4 pl-4 border-l-2 border-charcoal/10">
                {['Sara Landry', 'Kevin D\'Angello', 'Charlotte de Witte'].map((artist, idx) => (
                  <div key={idx} className="group">
                    <p className="text-lg font-light text-charcoal group-hover:text-charcoal/70 transition-colors">
                      {artist}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider with geometric accent */}
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex-1 h-px bg-charcoal/10" />
              <div className="w-1 h-1 bg-charcoal/30 rounded-full" />
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Electronic Stage */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-charcoal rounded-full" />
                <h3 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                  Escenario Electrónico
                </h3>
              </div>
              <div className="space-y-4 pl-4 border-l-2 border-charcoal/10">
                {['Gabry Ponte', 'LUNAX', 'Adam Beyer'].map((artist, idx) => (
                  <div key={idx} className="group">
                    <p className="text-lg font-light text-charcoal group-hover:text-charcoal/70 transition-colors">
                      {artist}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Tickets Section */}
      <section id="venue" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-bone">
        <div className="max-w-4xl mx-auto">
          {/* Section header with geometric accent */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-charcoal/40" />
              <h2 className="text-4xl md:text-5xl font-light text-charcoal">
                Lugar
              </h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-charcoal/30 to-transparent" />
          </div>

          {/* Location info */}
          <div className="space-y-8">
            <div className="space-y-4 max-w-2xl">
              <p className="text-lg text-charcoal font-light leading-relaxed">
                VACIO se realiza en el icónico lugar a orilla del mar en Manta, Ecuador. Dos días de música electrónica ininterrumpida en un espacio premium diseñado para la máxima inmersión.
              </p>
              <div className="text-sm text-charcoal/60 space-y-2 font-light">
                <p><span className="font-medium text-charcoal">Lugar</span> — Manta Waterfront</p>
                <p><span className="font-medium text-charcoal">Dirección</span> — Av. Malecón, Manta, Ecuador</p>
                <p><span className="font-medium text-charcoal">Capacidad</span> — 5.000 asistentes</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button 
                onClick={openDrawer}
                className="inline-flex items-center gap-3 px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
              >
                Comprar entradas
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-12 bg-charcoal text-bone">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Acerca de</h3>
              <p className="text-sm font-light leading-relaxed">
                VACIO es un festival de 2 días de hardtechno y música electrónica celebrando arquitectura sónica.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Información</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#lineup" className="hover:text-khaki transition-colors">Artistas</a></li>
                <li><a onClick={openDrawer} className="hover:text-khaki transition-colors cursor-pointer">Entradas</a></li>
                <li><a href="#venue" className="hover:text-khaki transition-colors">Lugar</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Síguenos</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-khaki transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-khaki transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-khaki transition-colors">Spotify</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Contacto</h3>
              <p className="text-sm font-light">
                <a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors">info@vacio.ec</a>
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-bone/20 pt-8">
            <p className="text-xs text-bone/40 font-light">
              © 2026 VACIO. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
