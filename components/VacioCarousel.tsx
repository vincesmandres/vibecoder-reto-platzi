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

  useEffect(() => {
    // Manifold animation duration - seamless transition
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
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
    <div className="relative w-full bg-charcoal overflow-hidden">
        {isLoading && <ManifoldUnfold />}

        {/* Animated content transition */}
        <div 
          className="relative w-full h-full transition-all duration-700 ease-out"
          style={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          <CurrentComponent />
        </div>
      </div>

      {/* Horizontal navigation */}
      {!isLoading && (
        <HorizontalNav 
          currentSection={currentSection}
          onNavigate={setCurrentSection}
        />
      )}

      {/* Footer (visible on all sections) */}
      <footer className="relative w-full py-16 px-6 md:px-12 bg-charcoal border-t border-khaki/10 mt-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">About</p>
            <p className="text-sm text-bone font-light leading-relaxed">
              VACIO is a 2-day hardtechno festival celebrating sonic architecture.
            </p>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Info</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="#" className="hover:text-khaki transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Lineup</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Location</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="#" className="hover:text-khaki transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-khaki transition-colors">Spotify</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-bone font-light">
              <li><a href="mailto:info@vacio.ec" className="hover:text-khaki transition-colors">info@vacio.ec</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto border-t border-khaki/10 mt-12 pt-8">
          <p className="text-xs text-khaki/40 font-light">
            © 2026 VACIO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
