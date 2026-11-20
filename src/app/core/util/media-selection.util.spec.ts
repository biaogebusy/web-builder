import { canSelectMedia, isRasterImageFile, mediaSourceMime } from './media-selection.util';

describe('media selection purposes', () => {
  it('uses the original document instead of its image thumbnail', () => {
    expect(canSelectMedia({ source: '/brief.pdf', src: '/thumb.png' })).toBe(false);
    expect(canSelectMedia({ mimeType: 'application/pdf', src: '/thumb.png' })).toBe(false);
  });

  it('allows vector images in web content without putting vector UUIDs in image fields', () => {
    const vector = { source: '/logo.svg?version=2', bundle: 'vector' };
    expect(canSelectMedia(vector, 'web-image')).toBe(true);
    expect(canSelectMedia(vector, 'image-media')).toBe(false);
    expect(canSelectMedia(vector, 'raster-image')).toBe(false);
    expect(canSelectMedia({ ...vector, bundle: 'image' }, 'image-media')).toBe(true);
  });

  it('uses catalog MIME metadata for extensionless file delivery', () => {
    const media = { source: '/files/123', mimeType: 'image/webp', bundle: 'image' };
    expect(canSelectMedia(media, 'raster-image')).toBe(true);
    expect(canSelectMedia({ ...media, mimeType: 'application/pdf' })).toBe(false);
  });

  it('does not guess unknown source formats or interpret query strings as extensions', () => {
    expect(mediaSourceMime({ source: '/asset?name=photo.png' })).toBe('');
    expect(canSelectMedia({ source: '/asset.jpg.exe', src: '/thumb.jpg' })).toBe(false);
    expect(canSelectMedia({ source: '/bad%zz.png' })).toBe(false);
    expect(canSelectMedia({ source: 'javascript:alert(1).png' })).toBe(false);
    expect(canSelectMedia({ source: '/asset.PNG?v=3#preview' })).toBe(true);
  });

  it('keeps local model input to supported raster hints before server byte validation', () => {
    expect(isRasterImageFile({ name: 'paste.png', type: 'image/png' })).toBe(true);
    expect(isRasterImageFile({ name: 'photo.webp', type: '' })).toBe(true);
    expect(isRasterImageFile({ name: 'logo.svg', type: 'image/svg+xml' })).toBe(false);
    expect(isRasterImageFile({ name: 'fake.png', type: 'text/html' })).toBe(false);
    expect(isRasterImageFile({ name: 'photo.bmp', type: 'image/bmp' })).toBe(false);
  });
  it('does not pass an authenticated download URL to a public image consumer', () => {
    const media = { mimeType: 'image/png', bundle: 'image', private: true };
    expect(canSelectMedia(media, 'raster-image')).toBe(false);
    expect(canSelectMedia(media, 'web-image')).toBe(false);
    expect(canSelectMedia(media, 'image-media')).toBe(true);
  });

});
