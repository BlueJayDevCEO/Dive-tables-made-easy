import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#032d46',
        aqua: '#0ea5a4',
      },
    },
  },
  plugins: [],
} satisfies Config;
