import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Rubik_Microbe } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const rubikMicrobe = Rubik_Microbe({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-microbe',
});

export const metadata: Metadata = {
  title: 'Maikel Andres Vinces Mendoza | Vibecoder Retos',
  description: '13 retos de desarrollo web - Portfolio de proyectos creativos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable} ${rubikMicrobe.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
