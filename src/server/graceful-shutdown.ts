import type { Server } from 'node:http';
import { readPositiveInteger } from './env';

/** Default drain window; keep it under the orchestrator's own SIGKILL grace. */
export const SHUTDOWN_GRACE_MS = 15_000;

const hooks: (() => void)[] = [];

/** Register cleanup that runs once in-flight requests have drained, right before exit. */
export function onShutdown(hook: () => void): void {
  hooks.push(hook);
}

/**
 * Build the shutdown sequence: stop accepting work, let in-flight requests finish, run the
 * registered hooks and exit. Requests that outlive the grace period (e.g. long streams)
 * have their sockets closed anyway so a deploy never hangs on them.
 */
export function createGracefulShutdown(
  server?: Server,
  exit: (code: number) => void = code => process.exit(code)
): (signal: string) => void {
  let shuttingDown = false;
  const finish = (): void => {
    for (const hook of hooks) {
      try {
        hook();
      } catch (error) {
        // One failing cleanup must not keep the process alive or skip the others.
        console.error('[Shutdown] hook failed:', error instanceof Error ? error.message : error);
      }
    }
    exit(0);
  };
  return signal => {
    if (shuttingDown) return;
    shuttingDown = true;
    // Embedded use (dev-server, Cloud Functions) owns no listener of its own.
    if (!server) {
      finish();
      return;
    }
    const graceMs = readPositiveInteger('SHUTDOWN_GRACE_MS', SHUTDOWN_GRACE_MS);
    console.info('[Shutdown]', signal, `draining connections (up to ${graceMs}ms)`);
    const forced = setTimeout(() => {
      console.warn('[Shutdown] grace period expired; closing remaining connections');
      server.closeAllConnections();
      finish();
    }, graceMs);
    forced.unref();
    server.close(() => {
      clearTimeout(forced);
      finish();
    });
    // Idle keep-alive sockets hold the close() callback back without doing any work.
    server.closeIdleConnections();
  };
}

/** Run the graceful shutdown sequence on SIGTERM / SIGINT. */
export function installGracefulShutdown(server?: Server): void {
  const shutdown = createGracefulShutdown(server);
  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.once(signal, () => shutdown(signal));
  }
}
