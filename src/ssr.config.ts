// Keep individual backend requests below the full render budget so Angular has
// time to finish routing, dynamic imports, and HTML serialization.
export const SSR_HTTP_TIMEOUT_MS = 4000;
export const SSR_RENDER_TIMEOUT_MS = 12000;
export const SSR_CACHE_TTL_MS = 5 * 60 * 1000;
export const SSR_CACHE_MAX_ENTRIES = 200;
export const SSR_CACHE_MAX_BYTES = 50 * 1024 * 1024;
export const SSR_METRICS_INTERVAL_MS = 60 * 1000;
