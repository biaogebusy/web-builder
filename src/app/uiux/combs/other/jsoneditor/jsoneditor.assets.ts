import type { ScriptStyleLibraryAssets } from '@core/config/library-assets';

export const JSONEDITOR_ASSETS = {
  local: {
    style: '/assets/injects/jsoneditor/jsoneditor.min.css',
    script: '/assets/injects/jsoneditor/jsoneditor.min.js',
  },
  cdn: {
    style: 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.4.3/jsoneditor.min.css',
    script: 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.4.3/jsoneditor.min.js',
  },
} as const satisfies ScriptStyleLibraryAssets;
