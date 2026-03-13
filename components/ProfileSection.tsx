'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-16">
      {/* Avatar with glow effect */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl animate-pulse-glow" />
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-accent/30">
          <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-display font-bold gradient-text">V</span>
          </div>
        </div>
        {/* Rotating ring */}
        <svg 
          className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] animate-rotate-slow"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1"
            strokeDasharray="10 20"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(168 100% 50%)" />
              <stop offset="100%" stopColor="hsl(168 100% 70%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Name and title */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 text-center">
        Vicente Andres
      </h1>
      <p className="text-muted-foreground text-lg mb-2">@vincesmandres</p>
      <p className="text-muted-foreground/70 text-sm mb-8 text-center max-w-xs">
        Vibecoder Retos Platzi
      </p>

      {/* Social links */}
      <div className="flex items-center gap-6">
        <a
          href="https://twitter.com/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-full glass hover:bg-accent/10 transition-all duration-300"
          aria-label="X (Twitter)"
        >
          <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </a>
        <a
          href="https://linkedin.com/in/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-full glass hover:bg-accent/10 transition-all duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </a>
        <a
          href="https://github.com/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-full glass hover:bg-accent/10 transition-all duration-300"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </div>
  );
}
