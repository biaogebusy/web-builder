// Prepares MDI SVGs and splits the custom sprite into one file per icon so the browser
// fetches only the icons a page renders instead of the 3 MB MDI sprite.
// Custom icons are written last so they override MDI icons with the same name,
// matching the previous icon-set precedence (last registered set wins).
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as mdi from '@mdi/js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'node_modules/.cache/svg-icons');
const NAME = /^[a-z0-9_-]+$/;

const [jsPackage, svgPackage] = await Promise.all(
  ['js', 'svg'].map(async name =>
    JSON.parse(await readFile(resolve(root, `node_modules/@mdi/${name}/package.json`), 'utf8'))
  )
);
if (jsPackage.version !== svgPackage.version) {
  throw new Error('@mdi/js and @mdi/svg must use the same version');
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
const writtenNames = new Set();

const svgSource = resolve(root, 'node_modules/@mdi/svg/svg');
for (const file of await readdir(svgSource)) {
  if (!file.endsWith('.svg') || !NAME.test(file.slice(0, -4))) continue;
  await copyFile(resolve(svgSource, file), resolve(target, file));
  writtenNames.add(file.slice(0, -4));
}
console.log(`split-svg-icons: ${writtenNames.size} MDI ${svgPackage.version} icons`);

// Preserve the picker's existing values, without shipping SVG path data as JavaScript.
const names = [];
let added = 0;
for (const key of Object.keys(mdi).filter(key => key.startsWith('mdi'))) {
  const name = key.slice(3).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  if (!NAME.test(name)) throw new Error(`Invalid picker icon name: ${name}`);
  names.push(name);
  // Legacy picker spellings (e.g. alpha-abox) differ from canonical SVG filenames.
  if (!writtenNames.has(name)) {
    await writeFile(
      resolve(target, `${name}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${mdi[key]}"/></svg>`
    );
    writtenNames.add(name);
    added++;
  }
}
console.log(`split-svg-icons: ${added} legacy picker aliases from @mdi/js`);

const custom = await readFile(resolve(root, 'src/assets/icons/icons.svg'), 'utf8');
const pattern = /<g id="([^"]+)">\s*(<svg[\s\S]*?<\/svg>)\s*<\/g>/g;
for (const match of custom.matchAll(pattern)) {
  if (!NAME.test(match[1])) continue;
  await writeFile(
    resolve(target, `${match[1]}.svg`),
    match[2].replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  );
}
await writeFile(resolve(target, 'names.json'), JSON.stringify(names));
