'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import VacioDrawer, { VacioDrawerToggle } from '@/components/LeftNavPanel';

export default function VacioLanding() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTicketSelect = (ticketId: string) => {
    // Handle ticket selection - could proceed to checkout
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
      <section id="overview" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden">
        {/* Subtle background grid accent */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
        
        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          {/* Festival Name - Iconic and Dominant */}
          <div className="space-y-8">
            {/* Top accent line */}
            <div className="flex justify-center">
              <div className="w-24 h-px bg-charcoal/40" />
            </div>

            <h1 className="text-9xl md:text-10xl lg:text-11xl font-display font-bold tracking-tight text-charcoal leading-none" style={{ letterSpacing: '-0.02em' }}>
              VACIO
            </h1>

            {/* Decorative grid accent under title */}
            <div className="flex justify-center gap-1.5 h-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1 h-full bg-charcoal/10 rounded-full" />
              ))}
            </div>

            {/* Horizontal divider with dots */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="w-8 h-px bg-charcoal/40" />
              <div className="w-1 h-1 bg-charcoal/60 rounded-full" />
              <div className="w-1 h-1 bg-charcoal/40 rounded-full" />
              <div className="w-8 h-px bg-charcoal/40" />
            </div>
          </div>

          {/* Tagline - Improved */}
          <p className="text-xl md:text-2xl font-light text-charcoal/80 leading-relaxed max-w-2xl mx-auto tracking-wide">
            Entra en el pulso. Sal de lo ordinario.
          </p>

          {/* Date and Location - Better Hierarchy */}
          <div className="space-y-3 pt-4">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light text-charcoal/70">
              18–19 de octubre, 2026
            </p>
            <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light text-charcoal/60">
              Manta, Ecuador
            </p>
          </div>

          {/* CTA Buttons - More Premium */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
            <button 
              onClick={openDrawer}
              className="group px-8 py-4 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light relative overflow-hidden"
            >
              <span className="relative z-10">Comprar entradas</span>
              <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal transition-all duration-300" />
            </button>
            <a 
              href="#agenda"
              className="group px-8 py-4 border-2 border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5 transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              Ver agenda
            </a>
          </div>
        </div>

        {/* Scroll indicator with animated line */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="text-charcoal/40 text-xs uppercase tracking-[0.2em] animate-pulse">
            Desplaza para más
          </div>
          <div className="w-px h-4 bg-charcoal/30 animate-pulse" />
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Section header with enhanced styling */}
          <div className="mb-20 md:mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-charcoal/40" />
              <h2 className="text-5xl md:text-6xl font-light text-charcoal">
                Agenda
              </h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-charcoal/40 via-charcoal/20 to-transparent" />
          </div>

          {/* Schedule organized by day */}
          <div className="space-y-20">
            {/* Saturday */}
            <div className="relative">
              {/* Day indicator */}
              <div className="inline-block mb-8">
                <div className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/60 mb-2">Día 1</div>
                <h3 className="text-3xl md:text-4xl font-light text-charcoal">
                  Sábado 18 de octubre
                </h3>
              </div>
              <div className="w-12 h-px bg-charcoal/30 mt-4 mb-12" />
              
              <div className="space-y-12">
                {/* Main Stage Saturday */}
                <div className="bg-bone/50 p-8 md:p-10 border-l-4 border-charcoal/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 bg-charcoal rounded-full" />
                    <div className="w-8 h-px bg-charcoal/20" />
                    <h4 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                      Escenario Principal
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {[
                      { time: '18:00', artist: 'LUNAX', isHeadliner: false },
                      { time: '19:30', artist: 'Gabry Ponte', isHeadliner: false },
                      { time: '21:00', artist: 'Maddix', isHeadliner: false },
                      { time: '23:00', artist: 'Hardwell', isHeadliner: true },
                    ].map((set, idx) => (
                      <div key={idx} className={`flex items-baseline gap-4 ${set.isHeadliner ? 'px-4 py-3 bg-charcoal/5 border-l-2 border-charcoal/40' : 'group'}`}>
                        <span className="text-sm font-medium text-charcoal/60 min-w-fit tabular-nums">{set.time}</span>
                        <p className={`${set.isHeadliner ? 'text-lg font-medium text-charcoal' : 'text-lg font-light text-charcoal group-hover:text-charcoal/70'} transition-colors`}>
                          {set.artist}
                          {set.isHeadliner && <span className="text-xs ml-2 uppercase tracking-[0.1em] font-light text-charcoal/50">Headliner</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Techno Arena Saturday */}
                <div className="bg-bone/50 p-8 md:p-10 border-l-4 border-charcoal/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 bg-charcoal rounded-full" />
                    <div className="w-8 h-px bg-charcoal/20" />
                    <h4 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                      Arena Techno
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {[
                      { time: '18:30', artist: 'Kevin D\'Angello', isHeadliner: false },
                      { time: '20:00', artist: 'Sara Landry', isHeadliner: false },
                      { time: '21:30', artist: 'Charlotte de Witte', isHeadliner: false },
                    ].map((set, idx) => (
                      <div key={idx} className="group flex items-baseline gap-4">
                        <span className="text-sm font-medium text-charcoal/60 min-w-fit tabular-nums">{set.time}</span>
                        <p className="text-lg font-light text-charcoal group-hover:text-charcoal/70 transition-colors">
                          {set.artist}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="flex-1 h-px bg-charcoal/10" />
              <div className="w-1.5 h-1.5 bg-charcoal/30 rounded-full" />
              <div className="w-1.5 h-1.5 bg-charcoal/20 rounded-full" />
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Sunday */}
            <div className="relative">
              {/* Day indicator */}
              <div className="inline-block mb-8">
                <div className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/60 mb-2">Día 2</div>
                <h3 className="text-3xl md:text-4xl font-light text-charcoal">
                  Domingo 19 de octubre
                </h3>
              </div>
              <div className="w-12 h-px bg-charcoal/30 mt-4 mb-12" />
              
              <div className="space-y-12">
                {/* Main Stage Sunday */}
                <div className="bg-bone/50 p-8 md:p-10 border-l-4 border-charcoal/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 bg-charcoal rounded-full" />
                    <div className="w-8 h-px bg-charcoal/20" />
                    <h4 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                      Escenario Principal
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {[
                      { time: '18:00', artist: 'Martin Garrix', isHeadliner: false },
                      { time: '21:30', artist: 'Dimitri Vegas & Like Mike', isHeadliner: true },
                    ].map((set, idx) => (
                      <div key={idx} className={`flex items-baseline gap-4 ${set.isHeadliner ? 'px-4 py-3 bg-charcoal/5 border-l-2 border-charcoal/40' : 'group'}`}>
                        <span className="text-sm font-medium text-charcoal/60 min-w-fit tabular-nums">{set.time}</span>
                        <p className={`${set.isHeadliner ? 'text-lg font-medium text-charcoal' : 'text-lg font-light text-charcoal group-hover:text-charcoal/70'} transition-colors`}>
                          {set.artist}
                          {set.isHeadliner && <span className="text-xs ml-2 uppercase tracking-[0.1em] font-light text-charcoal/50">Headliner</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electronic Stage Sunday */}
                <div className="bg-bone/50 p-8 md:p-10 border-l-4 border-charcoal/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 bg-charcoal rounded-full" />
                    <div className="w-8 h-px bg-charcoal/20" />
                    <h4 className="text-xs uppercase tracking-[0.3em] font-light text-charcoal/70">
                      Escenario Electrónico
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {[
                      { time: '17:30', artist: 'LUNAX', isHeadliner: false },
                      { time: '19:00', artist: 'Gabry Ponte', isHeadliner: false },
                      { time: '20:30', artist: 'Adam Beyer', isHeadliner: false },
                    ].map((set, idx) => (
                      <div key={idx} className="group flex items-baseline gap-4">
                        <span className="text-sm font-medium text-charcoal/60 min-w-fit tabular-nums">{set.time}</span>
                        <p className="text-lg font-light text-charcoal group-hover:text-charcoal/70 transition-colors">
                          {set.artist}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Tickets Section */}
      <section id="venue" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-bone">
        <div className="max-w-4xl mx-auto">
          {/* Section header with enhanced styling */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-charcoal/40" />
              <h2 className="text-5xl md:text-6xl font-light text-charcoal">
                Lugar
              </h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-charcoal/40 via-charcoal/20 to-transparent" />
          </div>

          {/* Location info with better layout */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-charcoal font-light leading-relaxed">
                VACIO se realiza en el icónico lugar a orilla del mar en Manta, Ecuador. Dos días de música electrónica ininterrumpida en un espacio premium diseñado para la máxima inmersión.
              </p>
              
              {/* Info cards */}
              <div className="space-y-4 pt-4">
                <div className="border-l-4 border-charcoal/20 pl-4 py-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-light text-charcoal/60 mb-1">Lugar</p>
                  <p className="text-base font-light text-charcoal">Manta Waterfront</p>
                </div>
                <div className="border-l-4 border-charcoal/20 pl-4 py-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-light text-charcoal/60 mb-1">Dirección</p>
                  <p className="text-base font-light text-charcoal">Av. Malecón, Manta, Ecuador</p>
                </div>
                <div className="border-l-4 border-charcoal/20 pl-4 py-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-light text-charcoal/60 mb-1">Capacidad</p>
                  <p className="text-base font-light text-charcoal">5.000 asistentes</p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-charcoal text-bone p-10 md:p-12 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-light text-bone/60 mb-4">¿Listo para entrar?</p>
                <h3 className="text-2xl md:text-3xl font-light mb-6">
                  Asegura tu entrada ahora
                </h3>
                <p className="text-sm font-light text-bone/80 leading-relaxed">
                  Elige tu ticket y sé parte del viaje sonoro más intenso del año.
                </p>
              </div>
              <button 
                onClick={openDrawer}
                className="mt-8 inline-flex items-center gap-3 px-8 py-4 border-2 border-bone text-bone hover:bg-bone hover:text-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light self-start"
              >
                Comprar entradas
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-16 md:py-20 bg-charcoal text-bone border-t-2 border-khaki/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
            {/* Brand section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.3em] font-light text-khaki">Festival</h3>
                <p className="text-lg font-display font-bold text-bone">VACIO</p>
              </div>
              <p className="text-sm font-light text-bone/70 leading-relaxed">
                Un festival de 2 días celebrando la arquitectura sónica del hardtechno y música electrónica.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] font-light text-bone/60">Navegación</h3>
              <ul className="space-y-3 text-sm font-light">
                <li><a href="#overview" className="text-bone/80 hover:text-khaki transition-colors">Inicio</a></li>
                <li><a href="#agenda" className="text-bone/80 hover:text-khaki transition-colors">Agenda</a></li>
                <li><a href="#venue" className="text-bone/80 hover:text-khaki transition-colors">Lugar</a></li>
              </ul>
            </div>

            {/* Tickets */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] font-light text-bone/60">Entradas</h3>
              <ul className="space-y-3 text-sm font-light">
                <li><button onClick={openDrawer} className="text-bone/80 hover:text-khaki transition-colors cursor-pointer">Comprar ahora</button></li>
                <li><a href="#venue" className="text-bone/80 hover:text-khaki transition-colors">Información</a></li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.3em] font-light text-bone/60">Conecta</h3>
              <ul className="space-y-3 text-sm font-light">
                <li><a href="#" className="text-bone/80 hover:text-khaki transition-colors">Instagram</a></li>
                <li><a href="#" className="text-bone/80 hover:text-khaki transition-colors">Twitter</a></li>
                <li><a href="mailto:info@vacio.ec" className="text-bone/80 hover:text-khaki transition-colors">info@vacio.ec</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-bone/10 mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light">
            <p className="text-bone/50">
              © 2026 VACIO Festival. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-bone/50">
              <a href="#" className="hover:text-khaki transition-colors">Privacidad</a>
              <span>·</span>
              <a href="#" className="hover:text-khaki transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
