'use client';

import { useState } from 'react';
import { agendaEvents } from '@/lib/data';

export default function Agenda() {
  const [activeDay, setActiveDay] = useState(0);
  const days = agendaEvents;

  return (
    <section id="agenda" className="bg-background-alt py-20 md:py-section section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            AGENDA
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-light">
            3 días de transformación sonora
          </p>
        </div>

        {/* Tabs para días (mobile) */}
        <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeDay === index
                  ? 'bg-accent text-background'
                  : 'border border-accent/30 text-text-secondary hover:border-accent/50'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Mobile: Agenda del día activo */}
        <div className="md:hidden">
          <div className="space-y-4">
            {days[activeDay].events.map((event, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-accent/20 last:border-b-0">
                <div className="font-mono text-xs md:text-sm text-text-tertiary min-w-fit">
                  {event.time}
                </div>
                <div>
                  <p className="text-sm md:text-base font-display font-bold text-foreground">
                    {event.artist}
                  </p>
                  <p className="text-xs md:text-sm text-accent">
                    {event.stage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid de 3 días */}
        <div className="hidden md:grid grid-cols-3 gap-12">
          {days.map((day) => (
            <div key={day.day}>
              <h3 className="text-xl font-display font-bold text-foreground mb-8">
                {day.day}
              </h3>
              <div className="space-y-6">
                {day.events.map((event, index) => (
                  <div key={index} className="pb-6 border-b border-accent/20 last:border-b-0">
                    <div className="font-mono text-sm text-text-tertiary mb-2">
                      {event.time}
                    </div>
                    <p className="text-base font-display font-bold text-foreground mb-1">
                      {event.artist}
                    </p>
                    <p className="text-sm text-accent">
                      {event.stage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
