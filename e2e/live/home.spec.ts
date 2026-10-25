import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

declare global {
  interface Window {
    /** Navigation observations, not field Web Vitals or an interaction measurement. */
    liveMetrics: {
      lcpMs: number | null;
      cls: number;
      layoutShifts: { atMs: number; value: number; elements: string[] }[];
    };
  }
}

test('deployed page renders SSR content and records real browser loading', async ({ page }, info) => {
  const pageErrors: string[] = [];
  const failedRequests: { url: string; error: string | undefined }[] = [];
  const httpErrors: { url: string; status: number }[] = [];
  const landingRequests: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('requestfailed', request => failedRequests.push({
    url: request.url(), error: request.failure()?.errorText,
  }));
  page.on('response', response => {
    if (response.status() >= 400) {
      httpErrors.push({ url: response.url(), status: response.status() });
    }
  });
  page.on('request', request => {
    if (new URL(request.url()).pathname.endsWith('/api/v3/landingPage')) {
      landingRequests.push(request.url());
    }
  });
  await page.addInitScript(() => {
    performance.setResourceTimingBufferSize(2000);
    window.liveMetrics = { lcpMs: null, cls: 0, layoutShifts: [] };
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) window.liveMetrics.lcpMs = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    let start = 0;
    let last = 0;
    let score = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        hadRecentInput: boolean; value: number; sources: { node: Node | null }[];
      })[]) {
        if (entry.hadRecentInput) continue;
        window.liveMetrics.layoutShifts.push({
          atMs: entry.startTime,
          value: entry.value,
          elements: (entry.sources || []).map(({ node }) => {
            if (!(node instanceof Element)) return '(removed node)';
            const id = node.id ? '#' + node.id : '';
            const classes = [...node.classList].map(name => '.' + name).join('');
            return `${node.tagName.toLowerCase()}${id}${classes}`;
          }),
        });
        if (entry.startTime - last > 1000 || entry.startTime - start > 5000) {
          start = entry.startTime;
          score = 0;
        }
        last = entry.startTime;
        score += entry.value;
        window.liveMetrics.cls = Math.max(window.liveMetrics.cls, score);
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  const response = await page.goto(process.env['E2E_PAGE_PATH'] || '/', { waitUntil: 'load' });
  const html = await response!.text();
  // A fixed observation window makes consecutive samples comparable; it is not a readiness wait.
  await page.waitForTimeout(5000);
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const js = (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter(entry => new URL(entry.name).pathname.endsWith('.js'));
    return {
      ...window.liveMetrics,
      ttfbMs: navigation.responseStart - navigation.startTime,
      domContentLoadedMs: navigation.domContentLoadedEventEnd,
      js: js.map(entry => ({ url: entry.name, transferBytes: entry.transferSize,
        encodedBodyBytes: entry.encodedBodySize, decodedBodyBytes: entry.decodedBodySize })),
    };
  });
  const headers = await response!.allHeaders();
  const ssrTextBodies = await page.evaluate(source => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    return [...doc.querySelectorAll('app-page app-text .text-body')]
      .map(node => (node.textContent || '').replace(/\s+/g, ' ').trim());
  }, html);
  const hydratedTextBodies = (await page.locator('app-page app-text .text-body').allTextContents())
    .map(text => text.replace(/\s+/g, ' ').trim());
  const report = {
    url: page.url(), measuredAt: new Date().toISOString(),
    browser: page.context().browser()?.version(),
    viewport: page.viewportSize(), status: response!.status(), observationAfterLoadMs: 5000,
    ssrHydrationMarkers: (html.match(/\sngh="/g) || []).length,
    responseHeaders: Object.fromEntries(['content-encoding', 'cache-control', 'x-cache',
      'x-proxy-cache', 'x-ssr-duration', 'server-timing'].map(key => [key, headers[key] ?? null])),
    metrics, pageErrors, failedRequests, httpErrors, landingRequests,
    ssrTextBodies, hydratedTextBodies,
  };
  const reportPath = info.outputPath('loading.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  await info.attach('loading.json', { path: reportPath, contentType: 'application/json' });
  const screenshotPath = info.outputPath('page.png');
  await page.screenshot({ path: screenshotPath });
  await info.attach('page.png', { path: screenshotPath, contentType: 'image/png' });
  expect(response!.ok()).toBe(true);
  expect(report.ssrHydrationMarkers).toBeGreaterThan(0);
  await expect(page.locator('app-page')).toBeVisible();
  expect(ssrTextBodies).toEqual(hydratedTextBodies);
  expect(pageErrors).toEqual([]);
});
