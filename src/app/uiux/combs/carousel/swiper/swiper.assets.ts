import type { ScriptStyleLibraryAssets } from '@core/config/library-assets';

export const SWIPER_ASSETS = {
  local: {
    style: '/assets/injects/swiper/swiper-bundle.min.css',
    script: '/assets/injects/swiper/swiper-bundle.min.js',
  },
  cdn: {
    style: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.2.10/swiper-bundle.min.css',
    script: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.2.10/swiper-bundle.min.js',
  },
} as const satisfies ScriptStyleLibraryAssets;
