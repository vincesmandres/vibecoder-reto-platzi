'use client';

import { useState, useEffect } from 'react';
import VacioHero from './VacioHero';
import VacioPerformers from './VacioPerformers';
import VacioSchedule from './VacioSchedule';
import VacioLocation from './VacioLocation';
import HorizontalNav from './HorizontalNav';
import ManifoldUnfold from './ManifoldUnfold';

export default function VacioCarousel() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    // Manifold animation duration
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll tracking for transition effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollPos / (viewportHeight * 0.5), 1);
      setTransitionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', component: VacioHero },
    { id: 'performers', component: VacioPerformers },
    { id: 'schedule', component: VacioSchedule },
    { id: 'location', component: VacioLocation },
  ];

  const currentSectionComponent = sections.find(s => s.id === currentSection)?.component || VacioHero;
  const CurrentComponent = currentSectionComponent;

  return (
    <div className="relative w-full bg-charcoal-light overflow-x-hidden">
      {/* Manifold loading animation - premium intro */}
      {isLoading && <ManifoldUnfold />}

      {/* Animated content transition with smooth morphing */}
      <div 
        className="relative w-full h-full transition-all duration-1000 ease-out"
        style={{
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        <CurrentComponent transitionProgress={transitionProgress} />
      </div>

      {/* Horizontal navigation - discrete and subtle */}
      {!isLoading && (
        <HorizontalNav 
          currentSection={currentSection}
          onNavigate={setCurrentSection}
        />
      )}

      {/* Footer with refined aesthetics */}
      <footer className="relative w-full py-20 px-6 md:px-12 bg-charcoal-light border-t border-khaki/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/40 mb-4">About</p>
            <p className="text-sm text-bone/80 font-light leading-relaxed">
              VACIO celebrates sonic architecture and the void between sound waves.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/40 mb-4">Info</p>
            <ul className="space-y-2 text-sm text-bone/80 font-light">
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Schedule</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Lineup</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Location</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/40 mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-bone/80 font-light">
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors duration-300">Spotify</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/40 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-bone/80 font-light">
              <li><a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors duration-300">info@vacio.ec</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-khaki/5 mt-16 pt-8">
          <p className="text-xs text-khaki/30 font-light">
            © 2026 VACIO. Sonic Architecture Festival.
          </p>
        </div>
      </footer>
    </div>
  );
}
