'use client';

import { X, Menu } from 'lucide-react';
import { useState } from 'react';

interface LeftNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'lineup', label: 'Lineup', href: '#lineup' },
  { id: 'venue', label: 'Venue', href: '#venue' },
  { id: 'tickets', label: 'Tickets', href: '#tickets' },
];

export default function LeftNavPanel({ isOpen, onClose }: LeftNavPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed left-0 top-0 h-screen w-80 bg-bone border-r border-charcoal/10 z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-charcoal/10 flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.2em] font-light text-charcoal">
            Event Map
          </h3>
          <button 
            onClick={onClose}
            className="md:hidden text-charcoal hover:text-charcoal/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={section.href}
              onClick={() => onClose()}
              className="block py-3 px-4 text-sm uppercase tracking-[0.15em] font-light text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 transition-colors rounded-sm"
            >
              {section.label}
            </a>
          ))}
        </nav>

        {/* Footer info in sidebar */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3 text-xs text-charcoal/50 font-light">
          <div>
            <p className="uppercase tracking-[0.1em] mb-1">Festival Info</p>
            <p className="text-charcoal/40">October 18–19, 2026</p>
            <p className="text-charcoal/40">Manta, Ecuador</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function LeftNavToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed left-6 top-6 z-30 md:z-40 p-3 text-charcoal hover:bg-charcoal/5 rounded-sm transition-colors"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
