// Reports what the eagerly loaded browser chunks contain, and the shortest static
// import chain from src/main.ts to each target input.
//
// Usage:
//   npm run perf:build
//   npm run perf:analyze -- dist/performance qs crypto-js lodash-es
//   npm run check:public-bundle -- dist/performance
//
// Notes:
//   - esbuild's stats.json output keys vary by Angular CLI version: this build emits
//     "chunk-XYZ.js" / "styles.css" with no "browser/" prefix. Both are accepted.
//   - "in eager bundle" is derived from the scripts index.html loads plus their static
//     imports, so it reflects the eager bundle, not lazy route chunks.
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const check = args[0] === '--check';
if (check) args.shift();
const dist = args[0] ?? 'dist/performance';
const targets = args.slice(1);
const meta = JSON.parse(readFileSync(`${dist}/stats.json`, 'utf8'));
const html = readFileSync(`${dist}/browser/index.csr.html`, 'utf8');

const normalize = value => value.replace(/\\/g, '/').replace(/^\.\//, '');
const base = k => normalize(k).replace(/^browser\//, '');
const isStatic = dependency => !dependency.external &&
  ['import-statement', 'require-call'].includes(dependency.kind);
const byName = new Map(
  Object.entries(meta.outputs)
    .filter(([k]) => !base(k).startsWith('server/') && base(k).endsWith('.js'))
    .map(([k, v]) => [base(k), v])
);

const seeds = [...html.matchAll(/(?:src|href)=["']([^"']+\.js)["']/g)].map(m => base(m[1]));
if (check && seeds.some(seed => !byName.has(seed))) {
  throw new Error('An initial browser script is missing from the build stats');
}
const initial = new Set();
const queue = seeds.filter(s => byName.has(s));
if (!queue.length) throw new Error('No browser entry chunks found in the build stats and HTML');
while (queue.length) {
  const name = queue.shift();
  if (initial.has(name)) continue;
  initial.add(name);
  for (const imp of byName.get(name).imports ?? []) {
    if (!isStatic(imp)) continue;
    const n = base(imp.path);
    if (check && !byName.has(n)) throw new Error(`Static browser output is missing: ${n}`);
    if (byName.has(n) && !initial.has(n)) queue.push(n);
  }
}

let total = 0;
const groups = new Map();
const per = new Map(); // per input file, for locating dead code inside a package
const initialInputs = new Set();
for (const name of initial) {
  const out = byName.get(name);
  total += out.bytes;
  for (const [input, { bytesInOutput }] of Object.entries(out.inputs)) {
    initialInputs.add(input);
    per.set(input, (per.get(input) ?? 0) + bytesInOutput);
    const nm = input.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/);
    const g = nm ? nm[1] : input.split('/').slice(0, 4).join('/');
    groups.set(g, (groups.get(g) ?? 0) + bytesInOutput);
  }
}

const kb = n => `${(n / 1024).toFixed(1)} KB`;
console.log(`initial chunks: ${initial.size}, uncompressed ${kb(total)}\n`);
[...groups.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([g, b]) => console.log(`${kb(b).padStart(10)}  ${g}`));

if (check) {
  // Check emitted bytes, so lazy entries and tree-shaken type-only inputs remain valid.
  const builder = /(?:^|\/)src\/app\/modules\/builder\//;
  const editor = /(?:^|\/)node_modules\/(?:@tiptap\/|prosemirror-[^/]+\/|monaco-editor\/|jsoneditor\/)/;
  const forbidden = [...per].filter(([input, bytes]) => bytes > 0 &&
    (builder.test(normalize(input)) || editor.test(normalize(input))));
  for (const [input] of forbidden) console.error(`Forbidden initial input: ${input}`);
  if (forbidden.length) process.exitCode = 1;
  else console.log('\nPublic initial JS boundary passed');
}

const inputs = meta.inputs;
const entry = Object.keys(inputs).find(k => k.endsWith('src/main.ts'));
const prev = new Map([[entry, null]]);
const bfs = [entry];
while (bfs.length) {
  const cur = bfs.shift();
  for (const imp of inputs[cur]?.imports ?? []) {
    if (!isStatic(imp)) continue;
    if (!prev.has(imp.path)) {
      prev.set(imp.path, cur);
      bfs.push(imp.path);
    }
  }
}
const chainOf = k => {
  const chain = [];
  for (let c = k; c; c = prev.get(c)) chain.unshift(c);
  return chain;
};
for (const t of targets) {
  console.log(`\n[${t}] eager input bytes and direct eager importers:`);
  for (const [input, bytes] of [...per].filter(([input]) => input.includes(t))) {
    console.log(`  ${kb(bytes)}  ${input}`);
    for (const importer of initialInputs) {
      if (inputs[importer]?.imports.some(i =>
        isStatic(i) && i.path === input
      )) console.log(`    <- ${importer}`);
    }
  }
  const hits = [...prev.keys()].filter(k => k.includes(t));
  if (!hits.length) {
    console.log(`\n[${t}] NOT statically reachable from ${entry}`);
    continue;
  }
  const best = hits.map(chainOf).sort((a, b) => a.length - b.length)[0];
  const eager = hits.filter(h => initialInputs.has(h));
  console.log(`\n[${t}] in eager bundle: ${eager.length > 0}`);
  best.forEach((p, i) => console.log(`${'  '.repeat(i)}${p}`));
}
