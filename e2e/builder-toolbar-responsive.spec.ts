import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { storageKey } from './fixtures/storage';
import { expect, test } from './fixtures/test';

const longTitle = '页面发布与多语言版本核对：用于确认窄屏工具栏操作始终可达的长标题';
const draft = {
  title: longTitle,
  current: true,
  body: [{ type: 'text', body: '<main><h1>Toolbar regression</h1>' +
    '<p style="min-height:1800px">Scrollable canvas content</p></main>' }],
};

const pages = [
  { name: 'draft', page: draft },
  { name: 'saved page', page: { ...draft, uuid: 'toolbar-saved', nid: '42', langcode: 'en',
    title: 'Landing page release and multilingual review with a deliberately long English title' } },
  { name: 'translation', page: { ...draft, uuid: 'toolbar-saved', nid: '42',
    langcode: 'zh-hans', translation: true, target: 'en' } },
];

async function settleWorkspace(page: Page): Promise<void> {
  await page.locator('app-builder').evaluate(async host => {
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    await Promise.all(host.getAnimations({ subtree: true })
      .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
      .map(animation => animation.finished.catch(() => undefined)));
  });
}

async function enlargeToolbarText(page: Page): Promise<void> {
  await page.locator('app-builder-toolbar').evaluate(host => {
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    const elements = new Set<HTMLElement>();
    while (walker.nextNode()) {
      if (walker.currentNode.textContent?.trim() &&
          walker.currentNode.parentElement instanceof HTMLElement) {
        elements.add(walker.currentNode.parentElement);
      }
    }
    const styles = [...elements].map(element => ({ element,
      size: parseFloat(getComputedStyle(element).fontSize),
      height: parseFloat(getComputedStyle(element).lineHeight),
    }));
    for (const { element, size, height } of styles) {
      element.style.fontSize = `${size * 2}px`;
      if (Number.isFinite(height)) element.style.lineHeight = `${height * 2}px`;
    }
  });
}

