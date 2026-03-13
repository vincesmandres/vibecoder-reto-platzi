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
        ← Volver
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
          {/* Festival Name - Enhanced Typography */}
          <div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-charcoal mb-6 leading-none" style={{ letterSpacing: '-0.02em' }}>
              VACIO
            </h1>
            <div className="w-16 h-1 bg-charcoal mx-auto mb-6" />
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-light text-charcoal/70 leading-relaxed max-w-md mx-auto">
            Enter the pulse. Exit the ordinary.
          </p>

          {/* Date and Location */}
          <div className="space-y-2 text-sm text-charcoal/60 uppercase tracking-[0.15em] font-light">
            <p>October 18–19, 2026</p>
            <p>Manta, Ecuador</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={openDrawer}
              className="px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              Get Tickets
            </button>
            <a 
              href="#lineup"
              className="px-8 py-3 border-2 border-charcoal/30 text-charcoal hover:border-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light text-center"
            >
              View Lineup
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 text-charcoal/40 text-xs uppercase tracking-[0.2em] animate-pulse">
          Scroll for more
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-4">
              Lineup
            </h2>
            <div className="w-12 h-1 bg-charcoal/30" />
          </div>

          {/* Artists grid - More curated festival feel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {[
              { name: 'Hardwell', venue: 'Main Stage', tier: 'headliner' },
              { name: 'Maddix', venue: 'Main Stage', tier: 'headliner' },
              { name: 'Gabry Ponte', venue: 'Techno Arena', tier: 'featured' },
              { name: 'Martin Garrix', venue: 'Main Stage', tier: 'headliner' },
              { name: 'Sara Landry', venue: 'Techno Arena', tier: 'featured' },
              { name: 'LUNAX', venue: 'Electronic Stage', tier: 'featured' },
              { name: 'Dimitri Vegas & Like Mike', venue: 'Main Stage', tier: 'headliner' },
              { name: 'Kevin D\'Angello', venue: 'Techno Arena', tier: 'featured' },
            ].map((artist, idx) => (
              <div key={idx} className="group space-y-3 pb-4 border-b border-charcoal/10 hover:border-charcoal/30 transition-colors">
                <p className={`text-lg ${artist.tier === 'headliner' ? 'font-medium' : 'font-light'} text-charcoal group-hover:text-charcoal/80 transition-colors`}>
                  {artist.name}
                </p>
                <p className="text-sm text-charcoal/50">
                  {artist.venue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Tickets Section */}
      <section id="venue" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-bone">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-4">
              Location
            </h2>
            <div className="w-12 h-1 bg-charcoal/30" />
          </div>

          {/* Location info */}
          <div className="space-y-8">
            <div className="space-y-4 max-w-2xl">
              <p className="text-lg text-charcoal font-light leading-relaxed">
                VACIO takes place at the iconic waterfront venue in Manta, Ecuador. Two days of uninterrupted electronic music in a premium setting designed for maximum immersion.
              </p>
              <div className="text-sm text-charcoal/60 space-y-2 font-light">
                <p><span className="font-medium text-charcoal">Venue</span> — Manta Waterfront</p>
                <p><span className="font-medium text-charcoal">Address</span> — Av. Malecón, Manta, Ecuador</p>
                <p><span className="font-medium text-charcoal">Capacity</span> — 5,000 attendees</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button 
                onClick={openDrawer}
                className="inline-flex items-center gap-3 px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
              >
                Get Tickets
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
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">About</h3>
              <p className="text-sm font-light leading-relaxed">
                VACIO is a 2-day hardtechno & electronic music festival celebrating sonic architecture.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Info</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#lineup" className="hover:text-khaki transition-colors">Lineup</a></li>
                <li><a onClick={openDrawer} className="hover:text-khaki transition-colors cursor-pointer">Tickets</a></li>
                <li><a href="#venue" className="hover:text-khaki transition-colors">Location</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Follow</h3>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#" className="hover:text-khaki transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-khaki transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-khaki transition-colors">Spotify</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-light text-bone/60">Contact</h3>
              <p className="text-sm font-light">
                <a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors">info@vacio.ec</a>
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-bone/20 pt-8">
            <p className="text-xs text-bone/40 font-light">
              © 2026 VACIO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
