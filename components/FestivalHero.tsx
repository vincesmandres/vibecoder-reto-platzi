import Link from 'next/link';

export default function FestivalHero() {
  return (
    <section className="relative min-h-screen bg-bone flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-charcoal hover:translate-x-[-2px] transition-transform duration-200 font-mono text-sm z-10"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </Link>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-block px-4 py-2 border-2 border-charcoal bg-khaki text-charcoal font-mono text-xs font-bold"
             style={{ boxShadow: '2px 2px 0 0 hsl(var(--charcoal))' }}>
          23-25 AGOSTO 2024
        </div>

        {/* Main title */}
        <h1 className="text-6xl md:text-8xl font-bold text-charcoal leading-tight">
          RESONANCIA
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-charcoal opacity-80 font-light">
          Donde el sonido se vuelve visible
        </p>

        {/* Location */}
        <p className="text-lg text-charcoal font-mono opacity-60">
          Bogotá, Colombia
        </p>

        {/* CTA */}
        <div className="pt-8">
          <a
            href="#tickets"
            className="inline-block px-8 py-4 bg-charcoal text-bone font-bold border-2 border-charcoal hover:translate-y-[-2px] transition-transform duration-200"
            style={{ boxShadow: '3px 3px 0 0 hsl(var(--khaki))' }}
          >
            Comprar Entradas
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-charcoal opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
