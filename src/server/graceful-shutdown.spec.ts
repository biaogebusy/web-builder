// @vitest-environment node
// Real sockets and Node timers are under test; jsdom replaces the timers.
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

  it('starts background drain synchronously and waits even without an HTTP listener', async () => {
    const { createGracefulShutdown, onShutdownStart, onShutdown } = await load();
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    const begin = vi.fn(() => pending);
    const cleanup = vi.fn();
    const exit = vi.fn();
    onShutdownStart(begin);
    onShutdown(cleanup);
    const shutdown = createGracefulShutdown(undefined, exit);
    shutdown('SIGTERM');
    shutdown('SIGINT');
    expect(begin).toHaveBeenCalledOnce();
    expect(cleanup).not.toHaveBeenCalled();
    release();
    await vi.waitFor(() => expect(exit).toHaveBeenCalledExactlyOnceWith(0));
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it.each(['http', 'background'])(
    'waits for both drains when %s finishes first', async first => {
      const { createGracefulShutdown, onShutdownStart } = await load();
      let release!: () => void;
      const background = new Promise<void>(resolve => { release = resolve; });
      let receive!: (res: ServerResponse) => void;
      const received = new Promise<ServerResponse>(resolve => { receive = resolve; });
      const server = await listen(receive);
      const body = request(server);
      const res = await received;
      const exit = vi.fn();
      onShutdownStart(() => background);
      createGracefulShutdown(server, exit)('SIGTERM');
      if (first === 'http') { res.end('done'); await body; }
      else release();
      await new Promise(resolve => setTimeout(resolve, 20));
      expect(exit).not.toHaveBeenCalled();
      if (first === 'http') release();
      else { res.end('done'); await body; }
      await vi.waitFor(() => expect(exit).toHaveBeenCalledExactlyOnceWith(0));
    }
  );

  it('shares one deadline and finalizes once despite late HTTP and background completion', async () => {
    vi.useFakeTimers();
    process.env['SHUTDOWN_GRACE_MS'] = '50';
    try {
      const { createGracefulShutdown, onShutdownStart, onShutdown } = await load();
      let closed!: () => void;
      let release!: () => void;
      const background = new Promise<void>(resolve => { release = resolve; });
      const server = { close: vi.fn(callback => { closed = callback; }),
        closeIdleConnections: vi.fn(), closeAllConnections: vi.fn() };
      const cleanup = vi.fn();
      const exit = vi.fn();
      onShutdownStart(() => background);
      onShutdown(cleanup);
      createGracefulShutdown(server as unknown as Server, exit)('SIGTERM');
      await vi.advanceTimersByTimeAsync(20);
      closed();
      await vi.advanceTimersByTimeAsync(29);
      expect(exit).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1);
      expect(exit).toHaveBeenCalledExactlyOnceWith(0);
      expect(server.closeAllConnections).toHaveBeenCalledOnce();
      release();
      closed();
      await vi.runAllTimersAsync();
      expect(cleanup).toHaveBeenCalledOnce();
      expect(exit).toHaveBeenCalledOnce();
    } finally { vi.useRealTimers(); }
  });

  it('keeps draining other work when a start hook throws or rejects', async () => {
    const { createGracefulShutdown, onShutdownStart } = await load();
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const exit = vi.fn();
    const later = vi.fn();
    try {
      onShutdownStart(() => { throw new Error('start failed'); });
      onShutdownStart(async () => { throw new Error('drain failed'); });
      onShutdownStart(later);
      createGracefulShutdown(undefined, exit)('SIGTERM');
      expect(later).toHaveBeenCalledOnce();
      await vi.waitFor(() => expect(exit).toHaveBeenCalledExactlyOnceWith(0));
      expect(error).toHaveBeenCalledTimes(2);
    } finally { error.mockRestore(); }
  });
});
