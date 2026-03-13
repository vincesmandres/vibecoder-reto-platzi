'use client';

import TopologyMesh from './TopologyMesh';

export default function VacioLocation({ transitionProgress = 0 }: { transitionProgress?: number }) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-bone overflow-hidden">
      {/* Subtle topology mesh background */}
      <TopologyMesh isHero={false} isMorphing={false} transitionProgress={transitionProgress} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Content */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '0ms' }}>
            <h2 className="text-5xl md:text-6xl font-light text-charcoal tracking-[-0.01em] mb-12">
              Location
            </h2>

            <div className="space-y-8">
              {/* Venue */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2">Venue</p>
                <p className="text-2xl font-light text-charcoal">Parque Distrital de la Ciénaga</p>
                <p className="text-base text-charcoal/60 font-light mt-2">Oceanfront, Manta Ecuador</p>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2">Address</p>
                <p className="text-base text-charcoal font-light leading-relaxed">
                  Carrera 7 #100-50<br />
                  Manta 130104, Ecuador
                </p>
              </div>

              {/* Transport */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2">Transport</p>
                <ul className="space-y-2 text-base text-charcoal/80 font-light">
                  <li>International Airport: 20km (30 min drive)</li>
                  <li>City Center: 5km (10 min ride)</li>
                  <li>Shuttle service available on-site</li>
                </ul>
              </div>

              {/* Accessibility */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2">Accessibility</p>
                <p className="text-base text-charcoal/80 font-light">
                  Full accessibility for mobility assistance. Contact: access@vacio.ec
                </p>
              </div>

              {/* CTA */}
              <button className="mt-8 px-6 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-bone transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light">
                Get Directions
              </button>
            </div>
          </div>

          {/* Right: Map placeholder */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '150ms' }}>
            <div className="relative w-full aspect-square md:aspect-auto md:h-96 border border-charcoal/20 bg-charcoal/5 flex items-center justify-center overflow-hidden group">
              {/* Placeholder map visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/5 via-transparent to-charcoal/5" />
              
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1612" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Location pin */}
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-charcoal/40 flex items-center justify-center group-hover:border-charcoal/60 transition-colors duration-300">
                  <div className="w-2 h-2 bg-charcoal rounded-full" />
                </div>
                <p className="text-sm text-charcoal/60 font-light tracking-wide">Manta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
