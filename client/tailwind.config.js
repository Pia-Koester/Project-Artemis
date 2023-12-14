/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#64AFC2",
          secondary: "#624595",
          accent: "#F5A786",
          neutral: "#E1E1E0",
        },
      },

      "dark",
    ],
  },

  plugins: [require("daisyui")],
};
