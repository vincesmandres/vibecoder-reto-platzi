export default function Hero() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center pt-20 md:pt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        {/* Animación de ondas de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-96 h-96 opacity-10 wave-animation">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path d="M0,50 Q50,30 100,50 T200,50" stroke="#00d9ff" strokeWidth="2" fill="none" />
              <path d="M0,55 Q50,35 100,55 T200,55" stroke="#00d9ff" strokeWidth="1.5" fill="none" />
              <path d="M0,45 Q50,25 100,45 T200,45" stroke="#00d9ff" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-6 md:mb-8 leading-tight">
            RESONANCIA
          </h1>
          
          <p className="text-lg md:text-2xl text-text-secondary font-light mb-4 md:mb-8 leading-relaxed">
            Donde el sonido se vuelve visible
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <span className="text-sm md:text-base text-text-tertiary font-mono">23-25 AGOSTO 2024</span>
            <span className="hidden md:block w-px h-8 bg-accent/30"></span>
            <span className="text-sm md:text-base text-text-tertiary font-mono">BOGOTÁ, COLOMBIA</span>
          </div>

          <button className="btn-primary text-base md:text-lg px-8 md:px-12 py-4 md:py-5">
            Comprar Entradas
          </button>

          <p className="text-xs md:text-sm text-text-tertiary mt-12 md:mt-16">
            Festival de 3 días de música, arte y tecnología
          </p>
        </div>
      </div>
    </section>
  );
}
