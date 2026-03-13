'use client';

export default function VacioLocation() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Content */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '0ms' }}>
            <h2 className="text-5xl md:text-6xl font-light text-bone tracking-[-0.01em] mb-12">
              Location
            </h2>

            <div className="space-y-8">
              {/* Venue */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-2">Venue</p>
                <p className="text-2xl font-light text-bone">Centro Cultural Manta</p>
                <p className="text-base text-khaki/60 font-light mt-2">Oceanfront, Manta Ecuador</p>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-2">Address</p>
                <p className="text-base text-bone font-light leading-relaxed">
                  Avenida Malecón, Sector Playa Murciélago<br />
                  Manta 130104, Ecuador
                </p>
              </div>

              {/* Transport */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-2">Transport</p>
                <ul className="space-y-2 text-base text-bone font-light">
                  <li>International Airport: 20km (30 min drive)</li>
                  <li>City Center: 5km (10 min ride)</li>
                  <li>Shuttle service available on-site</li>
                </ul>
              </div>

              {/* Accessibility */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-khaki/50 mb-2">Accessibility</p>
                <p className="text-base text-bone font-light">
                  Full accessibility for mobility assistance. Contact: access@vacio.ec
                </p>
              </div>

              {/* CTA */}
              <button className="mt-8 px-6 py-3 border border-bone text-bone hover:bg-bone hover:text-charcoal transition-all duration-300 text-sm uppercase tracking-[0.15em] font-light">
                Get Directions
              </button>
            </div>
          </div>

          {/* Right: Map placeholder */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '150ms' }}>
            <div className="relative w-full aspect-square md:aspect-auto md:h-96 border border-khaki/20 bg-charcoal/50 flex items-center justify-center overflow-hidden group">
              {/* Placeholder map visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-khaki/5 via-transparent to-khaki/5" />
              
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c4b7a6" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Location pin */}
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-khaki/60 flex items-center justify-center group-hover:border-khaki transition-colors duration-300">
                  <div className="w-2 h-2 bg-khaki rounded-full" />
                </div>
                <p className="text-sm text-khaki/60 font-light tracking-wide">Manta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
