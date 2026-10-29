import type { BrowserContext, Page, Route } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';

async function setup(context: BrowserContext, page: Page) {
  const settings: Route[] = [];
  const canvas: Route[] = [];
  const aborted: string[] = [];
  const writes: string[] = [];
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => aborted.push(new URL(request.url()).pathname));
  page.on('request', request => {
    if (['POST', 'PATCH', 'DELETE'].includes(request.method())) writes.push(request.url());
  });
  await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
  await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));
  await context.route('**/api/v3/landingPage*', route => route.fulfill({ json:
    new URL(route.request().url()).searchParams.get('content') === '/core/base'
      ? { defaultTheme: 'light-theme', librariesUseLocal: true, builder: { guard: false } } : {},
  }));
  await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
    rows: ['a', 'b'].map((id, index) => ({
      nid: String(index + 1), uuid: id, title: `Page ${id.toUpperCase()}`,
      langcode: 'en', default_langcode: true, published: true,
    })),
    pager: { current_page: 0, total_pages: 1, total_items: 2, items_per_page: 10 },
  } }));
  await context.route('**/api/v3/node-form/landing_page/*', route => route.fulfill({ json: {
    fields: [], baseFields: {}, baseFieldNames: { status: 'status' },
    moderated: false, defaults: { state: 'published' }, canDelete: false, states: [],
  } }));
  await context.route('**/api/v3/landingPage/revisions/*', route => route.fulfill({ json: {
    status: true, revisions: [],
  } }));
  await page.goto('/builder/page-list');
  await expect.poll(() => page.evaluate(() => Object.keys(localStorage)
    .find(key => key.startsWith('ngx-webstorage') && key.endsWith('version')))).toBeTruthy();
  const storageKey = await page.evaluate(() => {
    const key = Object.keys(localStorage)
      .find(item => item.startsWith('ngx-webstorage') && item.endsWith('version'))!;
    localStorage.setItem(key, JSON.stringify([{
      nid: '100', uuid: 'local', langcode: 'en', title: 'Unsaved canvas', current: true,
      dirty: true, changed: '1', body: [{ type: 'text', body: '<p>Unsaved canvas content</p>' }],
    }]));
    return key;
  });
  await page.reload();
  await expect(page.locator('app-builder-list')).toContainText('Unsaved canvas content');
  await context.route('**/api/v1/node/landing_page/*', route => { settings.push(route); });
  await context.route('**/api/v3/landingPage/json/*', route => { canvas.push(route); });
  return { settings, canvas, aborted, writes, errors, storageKey };
}

async function openSettings(page: Page, letter: string): Promise<void> {
  await page.getByRole('button', { name: `Page ${letter}的更多操作`, exact: true }).click();
  await page.getByRole('menuitem', { name: '页面设置', exact: true }).click();
}

async function fulfillSettings(route: Route, letter: string): Promise<void> {
  await route.fulfill({ json: {
    data: { id: letter.toLowerCase(), type: 'node--landing_page', attributes: {
      title: `Settings ${letter}`, langcode: 'en', default_langcode: true,
      drupal_internal__nid: letter === 'A' ? 1 : 2, changed: '2026-10-29T01:00:00Z',
      path: { alias: '/fixture' }, meta_tags: {}, status: true,
    } },
    included: [{ type: 'user--user', attributes: { display_name: 'Fixture editor' } }],
  } });
}

async function fulfillCanvas(route: Route): Promise<void> {
  await route.fulfill({ json: {
    status: true, nid: '2', uuid: 'b', langcode: 'en', title: 'Selected canvas',
    body: [{ type: 'json', attributes: { body: {
      type: 'text', body: '<p>Selected canvas content</p>',
    } } }],
  } });
}

async function openJson(page: Page, letter: string): Promise<void> {
  await page.getByRole('button', { name: `Page ${letter}的更多操作`, exact: true }).click();
  await page.getByRole('menuitem', { name: '页面 JSON', exact: true }).click();
}

async function fulfillJson(route: Route, letter: string, langcode = 'en'): Promise<void> {
  await route.fulfill({ json: {
    status: true, nid: letter === 'A' ? '1' : '2', langcode, title: `JSON ${letter}`,
    body: [{ type: 'json', attributes: { body: { type: 'text', body: `<p>JSON ${letter}</p>` } } }],
  } });
}

