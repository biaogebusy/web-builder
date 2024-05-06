// https://tailwindcss.com/docs/content-configuration
const sizes = ["sm", "md", "lg"];

function getGapClasses() {
  const gapClasses = [];
  for (let i = 0; i <= 20; i++) {
    gapClasses.push(`gap-${i}`);
    for (const size of sizes) {
      gapClasses.push(`${size}:gap-${i}`);
    }
  }
  return gapClasses;
}

function getFlexClasses() {
  const FlexClasses = [];
  for (let i = 1; i <= 12; i++) {
    FlexClasses.push(`flex-${i}/12`);
    for (const size of sizes) {
      FlexClasses.push(`${size}:flex-${i}/12`);
    }
  }

  return FlexClasses;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts,mdx}"],
    safelist: [
      ...getGapClasses(),
      ...getFlexClasses(),
      "flex-row-reverse",
      "flex-col-reverse",
      "flex-wrap-reverse",
      "flex-nowrap",
    ],
  },
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {},
    flex: {
      "1/12": "0 0 8.33%",
      "2/12": "0 0 16.66%",
      "3/12": "0 0 25%",
      "4/12": "0 0 33.33%",
      "5/12": "0 0 41.66%",
      "6/12": "0 0 50%",
      "7/12": "0 0 58.33%",
      "8/12": "0 0 66.66%",
      "9/12": "0 0 75%",
      "10/12": "0 0 83.33%",
      "11/12": "0 0 91.66%",
      "12/12": "0 0 100%",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
