// @vitest-environment node
// Real sockets and Node timers (`unref`) are under test; jsdom replaces the timers.
import { createServer, get, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';

// Hooks are process-wide by design; a fresh module per test keeps them isolated.
async function load() {
  vi.resetModules();
  return import('./graceful-shutdown');
}

function listen(onRequest: (res: ServerResponse) => void): Promise<Server> {
  const server = createServer((_req, res) => onRequest(res));
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function request(server: Server): Promise<string> {
  const { port } = server.address() as AddressInfo;
  return new Promise((resolve, reject) => {
    get({ host: '127.0.0.1', port, agent: false }, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

describe('graceful shutdown', () => {
  afterEach(() => {
    delete process.env['SHUTDOWN_GRACE_MS'];
  });

  it('runs the hooks and exits once when no listener is owned', async () => {
    const { createGracefulShutdown, onShutdown } = await load();
    const hook = vi.fn();
    const exit = vi.fn();
    onShutdown(hook);
    const shutdown = createGracefulShutdown(undefined, exit);

    shutdown('SIGTERM');
    shutdown('SIGINT');

    expect(hook).toHaveBeenCalledOnce();
    expect(exit).toHaveBeenCalledExactlyOnceWith(0);
  });

  it('lets an in-flight request finish before the hooks run', async () => {
    const { createGracefulShutdown, onShutdown } = await load();
    let received!: (res: ServerResponse) => void;
    const pending = new Promise<ServerResponse>(resolve => (received = resolve));
    const server = await listen(res => received(res));
    const body = request(server);
    const res = await pending;

    const hook = vi.fn();
    onShutdown(hook);
    const exited = new Promise<number>(resolve => {
      createGracefulShutdown(server, resolve)('SIGTERM');
    });
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(hook).not.toHaveBeenCalled();

    res.end('done');
    await expect(body).resolves.toBe('done');
    await expect(exited).resolves.toBe(0);
    expect(hook).toHaveBeenCalledOnce();
  });

  it('closes connections still open when the grace period expires', async () => {
    process.env['SHUTDOWN_GRACE_MS'] = '50';
    const { createGracefulShutdown } = await load();
    let received!: () => void;
    const arrived = new Promise<void>(resolve => (received = resolve));
    // The response is never ended: only the forced close can release the server.
    const server = await listen(() => received());
    const body = request(server).catch(() => 'closed');
    await arrived;

    const exited = new Promise<number>(resolve => {
      createGracefulShutdown(server, resolve)('SIGTERM');
    });

    await expect(exited).resolves.toBe(0);
    await expect(body).resolves.toBe('closed');
  });

  it('still runs the remaining hooks and exits when one hook throws', async () => {
    const { createGracefulShutdown, onShutdown } = await load();
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const later = vi.fn();
    const exit = vi.fn();
    onShutdown(() => {
      throw new Error('broken');
    });
    onShutdown(later);

    createGracefulShutdown(undefined, exit)('SIGTERM');

    expect(later).toHaveBeenCalledOnce();
    expect(exit).toHaveBeenCalledWith(0);
    expect(error).toHaveBeenCalledWith('[Shutdown] hook failed:', 'broken');
    error.mockRestore();
  });
});
