interface TestAssetOptions {
  /** Override the documentation asset directory. Relative paths use the application root. */
  root?: string;
  /** Require the immutable version expected by the caller. */
  sha256?: string;
}
/** Resolve the documentation asset directory. */
export function testAssetsRoot(root?: string): string;
/** Return the absolute path after registry and content validation. */
export function testAssetPath(id: string, options?: TestAssetOptions): string;
/** Verify every registered asset. */
export function checkTestAssets(options?: TestAssetOptions): {
  id: string;
  path: string;
  sha256: string;
}[];
