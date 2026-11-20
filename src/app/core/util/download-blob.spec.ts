import { downloadBlob } from './download-blob';

describe('browser blob download', () => {
  const create = vi.fn(() => 'blob:download');
  const revoke = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    create.mockClear();
    revoke.mockClear();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('preserves the name, link relationship and attachment while deferring release', () => {
    const blob = new Blob(['export']);
    const onRelease = vi.fn();
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      expect(this.download).toBe('报告.csv');
      expect(this.rel).toBe('noopener');
      expect(this.isConnected).toBe(true);
      expect(this.href).toBe('blob:download');
    });
    const release = downloadBlob(blob, '报告.csv', {
      document, appendToBody: true, rel: 'noopener', revokeAfterMs: 1000, onRelease,
    });
    expect(create).toHaveBeenCalledWith(blob);
    expect(document.querySelector('a[download]')).toBeNull();
    expect(revoke).not.toHaveBeenCalled();
    vi.advanceTimersByTime(999);
    expect(revoke).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    release();
    expect(revoke).toHaveBeenCalledExactlyOnceWith('blob:download');
    expect(onRelease).toHaveBeenCalledExactlyOnceWith(release);
  });

  it('lets an owner cancel a delayed cleanup once and preserves immediate release', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
    const release = downloadBlob(new Blob(), 'draft.docx', { document, revokeAfterMs: 30_000 });
    release();
    vi.advanceTimersByTime(30_000);
    expect(revoke).toHaveBeenCalledOnce();
    downloadBlob(new Blob(), 'theme.css', { document, revokeAfterMs: 0 });
    expect(revoke).toHaveBeenCalledTimes(2);
  });

  it('releases the object URL and attached link if the browser click fails', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('click'); });
    expect(() => downloadBlob(new Blob(), 'file', {
      document, appendToBody: true, revokeAfterMs: 1000,
    })).toThrow('click');
    expect(revoke).toHaveBeenCalledOnce();
    expect(document.querySelector('a[download]')).toBeNull();
  });
});
