import { venue } from '@/lib/data';

export default function Location() {
  return (
    <section id="ubicacion" className="bg-background py-20 md:py-section section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            UBICACIÓN
          </h2>
        </div>

        {/* Grid: Mapa + Info */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Mapa Placeholder */}
          <div className="w-full aspect-video md:aspect-auto md:min-h-96 bg-background-alt border border-accent/20 flex items-center justify-center rounded-sm">
            <div className="text-center">
              <div className="text-5xl mb-4 text-accent/30">📍</div>
              <p className="text-sm text-text-tertiary">
                Parque Distrital de la Ciénaga<br/>
                Bogotá, Colombia
              </p>
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Venue */}
            <div>
              <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                Venue
              </p>
              <p className="text-lg md:text-xl font-display font-bold text-foreground">
                {venue.name}
              </p>
            </div>

            {/* Dirección */}
            <div>
              <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                Dirección
              </p>
              <p className="text-base md:text-lg text-text-secondary">
                {venue.address}
              </p>
            </div>

            {/* Transporte */}
            <div>
              <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                Transporte
              </p>
              <p className="text-base md:text-lg text-text-secondary">
                {venue.transport}
              </p>
            </div>

            {/* Parqueadero */}
            <div>
              <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                Parqueadero
              </p>
              <p className="text-base md:text-lg text-text-secondary">
                {venue.parking}
              </p>
            </div>

            {/* Contacto */}
            <div className="flex gap-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Email
                </p>
                <a href={`mailto:${venue.email}`} className="text-base md:text-lg text-accent hover:underline">
                  {venue.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Tel
                </p>
                <a href={`tel:${venue.phone}`} className="text-base md:text-lg text-accent hover:underline">
                  {venue.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
