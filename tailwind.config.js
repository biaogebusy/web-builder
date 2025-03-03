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
    'order-1',
    'order-0',
    '!overflow-visible',
    '!absolute',
    {
      pattern: /^p[xytbrl]?-(1[0-9]|20|[1-9])$/,
    },
    {
      pattern: /^m[xytbrl]?-(1[0-9]|20|[1-9])$/,
    },
    // 布局类
    { pattern: /^(block|inline|flex|grid|hidden|table|flow-root)$/ },
    { pattern: /^(absolute|relative|fixed|sticky|static)$/ },
    { pattern: /^overflow-(auto|hidden|visible|scroll)$/ },
    { pattern: /^z-([0-9]|10|20|30|40|50|auto)$/ }, // 层级

    // 尺寸类
    { pattern: /^(w|h)-((1\/[2-4])|full|screen|min|max|auto|[0-9]{1,3})$/ }, // 支持 w-1/2, h-full 等

    // 排版类
    { pattern: /^text-(left|center|right|justify)$/ },
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/ },
    { pattern: /^font-(thin|light|normal|medium|semibold|bold|black)$/ },
    { pattern: /^(italic|not-italic|uppercase|lowercase|capitalize|normal-case)$/ },

    // 颜色类 (按项目主色调调整)
    {
      pattern:
        /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern:
        /^text-(white|black|current|inherit|transparent|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern:
        /^border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)$/,
    },

    // 边框与圆角
    { pattern: /^border(-[tbrl])?-(0|2|4|8)$/ },
    { pattern: /^rounded(-[tlbr]{1,2})?(|none|sm|md|lg|xl|2xl|3xl|full)$/ },

    // 阴影与透明度
    { pattern: /^shadow(-sm|md|lg|xl|2xl|none|inner)$/ },
    { pattern: /^opacity-(0|5|10|20|30|40|50|60|70|75|80|90|95|100)$/ },

    // 过渡与动画
    { pattern: /^transition(-none|all|colors|opacity|shadow|transform)$/ },
    { pattern: /^duration-(75|100|150|200|300|500|700|1000)$/ },
    { pattern: /^ease-(linear|in|out|in-out)$/ },

    // Flex/Grid 布局
    {
      pattern:
        /^(items|justify|content|place-items|place-content)-(start|end|center|between|around|evenly|stretch)$/,
    },
    { pattern: /^gap-([0-9]|10|12|14|16|20|24|28|32|36|40|48|56|64|72|80|96)$/ },
    { pattern: /^grid-cols-([1-9]|10|11|12|none)$/ },
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
