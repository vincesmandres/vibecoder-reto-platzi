'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface TicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ticketTypes = [
  {
    name: 'Early Bird',
    price: 250,
    oldPrice: 350,
    includes: ['2-day access', 'Digital lineup', 'Base facilities'],
    limited: true,
  },
  {
    name: 'General',
    price: 350,
    includes: ['2-day access', 'Digital lineup', 'Premium facilities', 'Curated map'],
  },
  {
    name: 'VIP',
    price: 600,
    includes: ['2-day access', 'VIP lounge', 'Meet & greet', 'Exclusive merchandise', 'Priority entry'],
    exclusive: true,
  },
];

export default function TicketDrawer({ isOpen, onClose }: TicketDrawerProps) {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-screen w-full md:w-96 bg-charcoal border-l border-khaki/20 z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-charcoal border-b border-khaki/20 px-8 py-6 flex items-center justify-between">
          <h2 className="text-xl font-light text-bone tracking-wide">TICKETS</h2>
          <button 
            onClick={onClose}
            className="text-khaki/60 hover:text-bone transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Ticket options */}
          <div className="space-y-4">
            {ticketTypes.map((ticket, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setSelectedTicket(selectedTicket === idx ? null : idx)}
                  className={`w-full text-left p-6 border transition-all duration-300 group ${
                    selectedTicket === idx
                      ? 'border-khaki bg-khaki/5'
                      : 'border-khaki/20 hover:border-khaki/50'
                  }`}
                >
                  {/* Badge */}
                  {ticket.limited && (
                    <span className="inline-block text-xs uppercase tracking-[0.1em] text-khaki mb-2">
                      LIMITED
                    </span>
                  )}
                  {ticket.exclusive && (
                    <span className="inline-block text-xs uppercase tracking-[0.1em] text-khaki mb-2">
                      EXCLUSIVE
                    </span>
                  )}

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-lg font-light text-bone group-hover:text-khaki transition-colors">
                      {ticket.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      {ticket.oldPrice && (
                        <span className="line-through text-khaki/40 text-sm">
                          ${ticket.oldPrice}
                        </span>
                      )}
                      <span className="text-2xl font-light text-khaki">
                        ${ticket.price}
                      </span>
                    </div>
                  </div>

                  {/* Includes */}
                  {selectedTicket === idx && (
                    <ul className="mt-4 space-y-2 text-sm text-khaki/70 font-light">
                      {ticket.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-khaki/40 mt-1">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Quantity selector */}
          {selectedTicket !== null && (
            <div className="space-y-4 border-t border-khaki/10 pt-6">
              <label className="block text-xs uppercase tracking-[0.2em] text-khaki/60">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-khaki/30 text-khaki hover:border-khaki transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-light text-bone flex-1 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-khaki/30 text-khaki hover:border-khaki transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* CTA */}
          <button className="w-full px-6 py-4 bg-bone text-charcoal font-light uppercase tracking-[0.15em] hover:bg-khaki transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedTicket === null}
          >
            Continue to Checkout
          </button>

          {/* Footer info */}
          <div className="text-xs text-khaki/40 font-light leading-relaxed space-y-3 border-t border-khaki/10 pt-6">
            <p>Tickets are non-refundable. Transfers allowed up to 7 days before event.</p>
            <p className="text-khaki/30">Secure checkout powered by Stripe. Your payment is protected.</p>
          </div>
        </div>
      </div>
    </>
  );
}
