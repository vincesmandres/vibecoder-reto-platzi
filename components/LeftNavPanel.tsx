'use client';

import { X } from 'lucide-react';

interface VacioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketSelect?: (ticketId: string) => void;
}

const sections = [
  { id: 'overview', label: 'Inicio', href: '#overview' },
  { id: 'lineup', label: 'Artistas', href: '#lineup' },
  { id: 'venue', label: 'Lugar', href: '#venue' },
];

const tickets = [
  {
    id: 'early',
    name: 'Acceso Anticipado',
    price: 39,
    description: 'Primeros 500 entradas',
    features: ['Acceso 2 días', 'Lineup digital', 'Mapa del festival'],
  },
  {
    id: 'general',
    name: 'Admisión General',
    price: 69,
    description: 'Acceso estándar',
    features: ['Acceso 2 días', 'Lineup digital', 'Mapa del festival', 'Merchandise'],
    highlighted: true,
  },
  {
    id: 'void',
    name: 'Void Pass',
    price: 95,
    description: 'Experiencia premium',
    features: ['Acceso 2 días', 'Lounge VIP', 'Meet & greet', 'Merchandise exclusivo', 'Entrada prioritaria'],
  },
];

export default function VacioDrawer({ isOpen, onClose, onTicketSelect }: VacioDrawerProps) {
  const handleTicketClick = (ticketId: string) => {
    onTicketSelect?.(ticketId);
  };

  return (
    <>
      {/* Backdrop - only on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed left-0 top-0 h-screen w-80 bg-bone border-r border-charcoal/10 z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-charcoal/10 flex items-center justify-between sticky top-0 bg-bone z-10">
          <h2 className="text-sm uppercase tracking-[0.2em] font-light text-charcoal">
            VACIO
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-charcoal hover:bg-charcoal/5 rounded-sm transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Navigation Section */}
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                onClick={() => onClose()}
                className="block py-2 px-3 text-xs uppercase tracking-[0.15em] font-light text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 transition-colors rounded-sm"
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-charcoal/10" />

          {/* Tickets Section */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-light text-charcoal">
              Comprar entradas
            </h3>

            {/* Ticket Cards */}
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-sm border transition-all duration-200 ${
                    ticket.highlighted
                      ? 'border-charcoal bg-charcoal/5'
                      : 'border-charcoal/20 hover:border-charcoal/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-light text-charcoal">
                        {ticket.name}
                      </p>
                      <p className="text-xs text-charcoal/50">
                        {ticket.description}
                      </p>
                    </div>
                    <p className="text-lg font-light text-charcoal">
                      ${ticket.price}
                    </p>
                  </div>

                  {/* Features (compact) */}
                  <ul className="text-xs text-charcoal/60 space-y-1 mb-3">
                    {ticket.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-charcoal/40 rounded-full" />
                        {feature}
                      </li>
                    ))}
                    {ticket.features.length > 2 && (
                      <li className="text-charcoal/40">
                        +{ticket.features.length - 2} more
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleTicketClick(ticket.id)}
                    className="w-full py-2 px-3 text-xs uppercase tracking-[0.1em] font-light border border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-200 rounded-sm"
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-charcoal/10" />

          {/* Footer Info */}
          <div className="space-y-2 text-xs text-charcoal/50 font-light">
            <p className="uppercase tracking-[0.1em]">Festival</p>
            <p className="text-charcoal/40">18–19 de Octubre, 2026</p>
            <p className="text-charcoal/40">Manta, Ecuador</p>
            <a href="mailto:info@vacio.ec" className="block text-charcoal/40 hover:text-charcoal transition-colors">
              info@vacio.ec
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function VacioDrawerToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed left-6 top-6 z-30 p-4 text-charcoal/50 hover:text-charcoal transition-colors"
      aria-label="Open drawer"
      title="Open menu"
    >
      <div className="flex flex-col gap-1.5 w-6">
        <div className="w-5 h-0.5 bg-current" />
        <div className="w-5 h-0.5 bg-current" />
        <div className="w-3 h-0.5 bg-current" />
      </div>
    </button>
  );
}
