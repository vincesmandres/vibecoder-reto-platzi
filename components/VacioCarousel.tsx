'use client';

import { useState, useEffect } from 'react';
import VacioHero from './VacioHero';
import VacioPerformers from './VacioPerformers';
import VacioSchedule from './VacioSchedule';
import VacioLocation from './VacioLocation';
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

  // Detect which section is in viewport
  useEffect(() => {
    if (isLoading) return;

    const handleScrollDetection = () => {
      const sections = ['hero', 'performers', 'schedule', 'location'];
      const viewportCenter = window.innerHeight / 2;

      sections.forEach(sectionId => {
        const elements = document.querySelectorAll(`[data-section="${sectionId}"]`);
        elements.forEach(el => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setCurrentSection(sectionId);
          }
        });
      });
    };

    window.addEventListener('scroll', handleScrollDetection, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDetection);
  }, [isLoading]);

  const sections = [
    { id: 'hero', component: VacioHero },
    { id: 'performers', component: VacioPerformers },
    { id: 'schedule', component: VacioSchedule },
    { id: 'location', component: VacioLocation },
  ];

  const currentSectionComponent = sections.find(s => s.id === currentSection)?.component || VacioHero;
  const CurrentComponent = currentSectionComponent;

  return (
    <div className="relative w-full bg-bone">
      {/* Manifold loading animation - 3D to 2D unfold */}
      {isLoading && <ManifoldUnfold />}

      {/* Full-height sections stacked vertically for smooth scroll transition */}
      <div 
        className="relative transition-all duration-1000 ease-out"
        style={{
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'scale(0.96)' : 'scale(1)',
        }}
      >
        {/* Hero Section */}
        <div className="relative w-full min-h-screen" data-section="hero">
          <VacioHero transitionProgress={transitionProgress} />
        </div>

        {/* Performers Section */}
        <div className="relative w-full min-h-screen bg-charcoal-light" data-section="performers">
          <VacioPerformers transitionProgress={transitionProgress} />
        </div>

        {/* Schedule Section */}
        <div className="relative w-full min-h-screen bg-charcoal-light" data-section="schedule">
          <VacioSchedule transitionProgress={transitionProgress} />
        </div>

        {/* Location Section */}
        <div className="relative w-full min-h-screen bg-charcoal-light" data-section="location">
          <VacioLocation transitionProgress={transitionProgress} />
        </div>
      </div>

      {/* Navigation dots - fixed position */}
      {!isLoading && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'performers', label: 'Lineup' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'location', label: 'Location' },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => {
                const el = document.querySelector(`[data-section="${section.id}"]`);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-charcoal w-8'
                  : 'bg-charcoal/30 hover:bg-charcoal/60'
              }`}
              title={section.label}
            />
          ))}
        </div>
      )}

      {/* Footer with refined aesthetics */}
      <footer className="relative w-full py-20 px-6 md:px-12 bg-bone border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-4">About</p>
            <p className="text-sm text-charcoal/70 font-light leading-relaxed">
              VACIO celebrates sonic architecture and the void between sound waves.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-4">Info</p>
            <ul className="space-y-2 text-sm text-charcoal/70 font-light">
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Schedule</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Lineup</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Location</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-charcoal/70 font-light">
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-charcoal transition-colors duration-300">Spotify</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-charcoal/70 font-light">
              <li><a href="mailto:info@vacio.ec" className="hover:text-charcoal transition-colors duration-300">info@vacio.ec</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-charcoal/5 mt-16 pt-8">
          <p className="text-xs text-charcoal/30 font-light">
            © 2026 VACIO. Sonic Architecture Festival.
          </p>
        </div>
      </footer>
    </div>
  );
}
