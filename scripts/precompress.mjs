import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'dist/browser');

const COMPRESS_EXT = new Set(['.css', '.js', '.mjs', '.html', '.json', '.svg', '.ico', '.txt', '.xml', '.map']);
const MIN_BYTES = 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let count = 0;
let rawTotal = 0;
let brTotal = 0;
let gzTotal = 0;

for await (const file of walk(target)) {
  const ext = extname(file);
  if (!COMPRESS_EXT.has(ext)) continue;
  if (file.endsWith('.br') || file.endsWith('.gz')) continue;

  const buf = await readFile(file);
  if (buf.length < MIN_BYTES) continue;

  const br = brotliCompressSync(buf, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
    },
  });
  const gz = gzipSync(buf, { level: 9 });

  await writeFile(`${file}.br`, br);
  await writeFile(`${file}.gz`, gz);

  count += 1;
  rawTotal += buf.length;
  brTotal += br.length;
  gzTotal += gz.length;
}

const mb = n => (n / 1024 / 1024).toFixed(2);
console.log(
  `Precompressed ${count} files: raw ${mb(rawTotal)}MB -> br ${mb(brTotal)}MB / gz ${mb(gzTotal)}MB`
);
