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
});
