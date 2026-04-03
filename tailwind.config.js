/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,mdx}'],
  safelist: [
    // ==================== Layout ====================
    {
      pattern:
        /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|hidden|table|table-row|table-cell|contents|flow-root)$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^(absolute|relative|fixed|sticky|static)$/, variants: ['sm', 'md', 'lg'] },
    '!absolute',
    { pattern: /^(visible|invisible|collapse)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^overflow(?:-[xy])?-(auto|hidden|visible|scroll|clip)$/,
      variants: ['sm', 'md', 'lg'],
    },
    '!overflow-visible',
    { pattern: /^z-(0|10|20|30|40|50|auto)$/ },
    { pattern: /^(float|clear)-(left|right|both|none)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^(isolate|isolation-auto)$/ },
    { pattern: /^(box-border|box-content)$/ },
    { pattern: /^overscroll(?:-[xy])?-(auto|contain|none)$/ },

    // ==================== Object ====================
    { pattern: /^object-(contain|cover|fill|none|scale-down)$/ },
    {
      pattern:
        /^object-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/,
    },

    // ==================== Flexbox ====================
    {
      pattern:
        /^flex(-(row|col|row-reverse|col-reverse|wrap|wrap-reverse|nowrap|1|auto|initial|none))?$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^flex-(\d{1,2}\/12)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^(flex-)?(grow|shrink)(-0)?$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern:
        /^basis-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|px|full|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^order-(1|2|3|4|5|6|7|8|9|10|11|12|first|last|none)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Grid ====================
    { pattern: /^grid-cols-([1-9]|1[0-2]|none)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^grid-rows-([1-6]|none)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^col-span-(full|[1-9]|1[0-2])$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^col-(start|end)-([1-9]|1[0-3]|auto)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^row-span-([1-6]|full)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^row-(start|end)-([1-7]|auto)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^grid-flow-(row|col|dense|row-dense|col-dense)$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^auto-(cols|rows)-(auto|min|max|fr)$/, variants: ['sm', 'md', 'lg'] },

    // ==================== Alignment ====================
    {
      pattern:
        /^(items|justify|content|self|justify-self|place-items|place-content|place-self)-(start|end|center|between|around|evenly|stretch|baseline|auto)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Gap ====================
    {
      pattern:
        /^gap(?:-[xy])?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Padding ====================
    {
      pattern:
        /^p[xytblr]?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Margin ====================
    {
      pattern:
        /^-?m[xytblr]?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|auto)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Space Between ====================
    {
      pattern:
        /^-?space-[xy]-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|reverse)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Width ====================
    {
      pattern:
        /^w-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|100|200|300|400|500|600|700|px|auto|full|screen|min|max|fit)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^w-(1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|1\/12|2\/12|3\/12|4\/12|5\/12|6\/12|7\/12|8\/12|9\/12|10\/12|11\/12)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Height ====================
    {
      pattern:
        /^h-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|100|200|300|400|500|600|700|px|auto|full|screen|min|max|fit)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^h-(1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Size ====================
    {
      pattern:
        /^size-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|auto|full|min|max|fit)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Min/Max Width & Height ====================
    {
      pattern: /^min-w-(0|full|min|max|fit)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^max-w-(0|none|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|min|max|fit|prose|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^min-h-(0|full|screen|min|max|fit)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^max-h-(0|full|screen|min|max|fit|px|[1-9]\d{0,2})$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Aspect Ratio ====================
    { pattern: /^aspect-(auto|square|video)$/, variants: ['sm', 'md', 'lg'] },

    // ==================== Typography ====================
    { pattern: /^text-(left|center|right|justify|start|end)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^(italic|not-italic)$/ },
    { pattern: /^(uppercase|lowercase|capitalize|normal-case)$/ },
    { pattern: /^(underline|overline|line-through|no-underline)$/ },
    { pattern: /^(truncate|text-ellipsis|text-clip)$/ },
    { pattern: /^whitespace-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/ },
    { pattern: /^(break-normal|break-words|break-all|break-keep)$/ },
    { pattern: /^leading-(none|tight|snug|normal|relaxed|loose|[3-9]|10)$/ },
    { pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/ },
    'tracking-[0.2em]',
    { pattern: /^align-(baseline|top|middle|bottom|text-top|text-bottom|sub|super)$/ },
    { pattern: /^list-(none|disc|decimal|inside|outside)$/ },
    { pattern: /^line-clamp-([1-9]|10|none)$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /^indent-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|px)$/,
    },

    // ==================== Text Color ====================
    {
      pattern: /^text-(white|black|current|inherit|transparent)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    {
      pattern:
        /^text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },

    // ==================== Background ====================
    { pattern: /^bg-(black|white|inherit|current|transparent)(\/(?:0|5|10|[1-9][05]|100))?$/, variants: ['hover'] },
    {
      pattern:
        /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)(?:\/(?:0|5|10|[1-9][05]|100))?$/,
      variants: ['sm', 'md', 'lg', 'hover'],
    },
    { pattern: /^bg-opacity-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/ },
    { pattern: /^bg-clip-(border|padding|content|text)$/ },
    { pattern: /^bg-(auto|cover|contain)$/ },
    { pattern: /^bg-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/ },
    { pattern: /^bg-(repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space)$/ },

    // ==================== Gradient ====================
    { pattern: /^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/ },
    {
      pattern:
        /^(from|via|to)-(transparent|current|black|white|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950))$/,
    },

    // ==================== Border ====================
    { pattern: /^border(?:-[xytblr])?(?:-(0|2|4|8))?$/, variants: ['sm', 'md', 'lg'] },
    {
      pattern:
        /^border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['hover'],
    },
    { pattern: /^border-(black|white|current|transparent|inherit)(\/(?:0|5|10|[1-9][05]|100))?$/ },
    { pattern: /^border-(solid|dashed|dotted|double|hidden|none)$/ },
    'border-collapse',
    'border-separate',

    // ==================== Border Radius ====================
    {
      pattern: /^rounded(?:-(t[lr]?|b[lr]?|[lr]))?(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Divide ====================
    { pattern: /^divide-[xy](?:-(0|2|4|8|reverse))?$/ },
    { pattern: /^divide-(solid|dashed|dotted|double|none)$/ },
    {
      pattern:
        /^divide-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },

    // ==================== Outline ====================
    { pattern: /^outline(-(none|dashed|dotted|double))?$/ },
    { pattern: /^outline-(0|1|2|4|8)$/ },
    { pattern: /^outline-offset-(0|1|2|4|8)$/ },
    {
      pattern:
        /^outline-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },

    // ==================== Shadow ====================
    { pattern: /^shadow(-(sm|md|lg|xl|2xl|none|inner))?$/, variants: ['sm', 'md', 'lg', 'hover'] },
    {
      pattern:
        /^shadow-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Opacity ====================
    {
      pattern: /^opacity-(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)$/,
      variants: ['hover', 'group-hover'],
    },

    // ==================== Transition & Animation ====================
    { pattern: /^transition(-(none|all|colors|opacity|shadow|transform))?$/ },
    { pattern: /^duration-(0|75|100|150|200|300|500|700|1000)$/ },
    { pattern: /^ease-(linear|in|out|in-out)$/ },
    { pattern: /^delay-(0|75|100|150|200|300|500|700|1000)$/ },
    { pattern: /^animate-(none|spin|ping|pulse|bounce)$/ },

    // ==================== Transform ====================
    'transform',
    {
      pattern:
        /^-?translate-[xy]-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|full|1\/2|1\/3|2\/3|1\/4|3\/4)$/,
    },
    { pattern: /^(scale|scale-[xy])-(0|50|75|90|95|100|105|110|125|150)$/ },
    { pattern: /^-?rotate-(0|1|2|3|6|12|45|90|180)$/ },
    { pattern: /^-?skew-[xy]-(0|1|2|3|6|12)$/ },
    {
      pattern:
        /^origin-(center|top|top-right|right|bottom-right|bottom|bottom-left|left|top-left)$/,
    },

    // ==================== Positioning (inset / top / right / bottom / left) ====================
    {
      pattern:
        /^-?inset(?:-[xy])?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|auto|full|1\/2|1\/3|2\/3|1\/4|3\/4)$/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern:
        /^-?(top|right|bottom|left)-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|px|auto|full|1\/2|1\/3|2\/3|1\/4|3\/4)$/,
      variants: ['sm', 'md', 'lg'],
    },

    // ==================== Interactivity ====================
    {
      pattern:
        /^cursor-(auto|default|pointer|wait|text|move|help|not-allowed|none|grab|grabbing|context-menu|progress|cell|crosshair|col-resize|row-resize|zoom-in|zoom-out)$/,
    },
    { pattern: /^pointer-events-(none|auto)$/ },
    { pattern: /^select-(none|text|all|auto)$/ },
    { pattern: /^resize(-(none|x|y))?$/ },
    { pattern: /^scroll-(auto|smooth)$/ },
    {
      pattern:
        /^snap-(none|x|y|both|mandatory|proximity|start|end|center|align-none|normal|always)$/,
    },
    { pattern: /^touch-(auto|none|pan-x|pan-y|pinch-zoom|manipulation)$/ },
    { pattern: /^will-change-(auto|scroll|contents|transform)$/ },
    'appearance-none',

    // ==================== SVG ====================
    {
      pattern:
        /^(fill|stroke)-(current|none|black|white|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    { pattern: /^stroke-(0|1|2|3|4|5)$/ },

    // ==================== Filters ====================
    {
      pattern:
        /^(backdrop-)?(blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia)(-[a-zA-Z0-9]+)?$/,
      variants: ['sm', 'md', 'lg'],
    },
    { pattern: /^drop-shadow(-(sm|md|lg|xl|2xl|none))?$/ },
    {
      pattern:
        /^mix-blend-(normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity)$/,
    },
    {
      pattern:
        /^bg-blend-(normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity)$/,
    },

    // ==================== Tables ====================
    { pattern: /^(table-auto|table-fixed)$/ },
    { pattern: /^border-spacing(?:-[xy])?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|px)$/ },

    // ==================== Accessibility ====================
    { pattern: /^(sr-only|not-sr-only)$/ },
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
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
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
