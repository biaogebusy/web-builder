import { isChunkLoadFailure, shouldReloadForChunkFailure } from './reload-on-chunk-failure';

describe('reload-on-chunk-failure', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe('isChunkLoadFailure', () => {
    it('matches the Chrome dynamic import error', () => {
      expect(
        isChunkLoadFailure(
          new TypeError('Failed to fetch dynamically imported module: /chunk-DB5CTCYI.js')
        )
      ).toBe(true);
    });

    it('matches the Firefox/Safari module script errors', () => {
      expect(isChunkLoadFailure('Importing a module script failed.')).toBe(true);
      expect(isChunkLoadFailure('error loading dynamically imported module')).toBe(true);
    });

    it('rejects unrelated errors and empty input', () => {
      expect(isChunkLoadFailure(new Error('Connection refused'))).toBe(false);
      expect(isChunkLoadFailure('Failed to fetch file abc: error')).toBe(false);
      expect(isChunkLoadFailure(undefined)).toBe(false);
      expect(isChunkLoadFailure({})).toBe(false);
    });
  });

  describe('shouldReloadForChunkFailure', () => {
    afterEach(() => vi.restoreAllMocks());

    it.each(['getItem', 'setItem'] as const)('does not reload when storage %s fails', method => {
      vi.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new DOMException('Storage unavailable', 'SecurityError');
      });
      expect(shouldReloadForChunkFailure('Importing a module script failed.')).toBe(false);
    });

    it('returns true the first time a chunk failure occurs', () => {
      expect(shouldReloadForChunkFailure('Importing a module script failed.', 1_000)).toBe(true);
    });

    it('throttles repeated failures within one minute', () => {
      expect(shouldReloadForChunkFailure('Importing a module script failed.', 1_000)).toBe(true);
      expect(shouldReloadForChunkFailure('Importing a module script failed.', 30_000)).toBe(false);
      expect(shouldReloadForChunkFailure('Importing a module script failed.', 61_000)).toBe(true);
    });

    it('never reloads for non-chunk failures', () => {
      expect(shouldReloadForChunkFailure(new Error('Connection refused'), 1_000)).toBe(false);
      expect(shouldReloadForChunkFailure(undefined, 1_000)).toBe(false);
    });
  });
});
