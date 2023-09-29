/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-green": "#74ac00",
        "background-gray": " #1c1b22",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};
