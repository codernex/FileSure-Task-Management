/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [tailwindScrollbar],
};
