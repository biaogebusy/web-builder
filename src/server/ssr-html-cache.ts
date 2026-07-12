export interface SsrHtmlCacheOptions {
  maxBytes: number;
  maxEntries: number;
  ttlMs: number;
}

interface SsrHtmlCacheEntry {
  bytes: number;
  expiresAt: number;
  html: string;
}

export interface SsrHtmlCacheStats {
  bytes: number;
  entries: number;
  evictions: number;
  expired: number;
  hitRatio: number;
  hits: number;
  misses: number;
  rejectedOversize: number;
  sets: number;
}

export class SsrHtmlCache {
  private readonly cache = new Map<string, SsrHtmlCacheEntry>();
  private totalBytes = 0;
  private hits = 0;
  private misses = 0;
  private sets = 0;
  private evictions = 0;
  private expired = 0;
  private rejectedOversize = 0;

  constructor(
    private readonly options: SsrHtmlCacheOptions,
    private readonly now: () => number = Date.now
  ) {}

  get(key: string): string | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses += 1;
      return undefined;
    }

    if (entry.expiresAt <= this.now()) {
      this.delete(key, entry);
      this.expired += 1;
      this.misses += 1;
      return undefined;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits += 1;
    return entry.html;
  }

  set(key: string, html: string): boolean {
    const bytes = Buffer.byteLength(html, 'utf8');
    if (bytes > this.options.maxBytes) {
      this.rejectedOversize += 1;
      return false;
    }

    const existing = this.cache.get(key);
    if (existing) {
      this.delete(key, existing);
    }

    this.cache.set(key, {
      bytes,
      expiresAt: this.now() + this.options.ttlMs,
      html,
    });
    this.totalBytes += bytes;
    this.sets += 1;
    this.evictOverflow();
    return true;
  }

  pruneExpired(): number {
    const now = this.now();
    let removed = 0;

    for (const [key, entry] of this.cache) {
      if (entry.expiresAt <= now) {
        this.delete(key, entry);
        removed += 1;
      }
    }

    this.expired += removed;
    return removed;
  }

  stats(): SsrHtmlCacheStats {
    const requests = this.hits + this.misses;
    return {
      bytes: this.totalBytes,
      entries: this.cache.size,
      evictions: this.evictions,
      expired: this.expired,
      hitRatio: requests > 0 ? this.hits / requests : 0,
      hits: this.hits,
      misses: this.misses,
      rejectedOversize: this.rejectedOversize,
      sets: this.sets,
    };
  }

  private evictOverflow(): void {
    while (this.cache.size > this.options.maxEntries || this.totalBytes > this.options.maxBytes) {
      const oldest = this.cache.entries().next().value as [string, SsrHtmlCacheEntry] | undefined;
      if (!oldest) {
        return;
      }

      this.delete(oldest[0], oldest[1]);
      this.evictions += 1;
    }
  }

  private delete(key: string, entry: SsrHtmlCacheEntry): void {
    if (this.cache.delete(key)) {
      this.totalBytes -= entry.bytes;
    }
  }
}
