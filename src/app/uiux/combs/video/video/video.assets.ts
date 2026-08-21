import type { ScriptStyleLibraryAssets } from '@core/config/library-assets';

export const VIDEO_ASSETS = {
  local: {
    style: '/assets/injects/video-js/video-js.min.css',
    script: '/assets/injects/video-js/video.min.js',
  },
  cdn: {
    style: 'https://cdnjs.cloudflare.com/ajax/libs/video.js/8.23.9/video-js.min.css',
    script: 'https://cdnjs.cloudflare.com/ajax/libs/video.js/8.23.9/video.min.js',
  },
} as const satisfies ScriptStyleLibraryAssets;
