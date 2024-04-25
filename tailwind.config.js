// https://tailwindcss.com/docs/content-configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,mdx}"],
  theme: {
    screens: {
      sm: { min: "60px", max: "959px" },
      md: { min: "960px", max: "1279px" },
      lg: { min: "1280px", max: "1919px" },
      xl: { min: "1920px", max: "5000px" },
      "2xl": { min: "5001px" },
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
