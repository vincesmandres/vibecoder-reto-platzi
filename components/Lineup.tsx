import { artists } from '@/lib/data';

export default function Lineup() {
  return (
    <section id="lineup" className="bg-background py-20 md:py-section section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            LINEUP
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-light">
            Artistas de 12 países transforman el espacio sonoro
          </p>
        </div>

        {/* Grid de Artistas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group cursor-pointer"
            >
              {/* Imagen Placeholder */}
              <div className="relative mb-4 aspect-square bg-background-alt overflow-hidden border border-accent/20 hover:border-accent/50 transition-colors duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-2xl md:text-4xl font-display font-bold text-accent/30 text-balance">
                      {artist.name.charAt(0)}
                    </div>
                  </div>
                </div>
                {/* Línea de acento en hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
              </div>

              {/* Info del Artista */}
              <h3 className="text-sm md:text-base font-display font-bold text-foreground mb-1 group-hover:text-accent transition-colors duration-200">
                {artist.name}
              </h3>
              <p className="text-xs md:text-sm text-text-tertiary">
                {artist.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
