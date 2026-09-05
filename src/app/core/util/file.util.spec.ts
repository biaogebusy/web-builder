import { readFileAsArrayBuffer } from '@core/util/file.util';

describe('file util', () => {
  describe('readFileAsArrayBuffer', () => {
    it('resolves with the file content as an ArrayBuffer', async () => {
      const file = new File(['hello world'], 'test.txt', { type: 'text/plain' });

      const buffer = await readFileAsArrayBuffer(file);

      expect(buffer).toBeInstanceOf(ArrayBuffer);
      expect(new TextDecoder().decode(buffer)).toBe('hello world');
    });

    it('rejects when the FileReader encounters an error', async () => {
      // Stub FileReader to fire onerror (jsdom's real implementation works for most files,
      // so exercise the branch explicitly)
      const onerrorCallback = { fn: null as ((e: ProgressEvent<FileReader>) => void) | null };
      class FakeReader {
        readAsArrayBuffer = vi.fn();
        set onerror(v: (e: ProgressEvent<FileReader>) => void) {
          onerrorCallback.fn = v;
        }
        get onerror(): ((e: ProgressEvent<FileReader>) => void) | null {
          return onerrorCallback.fn;
        }
        onload = null;
        result: ArrayBuffer | string | null = null;
      }
      vi.stubGlobal('FileReader', FakeReader as unknown as typeof FileReader);

      const pending = readFileAsArrayBuffer(new File(['x'], 'x.txt'));
      const errorEvent = new ProgressEvent('error') as ProgressEvent<FileReader>;
      onerrorCallback.fn?.(errorEvent);

      await expect(pending).rejects.toBe(errorEvent);

      vi.unstubAllGlobals();
    });

    it('rejects with false when the result is falsy', async () => {
      // Stub FileReader to fire onload with a null result (exercise the defensive branch)
      const onloadCallback = { fn: null as ((e: ProgressEvent<FileReader>) => void) | null };
      class FakeReader {
        readAsArrayBuffer = vi.fn();
        set onload(v: (e: ProgressEvent<FileReader>) => void) {
          onloadCallback.fn = v;
        }
        get onload(): ((e: ProgressEvent<FileReader>) => void) | null {
          return onloadCallback.fn;
        }
        onerror = null;
        result: ArrayBuffer | string | null = null;
      }
      vi.stubGlobal('FileReader', FakeReader as unknown as typeof FileReader);

      const pending = readFileAsArrayBuffer(new File(['x'], 'x.txt'));

      // Fire onload with a null target.result
      onloadCallback.fn?.({ target: { result: null } } as unknown as ProgressEvent<FileReader>);

      await expect(pending).rejects.toBe(false);

      vi.unstubAllGlobals();
    });
  });
});
