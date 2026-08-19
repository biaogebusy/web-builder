import type { StyleLibraryAssets } from '@core/config/library-assets';

export const AOS_ASSETS = {
  local: {
    style: '/assets/injects/aos/dist/aos.css',
  },
  cdn: {
    style: 'https://cdnjs.cloudflare.com/ajax/libs/aos/3.0.0-beta.6/aos.css',
  },
} as const satisfies StyleLibraryAssets;
