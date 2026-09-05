import type { StyleLibraryAssets } from '@core/config/library-assets';

export const HIGHLIGHT_ASSETS = {
  local: {
    style: '/assets/injects/highlight.js/styles/atom-one-dark.css',
  },
  cdn: {
    style:
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css',
  },
} as const satisfies StyleLibraryAssets;
