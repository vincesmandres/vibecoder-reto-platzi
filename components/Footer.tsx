export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-accent/30 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Left: Copyright & Location */}
          <div>
            <p className="font-display font-bold text-foreground mb-2">
              RESONANCIA
            </p>
            <p className="text-sm text-text-tertiary">
              © {year} RESONANCIA Festival
            </p>
            <p className="text-sm text-text-tertiary">
              Bogotá, Colombia
            </p>
          </div>

          {/* Center: Social Links */}
          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-4">
              Síguenos
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Spotify', 'YouTube', 'Twitch'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Legal */}
          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary font-mono mb-4">
              Legal
            </p>
            <div className="flex flex-col gap-2">
              {['Términos', 'Privacidad', 'Contacto'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 pt-8">
          <p className="text-xs text-text-tertiary text-center">
            Crafted with care for the resonance of sound and culture
          </p>
        </div>
      </div>
    </footer>
  );
}
