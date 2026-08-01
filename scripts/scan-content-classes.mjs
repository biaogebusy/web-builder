// Scan exported CMS content for Tailwind classes the production build would NOT generate.
//
// 1. Export content on the Drupal side (one line per node, raw JSON body):
//      drush sql:query "SELECT body_value FROM node__body WHERE bundle IN ('landing_page','json','component') AND deleted = 0" > prod-content.txt
// 2. Scan it against the current tailwind.config.js (safelist + src content scan):
//      node scripts/scan-content-classes.mjs prod-content.txt [more-exports...]
//
// Exits 1 when uncovered classes are found, so it can be used as a pre-deploy gate.
// Run with --fix to append every uncovered class to config/tailwind.safelist.json:
// the safelist backstops content that is already live, while inline styles remain
// the convention for NEW content (colors, arbitrary values like w-[300px]).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const postcss = require('postcss');
const tailwindCli = require.resolve('tailwindcss/lib/cli.js');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const applyFix = args.includes('--fix');
const exportFiles = args.filter(arg => arg !== '--fix');
if (exportFiles.length === 0) {
  console.error(
    'Usage: node scripts/scan-content-classes.mjs [--fix] <prod-content.txt> [more-exports...]'
  );
  process.exit(2);
}

// Some classes never appear as literal strings in the JSON — the runtime composes
// them from config objects. Mirror those template rules so the scan sees the final
// classes:
// - app-bg / app-bg-img (bg.component.ts): `${classes}-${variant}`, e.g.
//   { classes: 'bg-neutral', variant: 700 } -> bg-neutral-700
// - layout-builder.component.html: justify-{horizontal}, justify-items-{vertical},
//   items-{alignItems}, gap-{gap.xs} sm:gap-{gap.sm} ..., col-span-{row.xs} ...
const LAYOUT_BPS = ['xs', 'sm', 'md', 'lg'];
function synthesizeClasses(obj, sink) {
  const token = v =>
    (typeof v === 'string' || typeof v === 'number') && /^[a-z0-9][a-z0-9-]*$/i.test(`${v}`);
  if (typeof obj.classes === 'string' && obj.classes && obj.variant && token(obj.variant)) {
    sink.push(`${obj.classes}-${obj.variant}`);
  }
  if (token(obj.horizontal)) sink.push(`justify-${obj.horizontal}`);
  if (token(obj.vertical)) sink.push(`justify-items-${obj.vertical}`);
  if (token(obj.alignItems)) sink.push(`items-${obj.alignItems}`);
  for (const [key, prefix] of [['gap', 'gap'], ['row', 'col-span']]) {
    const group = obj[key];
    if (!group || typeof group !== 'object') continue;
    for (const bp of LAYOUT_BPS) {
      if (token(group[bp])) {
        sink.push(bp === 'xs' ? `${prefix}-${group[bp]}` : `${bp}:${prefix}-${group[bp]}`);
      }
    }
  }
}

// Unwrap an export before feeding it to Tailwind: body values hold page JSON whose
// string values (classes, embedded html) may nest further escaped JSON. String values
// that look like JSON are parsed recursively so every level ends up fully unescaped —
// otherwise JSON escaping (\") corrupts candidate extraction at quote boundaries.
function collectStrings(value, sink) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === 'object') {
          collectStrings(parsed, sink);
          return;
        }
      } catch {
        // not JSON, keep as text
      }
    }
    sink.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, sink);
  } else if (value && typeof value === 'object') {
    synthesizeClasses(value, sink);
    for (const item of Object.values(value)) collectStrings(item, sink);
  }
}

// `drush sql:query` prints one row per line, escaped by mysql batch mode
// (backslash, newline, tab, NUL become \\ \n \t \0). Undo that first.
function unescapeSqlRow(line) {
  return line.replace(/\\([\\nt0])/g, (_, ch) =>
    ch === '\\' ? '\\' : ch === 'n' ? '\n' : ch === 't' ? '\t' : '\0'
  );
}

function unwrapExport(file) {
  let buf = readFileSync(resolve(file));
  // gzip-compressed exports (drush | gzip > x.txt.gz) are read directly.
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
  const raw = buf.toString('utf8');
  const sink = [];
  let rows;
  try {
    rows = JSON.parse(raw);
  } catch {
    rows = null;
  }
  if (Array.isArray(rows)) {
    // JSON export (e.g. a JSON:API dump): scan every nested string value.
    collectStrings(rows, sink);
  } else {
    // drush sql:query output: one body_value per line.
    for (const line of raw.split('\n')) {
      if (line.trim()) collectStrings(unescapeSqlRow(line), sink);
    }
  }
  return sink.join('\n');
}

const tmp = mkdtempSync(join(tmpdir(), 'twscan-'));
const contentPath = join(tmp, 'content-bodies.txt');
writeFileSync(join(tmp, 'input.css'), '@tailwind utilities;\n');

