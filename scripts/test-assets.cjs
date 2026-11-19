const { createHash } = require('node:crypto');
const { lstatSync, readFileSync, realpathSync } = require('node:fs');
const { isAbsolute, relative, resolve } = require('node:path');

const appRoot = resolve(__dirname, '..');
const exactKeys = (value, keys) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.keys(value).sort().join() === [...keys].sort().join();

/** Resolve the versioned documentation assets for local, isolated and CI checkouts. */
function testAssetsRoot(root = process.env.XINSHI_TEST_ASSETS_ROOT) {
  return resolve(appRoot, root || '../xinshi-docs/stories/assets/testing');
}

function regularFile(root, name) {
  const path = resolve(root, name);
  const inside = relative(root, realpathSync(path));
  if (
    !inside ||
    inside === '..' ||
    inside.startsWith('../') ||
    isAbsolute(inside) ||
    !lstatSync(path).isFile()
  ) {
    throw new Error(`Test asset must be a regular file inside ${root}: ${name}`);
  }
  return path;
}

function registry(root) {
  const value = JSON.parse(readFileSync(regularFile(root, 'registry.json'), 'utf8'));
  const ids = new Set();
  const paths = new Set();
  if (
    !exactKeys(value, ['version', 'assets']) ||
    value.version !== 1 ||
    !Array.isArray(value.assets) ||
    !value.assets.length
  ) {
    throw new Error('Invalid test asset registry');
  }
  for (const asset of value.assets) {
    if (
      !exactKeys(asset, ['id', 'path', 'sha256']) ||
      typeof asset.id !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asset.id) ||
      typeof asset.path !== 'string' ||
      !/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_.-]+)+$/.test(asset.path) ||
      asset.path.split('/').some(part => part === '.' || part === '..') ||
      typeof asset.sha256 !== 'string' ||
      !/^[a-f0-9]{64}$/.test(asset.sha256) ||
      ids.has(asset.id) ||
      paths.has(asset.path)
    ) {
      throw new Error('Invalid or duplicate test asset registry entry');
    }
    ids.add(asset.id);
    paths.add(asset.path);
  }
  return value.assets;
}

function checkedAsset(root, asset, expectedHash) {
  if (expectedHash && asset.sha256 !== expectedHash) {
    throw new Error(`Test asset version changed: ${asset.id}`);
  }
  const path = regularFile(root, asset.path);
  const hash = createHash('sha256').update(readFileSync(path)).digest('hex');
  if (hash !== asset.sha256) throw new Error(`Test asset SHA256 mismatch: ${asset.id}`);
  return { ...asset, path };
}

/** Return a checked fixed input; fail before tests when data is missing or modified. */
function testAssetPath(id, options = {}) {
  const root = realpathSync(testAssetsRoot(options.root));
  const asset = registry(root).find(entry => entry.id === id);
  if (!asset) throw new Error(`Unknown test asset: ${id}`);
  return checkedAsset(root, asset, options.sha256).path;
}

/** Verify all registered files and return their identities and absolute paths. */
function checkTestAssets(options = {}) {
  const root = realpathSync(testAssetsRoot(options.root));
  return registry(root).map(asset => checkedAsset(root, asset));
}

module.exports = { testAssetsRoot, testAssetPath, checkTestAssets };

if (require.main === module) {
  try {
    if (process.argv.length !== 2) throw new Error('Usage: npm run check:test-assets');
    console.log(`Verified ${checkTestAssets().length} test assets in ${testAssetsRoot()}`);
  } catch (error) {
    console.error(
      `Test assets: ${error.message}. Set XINSHI_TEST_ASSETS_ROOT to the documentation assets.`
    );
    process.exitCode = 1;
  }
}
