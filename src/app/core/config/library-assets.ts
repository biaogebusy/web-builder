export type LibrarySource = 'local' | 'cdn';
export type LibraryAssetType = 'style' | 'script';

export type StyleLibraryAssets = Readonly<
  Record<LibrarySource, { readonly style: string }>
>;

export type ScriptStyleLibraryAssets = Readonly<
  Record<LibrarySource, { readonly style: string; readonly script: string }>
>;

export function getLibraryAsset<AssetType extends LibraryAssetType>(
  assets: Readonly<Record<LibrarySource, Readonly<Record<AssetType, string>>>>,
  source: LibrarySource,
  type: AssetType
): string {
  return assets[source][type];
}
