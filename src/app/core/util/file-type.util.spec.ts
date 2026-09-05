import { getFileType } from '@core/util/file-type.util';

describe('file-type util', () => {
  it('returns empty string for a falsy href', () => {
    expect(getFileType('')).toBe('');
    expect(getFileType(null as never)).toBe('');
    expect(getFileType(undefined as never)).toBe('');
  });

  it.each([
    ['/files/report.pdf', 'pdf'],
    ['/files/report.PDF', 'pdf'],
    ['https://cdn.com/a.pdf?v=1', 'pdf'],
  ])('detects PDF: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it.each([
    ['/logo.svg', 'svg'],
    ['/logo.SVG', 'svg'],
  ])('detects SVG: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it.each([
    ['/notes.txt', 'txt'],
    ['/notes.TXT', 'txt'],
  ])('detects plain text: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it.each([
    ['/cv.doc', 'word'],
    ['/cv.docx', 'word'],
    ['/cv.DOC', 'word'],
    ['/cv.DOCX', 'word'],
  ])('detects Word documents: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it.each([
    ['/data.xls', 'excel'],
    ['/data.xlsx', 'excel'],
    ['/data.XLSX', 'excel'],
  ])('detects Excel spreadsheets: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it.each([
    ['/photo.png', 'picture'],
    ['/photo.jpg', 'picture'],
    ['/photo.jpeg', 'picture'],
    ['/photo.bmp', 'picture'],
    ['/photo.gif', 'picture'],
    ['/photo.webp', 'picture'],
    ['/photo.PNG', 'picture'],
    ['/photo.JPG', 'picture'],
  ])('detects images: %s → %s', (href, expected) => {
    expect(getFileType(href)).toBe(expected);
  });

  it('returns empty string for an unknown extension', () => {
    expect(getFileType('/archive.zip')).toBe('');
    expect(getFileType('/script.js')).toBe('');
  });

  it('returns empty string when there is no file extension', () => {
    expect(getFileType('https://example.com/path')).toBe('');
  });

  it('matches the extension before query parameters', () => {
    expect(getFileType('/photo.png?width=100&height=100')).toBe('picture');
    expect(getFileType('/report.pdf?t=12345')).toBe('pdf');
  });

  it('matches the first pattern in the chain when multiple could apply', () => {
    // pdf is checked before picture, so a file ending in .pdf.png matches pdf first
    expect(getFileType('/file.pdf.png')).toBe('pdf');
    // Similarly, .svg.png matches svg first
    expect(getFileType('/file.svg.png')).toBe('svg');
  });
});
