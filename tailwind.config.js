// https://tailwindcss.com/docs/content-configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts,mdx}"],
  },
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280x",
      xl: "1920px",
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
