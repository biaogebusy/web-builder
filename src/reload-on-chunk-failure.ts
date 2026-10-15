import { NavigationError, Router } from '@angular/router';

/**
 * Deployed builds replace every hashed chunk file. Tabs and cached SSR HTML
 * that still reference the old names get 404s on lazy imports; reloading the
 * page fetches fresh HTML and recovers without user action.
 */

const RELOADED_AT_KEY = 'chunk-failure-reloaded-at';
// One reload per minute: breaks a reload loop if the fresh page is broken too,
// while still retrying once the stale-cache window has passed.
const RELOAD_THROTTLE_MS = 60_000;

/** Match the module-fetch failure messages of Chrome, Firefox and Safari. */
export function isChunkLoadFailure(reason: unknown): boolean {
  const message = reason instanceof Error ? reason.message : String(reason ?? '');
  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Importing a module script failed') ||
    message.includes('error loading dynamically imported module')
  );
}

/**
 * Decide whether the page should reload for this failure, throttled through
 * sessionStorage so a still-broken page cannot reload-loop.
 */
export function shouldReloadForChunkFailure(reason: unknown, now = Date.now()): boolean {
  if (!isChunkLoadFailure(reason)) {
    return false;
  }
  try {
    const reloadedAt = Number(sessionStorage.getItem(RELOADED_AT_KEY)) || 0;
    if (reloadedAt > 0 && now - reloadedAt < RELOAD_THROTTLE_MS) {
      return false;
    }
    sessionStorage.setItem(RELOADED_AT_KEY, String(now));
  } catch {
    // Storage unavailable (rare privacy modes): reload and accept the risk.
  }
  return true;
}

/** Global listeners for uncaught lazy-import failures. */
export function installChunkReloadHandler(): void {
  window.addEventListener(
    'error',
    event => {
      if (shouldReloadForChunkFailure(event.message)) {
        window.location.reload();
      }
    },
    true
  );
  window.addEventListener('unhandledrejection', event => {
    if (shouldReloadForChunkFailure(event.reason)) {
      window.location.reload();
    }
  });
}

/**
 * The router reports failed lazy-route loads as NavigationError events, not
 * unhandled rejections, so route-level failures need this hook as well.
 */
export function watchRouterChunkFailures(router: Router): void {
  router.events.subscribe(event => {
    if (event instanceof NavigationError && shouldReloadForChunkFailure(event.error)) {
      window.location.reload();
    }
  });
}
