/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: { // Imagen de fondo
        "hero-pattern": "url('/bg-pattern.svg')"
      },
    },
  },
  plugins: [],
}

