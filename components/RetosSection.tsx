'use client';

import { useState } from 'react';
import RetoCard from './RetoCard';
import MathCurve from './MathCurve';

const retos = [
  {
    number: 1,
    title: 'Landing Page Festival',
    description: 'Diseño y desarrollo de una landing page para un festival de música con animaciones y efectos visuales.',
    status: 'in-progress' as const,
    href: '/reto-1',
  },
  {
    number: 2,
    title: 'Reto 2',
    description: 'Descripcion pendiente del segundo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 3,
    title: 'Reto 3',
    description: 'Descripcion pendiente del tercer reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 4,
    title: 'Reto 4',
    description: 'Descripcion pendiente del cuarto reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 5,
    title: 'Reto 5',
    description: 'Descripcion pendiente del quinto reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 6,
    title: 'Reto 6',
    description: 'Descripcion pendiente del sexto reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 7,
    title: 'Reto 7',
    description: 'Descripcion pendiente del septimo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 8,
    title: 'Reto 8',
    description: 'Descripcion pendiente del octavo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 9,
    title: 'Reto 9',
    description: 'Descripcion pendiente del noveno reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 10,
    title: 'Reto 10',
    description: 'Descripcion pendiente del decimo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 11,
    title: 'Reto 11',
    description: 'Descripcion pendiente del undecimo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 12,
    title: 'Reto 12',
    description: 'Descripcion pendiente del duodecimo reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
  {
    number: 13,
    title: 'Reto 13',
    description: 'Descripcion pendiente del decimotercer reto del desafio Vibecoder.',
    status: 'locked' as const,
  },
];

export default function RetosSection() {
  const [activeReto, setActiveReto] = useState(1);

  return (
    <div className="relative min-h-screen">
      {/* Math curve background */}
      <div className="fixed inset-0 pointer-events-none">
        <MathCurve complexity={activeReto} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 py-16">
        <header className="mb-12">
          <p className="text-accent text-sm uppercase tracking-widest mb-2">Vibecoder Challenge</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            13 Retos
          </h2>
          <p className="text-muted-foreground max-w-md">
            Un viaje de aprendizaje a traves de 13 desafios de desarrollo web y aplicaciones con AI.
          </p>
        </header>

        <div className="space-y-6">
          {retos.map((reto) => (
            <RetoCard
              key={reto.number}
              {...reto}
              onVisible={() => setActiveReto(reto.number)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground/60 text-sm">
            Construido con Next.js, Tailwind CSS y mucho cafe.
          </p>
        </footer>
      </div>
    </div>
  );
}
