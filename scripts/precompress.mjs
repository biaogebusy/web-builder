import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'dist/browser');

const COMPRESS_EXT = new Set([
  '.css',
  '.js',
  '.mjs',
  '.html',
  '.json',
  '.svg',
  '.txt',
  '.xml',
  '.map',
]);
const MIN_BYTES = 1024;
const BROTLI_QUALITY = 10;
const GZIP_LEVEL = 9;
const startedAt = performance.now();

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
      [constants.BROTLI_PARAM_QUALITY]: BROTLI_QUALITY,
      [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
    },
  });
  const gz = gzipSync(buf, { level: GZIP_LEVEL });

  await writeFile(`${file}.br`, br);
  await writeFile(`${file}.gz`, gz);

  count += 1;
  rawTotal += buf.length;
  brTotal += br.length;
  gzTotal += gz.length;
}

const mb = n => (n / 1024 / 1024).toFixed(2);
const elapsedSeconds = ((performance.now() - startedAt) / 1000).toFixed(1);
console.log(
  `Precompressed ${count} files in ${elapsedSeconds}s: raw ${mb(rawTotal)}MB -> ` +
    `br ${mb(brTotal)}MB / gz ${mb(gzTotal)}MB`
);