for (const { name, page: currentPage } of pages) {
for (const theme of ['light-theme', 'dark-theme']) {
  test.describe(`${theme}/${name}`, () => {
    let errors: string[];
    test.beforeEach(async ({ page, context }) => {
      errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await mockLoginNavigation(page, '/builder', { theme, builderGuard: false });
      await context.route('**/api/v3/landingPage*', route => {
        const content = new URL(route.request().url()).searchParams.get('content');
        if (content !== '/core/base') return route.fallback();
        return route.fulfill({ json: {
          defaultTheme: theme, librariesUseLocal: true, builder: { enable: true, guard: false },
        } });
      });
      await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
      await page.addInitScript(({ versionKey, fullScreenKey, value }) => {
        localStorage.setItem(versionKey, JSON.stringify([value]));
        localStorage.setItem(fullScreenKey, 'false');
      }, { versionKey: storageKey('version'), fullScreenKey: storageKey('builderFullScreen'),
        value: currentPage });
      await page.goto('/builder');
      await expect(page.locator('app-builder-toolbar')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Toolbar regression' })).toBeVisible();
      await expect(page.getByText('请开启 Builder 功能！', { exact: true })).toHaveCount(0);
    });

    test.afterEach(() => expect(errors).toEqual([]));

    test('keeps all visible toolbar controls inside narrow viewports', async ({ page }, info) => {
      const violations: unknown[] = [];
      const observations: unknown[] = [];
      for (const fullScreen of [false, true]) {
        await page.setViewportSize({ width: 1440, height: 900 });
        const toggle = page.locator('app-builder-toolbar mat-slide-toggle button').first();
        await toggle.focus();
        if (await toggle.getAttribute('aria-checked') !== String(fullScreen)) await toggle.click();
        for (const width of [1440, 640, 390, 320]) {
          await page.setViewportSize({ width, height: 900 });
          await settleWorkspace(page);
          if (await toggle.getAttribute('aria-checked') !== String(fullScreen)) {
            await toggle.click();
            await settleWorkspace(page);
          }
          await expect(toggle).toHaveAttribute('aria-checked', String(fullScreen));
          const controls = await page.locator('app-builder-toolbar')
            .locator('button:visible, a[href]:visible, [contenteditable="true"]:visible')
            .evaluateAll(elements => elements.map(element => {
              const rect = element.getBoundingClientRect();
              return { tag: element.tagName, name: element.getAttribute('aria-label') ||
                element.textContent?.trim(), left: rect.left, right: rect.right,
              top: rect.top, bottom: rect.bottom, width: innerWidth, height: innerHeight };
            }));
          const outside = controls.filter(control => control.left < -1 ||
            control.right > control.width + 1 || control.top < -1 ||
            control.bottom > control.height + 1);
          observations.push({ width, fullScreen, controls });
          if (outside.length) violations.push({ width, fullScreen, outside });
          await page.screenshot({ path: info.outputPath(`toolbar-${fullScreen}-${width}.png`) });
        }
      }
      await page.setViewportSize({ width: 320, height: 900 });
      await enlargeToolbarText(page);
      await settleWorkspace(page);
      const enlarged = await page.locator('app-builder-toolbar')
        .locator('button:visible, a[href]:visible, [contenteditable="true"]:visible')
        .evaluateAll(elements => elements.map(element => {
          const rect = element.getBoundingClientRect();
          return { name: element.getAttribute('aria-label') || element.textContent?.trim(),
            left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        }));
      observations.push({ width: 320, textScale: 2, controls: enlarged });
      const outside = enlarged.filter(control => control.left < -1 || control.right > 321 ||
        control.top < -1 || control.bottom > 901);
      if (outside.length) violations.push({ width: 320, textScale: 2, outside });
      await page.screenshot({ path: info.outputPath('toolbar-text-200.png') });
      await info.attach('toolbar-bounds', { body: JSON.stringify(observations, null, 2),
        contentType: 'application/json' });
      expect(violations).toEqual([]);
    });

    test('keeps one toolbar, menu focus and the header while the canvas scrolls', async ({ page }) => {
      const toolbar = page.locator('app-builder-toolbar .builder-toolbar');
      for (const fullScreen of [true, false, true]) {
        await page.setViewportSize({ width: 1440, height: 900 });
        const toggle = page.locator('app-builder-toolbar mat-slide-toggle button').first();
        await toggle.focus();
        if (await toggle.getAttribute('aria-checked') !== String(fullScreen)) await toggle.click();
        await expect(toolbar).toHaveCount(1);
        await expect(page.locator('#toolbar-right')).toHaveCount(1);
        await expect(toggle).toBeFocused();
        for (const width of [640, 390, 320]) {
          await page.setViewportSize({ width, height: 900 });
          await settleWorkspace(page);
          const menu = toolbar.getByRole('button', { name: 'builder page', exact: true });
          await menu.focus();
          await page.keyboard.press('Enter');
          await expect(page.getByRole('menuitem', { name: '草稿预览', exact: true })).toBeVisible();
          await expect(page.getByRole('menuitem').first()).toBeFocused();
          if (width === 640) {
            await page.setViewportSize({ width: 390, height: 900 });
            await settleWorkspace(page);
            await expect(page.getByRole('menuitem').first()).toBeFocused();
            const panel = await page.locator('.mat-mdc-menu-panel').boundingBox();
            expect(panel!.x).toBeGreaterThanOrEqual(0);
            expect(panel!.x + panel!.width).toBeLessThanOrEqual(391);
          }
          await page.keyboard.press('Escape');
          await expect(page.locator('.mat-mdc-menu-panel')).toHaveCount(0);
          await expect(menu).toBeFocused();
          const before = await toolbar.boundingBox();
          await page.locator('.builder-main .preview-content').evaluate(element => {
            element.scrollTop = element.scrollHeight;
          });
          expect((await toolbar.boundingBox())?.y).toBeCloseTo(before!.y, 1);
          const bottom = await page.locator('.builder-main').evaluate(element =>
            element.getBoundingClientRect().bottom);
          expect(bottom).toBeLessThanOrEqual(901);
        }
      }
      const axe = await new AxeBuilder({ page }).include('app-builder-toolbar').analyze();
      expect(axe.violations).toEqual([]);
    });
  });
}
}
