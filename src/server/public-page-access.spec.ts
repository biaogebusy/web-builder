import { canReusePublicPage } from './public-page-access';

describe('public HTML cache publication', () => {
  const publication = { url: 'https://cms.test/en/api/v3/landingPage?content=%2Fpage&public=true', key: 'node:1:en:2' };

  it('checks the source without credentials or HTTP cache reuse', async () => {
    const request = vi.fn(async () => Response.json({ publicPageKey: publication.key }));
    expect(await canReusePublicPage(publication, request)).toBe(true);
    const [url, options] = request.mock.calls[0] as unknown as [URL, RequestInit];
    expect(url.searchParams.get('content')).toBe('/page');
    expect(url.searchParams.get('public')).toBe('true');
    expect(url.searchParams.get('access_only')).toBe('true');
    expect(options).toMatchObject({ cache: 'no-store', redirect: 'error', headers: { 'Cache-Control': 'no-cache' } });
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it.each([403, 404, 500, 503])('rejects cached HTML after CMS returns %i', async status => {
    expect(await canReusePublicPage(publication, async () => new Response('', { status }))).toBe(false);
  });

  it.each([{}, null, [], { publicPageKey: 'node:2:en:2' }, { publicPageKey: 'node:1:en:3' }])(
    'rejects missing authority, alias changes and new revisions: %j', async data => {
      expect(await canReusePublicPage(publication, async () => Response.json(data))).toBe(false);
    }
  );

  it('fails closed on transport and malformed JSON failures', async () => {
    expect(await canReusePublicPage(publication, async () => { throw new Error('offline'); })).toBe(false);
    expect(await canReusePublicPage(publication, async () => new Response('<html>error</html>'))).toBe(false);
  });
});
