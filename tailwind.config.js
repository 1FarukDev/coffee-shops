/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "rgba(34, 21, 24, 1)",
        secondary: "rgba(84, 55, 43, 1)",
        cardText: " rgba(247, 225, 188, 0.3)"
      },
      fontFamily: {
        Dancing: "'Dancing Script', 'Helvetica Neue', cursive"
      }
    },
  },
  plugins: [],
};
