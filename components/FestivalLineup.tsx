import { festivalData } from '@/lib/festivalData';

export default function FestivalLineup() {
  return (
    <section className="bg-bone px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-4">
            LINEUP
          </h2>
          <p className="text-lg text-charcoal opacity-70">
            Artistas de 12 países transforman el espacio sonoro
          </p>
        </div>

        {/* Artists grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {festivalData.lineup.map((artist, i) => (
            <div
              key={i}
              className="border-2 border-charcoal bg-bone p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-200 group"
              style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}
            >
              {/* Number */}
              <div className="text-xs font-mono text-charcoal opacity-50 mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Artist name */}
              <h3 className="text-sm font-bold text-charcoal mb-2 leading-tight">
                {artist.name}
              </h3>

              {/* Country & Genre */}
              <div className="space-y-1 text-xs text-charcoal opacity-60">
                <p className="font-mono">{artist.country}</p>
                <p className="font-light">{artist.genre}</p>
              </div>

              {/* Decorative line */}
              <div className="mt-4 h-px bg-charcoal opacity-20 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
