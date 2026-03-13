'use client';

import { X, ShoppingCart } from 'lucide-react';

interface RightTicketPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const tickets = [
  {
    id: 'early',
    name: 'Early Access',
    price: 39,
    description: 'First 500 tickets',
    features: ['2-day access', 'Digital lineup', 'Festival map'],
  },
  {
    id: 'general',
    name: 'General Admission',
    price: 69,
    description: 'Standard access',
    features: ['2-day access', 'Digital lineup', 'Festival map', 'Merch item'],
    highlighted: true,
  },
  {
    id: 'void',
    name: 'Void Pass',
    price: 95,
    description: 'Premium experience',
    features: ['2-day access', 'Priority entry', 'VIP lounge access', 'Exclusive merch'],
  },
];

export default function RightTicketPanel({ isOpen, onClose }: RightTicketPanelProps) {
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
        className={`fixed right-0 top-0 h-screen w-full md:w-96 bg-bone border-l border-charcoal/10 z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-charcoal/10 bg-bone flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.2em] font-light text-charcoal">
            Tickets
          </h3>
          <button 
            onClick={onClose}
            className="text-charcoal hover:text-charcoal/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Tiers */}
        <div className="p-6 space-y-4">
          {tickets.map((tier) => (
            <div
              key={tier.id}
              className={`p-5 border rounded-sm transition-all ${
                tier.highlighted
                  ? 'border-khaki bg-khaki/5'
                  : 'border-charcoal/10 hover:border-charcoal/20'
              }`}
            >
              {/* Tier header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-base font-light text-charcoal">{tier.name}</h4>
                  <p className="text-xs text-charcoal/50 mt-1">{tier.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-charcoal">${tier.price}</p>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 mb-4 text-xs text-charcoal/60">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-khaki rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 text-xs uppercase tracking-[0.15em] font-light transition-all rounded-sm ${
                tier.highlighted
                  ? 'bg-charcoal text-bone hover:bg-charcoal/90'
                  : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-bone'
              }`}>
                {tier.highlighted ? 'Select' : 'Choose'}
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-6 border-t border-charcoal/10 space-y-3 text-xs text-charcoal/50">
          <p>All prices in USD. Prices subject to change.</p>
          <p className="text-charcoal/40">Questions? <a href="mailto:info@vacio.ec" className="hover:text-charcoal transition-colors">Contact us</a></p>
        </div>
      </div>
    </>
  );
}

export function RightTicketToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 top-6 z-30 md:z-40 p-3 text-charcoal hover:bg-charcoal/5 rounded-sm transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
}
