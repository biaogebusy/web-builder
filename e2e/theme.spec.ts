import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { build } from 'esbuild';
import { resolve } from 'node:path';
import postcss from 'postcss';
import * as sass from 'sass';
import tailwindcss from 'tailwindcss';
import type { ICoreConfig } from '../src/app/core/interface/IAppConfig';
import type { ThemeName } from '../src/app/core/util/theme.util';
import type {} from './fixtures/theme';

let fixtureHtml: string;
const fixtureUrl = 'http://theme.test/';

test.describe.configure({ mode: 'default' });

test.beforeAll(async () => {
  const [bundle, styles] = await Promise.all([
    build({
      entryPoints: [resolve('e2e/fixtures/theme.ts')],
      bundle: true,
      write: false,
      format: 'iife',
      platform: 'browser',
      tsconfig: resolve('tsconfig.json'),
      logLevel: 'silent',
    }),
    sass.compileStringAsync(`
      @use 'styles';
      @use 'app/core/branding/footer/light/light.component';
    `, {
      loadPaths: [resolve('src'), resolve('src/theme'), resolve('node_modules')],
      logger: sass.Logger.silent,
    }),
  ]);
  const css = await postcss([tailwindcss(resolve('tailwind.config.js'))])
    .process(styles.css, { from: undefined });
  fixtureHtml = `<!doctype html><html lang="en"><head><title>Theme regression</title>
    <style>${css.css}</style>
    <style>
      main { padding: 24px; }
      .sample-scope { padding: 24px; color: var(--mat-sys-on-surface); background: var(--mat-sys-surface); }
      theme-samples { display: grid; gap: 16px; max-width: 480px; }
      .shad-card { padding: 16px; }
      .shad-popover { position: static; animation: none; }
      .footer-backdrop { background: var(--mat-sys-inverse-surface); }
      .base-text { color: var(--mat-sys-error); }
    </style></head><body><theme-fixture></theme-fixture>
    <script>${bundle.outputFiles[0].text}</script></body></html>`;
});

async function openFixture(page: Page, config: Partial<ICoreConfig> = {}): Promise<void> {
  await page.addInitScript(value => { window.themeConfig = value; }, config);
  await page.route('**/*', route => route.request().url() === fixtureUrl
    ? route.fulfill({ contentType: 'text/html', body: fixtureHtml })
    : route.abort());
  await page.goto(fixtureUrl);
  await expect(page.locator('#root-scope .mat-mdc-raised-button')).toBeVisible();
}

// Resolve color-mix() through the browser canvas and composite transparent input
// fills over their real ancestors, so contrast checks use the displayed colors.
async function colors(locator: Locator, pseudo?: string) {
  return locator.evaluate((element, pseudoElement) => {
    const ctx = document.createElement('canvas').getContext('2d')!;
    const rgba = (color: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      return Array.from(ctx.getImageData(0, 0, 1, 1).data);
    };
    const composite = (front: number[], back: number[]) =>
      front.slice(0, 3).map((channel, i) =>
        channel * front[3] / 255 + back[i] * (1 - front[3] / 255));
    const background = (node: Element | null): number[] => {
      if (!node) {
        return [255, 255, 255];
      }
      const fill = rgba(getComputedStyle(node).backgroundColor);
      return fill[3] === 255 ? fill.slice(0, 3) : composite(fill, background(node.parentElement));
    };
    const style = getComputedStyle(element, pseudoElement);
    const bg = background(element);
    return {
      foreground: composite(rgba(style.color), bg),
      background: bg,
      border: composite(rgba(style.borderTopColor), bg),
      outside: background(element.parentElement),
      scheme: style.colorScheme,
      fill: rgba(style.backgroundColor),
      surface: rgba(style.getPropertyValue('--mat-sys-surface').trim()),
      onSurface: rgba(style.getPropertyValue('--mat-sys-on-surface').trim()),
      color: rgba(style.color),
    };
  }, pseudo);
}

