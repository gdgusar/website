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
        google: {
          blue: '#174EA6',
          mediumBlue: '#4285F4',
          lightBlue: '#D2E3FC',
          red: '#A50E0E',
          mediumRed: '#EA4335',
          lightRed: '#FAD2CF',
          orange: '#E37400',
          yellow: '#FBBC04',
          lightYellow: '#FEFEC3',
          green: '#0D652D',
          mediumGreen: '#34A853',
          lightGreen: '#CEEAD6',
          grey: '#9AA0A6',
          lightGrey: '#F1F3F4',
          black: '#202124',
        },
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
