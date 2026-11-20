import { getLibraryAsset } from '@core/config/library-assets';
import type { UtilitiesService } from '@core/service/utilities.service';
import { JSONEDITOR_ASSETS } from './jsoneditor.assets';

/** Load JSONEditor only when a caller opens an editor, preserving the AMD workaround. */
export async function loadJsonEditorAssets(
  loader: Pick<UtilitiesService, 'loadStyle' | 'loadScriptWithoutAmd'>,
  useLocal: boolean | undefined
): Promise<void> {
  const source = useLocal ? 'local' : 'cdn';
  await loader.loadStyle(getLibraryAsset(JSONEDITOR_ASSETS, source, 'style'));
  await loader.loadScriptWithoutAmd(getLibraryAsset(JSONEDITOR_ASSETS, source, 'script'));
}
