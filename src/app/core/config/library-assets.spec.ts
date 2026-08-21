import { describe, expect, it } from 'vitest';
import { getLibraryAsset, type ScriptStyleLibraryAssets } from './library-assets';

describe('getLibraryAsset', () => {
  const assets = {
    local: {
      style: '/assets/example.css',
      script: '/assets/example.js',
    },
    cdn: {
      style: 'https://cdn.example.com/example.css',
      script: 'https://cdn.example.com/example.js',
    },
  } as const satisfies ScriptStyleLibraryAssets;

  it('returns the requested source and asset type', () => {
    expect(getLibraryAsset(assets, 'local', 'style')).toBe('/assets/example.css');
    expect(getLibraryAsset(assets, 'cdn', 'script')).toBe(
      'https://cdn.example.com/example.js'
    );
  });
});
