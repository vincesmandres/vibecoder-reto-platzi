import { tickets } from '@/lib/data';

export default function Tickets() {
  return (
    <section id="tickets" className="bg-background-alt py-20 md:py-section section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            ENTRADAS
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-light">
            Elige tu experiencia
          </p>
        </div>

        {/* Desktop: Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left py-4 px-6 font-display font-bold text-foreground">
                  Tipo de Entrada
                </th>
                <th className="text-left py-4 px-6 font-display font-bold text-foreground">
                  Precio
                </th>
                <th className="text-left py-4 px-6 font-display font-bold text-foreground">
                  Incluye
                </th>
                <th className="text-left py-4 px-6 font-display font-bold text-foreground">
                  Stock
                </th>
                <th className="text-right py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className={`border-b border-accent/20 hover:bg-background transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-background-alt'
                  } last:border-b-0`}
                >
                  <td className="py-6 px-6 text-base font-display font-bold text-foreground">
                    {ticket.type}
                  </td>
                  <td className="py-6 px-6 text-xl font-display font-bold text-accent">
                    {ticket.price}
                  </td>
                  <td className="py-6 px-6 text-base text-text-secondary">
                    {ticket.includes}
                  </td>
                  <td className="py-6 px-6 text-sm text-text-tertiary">
                    {ticket.stock}
                  </td>
                  <td className="py-6 px-6 text-right">
                    <button className="btn-primary text-xs px-6 py-2">
                      Comprar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Cards */}
        <div className="md:hidden grid gap-6">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="border border-accent/30 p-6 space-y-4"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Tipo
                </p>
                <h3 className="text-lg font-display font-bold text-foreground">
                  {ticket.type}
                </h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Precio
                </p>
                <p className="text-2xl font-display font-bold text-accent">
                  {ticket.price}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Incluye
                </p>
                <p className="text-sm text-text-secondary">
                  {ticket.includes}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-2">
                  Stock
                </p>
                <p className="text-sm text-text-tertiary">
                  {ticket.stock}
                </p>
              </div>

              <button className="btn-primary w-full py-3 text-sm">
                Comprar
              </button>
            </div>
          ))}
        </div>

        {/* Nota legal */}
        <p className="text-xs text-text-tertiary mt-12 text-center">
          Las entradas no son reembolsables. Consulta términos y condiciones completos.
        </p>
      </div>
    </section>
  );
}
