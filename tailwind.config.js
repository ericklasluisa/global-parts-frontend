/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "global": {
          50: "#f3f5fa",
          100: "#e9edf6",
          200: "#d7dcee",
          300: "#bec6e3",
          400: "#a3abd6",
          500: "#8c91c8",
          600: "#7474b7",
          700: "#6362a0",
          800: "#515182",
          900: "#464769",
          "principal": "#1a1a27",
        },
      },
    },
  },
  plugins: [],
};
