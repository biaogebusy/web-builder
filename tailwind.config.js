// https://tailwindcss.com/docs/content-configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,mdx}'],
  safelist: [
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
    'animate-none',
    'animate-bounce',
    'animate-spin',
    'animate-ping',
    'animate-pulse',
    {
      pattern: /^(flex-(\d{1,2}\/12))$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^(col-span-([1-9]|1[0-2]))$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^p[xytbrl]?-(1[0-9]|20|[1-9])$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^m[xytbrl]?-(1[0-9]|20|[1-9])$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^(block|inline|flex|grid|hidden|table|flow-root)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^(absolute|relative|fixed|sticky|static)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    { pattern: /^overflow-(auto|hidden|visible|scroll)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    { pattern: /^z-([0-9]|10|20|30|40|50|auto)$/ },
    {
      pattern: /^(w|h)-((1\/[2-4])|full|screen|min|max|auto|[0-9]{1,3})$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^text-(left|center|right|justify)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^font-(thin|light|normal|medium|semibold|bold|black)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^(italic|not-italic|uppercase|lowercase|capitalize|normal-case)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
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
    { pattern: /^border(-[tbrl])?-(0|2|4|8)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern: /^rounded(-[tlbr]{1,2})?(|none|sm|md|lg|xl|2xl|3xl|full)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^shadow(-sm|md|lg|xl|2xl|none|inner)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern: /^opacity-(0|5|10|20|30|40|50|60|70|75|80|90|95|100)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^transition(-none|all|colors|opacity|shadow|transform)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^duration-(75|100|150|200|300|500|700|1000)$/ },
    { pattern: /^ease-(linear|in|out|in-out)$/ },
    {
      pattern:
        /^(items|justify|content|place-items|place-content)-(start|end|center|between|around|evenly|stretch)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^gap-([0-9]|10|12|14|16|20|24|28|32|36|40|48|56|64|72|80|96)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^grid-cols-([1-9]|10|11|12|none)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern:
        /^-?translate-[xy]-(0|([1-9]|1[0-9]|20)|(1|2|3|4|5|6|7|8|9|10|11|12)\/(2|3|4|5|6)|full)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^line-clamp-(1[0]|[1-9])$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern:
        /^(w|h)-(0|full|screen|min|max|sm|fit|px|([1-9]\d?)|1(00|02|04|05|6|8|9)|2[0-9]|3[0-6]|((1[0-2]|[1-9])\/(2|3|4|5|6)))$/,
    },
    {
      pattern:
        /^(min-w|max-w|min-h|max-h)-(0|full|screen|min|max|fit|px|([1-9]\d?)|1(00|02|04|05|6|8|9)|2[0-9]|3[0-6]|((1[0-2]|[1-9])\/(2|3|4|5|6))|(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl))$/,
    },
    {
      pattern:
        /^(fill|stroke)-(current|(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900))$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^stroke-(0|1|2|3|4|5)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^(fill-none|stroke-none)$/,
    },
    {
      pattern: /^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/,
    },
    {
      pattern:
        /^from-(transparent|current|(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900))$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern:
        /^to-(transparent|current|(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900))$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1470px',
    },
    extend: {
      strokeWidth: {
        3: '3',
        4: '4',
        5: '5',
      },
    },
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
