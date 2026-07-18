import { SsrHtmlCache } from './ssr-html-cache';

describe('SsrHtmlCache', () => {
  let now = 1000;

  function createCache(options: Partial<ConstructorParameters<typeof SsrHtmlCache>[0]> = {}) {
    return new SsrHtmlCache(
      {
        maxBytes: 1024,
        maxEntries: 2,
        ttlMs: 100,
        ...options,
      },
      () => now
    );
  }

  beforeEach(() => {
    now = 1000;
  });

  it('evicts the least recently used entry at the capacity limit', () => {
    const cache = createCache();
    cache.set('a', 'A');
    cache.set('b', 'B');
    expect(cache.get('a')).toBe('A');

    cache.set('c', 'C');

    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('a')).toBe('A');
    expect(cache.get('c')).toBe('C');
    expect(cache.stats().evictions).toBe(1);
  });

  it('expires entries and removes them during pruning', () => {
    const cache = createCache();
    cache.set('a', 'A');
    cache.set('b', 'B');
    now += 101;

    expect(cache.pruneExpired()).toBe(2);
    expect(cache.stats()).toMatchObject({ entries: 0, expired: 2 });
  });

  it('enforces the total byte limit', () => {
    const cache = createCache({ maxBytes: 5, maxEntries: 10 });
    cache.set('a', '1234');
    cache.set('b', '56');

    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe('56');
    expect(cache.stats()).toMatchObject({ bytes: 2, evictions: 1 });
  });

  it('rejects a single response larger than the cache capacity', () => {
    const cache = createCache({ maxBytes: 3 });

    expect(cache.set('large', '1234')).toBe(false);
    expect(cache.stats()).toMatchObject({ entries: 0, rejectedOversize: 1 });
  });

  it('reports cache hit ratio', () => {
    const cache = createCache();
    cache.set('a', 'A');
    cache.get('a');
    cache.get('missing');

    expect(cache.stats()).toMatchObject({ hitRatio: 0.5, hits: 1, misses: 1 });
  });
});
