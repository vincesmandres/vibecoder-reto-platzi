'use client';

import { useState, useEffect } from 'react';
import RetoCard from './RetoCard';
import BlocksAnimation from './BlocksAnimation';

const retos = [
  {
    number: 1,
    title: 'Landing Page Festival',
    description: 'Diseño y desarrollo de una landing page para un festival de música con animaciones.',
    status: 'in-progress' as const,
    href: '/reto-1',
  },
  {
    number: 2,
    title: 'Reto 2',
    description: 'Descripción pendiente del segundo reto del desafío Vibecoder.',
    status: 'in-progress' as const,
    href: '/reto-2',
  },
  {
    number: 3,
    title: 'Reto 3',
    description: 'Descripción pendiente del tercer reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 4,
    title: 'Reto 4',
    description: 'Descripción pendiente del cuarto reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 5,
    title: 'Reto 5',
    description: 'Descripción pendiente del quinto reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 6,
    title: 'Reto 6',
    description: 'Descripción pendiente del sexto reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 7,
    title: 'Reto 7',
    description: 'Descripción pendiente del séptimo reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 8,
    title: 'Reto 8',
    description: 'Descripción pendiente del octavo reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 9,
    title: 'Reto 9',
    description: 'Descripción pendiente del noveno reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 10,
    title: 'Reto 10',
    description: 'Descripción pendiente del décimo reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 11,
    title: 'Reto 11',
    description: 'Descripción pendiente del undécimo reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 12,
    title: 'Reto 12',
    description: 'Descripción pendiente del duodécimo reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 13,
    title: 'Reto 13',
    description: 'Descripción pendiente del decimotercer reto del desafío Vibecoder.',
    status: 'locked' as const,
  },
];

export default function RetosSection() {
  const [activeReto, setActiveReto] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Blocks animation background */}
      {mounted && (
        <div className="fixed top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block">
          <BlocksAnimation activeLevel={activeReto} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 py-12 lg:py-16 max-w-2xl">
        <header className="mb-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono bg-khaki text-charcoal"
               style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}>
            VIBECODER 2025
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-3">
            13 Retos
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Un viaje de aprendizaje a través de desafíos de desarrollo web y AI.
          </p>
        </header>

        <div className="space-y-4">
          {retos.map((reto) => (
            <RetoCard
              key={reto.number}
              {...reto}
              onVisible={() => setActiveReto(reto.number)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-border">
          <p className="text-muted-foreground text-xs font-mono">
            Next.js + Tailwind + Anime.js
          </p>
        </footer>
      </div>
    </div>
  );
}
