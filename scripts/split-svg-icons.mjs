// Splits the MDI sprite and the custom icon sprite into one file per icon so the browser
// fetches only the icons a page renders instead of the 3 MB MDI sprite.
// Custom icons are written last so they override MDI icons with the same name,
// matching the previous icon-set precedence (last registered set wins).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'node_modules/.cache/svg-icons');
const NAME = /^[a-z0-9_-]+$/;

const sources = [
  {
    file: 'node_modules/@mdi/angular-material/mdi.svg',
    pattern: /<svg id="([^"]+)"([^>]*)>([\s\S]*?)<\/svg>/g,
    toSvg: m => `<svg xmlns="http://www.w3.org/2000/svg"${m[2]}>${m[3]}</svg>`,
  },
  {
    file: 'src/assets/icons/icons.svg',
    pattern: /<g id="([^"]+)">\s*(<svg[\s\S]*?<\/svg>)\s*<\/g>/g,
    toSvg: m => m[2].replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'),
  },
];

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

for (const { file, pattern, toSvg } of sources) {
  const sprite = await readFile(resolve(root, file), 'utf8');
  let count = 0;
  for (const m of sprite.matchAll(pattern)) {
    if (!NAME.test(m[1])) continue;
    await writeFile(resolve(target, `${m[1]}.svg`), toSvg(m));
    count++;
  }
  console.log(`split-svg-icons: ${count} icons from ${file}`);
}
