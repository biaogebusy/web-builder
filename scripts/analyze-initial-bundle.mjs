// Reports what the eagerly loaded browser chunks contain, and the shortest static
// import chain from src/main.ts to each target input.
//
// Usage:
//   npm run perf:build
//   npm run perf:analyze -- dist/performance qs crypto-js lodash-es
//
// Notes:
//   - esbuild's stats.json output keys vary by Angular CLI version: this build emits
//     "chunk-XYZ.js" / "styles.css" with no "browser/" prefix. Both are accepted.
//   - "in eager bundle" is derived from the scripts index.html loads plus their static
//     imports, so it reflects the eager bundle, not lazy route chunks.
import { readFileSync } from 'node:fs';

const dist = process.argv[2] ?? 'dist/performance';
const targets = process.argv.slice(3);
const meta = JSON.parse(readFileSync(`${dist}/stats.json`, 'utf8'));
const html = readFileSync(`${dist}/browser/index.csr.html`, 'utf8');

const base = k => k.replace(/^browser\//, '');
const byName = new Map(
  Object.entries(meta.outputs)
    .filter(([k]) => base(k).endsWith('.js'))
    .map(([k, v]) => [base(k), v])
);

const seeds = [...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)].map(m => base(m[1]));
const initial = new Set();
const queue = seeds.filter(s => byName.has(s));
if (!queue.length) throw new Error('No browser entry chunks found in the build stats and HTML');
while (queue.length) {
  const name = queue.shift();
  if (initial.has(name)) continue;
  initial.add(name);
  for (const imp of byName.get(name).imports ?? []) {
    if (imp.kind !== 'import-statement') continue;
    const n = base(imp.path);
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

const inputs = meta.inputs;
const entry = Object.keys(inputs).find(k => k.endsWith('src/main.ts'));
const prev = new Map([[entry, null]]);
const bfs = [entry];
while (bfs.length) {
  const cur = bfs.shift();
  for (const imp of inputs[cur]?.imports ?? []) {
    if (imp.kind !== 'import-statement' || imp.external) continue;
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
        i.kind === 'import-statement' && i.path === input
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
