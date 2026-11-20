import {
  appendQueryParams,
  buildHttpParams,
  buildQueryString,
  combineQueryParams,
  queryStringToParams,
} from './http-params.util';

describe('http params util', () => {
  it('builds an encoded query string and keeps 0/false values', () => {
    const query = buildQueryString({
      keyword: 'AI news & updates',
      page: 0,
      enabled: false,
      empty: '',
      missing: undefined,
    });

    expect(query).toBe('keyword=AI%20news%20%26%20updates&page=0&enabled=false');
  });

  it('supports plus-separated arrays for existing view APIs', () => {
    const query = buildQueryString(
      {
        tags: ['news', 'AI news', undefined, ''],
      },
      { arrayFormat: 'plus' }
    );

    expect(query).toBe('tags=news+AI%20news');
  });

  it('can preserve Drupal JSON:API style keys while encoding values', () => {
    const query = buildQueryString(
      {
        'filter[title]': '研发 & 架构',
        'page[limit]': 20,
      },
      { encodeKeys: false }
    );

    expect(query).toBe(
      'filter[title]=%E7%A0%94%E5%8F%91%20%26%20%E6%9E%B6%E6%9E%84&page[limit]=20'
    );
  });

  it('supports comma-separated arrays without treating value commas as separators', () => {
    const query = buildQueryString(
      {
        tags: ['news,local', 'AI news'],
      },
      { arrayFormat: 'comma' }
    );

    expect(query).toBe('tags=news%2Clocal,AI%20news');
  });

  it('builds HttpParams with repeated array values', () => {
    const params = buildHttpParams({
      tag: ['news', 'architecture'],
      noCache: true,
    });

    expect(params.getAll('tag')).toEqual(['news', 'architecture']);
    expect(params.get('noCache')).toBe('true');
  });

  it('appends query params to URLs with or without an existing query string', () => {
    expect(appendQueryParams('/api/v1/node', { noCache: 1 })).toBe('/api/v1/node?noCache=1');
    expect(appendQueryParams('/api/v1/node?content=/core/base', { noCache: 1 })).toBe(
      '/api/v1/node?content=/core/base&noCache=1'
    );
  });

  it('combines existing query strings with structured params', () => {
    const query = combineQueryParams(['include=cover', { sort: '-created', 'page[limit]': 20 }], {
      encodeKeys: false,
    });

    expect(query).toBe('include=cover&sort=-created&page[limit]=20');
  });

  it('parses query strings into a params object', () => {
    expect(queryStringToParams('?preview=true&version=1&version=2')).toEqual({
      preview: 'true',
      version: ['1', '2'],
    });
  });

  it.each(['repeat', 'plus', 'comma'] as const)('preserves empty/zero/false in %s arrays', arrayFormat => {
    const params = { value: ['', 0, false, null, undefined], empty: '', missing: null };
    const separator = arrayFormat === 'repeat' ? '&value=' : arrayFormat === 'plus' ? '+' : ',';
    expect(buildQueryString(params, { arrayFormat })).toBe(`value=0${separator}false`);
    expect(buildQueryString(params, { arrayFormat, skipEmptyString: false }))
      .toBe(`value=${separator}0${separator}false&empty=`);
    expect(buildQueryString({ values: [], missing: undefined }, { arrayFormat })).toBe('');
  });

  it('repeats encoded values and independently controls key/value encoding', () => {
    const params = { 'filter[tag]': ['a+b', '研发 & x'] };
    expect(buildQueryString(params)).toBe(
      'filter%5Btag%5D=a%2Bb&filter%5Btag%5D=%E7%A0%94%E5%8F%91%20%26%20x'
    );
    expect(buildQueryString(params, { encodeValues: false })).toBe(
      'filter%5Btag%5D=a+b&filter%5Btag%5D=研发 & x'
    );
    expect(buildQueryString(params, { encodeKeys: false, encodeValues: false })).toBe(
      'filter[tag]=a+b&filter[tag]=研发 & x'
    );
  });

  it('keeps repeat RFC3986 punctuation encoding and joined-array encoding unchanged', () => {
    expect(buildQueryString({ q: '!\'()*~' })).toBe('q=%21%27%28%29%2A~');
    expect(buildQueryString({ q: '!\'()*~' }, { arrayFormat: 'plus' })).toBe('q=!\'()*~');
  });

  it('parses shallow Drupal keys, repeated values, plus signs and bare flags', () => {
    expect(queryStringToParams('?filter%5Btag%5D=a+b&filter[tag]=c%2Bd&flag&empty=&=ignored'))
      .toEqual({ 'filter[tag]': ['a b', 'c+d'], 'flag': '', 'empty': '' });
    expect(queryStringToParams('tags[]=a&tags[]=b&filter[a=b]=x=y'))
      .toEqual({ 'tags[]': ['a', 'b'], 'filter[a=b]': 'x=y' });
  });

  it('tolerates malformed escapes without partially decoding them', () => {
    expect(queryStringToParams('q=%E0%A4%A+value&x=%ZZ%5B'))
      .toEqual({ q: '%E0%A4%A value', x: '%ZZ[' });
  });

  it('ignores empty keys and inherited object names', () => {
    expect(queryStringToParams('__proto__=x&constructor=y&toString=z&hasOwnProperty=q&&ok=1'))
      .toEqual({ ok: '1' });
    expect(queryStringToParams('')).toEqual({});
  });

  it('retains the existing parser parameter and duplicate limits', () => {
    const query = Array.from({ length: 1001 }, (_, i) => `key${i}=v`).join('&');
    const parsed = queryStringToParams(query);
    expect(Object.keys(parsed)).toHaveLength(1000);
    expect(parsed['key1000']).toBeUndefined();
    const duplicates = Array.from({ length: 20 }, (_, i) => `key=${i}`).join('&');
    expect(queryStringToParams(duplicates)['key']).toHaveLength(20);
    expect(queryStringToParams(`${duplicates}&key=20`)['key']).toBe('[object Object]');
  });

  it('retains enclosing bracket keys and combines aliases in parser order', () => {
    expect(queryStringToParams('[a]=1&a=2&[a]=3&[]=x&[]=y&[__proto__]=ignored'))
      .toEqual({ a: ['1', '3', '2'], 0: 'x', 1: 'y' });
  });
});
