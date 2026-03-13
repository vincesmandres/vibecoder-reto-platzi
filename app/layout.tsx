import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RESONANCIA | Festival de Música, Arte y Tecnología',
  description: 'Donde el sonido se vuelve visible. Festival de 3 días en Bogotá con artistas internacionales de música electrónica y arte sonoro.',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <style>{`
          :root {
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
