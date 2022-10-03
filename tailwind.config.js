/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      xs: "425px",
      xsmax: { max: "425px" },
    },
    extend: {},
  },
  plugins: [],
};
