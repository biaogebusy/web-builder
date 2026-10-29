import { SSR_HTTP_TIMEOUT_MS } from '../ssr.config';

/** Rechecks publication and identity before serving HTML from the process cache. */
export async function canReusePublicPage(
  publication: { url: string; key: string },
  request: typeof fetch = fetch
): Promise<boolean> {
  try {
    const url = new URL(publication.url);
    url.searchParams.set('public', 'true');
    url.searchParams.set('access_only', 'true');
    const response = await request(url, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(SSR_HTTP_TIMEOUT_MS),
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!response.ok) {
      return false;
    }
    const result: unknown = await response.json();
    return typeof result === 'object' && result !== null &&
      'publicPageKey' in result && result.publicPageKey === publication.key;
  } catch {
    return false;
  }
}
