/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      artemisTheme: {
        "primary": "#64AFC2",
        "secondary": "#6B6B6B"
      }
    }, "dark", "cupcake"],
  },
  
  plugins: [require("daisyui")],
}

