'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface BlocksAnimationProps {
  activeLevel: number;
}

export default function BlocksAnimation({ activeLevel }: BlocksAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate blocks based on active level
    const visibleBlocks = Math.min(activeLevel, 13);
    
    blocksRef.current.forEach((block, index) => {
      if (!block) return;
      
      const isVisible = index < visibleBlocks;
      const delay = index * 60;
      
      anime({
        targets: block,
        opacity: isVisible ? 1 : 0.1,
        scale: isVisible ? 1 : 0.8,
        translateY: isVisible ? 0 : 20,
        rotate: isVisible ? (index % 2 === 0 ? 0 : 2) : 0,
        delay: delay,
        duration: 400,
        easing: 'easeOutCubic',
      });
    });
  }, [activeLevel]);

  // Generate block positions in a stacked/tower pattern
  const blocks = Array.from({ length: 13 }, (_, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const offsetX = row % 2 === 0 ? 0 : 30; // Stagger alternate rows
    
    return {
      id: i,
      x: col * 80 + offsetX + 60,
      y: row * 60 + 100,
      width: 70,
      height: 50,
    };
  });

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Background grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--charcoal))" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated blocks */}
      <div className="absolute inset-0">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            ref={(el) => { if (el) blocksRef.current[index] = el; }}
            className="absolute border-2 border-charcoal bg-background opacity-10"
            style={{
              left: `${block.x}px`,
              top: `${block.y}px`,
              width: `${block.width}px`,
              height: `${block.height}px`,
              boxShadow: '3px 3px 0 0 hsl(var(--charcoal))',
            }}
          >
            {/* Block stud (Lego-like) */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-charcoal bg-khaki opacity-60" />
            {/* Block number */}
            <span className="absolute bottom-1 right-2 text-xs font-mono text-muted-foreground">
              {(index + 1).toString().padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      {/* Level indicator */}
      <div className="absolute bottom-12 right-12 text-right">
        <div className="font-mono text-xs text-muted-foreground mb-1">NIVEL</div>
        <div className="text-6xl font-bold text-charcoal opacity-20">
          {activeLevel.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-12 right-12">
        <div className="w-8 h-8 border-2 border-charcoal opacity-20" />
      </div>
      <div className="absolute top-12 right-24">
        <div className="w-4 h-4 bg-khaki border-2 border-charcoal opacity-30" />
      </div>
    </div>
  );
}
