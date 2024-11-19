/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'gradient-wave': 'wave 3s infinite ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.6' },
          '50%': { transform: 'translateX(20px)', opacity: '0.8' },
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
