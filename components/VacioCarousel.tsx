'use client';

import { useState, useEffect } from 'react';
import VacioHero from './VacioHero';
import VacioPerformers from './VacioPerformers';
import VacioSchedule from './VacioSchedule';
import VacioLocation from './VacioLocation';
import ManifoldUnfold from './ManifoldUnfold';
import RubikCubeBackground from './RubikCubeBackground';
import TopologyFieldMesh from './TopologyFieldMesh';

const SECTIONS = [
  { id: 'vacio', label: 'VACIO', component: VacioHero, index: 0 },
  { id: 'lineup', label: 'LINEUP', component: VacioPerformers, index: 1 },
  { id: 'schedule', label: 'SCHEDULE', component: VacioSchedule, index: 2 },
  { id: 'location', label: 'LOCATION', component: VacioLocation, index: 3 },
];

export default function VacioCarousel() {
  const [currentSection, setCurrentSection] = useState('vacio');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = (e: any) => {
      const container = e.target as HTMLElement;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrolled = container.scrollTop;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setScrollProgress(progress);

      const index = Math.floor(progress * SECTIONS.length);
      const clampedIndex = Math.min(index, SECTIONS.length - 1);
      setCurrentIndex(clampedIndex);
      setCurrentSection(SECTIONS[clampedIndex].id);
    };

    const contentArea = document.querySelector('[data-vacio-content]') as HTMLElement;
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll, { passive: true });
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

  return (
    <div className="relative w-full h-screen bg-charcoal flex overflow-hidden">
      {/* Manifold loading animation */}
      {isLoading && <ManifoldUnfold />}

      {/* Premium dynamic background - Rubik cube with topology */}
      <RubikCubeBackground sectionIndex={currentIndex} className="opacity-40" />
      <TopologyFieldMesh className="absolute inset-0 opacity-25" />

      {/* Left Sidebar Navigation - 30% width */}
      <div className="relative w-[30%] bg-charcoal border-r border-khaki/10 flex flex-col overflow-hidden z-20">
        {/* Sidebar subtle backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-transparent opacity-40 pointer-events-none" />

        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
          {/* Logo section */}
          <div className="mb-16 md:mb-24">
            <h1 className="text-2xl md:text-3xl font-light text-bone tracking-[-0.01em] leading-tight">
              VACIO
            </h1>
            <div className="w-8 h-px bg-khaki/60 mt-4" />
          </div>

          {/* Section navigation */}
          <nav className="flex-1 space-y-8 md:space-y-10">
            {SECTIONS.map((section) => {
              const isActive = currentSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    const contentArea = document.querySelector('[data-vacio-content]') as HTMLElement;
                    if (contentArea) {
                      const offset = (section.index / SECTIONS.length) * contentArea.scrollHeight;
                      contentArea.scrollTop = offset;
                    }
                  }}
                  className="relative group text-left w-full"
                >
                  {/* Animated indicator line - with rhythmic pulsation */}
                  <div
                    className={`absolute -left-8 md:-left-12 h-px bg-khaki transition-all duration-500 ${
                      isActive ? 'animate-pulse-glow' : ''
                    }`}
                    style={{
                      width: isActive ? '28px' : '16px',
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />

                  {/* Section label - with glow effect on active */}
                  <span
                    className={`text-xs md:text-sm tracking-[0.25em] uppercase font-light transition-all duration-300 block ${
                      isActive 
                        ? 'text-bone drop-shadow-lg' 
                        : 'text-khaki/40 group-hover:text-khaki/70'
                    }`}
                  >
                    {section.label}
                  </span>

                  {/* Active underline - flowing animation */}
                  <div
                    className="mt-3 h-px bg-gradient-to-r from-khaki to-transparent origin-left transition-all duration-700"
                    style={{
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Event info footer */}
          <div className="space-y-3 text-xs text-khaki/25 font-light leading-relaxed">
            <p>October 18–19</p>
            <p>2026</p>
            <p className="mt-4">Manta, Ecuador</p>
            <a href="mailto:info@vacio.ec" className="text-khaki/35 hover:text-khaki/60 transition-colors block mt-2">
              info@vacio.ec
            </a>
          </div>
        </div>
      </div>

      {/* Right Content Area - 70% width with scroll */}
      <div
        data-vacio-content
        className="relative w-[70%] overflow-y-scroll overflow-x-hidden scroll-smooth"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 1s ease-out',
        }}
      >
        {/* Content sections */}
        {SECTIONS.map((section) => {
          const Comp = section.component;
          return (
            <div key={section.id} className="relative w-full min-h-screen">
              <Comp scrollProgress={scrollProgress} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
