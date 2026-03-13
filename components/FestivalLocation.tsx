import { festivalData } from '@/lib/festivalData';

export default function FestivalLocation() {
  return (
    <section className="bg-bone px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-4">
            UBICACIÓN
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              { label: 'VENUE', value: festivalData.venue.name },
              { label: 'DIRECCIÓN', value: festivalData.venue.address },
              { label: 'TELÉFONO', value: festivalData.venue.phone },
              { label: 'EMAIL', value: festivalData.venue.email },
              { label: 'PARQUEO', value: festivalData.venue.parking },
              { label: 'TRANSPORTE', value: festivalData.venue.transport },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-khaki pl-4">
                <p className="text-xs font-mono text-charcoal opacity-60 mb-1">
                  {item.label}
                </p>
                <p className="text-base text-charcoal">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="border-2 border-charcoal bg-khaki h-96 flex items-center justify-center"
            style={{ boxShadow: '4px 4px 0 0 hsl(var(--charcoal))' }}
          >
            <div className="text-center">
              <p className="text-charcoal font-mono text-sm mb-4 opacity-70">
                Mapa interactivo
              </p>
              <p className="text-charcoal text-xs opacity-50">
                Parque Distrital de la Ciénaga<br />
                Bogotá, Colombia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
