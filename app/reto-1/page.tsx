'use client';

// VACIO Landing Page - Clean build v3
import VacioCarousel from '@/components/VacioCarousel';
import TicketDrawer from '@/components/TicketDrawer';
import { useState } from 'react';
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

      {/* Horizontal carousel experience */}
      <VacioCarousel />

      {/* Ticket Drawer */}
      <TicketDrawer 
        isOpen={isTicketDrawerOpen} 
        onClose={() => setIsTicketDrawerOpen(false)}
      />
    </div>
  );
}