test('page JSON keeps the latest selection after reversed responses', async ({ context, page }) => {
  const { canvas: json, aborted, writes, errors, storageKey } = await setup(context, page);
  await openJson(page, 'A');
  await expect.poll(() => json.length).toBe(1);
  await openJson(page, 'B');
  await expect.poll(() => json.length).toBe(2);
  await fulfillJson(json[1], 'B');
  const editor = page.locator('app-jsoneditor .ace_content');
  await expect(editor).toContainText('JSON B');
  await fulfillJson(json[0], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/1');
  await expect(editor).toContainText('JSON B');
  await expect(editor).not.toContainText('JSON A');
  await page.screenshot({ path: test.info().outputPath('latest-page-json.png'), fullPage: true });
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]')[0], storageKey))
    .toMatchObject({ title: 'Unsaved canvas', dirty: true });
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

for (const first of ['JSON', 'settings']) {
  test(`starting a new drawer read cancels pending ${first}`, async ({ context, page }) => {
    const { canvas: json, settings, aborted, writes, errors } = await setup(context, page);
    if (first === 'JSON') {
      await openJson(page, 'A');
      await expect.poll(() => json.length).toBe(1);
      await openSettings(page, 'B');
      await expect.poll(() => settings.length).toBe(1);
      await fulfillJson(json[0], 'A');
      await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/1');
      await expect(page.locator('app-jsoneditor')).toHaveCount(0);
      await expect(page.locator('app-builder-list app-loading')).toBeVisible();
      await fulfillSettings(settings[0], 'B');
      await expect(page.locator('app-page-setting').getByRole('textbox', { name: '标题', exact: false }))
        .toHaveValue('Settings B');
    } else {
      await openSettings(page, 'A');
      await expect.poll(() => settings.length).toBe(1);
      await openJson(page, 'B');
      await expect.poll(() => json.length).toBe(1);
      await fulfillSettings(settings[0], 'A');
      await expect.poll(() => aborted).toContain('/en/api/v1/node/landing_page/a');
      await expect(page.locator('app-page-setting')).toHaveCount(0);
      await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
      await fulfillJson(json[0], 'B');
      await expect(page.locator('app-jsoneditor .ace_content')).toContainText('JSON B');
    }
    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('page JSON cannot replace history or reopen it after closing', async ({ context, page }) => {
  const { canvas: json, aborted, errors } = await setup(context, page);
  await openJson(page, 'A');
  await expect.poll(() => json.length).toBe(1);
  await page.getByRole('button', { name: 'Page B的更多操作', exact: true }).click();
  await page.getByRole('menuitem', { name: '历史版本', exact: true }).click();
  await expect(page.locator('app-page-revision')).toBeVisible();
  await page.locator('.right-header button').click();
  await expect(page.locator('app-page-revision')).toHaveCount(0);
  await fulfillJson(json[0], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/1');
  await expect(page.locator('app-jsoneditor')).toHaveCount(0);
  await expect(page.locator('.right-header')).not.toBeVisible();
  expect(errors).toEqual([]);
});

test('a new canvas selection cancels JSON while keeping canvas loading', async ({ context, page }) => {
  const { canvas, aborted, errors } = await setup(context, page);
  await openJson(page, 'A');
  await expect.poll(() => canvas.length).toBe(1);
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(2);
  await fulfillJson(canvas[0], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/1');
  await expect(page.locator('app-jsoneditor')).toHaveCount(0);
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[1]);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('JSON can open while an earlier canvas read keeps loading', async ({ context, page }) => {
  const { canvas, errors } = await setup(context, page);
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(1);
  await openJson(page, 'A');
  await expect.poll(() => canvas.length).toBe(2);
  await fulfillJson(canvas[1], 'A');
  await expect(page.locator('app-jsoneditor .ace_content')).toContainText('JSON A');
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[0]);
  await expect(page.locator('app-jsoneditor')).toHaveCount(0);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('page JSON failure shows feedback and allows retry without losing the draft', async ({
  context, page,
}) => {
  const { canvas: json, errors, writes } = await setup(context, page);
  await openJson(page, 'A');
  await expect.poll(() => json.length).toBe(1);
  await json[0].fulfill({ status: 503, json: { message: 'Synthetic JSON failure' } });
  await expect(page.locator('mat-snack-bar-container')
    .filter({ hasText: '页面载入失败，请重试' })).toBeVisible();
  await expect(page.locator('app-builder-list')).toContainText('Unsaved canvas content');
  await openJson(page, 'A');
  await expect.poll(() => json.length).toBe(2);
  await fulfillJson(json[1], 'A');
  await expect(page.locator('app-jsoneditor .ace_content')).toContainText('JSON A');
  expect(errors).toEqual([]);
  expect(writes).toEqual([]);
});

test('the latest settings selection wins when responses arrive in reverse order', async ({
  context, page,
}) => {
  const { settings, aborted, writes, errors, storageKey } = await setup(context, page);
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(1);
  await openSettings(page, 'B');
  await expect.poll(() => settings.length).toBe(2);
  await fulfillSettings(settings[1], 'B');
  const title = page.locator('app-page-setting').getByRole('textbox', { name: '标题', exact: false });
  await expect(title).toHaveValue('Settings B');
  await fulfillSettings(settings[0], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v1/node/landing_page/a');
  await expect(title).toHaveValue('Settings B');
  await expect(page.locator('.right-title')).toContainText('EN');
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]')[0], storageKey))
    .toMatchObject({ title: 'Unsaved canvas', dirty: true });
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

test('a new canvas selection cancels pending settings without ending canvas loading', async ({
  context, page,
}) => {
  const { settings, canvas, aborted, errors } = await setup(context, page);
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(1);
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(1);
  await settings[0].fulfill({ status: 503, json: { message: 'Superseded settings' } });
  await expect.poll(() => aborted).toContain('/en/api/v1/node/landing_page/a');
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[0]);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  await expect(page.locator('app-page-setting')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('settings can finish while an earlier canvas read keeps its loading feedback', async ({
  context, page,
}) => {
  const { settings, canvas, errors } = await setup(context, page);
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(1);
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(1);
  await fulfillSettings(settings[0], 'A');
  await expect(page.locator('app-page-setting')).toBeVisible();
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[0]);
  await expect(page.locator('app-page-setting')).toHaveCount(0);
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  expect(errors).toEqual([]);
});

test('opening a different panel cancels the settings read', async ({ context, page }) => {
  const { settings, aborted, errors } = await setup(context, page);
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(1);
  await page.getByRole('button', { name: 'Page B的更多操作', exact: true }).click();
  await page.getByRole('menuitem', { name: '历史版本', exact: true }).click();
  await expect(page.locator('app-page-revision')).toBeVisible();
  await fulfillSettings(settings[0], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v1/node/landing_page/a');
  await expect(page.locator('app-page-revision')).toBeVisible();
  await expect(page.locator('app-page-setting')).toHaveCount(0);
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const close of ['button', 'Escape', 'backdrop']) {
  test(`settings close through ${close} and reopen with a fresh read`, async ({ context, page }) => {
    const { settings, errors, writes } = await setup(context, page);
    await openSettings(page, 'A');
    await expect.poll(() => settings.length).toBe(1);
    await fulfillSettings(settings[0], 'A');
    await expect(page.locator('app-page-setting')).toBeVisible();
    if (close === 'button') await page.locator('.right-header button').click();
    if (close === 'Escape') {
      await expect(page.locator('.right-header button')).toBeFocused();
      await page.keyboard.press('Escape');
    }
    if (close === 'backdrop') {
      await page.locator('.mat-drawer-backdrop.mat-drawer-shown').click({ position: { x: 10, y: 10 } });
    }
    await expect(page.locator('app-page-setting')).toHaveCount(0);
    await openSettings(page, 'B');
    await expect.poll(() => settings.length).toBe(2);
    await fulfillSettings(settings[1], 'B');
    await expect(page.locator('app-page-setting').getByRole('textbox', { name: '标题', exact: false }))
      .toHaveValue('Settings B');
    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('settings failure preserves the canvas and allows retry', async ({ context, page }) => {
  const { settings, errors } = await setup(context, page);
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(1);
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await settings[0].fulfill({ status: 503, json: { message: 'Synthetic failure' } });
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  await expect(page.locator('app-builder-list')).toContainText('Unsaved canvas content');
  await openSettings(page, 'A');
  await expect.poll(() => settings.length).toBe(2);
  await fulfillSettings(settings[1], 'A');
  await expect(page.locator('app-page-setting')).toBeVisible();
  expect(errors).toEqual([]);
});

async function openTranslation(page: Page, letter: string): Promise<void> {
  await page.getByRole('button', { name: `Page ${letter}的更多操作`, exact: true }).click();
  await page.getByRole('menuitem', { name: '打开 中文 版本', exact: true }).click();
}

test('translation keeps the latest row after reversed responses', async ({ context, page }) => {
  const { canvas, aborted, writes, errors, storageKey } = await setup(context, page);
  await openTranslation(page, 'A');
  await expect.poll(() => canvas.length).toBe(1);
  expect(new URL(canvas[0].request().url()).searchParams.get('noCache')).toBe('1');
  await openTranslation(page, 'B');
  await expect.poll(() => canvas.length).toBe(2);
  await fulfillJson(canvas[1], 'B', 'zh-hans');
  await expect(page.locator('app-builder-list')).toContainText('JSON B');
  await fulfillJson(canvas[0], 'A', 'zh-hans');
  await expect.poll(() => aborted).toContain('/zh-hans/api/v3/landingPage/json/1');
  await expect(page.locator('app-builder-list')).toContainText('JSON B');
  await expect(page.locator('app-builder-list')).not.toContainText('JSON A');
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'), storageKey);
  expect(stored).toEqual(expect.arrayContaining([
    expect.objectContaining({ nid: '100', title: 'Unsaved canvas', dirty: true, current: false }),
    expect.objectContaining({ nid: '2', langcode: 'zh-hans', current: true }),
  ]));
  await page.screenshot({ path: test.info().outputPath('latest-translation.png'), fullPage: true });
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

for (const latest of ['translation', 'canvas']) {
  test(`the latest ${latest} selection owns loading during translation switching`, async ({
    context, page,
  }) => {
    const { canvas, aborted, writes, errors } = await setup(context, page);
    const openCanvas = () => page.getByRole('button', { name: 'Page B', exact: true }).click();
    if (latest === 'translation') await openCanvas();
    else await openTranslation(page, 'A');
    await expect.poll(() => canvas.length).toBe(1);
    if (latest === 'translation') await openTranslation(page, 'A');
    else await openCanvas();
    await expect.poll(() => canvas.length).toBe(2);
    await canvas[0].fulfill({ status: 503, json: { message: 'Superseded selection' } });
    await expect.poll(() => aborted).toContain(new URL(canvas[0].request().url()).pathname);
    await expect(page.locator('app-builder-list app-loading')).toBeVisible();
    await expect(page.locator('mat-snack-bar-container')
      .filter({ hasText: '失败' })).toHaveCount(0);
    if (latest === 'translation') await fulfillJson(canvas[1], 'A', 'zh-hans');
    else await fulfillCanvas(canvas[1]);
    await expect(page.locator('app-builder-list'))
      .toContainText(latest === 'translation' ? 'JSON A' : 'Selected canvas content');
    await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('a new canvas selection cancels the translation source fallback', async ({ context, page }) => {
  const { canvas, aborted, writes, errors } = await setup(context, page);
  await openTranslation(page, 'A');
  await expect.poll(() => canvas.length).toBe(1);
  await fulfillJson(canvas[0], 'A');
  await expect.poll(() => canvas.length).toBe(2);
  expect(new URL(canvas[1].request().url()).pathname).toBe('/en/api/v3/landingPage/json/1');
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(3);
  await fulfillJson(canvas[1], 'A');
  await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/1');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[2]);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

test('translation failure preserves the draft and allows retry', async ({ context, page }) => {
  const { canvas, writes, errors } = await setup(context, page);
  await openTranslation(page, 'A');
  await expect.poll(() => canvas.length).toBe(1);
  await canvas[0].fulfill({ status: 503, json: { message: 'Synthetic translation failure' } });
  await expect(page.locator('mat-snack-bar-container')
    .filter({ hasText: '载入 Page A 失败，请重试' })).toBeVisible();
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  await expect(page.locator('app-builder-list')).toContainText('Unsaved canvas content');
  await openTranslation(page, 'A');
  await expect.poll(() => canvas.length).toBe(2);
  await fulfillJson(canvas[1], 'A', 'zh-hans');
  await expect(page.locator('app-builder-list')).toContainText('JSON A');
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

async function startVersionChecks(page: Page): Promise<void> {
  const start = new Date('2026-10-29T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(new Date(start.valueOf() + 1000));
  await page.locator('app-builder-version mat-list-item').filter({ hasText: 'Unsaved canvas' })
    .locator('mat-icon').first().click();
  await page.clock.runFor(32);
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
}

async function fulfillVersionCheck(route: Route): Promise<void> {
  await route.fulfill({ json: {
    nid: '100', langcode: 'en', title: 'Updated draft', changed: '2', status: true,
    body: [{ type: 'json', attributes: { body: {
      type: 'text', body: '<p>Updated draft content</p>',
    } } }],
  } });
}

test('version checks wait for loading and cancel when another canvas read starts', async ({
  context, page,
}) => {
  const { canvas, aborted, writes, errors } = await setup(context, page);
  await startVersionChecks(page);
  expect(canvas).toHaveLength(0);
  await page.clock.runFor(600);
  await expect(page.locator('app-builder-list app-loading')).toHaveCount(0);
  await page.clock.runFor(30000);
  await expect.poll(() => canvas.length).toBe(1);
  expect(new URL(canvas[0].request().url()).pathname).toBe('/en/api/v3/landingPage/json/100');
  await page.getByRole('button', { name: 'Page B', exact: true }).click();
  await expect.poll(() => canvas.length).toBe(2);
  await fulfillVersionCheck(canvas[0]);
  await page.clock.runFor(30000);
  await expect.poll(() => aborted).toContain('/en/api/v3/landingPage/json/100');
  expect(canvas).toHaveLength(2);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('app-builder-list app-loading')).toBeVisible();
  await fulfillCanvas(canvas[1]);
  await page.clock.runFor(32);
  await expect(page.locator('app-builder-list')).toContainText('Selected canvas content');
  await page.clock.runFor(30000);
  await expect.poll(() => canvas.length).toBe(3);
  expect(new URL(canvas[2].request().url()).pathname).toBe('/en/api/v3/landingPage/json/2');
  await fulfillCanvas(canvas[2]);
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

for (const accepted of [false, true]) {
  test(`a valid version update decision remains available (${accepted})`, async ({ context, page }) => {
    const { canvas, writes, errors, storageKey } = await setup(context, page);
    await startVersionChecks(page);
    await page.clock.runFor(30000);
    await expect.poll(() => canvas.length).toBe(1);
    await fulfillVersionCheck(canvas[0]);
    await page.clock.runFor(300);
    const dialog = page.getByRole('dialog', { name: '当前页面不是最新版本', exact: true });
    await expect(dialog).toBeVisible();
    if (!accepted) {
      await page.clock.resume();
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
      for (const dark of [false, true]) {
        await page.evaluate(value => {
          document.documentElement.classList.toggle('light-theme', !value);
          document.documentElement.classList.toggle('dark-theme', value);
        }, dark);
        expect((await new AxeBuilder({ page }).include('[role="dialog"]')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
        await page.screenshot({
          path: test.info().outputPath(`current-version-confirmation-${dark ? 'dark' : 'light'}.png`),
          animations: 'disabled',
        });
      }
      await page.clock.pauseAt(new Date(await page.evaluate(() => Date.now()) + 1000));
    }
    await page.clock.runFor(30000);
    expect(canvas).toHaveLength(1);
    await dialog.getByRole('button', { name: accepted ? '确认更新' : '取消', exact: true }).click();
    await page.clock.runFor(300);
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('app-builder-list'))
      .toContainText(accepted ? 'Updated draft content' : 'Unsaved canvas content');
    const current = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]')
      .find((draft: { current: boolean }) => draft.current), storageKey);
    expect(current).toMatchObject({ nid: '100', changed: accepted ? '2' : '1' });
    await page.clock.runFor(30000);
    await expect.poll(() => canvas.length).toBe(2);
    await fulfillVersionCheck(canvas[1]);
    expect(writes).toEqual([]);
    expect(errors).toEqual([]);
  });
}
