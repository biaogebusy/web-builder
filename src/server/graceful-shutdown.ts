import type { Server } from 'node:http';
import { readPositiveInteger } from './env';

/** Default drain window; keep it under the orchestrator's own SIGKILL grace. */
export const SHUTDOWN_GRACE_MS = 15_000;

const hooks: (() => void)[] = [];
const startHooks: (() => void | Promise<void>)[] = [];

/** Stop new background work synchronously; returned promises share the HTTP drain deadline. */
export function onShutdownStart(hook: () => void | Promise<void>): void {
  startHooks.push(hook);
}

/** Register cleanup after HTTP and background work have drained, right before exit. */
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
  let finished = false;
  let forced: ReturnType<typeof setTimeout> | undefined;
  const finish = (): void => {
    if (finished) return;
    finished = true;
    clearTimeout(forced);
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
    // Embedded hosts can still own background work without an HTTP listener.
    if (!server && !startHooks.length) {
      finish();
      return;
    }
    const graceMs = readPositiveInteger('SHUTDOWN_GRACE_MS', SHUTDOWN_GRACE_MS);
    console.info('[Shutdown]', signal, `draining work (up to ${graceMs}ms)`);
    forced = setTimeout(() => {
      console.warn('[Shutdown] grace period expired; closing remaining work');
      server?.closeAllConnections();
      finish();
    }, graceMs);
    let httpDrained = !server;
    let workDrained = !startHooks.length;
    const finishIfDrained = () => { if (httpDrained && workDrained) finish(); };
    const failed = (error: unknown) => console.error('[Shutdown] drain failed:',
      error instanceof Error ? error.message : error);
    const pending = startHooks.map(hook => {
      try { return Promise.resolve(hook()).catch(failed); }
      catch (error) { failed(error); return undefined; }
    });
    if (pending.length) void Promise.all(pending).then(() => {
      workDrained = true;
      finishIfDrained();
    });
    server?.close(() => {
      httpDrained = true;
      finishIfDrained();
    });
    // Idle keep-alive sockets hold the close() callback back without doing any work.
    server?.closeIdleConnections();
  };
}

/** Run the graceful shutdown sequence on SIGTERM / SIGINT. */
export function installGracefulShutdown(server?: Server): void {
  const shutdown = createGracefulShutdown(server);
  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.once(signal, () => shutdown(signal));
  }
}
