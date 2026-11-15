import type { Config } from 'tailwindcss';

// v2 (2026-11-16): dark-first "Navy & Signal" palette from the approved
// mockups. Shape + label carry meaning, never colour alone.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1e3a5f', light: '#2b4c7e' },
        ps: {
          bg: '#0b1524',
          bar: '#0f1c2e',
          surface: '#13233a',
          raised: '#1a2e49',
          select: '#16304d',
          line: '#24395a',
          line2: '#3a5579',
          ink: '#eef3f8',
          muted: '#a3b3c6',
          dim: '#8195ab',
          green: '#3fd17a',
          greenbg: '#123a2a',
          greenline: '#2f7a52',
          greenink: '#b9f0cf',
          amber: '#f4b54a',
          amberbg: '#241d10',
          amberline: '#8a6a2c',
          amberink: '#f6dcae',
          blue: '#6cb4ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
