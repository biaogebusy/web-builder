import { observeIntersection } from './observe-intersection';

describe('intersection subscription', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses the caller scroll root and releases each render subscription', () => {
    let receive!: IntersectionObserverCallback;
    const observe = vi.fn();
    const disconnect = vi.fn();
    const options: IntersectionObserverInit = {
      root: document.createElement('main'), rootMargin: '0px 0px 120px 0px',
    };
    const constructor = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback, value: IntersectionObserverInit) {
        receive = callback;
        constructor(value);
      }
      observe = observe;
      disconnect = disconnect;
    });
    const target = document.createElement('div');
    const intersect = vi.fn();
    const release = observeIntersection(target, intersect, options);
    expect(constructor).toHaveBeenCalledWith(options);
    expect(observe).toHaveBeenCalledWith(target);
    receive([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(intersect).not.toHaveBeenCalled();
    receive([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(intersect).toHaveBeenCalledOnce();
    release();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
