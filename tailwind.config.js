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
          black: '#141414',
        },
      },
    },
  },
  plugins: [],
};