function contrast(a: number[], b: number[]): number {
  const luminance = (rgb: number[]) => rgb.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

async function expectReadable(scope: Locator): Promise<void> {
  for (const selector of ['.shad-card', '.shad-popover', '.shad-input', '.mat-mdc-raised-button']) {
    const color = await colors(scope.locator(selector));
    expect(contrast(color.foreground, color.background), selector).toBeGreaterThanOrEqual(4.5);
  }
  const placeholder = await colors(scope.locator('.shad-input'), '::placeholder');
  expect(contrast(placeholder.foreground, placeholder.background), 'placeholder')
    .toBeGreaterThanOrEqual(4.5);
  for (const selector of ['.shad-input', '.mdc-notched-outline__leading']) {
    const color = await colors(scope.locator(selector));
    expect(contrast(color.border, color.outside), `${selector} outside boundary`)
      .toBeGreaterThanOrEqual(3);
    expect(contrast(color.border, color.background), `${selector} inside boundary`)
      .toBeGreaterThanOrEqual(3);
  }
  const footer = await colors(scope.locator('.footer-light'));
  expect(footer.fill).toEqual(footer.surface);
  const heading = await colors(scope.locator('th'));
  expect(heading.color).toEqual(heading.onSurface);
  expect(contrast(heading.foreground, heading.background)).toBeGreaterThanOrEqual(4.5);
}

async function expectAccessible(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
}

for (const rootTheme of ['light-theme', 'dark-theme'] as const) {
  for (const localTheme of ['light-theme', 'dark-theme'] as const) {
    test(`readable controls and isolated scopes: ${rootTheme} / ${localTheme}`, async ({ page }) => {
      await openFixture(page);
      await page.evaluate(({ root, local }: { root: ThemeName; local: ThemeName }) => {
        window.themeFixture.service.selectTheme(root);
        window.themeFixture.localTheme.set(local);
      }, { root: rootTheme, local: localTheme });
      await expect(page.locator('#local-scope')).toHaveClass(`sample-scope ${localTheme}`);

      for (const [id, mode] of [
        ['root-scope', rootTheme],
        ['local-scope', localTheme],
        ['inner-scope', localTheme === 'dark-theme' ? 'light-theme' : 'dark-theme'],
      ]) {
        const scope = page.locator(`#${id} > theme-samples`);
        await expectReadable(scope);
        expect((await colors(scope.locator('input[type="checkbox"]'))).scheme)
          .toBe(mode === 'dark-theme' ? 'dark' : 'light');
      }

      await expectAccessible(page);
    });
  }
}

for (const isDark of [false, true]) {
  test(`custom mode, clear and native color scheme: ${isDark}`, async ({ page }) => {
    await openFixture(page);
    await page.evaluate(dark => {
      window.themeFixture.service.selectTheme(dark ? 'light-theme' : 'dark-theme');
      window.themeFixture.service.applyCustomTheme('#00696e', dark, 'tonalSpot');
    }, isDark);
    await expect(page.locator('html')).toHaveClass(isDark ? 'dark-theme' : 'light-theme');
    await expectReadable(page.locator('#root-scope > theme-samples'));
    await expectAccessible(page);

    await page.evaluate(() => window.themeFixture.service.clearCustomTheme());
    await expect(page.locator('html')).toHaveClass(isDark ? 'light-theme' : 'dark-theme');
    expect((await colors(page.locator('#root-scope input[type="checkbox"]'))).scheme)
      .toBe(isDark ? 'light' : 'dark');
    await expectReadable(page.locator('#root-scope > theme-samples'));
  });
}

test('ordinary selection survives reload and site restoration is explicit', async ({ page }) => {
  await openFixture(page, {
    customTheme: { seed: '#00696e', isDark: true, variant: 'content' },
  });
  const sitePrimary = await page.locator('html').evaluate(el =>
    getComputedStyle(el).getPropertyValue('--mat-sys-primary'));
  await expect(page.locator('html')).toHaveClass('dark-theme');

  await page.evaluate(() => window.themeFixture.service.selectTheme('light-theme'));
  await page.reload();
  await expect(page.locator('html')).toHaveClass('light-theme');
  await expectReadable(page.locator('#root-scope > theme-samples'));

  await page.evaluate(() => window.themeFixture.service.restoreSiteTheme());
  await expect(page.locator('html')).toHaveClass('dark-theme');
  expect(await page.locator('html').evaluate(el =>
    getComputedStyle(el).getPropertyValue('--mat-sys-primary'))).toBe(sitePrimary);
  await page.reload();
  await expect(page.locator('html')).toHaveClass('dark-theme');
  await expectReadable(page.locator('#root-scope > theme-samples'));
  await expectAccessible(page);
});
