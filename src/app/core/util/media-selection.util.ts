import type { MediaSelectionPurpose } from '@core/interface/manage/IManage';

/** Format hints carried by a library row or image selection. They do not grant access. */
export interface MediaSelectionSource {
  src?: string;
  source?: string;
  mimeType?: string;
  bundle?: string;
  private?: boolean;
}

const rasterMimeTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const imageExtensions: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  webp: 'image/webp', svg: 'image/svg+xml',
};

/** Uses source metadata first; old Views rows have only a source URL. */
export function mediaSourceMime(media: MediaSelectionSource): string {
  if (media.mimeType) return media.mimeType.toLowerCase().split(';')[0].trim();
  try {
    const url = new URL(media.source || media.src || '', 'https://media.invalid');
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    const extension = decodeURIComponent(url.pathname).split('.').pop()?.toLowerCase() ?? '';
    return imageExtensions[extension] ?? '';
  } catch {
    return '';
  }
}

/** Guards image consumers before a selection is emitted; the CMS still authorizes references. */
export function canSelectMedia(
  media: MediaSelectionSource,
  purpose: MediaSelectionPurpose = 'web-image'
): boolean {
  const mime = mediaSourceMime(media);
  const raster = rasterMimeTypes.has(mime);
  if (purpose === 'raster-image') {
    return !media.private && raster && (!media.bundle || media.bundle === 'image');
  }
  if (purpose === 'image-media') {
    return (!media.bundle || media.bundle === 'image') && (raster || mime === 'image/svg+xml');
  }
  return !media.private && (raster || mime === 'image/svg+xml');
}

/** Browser-side feedback only; upload validators must inspect the actual bytes. */
export function isRasterImageFile(file: Pick<File, 'type' | 'name'>): boolean {
  const mime = file.type.toLowerCase();
  const extensionMime = imageExtensions[file.name.split('.').pop()?.toLowerCase() ?? ''];
  return !!extensionMime && rasterMimeTypes.has(extensionMime) && (!mime || mime === extensionMime);
}
