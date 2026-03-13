'use client';

import { useRef, useEffect, useState } from 'react';

interface RetoCardProps {
  number: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  href?: string;
  onVisible?: () => void;
}

export default function RetoCard({ 
  number, 
  title, 
  description, 
  status, 
  href,
  onVisible 
}: RetoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  useEffect(() => {
    if (isVisible && cardRef.current) {
      const loadAnime = async () => {
        const anime = (await import('animejs')).default;
        anime({
          targets: cardRef.current,
          translateY: [20, 0],
          opacity: [0, 1],
          easing: 'easeOutCubic',
          duration: 600,
        });
      };
      loadAnime();
    }
  }, [isVisible]);

  const statusStyles = {
    completed: {
      badge: 'bg-charcoal text-background',
      label: 'Completado',
    },
    'in-progress': {
      badge: 'bg-khaki text-charcoal',
      label: 'En progreso',
    },
    locked: {
      badge: 'bg-muted text-muted-foreground',
      label: 'Pendiente',
    },
  };
  
  return status !== 'locked' && href ? (
    <a
      href={href}
      ref={cardRef}
      className={`block relative p-6 border-2 border-charcoal bg-background transition-all duration-200 opacity-0 hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer`}
      style={{ boxShadow: '4px 4px 0 0 hsl(var(--charcoal))' }}
    >
      {renderCardContent()}
    </a>
  ) : (
    <div
      ref={cardRef}
      className={`block relative p-6 border-2 border-charcoal bg-background transition-all duration-200 opacity-0 ${
        status === 'locked' ? 'opacity-60' : ''
      }`}
      style={{ 
        boxShadow: status === 'locked'
          ? '4px 4px 0 0 hsl(var(--border))'
          : '4px 4px 0 0 hsl(var(--charcoal))',
      }}
    >
      {renderCardContent()}
    </div>
  );

  function renderCardContent() {
    return (
      <>
        {/* Number */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-charcoal bg-background font-mono text-lg font-bold">
            {number.toString().padStart(2, '0')}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-2 py-1 font-mono ${statusStyles[status].badge}`}>
                {statusStyles[status].label}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-charcoal mb-1 truncate">
              {title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          </div>

          {/* Arrow for active cards */}
          {status !== 'locked' && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          )}
        </div>
      </>
    );
  }
}
