/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./src/**/*.{html,js,jsx,ts,svelte}"],
  theme: {
    extend: {
      fontFamily: {
        pressStart2P: ['"Press Start 2P"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
};
