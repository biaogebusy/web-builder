import { ChartHost } from './chart-host';

describe('chart host lifetime', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reuses an instance and releases its resize subscription before replacing the host', () => {
    const observers: {
      callback: ResizeObserverCallback; disconnect: ReturnType<typeof vi.fn>;
    }[] = [];
    const observe = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      disconnect = vi.fn();
      observe = observe;
      constructor(callback: ResizeObserverCallback) {
        observers.push({ callback, disconnect: this.disconnect });
      }
    });
    const first = { resize: vi.fn(), dispose: vi.fn() };
    const second = { resize: vi.fn(), dispose: vi.fn() };
    const create = vi.fn().mockReturnValueOnce(first).mockReturnValueOnce(second);
    const owner = new ChartHost<typeof first>();
    const host = document.createElement('div');
    expect(owner.ensure(host, create)).toBe(first);
    expect(owner.ensure(host, create)).toBe(first);
    expect(create).toHaveBeenCalledOnce();
    expect(observe).toHaveBeenCalledWith(host);
    observers[0].callback([], {} as ResizeObserver);
    expect(first.resize).toHaveBeenCalledOnce();
    const replacement = document.createElement('div');
    expect(owner.ensure(replacement, create)).toBe(second);
    expect(first.dispose).toHaveBeenCalledOnce();
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(owner.host).toBe(replacement);
    owner.dispose();
    owner.dispose();
    expect(second.dispose).toHaveBeenCalledOnce();
    expect(observers[1].disconnect).toHaveBeenCalledOnce();
    expect(owner.host).toBeUndefined();
  });

  it('can retry initialization and dispose when no resize observer is available', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    const chart = { resize: vi.fn(), dispose: vi.fn() };
    const owner = new ChartHost<typeof chart>();
    const host = document.createElement('div');
    expect(() => owner.ensure(host, () => { throw new Error('not ready'); })).toThrow('not ready');
    expect(owner.ensure(host, () => chart)).toBe(chart);
    owner.dispose();
    expect(chart.dispose).toHaveBeenCalledOnce();
  });
});
