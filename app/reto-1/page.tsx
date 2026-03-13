'use client';

import { ArrowRight, Menu, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import LeftNavPanel, { LeftNavToggle } from '@/components/LeftNavPanel';
import RightTicketPanel, { RightTicketToggle } from '@/components/RightTicketPanel';

export default function VacioLanding() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const handleHeroTicketClick = () => setRightPanelOpen(true);
  const handleHeroLineupClick = () => setLeftPanelOpen(true);

  return (
    <main className="w-full bg-bone text-charcoal">
      {/* Back navigation */}
      <Link 
        href="/"
        className="fixed top-6 left-6 z-20 text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal transition-colors md:left-auto md:right-6"
      >
        ← Volver
      </Link>

      {/* Left Navigation Panel */}
      <LeftNavPanel isOpen={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />
      <LeftNavToggle onClick={() => setLeftPanelOpen(!leftPanelOpen)} />

      {/* Right Ticket Panel */}
      <RightTicketPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
      <RightTicketToggle onClick={() => setRightPanelOpen(!rightPanelOpen)} />

      {/* Hero Section */}
      <section id="overview" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Festival Name */}
          <div>
            <h1 className="text-7xl md:text-8xl font-light tracking-tight text-charcoal mb-4">
              VACIO
            </h1>
            <div className="w-12 h-px bg-charcoal/30 mx-auto" />
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-light text-charcoal/70 leading-relaxed">
            Enter the pulse. Exit the ordinary.
          </p>

          {/* Date and Location */}
          <div className="space-y-2 text-sm text-charcoal/60">
            <p className="uppercase tracking-[0.15em] font-light">October 18–19, 2026</p>
            <p className="uppercase tracking-[0.15em] font-light">Manta, Ecuador</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={handleHeroTicketClick}
              className="px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              Get Tickets
            </button>
            <button 
              onClick={handleHeroLineupClick}
              className="px-8 py-3 border-2 border-charcoal/30 text-charcoal hover:border-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
            >
              View Lineup
            </button>
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
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-2">
              Lineup
            </h2>
            <div className="w-12 h-px bg-charcoal/30" />
          </div>

          {/* Artists grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Hardwell</p>
              <p className="text-sm text-charcoal/50">Main Stage</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Maddix</p>
              <p className="text-sm text-charcoal/50">Main Stage</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Gabry Ponte</p>
              <p className="text-sm text-charcoal/50">Techno Arena</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Martin Garrix</p>
              <p className="text-sm text-charcoal/50">Main Stage</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Sara Landry</p>
              <p className="text-sm text-charcoal/50">Techno Arena</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">LUNAX</p>
              <p className="text-sm text-charcoal/50">Electronic Stage</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Dimitri Vegas & Like Mike</p>
              <p className="text-sm text-charcoal/50">Main Stage</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg text-charcoal font-light">Kevin D'Angello</p>
              <p className="text-sm text-charcoal/50">Techno Arena</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Tickets Section */}
      <section id="venue" className="relative w-full px-6 md:px-12 py-24 md:py-32 bg-bone">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-2">
              Location
            </h2>
            <div className="w-12 h-px bg-charcoal/30" />
          </div>

          {/* Location info */}
          <div className="space-y-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-lg text-charcoal font-light leading-relaxed">
                VACIO takes place at the iconic waterfront venue in Manta, Ecuador. Two days of uninterrupted electronic music in a premium setting designed for maximum immersion.
              </p>
              <div className="text-sm text-charcoal/60 space-y-1">
                <p><span className="font-medium">Venue:</span> Manta Waterfront</p>
                <p><span className="font-medium">Address:</span> Av. Malecón, Manta, Ecuador</p>
                <p><span className="font-medium">Capacity:</span> 5,000 attendees</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleHeroTicketClick}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
              >
                Buy Tickets
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
                <li><a onClick={handleHeroTicketClick} className="hover:text-khaki transition-colors cursor-pointer">Tickets</a></li>
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
