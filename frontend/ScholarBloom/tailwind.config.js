/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  //  Include all JS/JSX/TS/TSX files in src
    "./public/**/*.html",        //  Include any HTML files in public (if applicable)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};