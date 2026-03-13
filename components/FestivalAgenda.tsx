'use client';

import { festivalData } from '@/lib/festivalData';
import { useState } from 'react';

export default function FestivalAgenda() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="bg-khaki px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-4">
            AGENDA
          </h2>
          <p className="text-lg text-charcoal opacity-70">
            3 días de transformación sonora
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {festivalData.schedule.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-6 py-3 font-mono font-bold border-2 transition-all duration-200 ${
                activeDay === i
                  ? 'bg-charcoal text-khaki border-charcoal'
                  : 'bg-bone text-charcoal border-charcoal hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
              style={{
                boxShadow: activeDay === i ? '2px 2px 0 0 hsl(var(--bone))' : '2px 2px 0 0 hsl(var(--charcoal))'
              }}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="space-y-4">
          {festivalData.schedule[activeDay].events.map((event, i) => (
            <div
              key={i}
              className="border-2 border-charcoal bg-bone p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:translate-x-[-2px] transition-transform duration-200"
              style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}
            >
              <div className="flex-1">
                <p className="text-xs font-mono text-charcoal opacity-60 mb-2">{event.time}</p>
                <h3 className="text-lg font-bold text-charcoal">{event.artist}</h3>
              </div>
              <div className="px-3 py-1 bg-khaki text-charcoal text-xs font-mono font-bold">
                {event.stage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
