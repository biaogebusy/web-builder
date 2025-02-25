// https://tailwindcss.com/docs/content-configuration
const sizes = ['sm', 'md', 'lg'];

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

function getSizes(size) {
  let sizesClasses = [];
  const array = [
    ...Array.from({ length: 12 }, (_, i) => `${size}-${i}`),
    ...Array.from({ length: 5 }, (_, i) => `${size}-${12 + i * 2}`),
    ...Array.from({ length: 20 }, (_, i) => `${size}-${16 + i * 4}`),
    `${size}-auto`,
    `${size}-full`,
    `${size}-screen`,
  ];
  array.map(item => {
    sizesClasses.push(item);
    for (const size of sizes) {
      sizesClasses.push(`${size}:${item}`);
    }
  });
  return [...new Set(sizesClasses)];
}

function getLayoutClasses(layout) {
  const prefix = layout === 'flex' ? '/12' : '';
  const FlexClasses = [];
  for (let i = 1; i <= 12; i++) {
    FlexClasses.push(`${layout}-${i}${prefix}`);
    for (const size of sizes) {
      FlexClasses.push(`${size}:${layout}-${i}${prefix}`);
    }
  }

  return FlexClasses;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,mdx}'],
  safelist: [
    ...getGapClasses(),
    ...getSizes('w'),
    ...getSizes('h'),
    ...getLayoutClasses('flex'),
    ...getLayoutClasses('col-span'),
    'flex-row-reverse',
    'flex-col-reverse',
    'flex-wrap-reverse',
    'flex-nowrap',
    'grid-flow-col',
    'grid-flow-row',
    'justify-items-start',
    'justify-items-end',
    'justify-items-center',
    'justify-items-baseline',
    'justify-items-stretch',
    'items-start',
    'items-end',
    'items-center',
    'items-baseline',
    'items-stretch',
    'order-1',
    'order-0',
    '!overflow-visible',
    '!absolute',
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1470px',
    },
    extend: {},
    flex: {
      '1/12': '0 0 8.33%',
      '2/12': '0 0 16.66%',
      '3/12': '0 0 25%',
      '4/12': '0 0 33.33%',
      '5/12': '0 0 41.66%',
      '6/12': '0 0 50%',
      '7/12': '0 0 58.33%',
      '8/12': '0 0 66.66%',
      '9/12': '0 0 75%',
      '10/12': '0 0 83.33%',
      '11/12': '0 0 91.66%',
      '12/12': '0 0 100%',
      '1': '1 1 0%',
      'auto': '1 1 auto',
      'initial': '0 1 auto',
      'inherit': 'inherit',
      'none': 'none',
      '2': '2 2 0%',
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
};
