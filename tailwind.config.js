/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "prussian-blue": "#8D6E63",
        "blue-green": "#3C3F42",
        "caribbean-green": "#FFB6A1",
        crayola: "#FFE0B2",
        "infra-red": "#556B2F",
      },
    },
  },
  plugins: [],
};


