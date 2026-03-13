'use client';

import { useState, useEffect } from 'react';
import VacioHero from './VacioHero';
import VacioPerformers from './VacioPerformers';
import VacioSchedule from './VacioSchedule';
import VacioLocation from './VacioLocation';
import ManifoldUnfold from './ManifoldUnfold';
import TopologyMeshEnhanced from './TopologyMeshEnhanced';

const SECTIONS = [
  { id: 'vacio', label: 'VACIO', component: VacioHero },
  { id: 'lineup', label: 'LINEUP', component: VacioPerformers },
  { id: 'schedule', label: 'SCHEDULE', component: VacioSchedule },
  { id: 'location', label: 'LOCATION', component: VacioLocation },
];

export default function VacioCarousel() {
  const [currentSection, setCurrentSection] = useState('vacio');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
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

      // Detect which section is visible
      const sectionHeight = scrollHeight / 3;
      const index = Math.floor(scrolled / (scrollHeight / SECTIONS.length));
      const clampedIndex = Math.min(index, SECTIONS.length - 1);
      setCurrentSection(SECTIONS[clampedIndex].id);
    };

    const contentArea = document.querySelector('[data-vacio-content]') as HTMLElement;
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll);
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

  const currentComponent = SECTIONS.find(s => s.id === currentSection)?.component || VacioHero;
  const CurrentComponent = currentComponent;

  return (
    <div className="relative w-full h-screen bg-charcoal flex overflow-hidden">
      {/* Manifold loading animation */}
      {isLoading && <ManifoldUnfold />}

      {/* Enhanced topology mesh background */}
      <TopologyMeshEnhanced className="absolute inset-0 opacity-30" />

      {/* Left Sidebar Navigation - 30% width */}
      <div className="relative w-[30%] bg-charcoal border-r border-khaki/10 flex flex-col overflow-hidden z-20">
        {/* Sidebar background topology */}
        <div className="absolute inset-0 opacity-20">
          <TopologyMeshEnhanced />
        </div>

        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
          {/* Logo */}
          <div className="mb-16 md:mb-24">
            <h1 className="text-2xl md:text-3xl font-light text-bone tracking-[-0.01em]">
              VACIO
            </h1>
            <div className="w-8 h-px bg-khaki/60 mt-3" />
          </div>

          {/* Section navigation */}
          <nav className="flex-1 space-y-6 md:space-y-8">
            {SECTIONS.map((section, idx) => {
              const isActive = currentSection === section.id;
              const progress = (idx / SECTIONS.length);
              const nextProgress = ((idx + 1) / SECTIONS.length);
              const isInView = scrollProgress >= progress && scrollProgress < nextProgress;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    const contentArea = document.querySelector('[data-vacio-content]') as HTMLElement;
                    if (contentArea) {
                      const offset = (idx / SECTIONS.length) * contentArea.scrollHeight;
                      contentArea.scrollTop = offset;
                    }
                  }}
                  className="relative group text-left"
                >
                  {/* Indicator line */}
                  <div
                    className="absolute -left-8 md:-left-12 w-4 md:w-6 h-px bg-khaki/40 group-hover:bg-khaki transition-all duration-300"
                    style={{
                      opacity: isActive || isInView ? 1 : 0,
                      width: isActive || isInView ? '24px' : '16px',
                    }}
                  />

                  {/* Label */}
                  <span
                    className={`text-xs md:text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                      isActive || isInView
                        ? 'text-bone'
                        : 'text-khaki/40 group-hover:text-khaki/70'
                    }`}
                  >
                    {section.label}
                  </span>

                  {/* Active underline */}
                  <div
                    className="mt-2 h-px bg-khaki/60 origin-left transition-all duration-500"
                    style={{
                      scaleX: isActive || isInView ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="space-y-4 text-xs text-khaki/30 font-light">
            <p>October 18–19, 2026</p>
            <p>Manta, Ecuador</p>
            <a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors">
              info@vacio.ec
            </a>
          </div>
        </div>
      </div>

      {/* Right Content Area - 70% width */}
      <div
        data-vacio-content
        className="relative w-[70%] overflow-y-scroll overflow-x-hidden"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        {/* Sections */}
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
