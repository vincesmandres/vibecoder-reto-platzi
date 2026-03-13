'use client';

import { useState, useEffect } from 'react';
import TopologyMesh from './TopologyMesh';
import { ChevronDown } from 'lucide-react';

export default function VacioHero({ transitionProgress = 0 }: { transitionProgress?: number }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal-light">
      {/* Premium topology mesh - manifold surface with spatial depth */}
      <TopologyMesh isHero={true} isMorphing={false} transitionProgress={transitionProgress} />

      {/* Depth layers with subtle gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-charcoal/5 to-charcoal" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Preheader */}
        <div className="mb-12 opacity-0 animate-slide-left" style={{ animationDelay: '0ms' }}>
          <p className="text-khaki/60 text-xs uppercase tracking-[0.3em] font-light">
            October 18–19, 2026
          </p>
        </div>

        {/* Main title */}
        <div className="mb-8 opacity-0 animate-slide-left" style={{ animationDelay: '150ms' }}>
          <h1 className="text-[10vw] md:text-[8vw] leading-none tracking-[-0.02em] font-light text-bone">
            VACIO
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-16 opacity-0 animate-slide-left" style={{ animationDelay: '300ms' }}>
          <p className="text-lg md:text-xl text-khaki/70 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Enter the pulse.<br />Exit the ordinary.
          </p>
        </div>

        {/* Location badge */}
        <div className="mb-12 opacity-0 animate-slide-left" style={{ animationDelay: '450ms' }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-khaki/30 rounded-none">
            <div className="w-2 h-2 bg-khaki rounded-full" />
            <span className="text-sm text-bone tracking-[0.15em] uppercase">Manta, Ecuador</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-left" style={{ animationDelay: '600ms' }}>
          <button className="px-8 py-3 border border-bone text-bone hover:bg-bone hover:text-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light">
            Get Tickets
          </button>
          <button className="px-8 py-3 border border-khaki/40 text-khaki/60 hover:border-khaki/80 hover:text-khaki transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light">
            Explore
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 left-1/2 -translate-x-1/2 animate-pulse">
        <ChevronDown className="w-5 h-5 text-khaki/40" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-khaki/20 pointer-events-none z-5" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-khaki/20 pointer-events-none z-5" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-khaki/20 pointer-events-none z-5 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-khaki/20 pointer-events-none z-5 hidden md:block" />
    </section>
  );
}
