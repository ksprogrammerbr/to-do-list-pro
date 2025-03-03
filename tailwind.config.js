/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F7CFD8",
          200: "#F4F8D3",
          300: "#A6F1E0",
          400: "#73C7C7",
        },
      },
    },
  },
  plugins: [],
};
