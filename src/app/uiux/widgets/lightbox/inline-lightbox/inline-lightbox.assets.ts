import type { StyleLibraryAssets } from '@core/config/library-assets';

export const LIGHTGALLERY_ASSETS = {
  local: {
    style: '/assets/injects/lightgallery/css/lightgallery-bundle.min.css',
  },
  cdn: {
    style:
      'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.9.0/css/lightgallery-bundle.min.css',
  },
} as const satisfies StyleLibraryAssets;
