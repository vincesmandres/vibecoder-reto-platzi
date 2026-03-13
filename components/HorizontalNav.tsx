'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavSection {
  id: string;
  label: string;
}

const sections: NavSection[] = [
  { id: 'hero', label: 'VACIO' },
  { id: 'performers', label: 'Lineup' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'location', label: 'Location' },
];

interface HorizontalNavProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function HorizontalNav({ currentSection, onNavigate }: HorizontalNavProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const currentIndex = sections.findIndex(s => s.id === currentSection);

  const handleScroll = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(sections.length - 1, currentIndex + 1);
    
    if (nextIndex !== currentIndex) {
      onNavigate(sections[nextIndex].id);
    }
  };

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < sections.length - 1);
  }, [currentIndex]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
      {/* Left arrow */}
      <button
        onClick={() => handleScroll('left')}
        disabled={!canScrollLeft}
        className="w-10 h-10 flex items-center justify-center border border-charcoal/20 disabled:border-charcoal/10 disabled:text-charcoal/20 text-charcoal/50 hover:text-charcoal hover:border-charcoal/40 transition-all duration-300"
        aria-label="Previous section"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Section indicators */}
      <div className="flex items-center gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
              section.id === currentSection
                ? 'text-charcoal'
                : 'text-charcoal/40 hover:text-charcoal/60'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => handleScroll('right')}
        disabled={!canScrollRight}
        className="w-10 h-10 flex items-center justify-center border border-charcoal/20 disabled:border-charcoal/10 disabled:text-charcoal/20 text-charcoal/50 hover:text-charcoal hover:border-charcoal/40 transition-all duration-300"
        aria-label="Next section"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
