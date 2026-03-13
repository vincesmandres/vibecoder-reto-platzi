'use client';

import TopologyMesh from './TopologyMesh';

const performers = [
  {
    name: 'Amelie Lens',
    country: 'Belgium',
    bio: 'Architect of industrial sound',
  },
  {
    name: 'Kobosil',
    country: 'Germany',
    bio: 'Masters of rhythmic intensity',
  },
  {
    name: 'FJAAK',
    country: 'Germany',
    bio: 'Purveyors of sonic extremism',
  },
  {
    name: 'I Hate Models',
    country: 'Romania',
    bio: 'Creators of hypnotic landscapes',
  },
  {
    name: 'Paula Temple',
    country: 'UK',
    bio: 'Pioneer of modular experimentation',
  },
];

export default function VacioPerformers({ transitionProgress = 0 }: { transitionProgress?: number }) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-bone overflow-hidden">
      {/* Subtle topology mesh background */}
      <TopologyMesh isHero={false} isMorphing={false} transitionProgress={transitionProgress} />

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-charcoal tracking-[-0.01em] leading-tight">
              Curated<br />Selection
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-charcoal/60 font-light leading-relaxed">
              Five of hardtechno's most uncompromising voices converge on a single platform. No compromises. No safety. Pure sonic architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Performers grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
          {performers.map((performer, index) => (
            <div 
              key={index} 
              className="group opacity-0 animate-slide-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Performer card */}
              <div className="relative pb-8 border-b-2 border-charcoal/10 hover:border-charcoal/30 transition-all duration-500">
                {/* Number indicator */}
                <div className="inline-block mb-6 px-3 py-2 border border-charcoal/20 text-xs text-charcoal/60 tracking-[0.2em] uppercase">
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                {/* Name */}
                <h3 className="text-xl md:text-lg font-light text-charcoal mb-2 tracking-tight group-hover:text-charcoal/80 transition-colors duration-300">
                  {performer.name}
                </h3>

                {/* Bio */}
                <p className="text-xs md:text-sm text-charcoal/50 font-light leading-relaxed mb-4 italic">
                  {performer.bio}
                </p>

                {/* Country */}
                <p className="text-xs text-charcoal/40 uppercase tracking-[0.15em]">
                  {performer.country}
                </p>

                {/* Hover glow */}
                <div className="absolute -inset-4 bg-charcoal/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[-1]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="relative z-10 max-w-7xl mx-auto mt-24 pt-12 border-t border-charcoal/5" />
    </section>
  );
}
