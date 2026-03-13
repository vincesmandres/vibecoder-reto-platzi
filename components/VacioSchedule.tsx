'use client';

import TopologyMesh from './TopologyMesh';

const scheduleData = {
  friday: [
    { time: '20:00', artist: 'Paula Temple', duration: '60 min' },
    { time: '21:15', artist: 'FJAAK', duration: '90 min' },
    { time: '22:45', artist: 'I Hate Models', duration: '90 min' },
    { time: '00:15', artist: 'Kobosil', duration: '120 min' },
  ],
  saturday: [
    { time: '21:00', artist: 'Amelie Lens', duration: '120 min' },
    { time: '23:00', artist: 'Paula Temple', duration: '90 min' },
    { time: '00:30', artist: 'FJAAK', duration: '120 min' },
  ],
};

export default function VacioSchedule({ transitionProgress = 0 }: { transitionProgress?: number }) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-bone overflow-hidden">
      {/* Subtle topology mesh background */}
      <TopologyMesh isHero={false} isMorphing={false} transitionProgress={transitionProgress} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-5xl md:text-6xl font-light text-charcoal tracking-[-0.01em] mb-20">
          Schedule
        </h2>

        {/* Schedule grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Friday */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '0ms' }}>
            <h3 className="text-lg font-light text-charcoal/70 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-charcoal/10">
              Friday 18
            </h3>
            <div className="space-y-6">
              {scheduleData.friday.map((event, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-mono text-sm text-charcoal/60 group-hover:text-charcoal transition-colors duration-300">
                      {event.time}
                    </p>
                    <p className="font-mono text-xs text-charcoal/40">{event.duration}</p>
                  </div>
                  <p className="text-base md:text-lg font-light text-charcoal group-hover:text-charcoal/80 transition-colors duration-300">
                    {event.artist}
                  </p>
                  <div className="h-px bg-charcoal/5 mt-4 group-hover:bg-charcoal/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Saturday */}
          <div className="opacity-0 animate-slide-left" style={{ animationDelay: '150ms' }}>
            <h3 className="text-lg font-light text-charcoal/70 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-charcoal/10">
              Saturday 19
            </h3>
            <div className="space-y-6">
              {scheduleData.saturday.map((event, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-mono text-sm text-charcoal/60 group-hover:text-charcoal transition-colors duration-300">
                      {event.time}
                    </p>
                    <p className="font-mono text-xs text-charcoal/40">{event.duration}</p>
                  </div>
                  <p className="text-base md:text-lg font-light text-charcoal group-hover:text-charcoal/80 transition-colors duration-300">
                    {event.artist}
                  </p>
                  <div className="h-px bg-charcoal/5 mt-4 group-hover:bg-charcoal/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
