import { getLangPrefix } from './language.util';

describe('language util', () => {
  it('uses no path prefix for the default language', () => {
    expect(getLangPrefix({ langCode: 'zh-hans', default: true })).toBe('');
  });

  it('derives a non-default language prefix from its language code', () => {
    expect(getLangPrefix({ langCode: 'en' })).toBe('/en');
  });

  it('uses no path prefix when the language is unavailable', () => {
    expect(getLangPrefix()).toBe('');
  });
});
