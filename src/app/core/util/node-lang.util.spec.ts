import { resolveNodeLangCode } from './node-lang.util';

const languages = [
  { label: '中文', langCode: 'zh-hans', prefix: '/', default: true },
  { label: 'EN', langCode: 'en', prefix: '/en' },
];

describe('node language utility', () => {
  it('omits the default language from API requests', () => {
    expect(
      resolveNodeLangCode({
        pageUrl: '/about',
        inCanvas: false,
        multiLang: true,
        languages,
      })
    ).toBeUndefined();
  });

  it('returns a non-default URL language', () => {
    expect(
      resolveNodeLangCode({
        pageUrl: '/en/about',
        inCanvas: false,
        multiLang: true,
        languages,
      })
    ).toBe('en');
  });

  it('uses the Builder language only while rendering inside the Canvas', () => {
    expect(
      resolveNodeLangCode({
        pageUrl: '/about',
        builderLangcode: 'en',
        inCanvas: true,
        multiLang: true,
        languages,
      })
    ).toBe('en');

    expect(
      resolveNodeLangCode({
        pageUrl: '/about',
        builderLangcode: 'en',
        inCanvas: false,
        multiLang: true,
        languages,
      })
    ).toBeUndefined();
  });

  it('falls back to the default language for unknown paths and disabled multilingual mode', () => {
    expect(
      resolveNodeLangCode({
        pageUrl: '/fr/about',
        inCanvas: false,
        multiLang: true,
        languages,
      })
    ).toBeUndefined();

    expect(
      resolveNodeLangCode({
        pageUrl: '/en/about',
        inCanvas: false,
        multiLang: false,
        languages,
      })
    ).toBeUndefined();
  });
});
