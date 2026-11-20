/** Browser download options; the caller owns file naming and authorization. */
export interface BlobDownloadOptions {
  /** DOM context of the initiating view. */
  document: Document;
  /** Existing release delay; zero releases immediately after the click. */
  revokeAfterMs: number;
  /** Attach the link while clicking when the calling flow requires it. */
  appendToBody?: boolean;
  /** Optional link relationship retained from the initiating flow. */
  rel?: string;
  /** Lets a longer-lived owner remove a completed download from its cleanup collection. */
  onRelease?: (release: () => void) => void;
}

/** Start a download and return an idempotent cleanup for views that can close before release. */
export function downloadBlob(blob: Blob, name: string, options: BlobDownloadOptions): () => void {
  const url = URL.createObjectURL(blob);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    clearTimeout(timer);
    URL.revokeObjectURL(url);
    options.onRelease?.(release);
  };
  const link = options.document.createElement('a');
  link.href = url;
  link.download = name;
  if (options.rel) link.rel = options.rel;
  try {
    if (options.appendToBody) options.document.body.appendChild(link);
    link.click();
  } catch (error) {
    release();
    throw error;
  } finally {
    link.remove();
  }
  if (options.revokeAfterMs > 0) timer = setTimeout(release, options.revokeAfterMs);
  else release();
  return release;
}
