'use client';

import { useEffect } from 'react';

export default function ProfileSection() {
  useEffect(() => {
    const loadAnime = async () => {
      const anime = (await import('animejs')).default;
      
      anime({
        targets: '.profile-block',
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)',
        duration: 800,
      });

      anime({
        targets: '.social-link',
        scale: [0, 1],
        delay: anime.stagger(80, { start: 400 }),
        easing: 'easeOutBack',
        duration: 500,
      });
    };

    loadAnime();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-12">
      {/* Profile Image Block */}
      <div className="profile-block opacity-0 mb-8">
        <div className="relative">
          <div className="w-40 h-40 lg:w-48 lg:h-48 border-4 border-charcoal bg-background overflow-hidden"
               style={{ boxShadow: '6px 6px 0 0 hsl(var(--charcoal))' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfil-notion.flat-o3DTlmkhokXeewrH1LPVSFluSV0BOP.jpeg"
              alt="Maikel Andres Vinces Mendoza"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative blocks */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-khaki border-2 border-charcoal" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-khaki border-2 border-charcoal" />
        </div>
      </div>

      {/* Name Block */}
      <div className="profile-block opacity-0 text-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-charcoal tracking-tight leading-tight">
          Maikel Andres
        </h1>
        <h2 className="text-xl lg:text-2xl font-bold text-charcoal tracking-tight">
          Vinces Mendoza
        </h2>
      </div>

      {/* Handle Block */}
      <div className="profile-block opacity-0 mb-8">
        <div className="inline-block px-4 py-2 bg-charcoal text-background font-mono text-sm"
             style={{ boxShadow: '3px 3px 0 0 hsl(var(--khaki))' }}>
          @vincesmandres
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-4">
        <a
          href="https://x.com/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link w-12 h-12 flex items-center justify-center border-2 border-charcoal bg-background hover:bg-charcoal hover:text-background transition-colors"
          style={{ boxShadow: '3px 3px 0 0 hsl(var(--charcoal))' }}
          aria-label="X (Twitter)"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link w-12 h-12 flex items-center justify-center border-2 border-charcoal bg-background hover:bg-charcoal hover:text-background transition-colors"
          style={{ boxShadow: '3px 3px 0 0 hsl(var(--charcoal))' }}
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="https://github.com/vincesmandres"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link w-12 h-12 flex items-center justify-center border-2 border-charcoal bg-background hover:bg-charcoal hover:text-background transition-colors"
          style={{ boxShadow: '3px 3px 0 0 hsl(var(--charcoal))' }}
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      {/* Decorative text */}
      <p className="profile-block opacity-0 mt-8 text-sm text-muted-foreground font-mono text-center max-w-xs">
        Vibecoder Challenge
        <br />
        <span className="text-xs">13 Retos / Platzi 2025</span>
      </p>
    </div>
  );
}
