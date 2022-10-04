/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      xs: "500px",
      lg: "1023px",
      xl: "1279px",
      md: "767px",
      sm: "670px",
      xsmax: { max: "500px" },
      xlmax: { max: "1279px" },
      lgmax: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      mdmax: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      smmax: { max: "670px" },
      // => @media (max-width: 650px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
