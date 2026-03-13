import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        'background-alt': '#1a1a1a',
        foreground: '#f5f5f5',
        'text-secondary': '#b0b0b0',
        'text-tertiary': '#808080',
        accent: '#00d9ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-space-grotesk)'],
      },
    },
  },
  plugins: [],
};

export default config;
