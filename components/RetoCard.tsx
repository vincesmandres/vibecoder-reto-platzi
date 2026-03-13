'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

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

  const statusColors = {
    completed: 'bg-accent/20 text-accent border-accent/30',
    'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    locked: 'bg-muted text-muted-foreground border-border',
  };

  const statusLabels = {
    completed: 'Completado',
    'in-progress': 'En progreso',
    locked: 'Bloqueado',
  };

  return (
    <div
      ref={cardRef}
      className={`group relative p-6 md:p-8 rounded-lg glass transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${status !== 'locked' ? 'hover:bg-accent/5 cursor-pointer' : 'opacity-60'}`}
      style={{ transitionDelay: `${number * 50}ms` }}
    >
      {/* Number badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
        <span className="font-display font-bold text-accent">
          {number.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {status !== 'locked' && href ? (
          <a 
            href={href}
            className="p-2 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-all"
          >
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
          </a>
        ) : (
          <div className="p-2 rounded-full border border-border">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Progress line for completed */}
      {status === 'completed' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
      )}
    </div>
  );
}
