/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,mdx}'],
  safelist: [
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
    'border',
    'border-collapse',
    'bg-black',
    'bg-white',
    'bg-inherit',
    'bg-current',
    'bg-transparent',
    'from-black',
    'from-white',
    'from-transparent',
    'bg-bottom',
    'bg-center',
    'bg-left',
    'bg-left-bottom',
    'bg-left-top',
    'bg-right',
    'bg-right-bottom',
    'bg-right-top',
    'bg-top',
    'bg-repeat',
    'bg-no-repeat',
    'bg-repeat-x',
    'bg-repeat-y',
    'bg-repeat-round',
    'bg-repeat-space',
    { pattern: /^(flex-(\d{1,2}\/12))$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^flex(-(row|col|wrap|nowrap|1|auto|initial|none|grow|shrink))?(-reverse)?$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^(col-span-(full|([1-9]|1[0-2])))$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^p[xytbrl]?-(0|([1-9]\d*))$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^m[xytbrl]?-(0|([1-9]\d*))$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^(block|inline|inline-block|flex|inline-flex|grid|hidden|table)$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^(absolute|relative|fixed|sticky|static)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^overflow-(auto|hidden|visible|scroll)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^z-([0-9]|10|20|30|40|50|auto)$/ },
    {
      pattern: /^(w|h)-((1\/[2-4])|px|full|screen|min|max|auto|[0-9]{1,3})$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^text-(left|center|right|justify)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^font-(thin|light|normal|medium|semibold|bold|black)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^(italic|uppercase|lowercase|capitalize|normal-case)$/,
    },
    {
      pattern:
        /^bg-(gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900)(?:\/(?:100|0|5|[1-9][05]))?$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern: /^bg-opacity-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^bg-clip-(border|padding|content|text)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^text-(white|black|current|inherit|transparent)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^text-(gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern:
        /^border-(gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    { pattern: /^border(?:-(?:t|b|r|l|x|y))?(?:-(?:0|2|4|8))?$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^border-(solid|dashed|dotted|double|none)$/,
    },
    {
      pattern: /^divide-(solid|dashed|dotted|double|none)$/,
    },
    {
      pattern: /^outline-(solid|dashed|dotted|double|none)$/,
    },
    {
      pattern: /^rounded(-[tlbr]{1,2})?(-(none|sm|md|lg|xl|2xl|3xl|full))?$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^opacity-(0|5|10|20|30|40|50|60|70|75|80|90|95|100)$/,
      variants: ['hover'],
    },
    {
      pattern: /^transition-(none|all|colors|opacity|shadow|transform)$/,
    },
    { pattern: /^duration-(75|100|150|200|300|500|700|1000)$/ },
    { pattern: /^ease-(linear|in|out|in-out)$/ },
    {
      pattern:
        /^(items|justify|content|place-items|place-content)-(start|end|center|between|around|evenly|stretch)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^gap-(?:[xy]-)?([0-9]|10|12|14|16|20|24|28|32|36|40|48|56|64|72|80|96)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^space-(x|y)-(reverse|(0|(0\.5|([1-9]|1[0-2])\.5)|([1-9]|1[0-2]|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)))$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^grid-cols-([1-9]|10|11|12|none)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern:
        /^-?translate-[xy]-(0|([1-9]|1[0-9]|20)|(1|2|3|4|5|6|7|8|9|10|11|12)\/(2|3|4|5|6)|full)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^line-clamp-(1[0]|[1-9])$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern:
        /^size-(0|px|full|screen|min|max|fit|(\d+(\/\d+)?)|(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl))$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^(min-w|max-w|min-h|max-h)-(0|full|screen|min|max|fit|px|([1-9]\d?)|1(00|02|04|05|6|8|9)|2[0-9]|3[0-6]|((1[0-2]|[1-9])\/(2|3|4|5|6))|(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl))$/,
    },
    {
      pattern:
        /^(fill|stroke)-(current|(white|black|gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    { pattern: /^stroke-(0|1|2|3|4|5)$/ },
    { pattern: /^(fill-none|stroke-none)$/ },
    { pattern: /^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/ },
    {
      pattern:
        /^(from|via|to)-(transparent|current|(gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)(\/[0-9]{1,3})?)$/,
    },
    { pattern: /^shadow-(sm|md|lg|xl|2xl|none|inner)$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern:
        /^shadow-(slate|gray|neutral|red|orange|amber|yellow|green|sky|blue|indigo|violet|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^(inset)(-x|-y|-t|-r|-b|-l)?-(0|full|px)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^(inset)(-x|-y|-t|-r|-b|-l)?-(([1-9]))$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^aspect-(square|video|auto|none)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^(line-through|no-underline|underline)$/,
    },
    {
      pattern: /^leading-(none|tight|normal|relaxed|loose|3|4|5|6|7|8|9|10)$/,
    },
    { pattern: /^w-(100|200|300|400|500|600|700)$/ },
    { pattern: /^h-(100|200|300|400|500|600|700)$/ },
    { pattern: /^w-(full|screen|fit)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^h-(full|screen|fit)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern:
        /^w-(1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^h-(1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^(backdrop-)?(blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|saturate|sepia)-[a-zA-Z0-9]+$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^-?(left|right|top|bottom)-(0|full|auto|(?:[1-9]|1[0-2])|(?:[1-9]|1[0-2])\/(?:[2-6]|12))$/,
      variants: ['sm', 'md', 'lg'],
    },
  ],
  theme: {
    screens: { sm: '600px', md: '960px', lg: '1280px', xl: '1470px' },
    extend: {
      strokeWidth: { 3: '3', 4: '4', 5: '5' },
      aspectRatio: {
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '3/4': '3 / 4',
        '1/1': '1 / 1',
        '9/16': '9 / 16',
        '2/3': '2 / 3',
      },
      width: () => ({
        ...generateSizeClasses(100, 700, 100),
      }),
      height: () => ({
        ...generateSizeClasses(100, 700, 100),
      }),
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
      'none': 'none',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  corePlugins: { preflight: false },
};

function generateSizeClasses(start, end, step, unit = 'px') {
  const classes = {};
  for (let i = start; i <= end; i += step) {
    classes[i] = unit === 'px' ? `${i}${unit}` : `${i / 4}${unit}`;
  }
  return classes;
}
