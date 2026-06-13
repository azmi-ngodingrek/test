/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        ink: '#09090B',
        canvas: '#18181B',
        slate: '#3F3F46',
        cta: '#2563EB',
        paper: '#FAFAFA',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.28)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
