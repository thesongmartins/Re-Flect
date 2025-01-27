/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "san-serif"]
      },
      colors: {
        hero: "#F7F9F5"
      }
    },
  },
  plugins: [],
}

