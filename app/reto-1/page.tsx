'use client';

import { useState } from 'react';
import VacioHero from '@/components/VacioHero';
import VacioPerformers from '@/components/VacioPerformers';
import VacioSchedule from '@/components/VacioSchedule';
import VacioLocation from '@/components/VacioLocation';
import TicketDrawer from '@/components/TicketDrawer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VacioLanding() {
  const [isTicketDrawerOpen, setIsTicketDrawerOpen] = useState(false);

  return (
    <div className="relative w-full bg-charcoal">
      {/* Back navigation */}
      <Link 
        href="/"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-khaki/60 hover:text-bone transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs tracking-[0.2em] uppercase hidden sm:inline">Volver</span>
      </Link>

      {/* Sticky CTA */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
        <button 
          onClick={() => setIsTicketDrawerOpen(true)}
          className="px-6 py-2 border border-khaki text-khaki hover:bg-khaki hover:text-charcoal transition-all duration-300 text-xs uppercase tracking-[0.15em] font-light"
        >
          Tickets
        </button>
      </div>

      {/* Hero */}
      <VacioHero />

      {/* Performers */}
      <VacioPerformers />

      {/* Schedule */}
      <VacioSchedule />

      {/* Location */}
      <VacioLocation />

      {/* Footer CTA */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-charcoal border-t border-khaki/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-bone tracking-[-0.01em] mb-8">
            Ready to experience the void?
          </h2>
          <button 
            onClick={() => setIsTicketDrawerOpen(true)}
            className="px-12 py-4 border-2 border-bone text-bone hover:bg-bone hover:text-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light"
          >
            Secure Your Spot
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full py-16 px-6 md:px-12 bg-charcoal border-t border-khaki/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">About</p>
            <p className="text-sm text-bone font-light leading-relaxed">
              VACIO is a 2-day hardtechno festival celebrating sonic architecture and underground culture.
            </p>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Info</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="#" className="hover:text-khaki transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Lineup</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Location</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="#" className="hover:text-khaki transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Spotify</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors">info@vacio.ec</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto border-t border-khaki/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-khaki/40 font-light">
            © 2026 VACIO. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-khaki/40 font-light mt-4 md:mt-0">
            <a href="#" className="hover:text-khaki transition-colors">Privacy</a>
            <a href="#" className="hover:text-khaki transition-colors">Terms</a>
            <a href="#" className="hover:text-khaki transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>

      {/* Ticket Drawer */}
      <TicketDrawer 
        isOpen={isTicketDrawerOpen} 
        onClose={() => setIsTicketDrawerOpen(false)}
      />
    </div>
  );
}
