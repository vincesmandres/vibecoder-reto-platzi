export default function FestivalFooter() {
  return (
    <footer className="bg-charcoal text-bone px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-bone opacity-20">
          {/* Left */}
          <div>
            <h3 className="font-bold text-lg mb-2">RESONANCIA</h3>
            <p className="text-sm opacity-70">
              Festival de música, arte y tecnología
            </p>
          </div>

          {/* Center - Socials */}
          <div>
            <p className="text-xs font-mono opacity-60 mb-4 uppercase">Redes</p>
            <div className="flex gap-6 text-sm">
              {['Instagram', 'Spotify', 'YouTube', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover:text-khaki transition-colors duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Legal */}
          <div>
            <p className="text-xs font-mono opacity-60 mb-4 uppercase">Legal</p>
            <div className="flex flex-col gap-2 text-sm">
              {['Términos', 'Privacidad', 'Contacto'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-khaki transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs opacity-60">
          <p>© 2024 RESONANCIA Festival</p>
          <p>Bogotá, Colombia</p>
        </div>
      </div>
    </footer>
  );
}
