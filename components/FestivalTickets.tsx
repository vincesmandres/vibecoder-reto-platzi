import { festivalData } from '@/lib/festivalData';

export default function FestivalTickets() {
  return (
    <section id="tickets" className="bg-khaki px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-4">
            ENTRADAS
          </h2>
          <p className="text-lg text-charcoal opacity-70">
            Elige tu experiencia
          </p>
        </div>

        {/* Tickets grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivalData.tickets.map((ticket, i) => (
            <div
              key={i}
              className="border-2 border-charcoal bg-bone p-8 flex flex-col hover:translate-y-[-4px] transition-transform duration-200"
              style={{ boxShadow: '3px 3px 0 0 hsl(var(--charcoal))' }}
            >
              {/* Type */}
              <h3 className="text-lg font-bold text-charcoal mb-4">
                {ticket.type}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-charcoal">
                  ${ticket.price.toLocaleString()}
                </p>
                <p className="text-xs font-mono text-charcoal opacity-60 mt-2">
                  COP
                </p>
              </div>

              {/* Includes */}
              <div className="mb-8 flex-1">
                <p className="text-xs font-mono text-charcoal opacity-60 mb-3">
                  INCLUYE
                </p>
                <p className="text-sm text-charcoal">
                  {ticket.includes}
                </p>
              </div>

              {/* Stock */}
              <div className="mb-6 pb-6 border-b border-charcoal opacity-30">
                <p className="text-xs font-mono text-charcoal opacity-60">
                  {typeof ticket.stock === 'number' ? `${ticket.stock} disponibles` : ticket.stock}
                </p>
              </div>

              {/* CTA */}
              <button
                className="w-full px-4 py-3 bg-charcoal text-bone font-bold border border-charcoal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-200"
                style={{ boxShadow: '2px 2px 0 0 hsl(var(--khaki))' }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>

        {/* Legal */}
        <p className="text-xs text-charcoal opacity-50 text-center mt-12">
          Las entradas no son reembolsables. Consulta términos y condiciones completos.
        </p>
      </div>
    </section>
  );
}
