import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

async function main() {
  const { values } = parseArgs({
    options: {
      name: { type: 'string' },
      seed: { type: 'string' },
      variant: { type: 'string', default: 'content' },
      mode: { type: 'string', default: 'both' },
      directory: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    console.log(`Usage: npm run theme:generate -- --name green --seed '#16a34a'

Options:
  --name        Theme name in lowercase kebab-case (required)
  --seed        Seed color in #RRGGBB format (required)
  --variant     content | tonalSpot | vibrant (default: content)
  --mode        light | dark | both (default: both)
  --directory   Output directory, relative to the project root or absolute
                (default: src/theme/theme-config/<name>)
  --dry-run     Print generated SCSS without writing files
  --force       Replace existing generated files
  --help, -h    Show this help

Import the generated files in src/styles.scss and add theme-<name> to <html>.
The existing light-theme / dark-theme classes continue to control the mode.`);
    return;
  }

  const { name, seed, variant, mode } = values;
  if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error('--name is required and must use lowercase kebab-case, e.g. green.');
  }
  if (!seed || !/^#[\da-f]{6}$/i.test(seed)) {
    throw new Error('--seed is required and must be a six-digit hex color, e.g. #16a34a.');
  }
  if (!['content', 'tonalSpot', 'vibrant'].includes(variant)) {
    throw new Error('--variant must be content, tonalSpot, or vibrant.');
  }
  if (!['light', 'dark', 'both'].includes(mode)) {
    throw new Error('--mode must be light, dark, or both.');
  }

  // Compile the app's generator only in this CLI process, keeping one source of color roles.
  require('ts-node').register({
    skipProject: true,
    transpileOnly: true,
    compilerOptions: { module: 'CommonJS', moduleResolution: 'node' },
  });
  const { generateThemeVars } = require('../src/app/core/util/theme-palette.util.ts');
  const directory = resolve(root, values.directory ?? `src/theme/theme-config/${name}`);
  const modes = mode === 'both' ? ['light', 'dark'] : [mode];
  const files = modes.map(themeMode => ({
    path: join(directory, `_${themeMode}-colors.scss`),
    content: renderTheme(name, seed, variant, themeMode,
      generateThemeVars(seed, themeMode === 'dark', variant)),
  }));

  if (values['dry-run']) {
    for (const file of files) {
      console.log(`// ${relative(root, file.path)}\n${file.content}`);
    }
    return;
  }

  // Check both outputs before writing so a conflict does not leave half a palette updated.
  if (!values.force) {
    const existing = files.find(file => existsSync(file.path));
    if (existing) {
      throw new Error(`${relative(root, existing.path)} already exists. Use --force to replace it.`);
    }
  }
  await mkdir(directory, { recursive: true });
  for (const file of files) {
    await writeFile(file.path, file.content, { flag: values.force ? 'w' : 'wx' });
    console.log(`Generated ${relative(root, file.path)}`);
  }
  console.log(`Import the files in src/styles.scss and add theme-${name} to <html> to enable them.`);
}

function renderTheme(name, seed, variant, mode, vars) {
  const overrides = Object.entries(vars)
    .map(([token, value]) => `      ${token.slice('--mat-sys-'.length)}: ${value},`)
    .join('\n');
  return `// Generated with npm run theme:generate.
// Seed: ${seed}; variant: ${variant}; mode: ${mode}.
@use '@angular/material' as mat;

.theme-${name}.${mode}-theme {
  color-scheme: ${mode};
  @include mat.theme(
    (
      color: (
        theme-type: ${mode},
      ),
      density: 0,
    )
  );
  @include mat.theme-overrides(
    (
${overrides}
    )
  );
}
`;
}

try {
  await main();
} catch (error) {
  console.error(`theme:generate: ${error.message}`);
  process.exitCode = 1;
}