const CONFIGS = {
  // Valid Tailwind classes actually used by the exported CMS content.
  'cfg-content.js': `const base = require(${JSON.stringify(join(root, 'tailwind.config.js'))});
module.exports = { ...base, content: [${JSON.stringify(contentPath)}], safelist: [] };\n`,
  // Everything the production build generates: src content scan + safelist.
  'cfg-covered.js': `const base = require(${JSON.stringify(join(root, 'tailwind.config.js'))});
module.exports = { ...base, content: [${JSON.stringify(join(root, 'src/**/*.{html,ts,mdx}'))}] };\n`,
};

function buildClasses(cfgName, outName) {
  writeFileSync(join(tmp, cfgName), CONFIGS[cfgName]);
  execFileSync(
    process.execPath,
    [tailwindCli, '-c', join(tmp, cfgName), '-i', join(tmp, 'input.css'), '-o', join(tmp, outName), '--minify'],
    { cwd: root, stdio: ['ignore', 'ignore', 'pipe'] }
  );
  const css = readFileSync(join(tmp, outName), 'utf8');
  const classes = new Set();
  postcss.parse(css).walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes/i.test(rule.parent.name ?? '')) return;
    for (const sel of rule.selectors ?? [rule.selector]) {
      // Handles cssnano hex escapes (\3a , \2f ) in minified selectors.
      const re = /\.((?:\\[0-9a-fA-F]{1,6} ?|\\.|[^\s.#:>~+,)\][\\])+)/g;
      let m;
      while ((m = re.exec(sel))) {
        classes.add(
          m[1]
            .replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
            .replace(/\\(.)/g, '$1')
        );
      }
    }
  });
  return classes;
}

const COLOR_RE =
  /^(?:[a-z-]+:)*!?(?:text|bg|border|shadow|from|via|to|divide|outline|fill|stroke)-(?:white|black|current|inherit|transparent|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?:\/\d{1,3})?$/;

// group/peer (incl. named forms group/x, peer/x) are marker classes with no CSS of
// their own — they reach the used set only through the compound selectors of their
// variants (.peer:invalid ~ .peer-invalid\:opacity-100), so they are never missing
// and must not be appended to the safelist (they would stay "uncovered" forever).
const MARKER_RE = /^(?:group|peer)(?:\/[\w-]+)?$/;

function reportFile(used, covered) {
  const missing = [...used].filter(cls => !covered.has(cls) && !MARKER_RE.test(cls)).sort();
  console.log(`CMS content classes: ${used.size}; covered by production build: ${used.size - missing.length}`);

  if (missing.length === 0) {
    console.log('OK: every class used by this export is generated by the current build.');
    return missing;
  }

  const colors = missing.filter(cls => COLOR_RE.test(cls));
  const arbitrary = missing.filter(cls => !colors.includes(cls) && cls.includes('['));
  const other = missing.filter(cls => !colors.includes(cls) && !arbitrary.includes(cls));

  console.log(`\nUNCOVERED (${missing.length}):`);
  if (colors.length) {
    console.log(`\n- colors (${colors.length}) -> append to config/tailwind.safelist.json:`);
    console.log(colors.map(cls => `  ${JSON.stringify(cls)},`).join('\n'));
  }
  if (arbitrary.length) {
    console.log(
      `\n- arbitrary values (${arbitrary.length}) -> safelist backstops existing content; new content should use inline styles:`
    );
    console.log(arbitrary.map(cls => `  ${cls}`).join('\n'));
  }
  if (other.length) {
    console.log(`\n- other (${other.length}) -> check tailwind.config.js safelist patterns/variants:`);
    console.log(other.map(cls => `  ${cls}`).join('\n'));
  }
  return missing;
}

let exitCode = 0;
const allMissing = new Set();
try {
  const covered = buildClasses('cfg-covered.js', 'out-covered.css');
  for (const file of exportFiles) {
    if (exportFiles.length > 1) console.log(`\n===== ${file} =====`);
    writeFileSync(contentPath, unwrapExport(file));
    const used = buildClasses('cfg-content.js', 'out-content.css');
    const missing = reportFile(used, covered);
    for (const cls of missing) allMissing.add(cls);
    if (missing.length > 0) exitCode = 1;
  }
} finally {
  // process.exit() would skip finally, so compute the code first and exit after cleanup.
  rmSync(tmp, { recursive: true, force: true });
}

if (allMissing.size > 0) {
  if (applyFix) {
    const safelistPath = join(root, 'config', 'tailwind.safelist.json');
    const list = JSON.parse(readFileSync(safelistPath, 'utf8'));
    const existing = new Set(list);
    const added = [...allMissing].filter(cls => !existing.has(cls)).sort();
    list.push(...added);
    writeFileSync(safelistPath, `${JSON.stringify(list, null, 2)}\n`);
    console.log(
      `\n--fix: appended ${added.length} classes to config/tailwind.safelist.json; re-run without --fix to verify.`
    );
    exitCode = 0;
  } else {
    console.log(
      '\nRun again with --fix to append every uncovered class to config/tailwind.safelist.json.'
    );
  }
}
process.exit(exitCode);
