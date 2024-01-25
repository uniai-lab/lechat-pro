/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class', // or 'media' or 'class'，
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundColor: ['dark'],
    }
  },
  
  plugins: [require("@tailwindcss/typography")],
};
