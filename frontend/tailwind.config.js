/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
  theme: {
    extend: {
      color: {
        primary: "#4B5563",
        secondary: "#FBBF24",
        accent: "#3B82F6",
        background: "#F9FAFB",
        text: "#111827",
      },
      fontFamily: {
        funky: ["'Fredoka'", "cursive"],
      },
    },
  },
  plugins: [],
};
