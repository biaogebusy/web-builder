import { decodeMetaTags, encodeMetaTags } from './builder-page.util';

describe('meta tags codec', () => {
  it('reads the JSON string JSON:API returns for the metatag field', () => {
    expect(decodeMetaTags('{"description":"Page description","robots":"noindex, nofollow"}')).toEqual(
      {
        description: 'Page description',
        robots: 'noindex, nofollow',
      }
    );
  });

  it('reads the object a JSON enhanced field returns', () => {
    expect(decodeMetaTags({ description: 'Page description' })).toEqual({
      description: 'Page description',
    });
  });

  it('reads an empty field, broken JSON and non object values as no tags', () => {
    expect(decodeMetaTags(null)).toEqual({});
    expect(decodeMetaTags('')).toEqual({});
    expect(decodeMetaTags('a:1:{s:5:"title";s:4:"Home";}')).toEqual({});
    expect(decodeMetaTags('"just a string"')).toEqual({});
    expect(decodeMetaTags(['description'])).toEqual({});
  });

  it('writes trimmed tags as a JSON string', () => {
    expect(encodeMetaTags({ title: '  Home  ', keywords: 'a, b' })).toBe(
      '{"title":"Home","keywords":"a, b"}'
    );
  });

  it('drops empty tags so the page falls back to the Drupal defaults', () => {
    expect(encodeMetaTags({ title: 'Home', description: '', keywords: '   ' })).toBe(
      '{"title":"Home"}'
    );
  });

  it('clears the field when no tag is left', () => {
    expect(encodeMetaTags({ title: '', robots: '' })).toBeNull();
    expect(encodeMetaTags({})).toBeNull();
    expect(encodeMetaTags(undefined)).toBeNull();
  });
});
