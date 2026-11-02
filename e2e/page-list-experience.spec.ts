import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';

test('page list preserves search, page and scroll after refresh and save', async ({ page }, info) => {
  const { state, rows } = await mockPageList(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  const list = page.locator('app-page-list');
  await expect(list.locator('app-page-item')).toHaveCount(10);
  await page.screenshot({ path: info.outputPath('01-desktop.png') });
  const search = list.getByRole('textbox', { name: '搜索标题', exact: true });
  await search.fill('服务');
  await search.press('Enter');
  await expect(list.locator('app-page-item')).toHaveCount(9);
  const row = list.locator('app-page-item').filter({ hasText: '企业服务介绍' }).first();
  await row.locator('.publication-badge').click();
  await expect(page.locator('app-page-setting')).toBeVisible();
  await page.getByRole('button', { name: '保存设置', exact: true }).click();
  await expect.poll(() => state.writes.length).toBe(1);
  await expect(search).toHaveValue('服务');
  await expect(list.locator('app-page-item')).toHaveCount(9);
  await page.getByRole('button', { name: 'page-last', exact: true }).click();
  await list.getByRole('button', { name: '清除筛选', exact: true }).click();
  await list.getByRole('button', { name: '下一页', exact: true }).click();
  await expect(page).toHaveURL(/page=1/);
  const first = list.locator('.title-btn').first();
  const firstTitle = await first.textContent();
  await list.locator('.lists').evaluate(element => { element.scrollTop = 140; });
  const before = await list.locator('.lists').evaluate(element => element.scrollTop);
  state.hold = true;
  await list.getByRole('button', { name: '刷新', exact: true }).click();
  await expect.poll(() => Boolean(state.pending)).toBe(true);
  await expect(first).toHaveText(firstTitle!);
  expect(await list.locator('.lists').evaluate(element => element.scrollTop)).toBe(before);
  state.hold = false;
  await state.pending!.fulfill({ json: {
    rows: rows.slice(10, 20),
    pager: { current_page: 1, total_pages: 3, total_items: 25, items_per_page: 10 },
  } });
  expect(await list.locator('.lists').evaluate(element => element.scrollTop)).toBe(before);
  expect(state.errors).toEqual([]);
});

test('empty states recover and draft dismissal keeps the current canvas', async ({ page }, info) => {
  const { state } = await mockPageList(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  const list = page.locator('app-page-list');
  await expect(list.locator('app-page-item')).toHaveCount(10);
  const canvas = page.locator('app-builder-list');
  const before = await canvas.innerText();
  const draft = list.locator('app-page-item').filter({ hasText: '企业服务介绍' }).first();
  for (const dismiss of ['escape', 'button', 'backdrop']) {
    await draft.locator('.title-btn').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('button', { name: '取消', exact: true })).toBeFocused();
    await expect(dialog.getByRole('button', { name: '继续编辑草稿', exact: true })).toBeVisible();
    if (dismiss === 'escape') {
      expect((await new AxeBuilder({ page }).include('mat-dialog-container').analyze()).violations)
        .toEqual([]);
      await page.screenshot({ path: info.outputPath('02-draft-choice.png') });
      await page.keyboard.press('Escape');
    } else if (dismiss === 'button') {
      await dialog.getByRole('button', { name: '取消', exact: true }).click();
    } else {
      await page.locator('.cdk-overlay-backdrop').click({ position: { x: 5, y: 5 } });
    }
    await expect(dialog).toHaveCount(0);
    await expect(draft.locator('.title-btn')).toBeFocused();
    expect(await canvas.innerText()).toBe(before);
  }
  await draft.locator('.title-btn').click();
  await page.getByRole('dialog').getByRole('button', { name: '继续编辑草稿', exact: true }).click();
  await expect(draft.locator('.current-badge')).toBeVisible();
  await draft.locator('.more-trigger').click();
  await page.getByRole('menuitem', { name: '载入编辑', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: '放弃修改并载入', exact: true }).click();
  await expect(canvas).toContainText('已保存的页面内容');
  const search = list.getByRole('textbox', { name: '搜索标题', exact: true });
  await search.fill('不存在的页面');
  await search.press('Enter');
  await expect(list.getByRole('heading', { name: '没有找到匹配的页面' })).toBeVisible();
  await page.screenshot({ path: info.outputPath('03-no-results.png') });
  state.failure = true;
  await list.getByRole('button', { name: '刷新', exact: true }).click();
  await expect(list.getByRole('heading', { name: '暂时无法加载页面' })).toBeVisible();
  await expect(search).toHaveValue('不存在的页面');
  await page.screenshot({ path: info.outputPath('04-error.png') });
  state.failure = false;
  await list.getByRole('button', { name: '重新加载', exact: true }).click();
  await expect(list.getByRole('heading', { name: '没有找到匹配的页面' })).toBeVisible();
  state.empty = true;
  await list.getByRole('button', { name: '清除筛选', exact: true }).first().click();
  await expect(list.getByRole('heading', { name: '从第一个页面开始' })).toBeVisible();
  await expect(list.locator('.list-state').getByRole('button', { name: '创建页面' })).toBeVisible();
  await expect(list.locator('mat-paginator')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('05-empty.png') });
  expect(state.errors).toEqual([]);
});

for (const theme of ['light-theme', 'dark-theme']) {
  test(`tooltips stay local, dismissible and readable: ${theme}`, async ({ page }, info) => {
    const { state } = await mockPageList(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    const list = page.locator('app-page-list');
    const rows = list.locator('app-page-item');
    await expect(rows).toHaveCount(10);
    if (theme === 'dark-theme') {
      await page.locator('app-builder-sidebar app-btn:has([data-mat-icon-name="white-balance-sunny"]) button')
        .click();
    }
    const tooltip = page.locator('.mat-mdc-tooltip-surface:visible');
    const captureTooltip = async (name: string) => {
      await tooltip.locator('..').evaluate(el =>
        Promise.all(el.getAnimations().map(animation => animation.finished)));
      await page.screenshot({ path: info.outputPath(name) });
    };
    await page.mouse.move(700, 100);
    await expect(tooltip).toHaveCount(0);
    await list.getByRole('button', { name: '创建页面', exact: true }).focus();
    await expect(tooltip).toHaveText(['创建页面']);
    await page.keyboard.press('Tab');
    await expect(list.getByRole('button', { name: '刷新', exact: true })).toBeFocused();
    await expect(tooltip).toHaveText(['刷新']);
    await list.locator('.filter-toggle').focus();
    await expect(tooltip).toHaveCount(0);
    const title = rows.first().locator('.title-text');
    const item = rows.nth(1).locator('.item');
    const bounds = await item.boundingBox();
    const background = await item.evaluate(el => getComputedStyle(el).backgroundColor);
    await item.hover({ position: { x: 180, y: 52 } });
    await expect.poll(() => item.evaluate(el => getComputedStyle(el).backgroundColor))
      .not.toBe(background);
    await page.waitForTimeout(650);
    await expect(tooltip).toHaveCount(0);
    expect(await item.boundingBox()).toEqual(bounds);
    await page.screenshot({ path: info.outputPath(`09-${theme}-row-hover.png`) });

    await rows.nth(2).locator('.title-text').hover();
    await page.waitForTimeout(650);
    await expect(tooltip).toHaveCount(0);
    await title.hover();
    await page.waitForTimeout(150);
    await expect(tooltip).toHaveCount(0);
    await page.mouse.move(700, 100);
    await page.waitForTimeout(650);
    await expect(tooltip).toHaveCount(0);

    await page.locator('mat-drawer.sidebar').focus();
    await title.hover();
    await expect(tooltip).toHaveText(['全球服务与行业解决方案：帮助成长型企业建立统一的数字体验']);
    await captureTooltip(`10-${theme}-title-tooltip.png`);
    await tooltip.hover();
    await page.waitForTimeout(650);
    await expect(tooltip).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tooltip).toHaveCount(0);
    await expect(list).toBeVisible();
    await list.locator('.filter-toggle').focus();
    await page.keyboard.press('Tab');
    await expect(rows.first().locator('.title-btn')).toBeFocused();
    await expect(tooltip).toHaveText(['全球服务与行业解决方案：帮助成长型企业建立统一的数字体验']);
    await captureTooltip(`11-${theme}-keyboard-tooltip.png`);
    await page.keyboard.press('Escape');
    await expect(tooltip).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(rows.first().locator('.more-trigger')).toBeFocused();
    await expect(tooltip).toHaveText(['更多页面操作']);
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(tooltip).toHaveCount(0);
    await page.keyboard.press('Escape');
    await list.locator('.filter-toggle').focus();
    await rows.first().locator('.preview-link').hover();
    await expect(tooltip).toHaveText(['预览页面（在新窗口打开）']);
    await captureTooltip(`12-${theme}-preview-tooltip.png`);
    expect((await new AxeBuilder({ page }).include('app-page-list').include('.cdk-overlay-container')
      .analyze()).violations).toEqual([]);
    await item.click({ position: { x: 180, y: 52 } });
    await expect(rows.nth(1).locator('.current-badge')).toBeVisible();
    expect(state.errors).toEqual([]);
  });

  test(`list density, keyboard and narrow layout: ${theme}`, async ({ page }, info) => {
    const { state } = await mockPageList(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    const list = page.locator('app-page-list');
    await expect(list.locator('app-page-item')).toHaveCount(10);
    if (theme === 'dark-theme') {
      await page.locator('app-builder-sidebar app-btn:has([data-mat-icon-name="white-balance-sunny"]) button')
        .click();
    }
    await expect(page.locator('mat-drawer.sidebar')).toHaveClass(new RegExp(theme));
    await expect(page.locator('mat-drawer.sidebar')).not.toHaveClass(/mat-drawer-animating/);
    await page.mouse.move(0, 0);
    const visible = await list.locator('.lists').evaluate(el => {
      const box = el.getBoundingClientRect();
      return [...el.querySelectorAll('app-page-item')].filter(item => {
        const row = item.getBoundingClientRect();
        return row.top >= box.top && row.bottom <= box.bottom;
      }).length;
    });
    expect(visible).toBeGreaterThanOrEqual(4);
    await page.screenshot({ path: info.outputPath(`06-${theme}-desktop.png`) });
    await list.locator('.filter-toggle').focus();
    await page.keyboard.press('Tab');
    await expect(list.locator('.title-btn').first()).toBeFocused();
    await expect(page.locator('.mat-mdc-tooltip-surface').filter({
      hasText: '全球服务与行业解决方案',
    })).toHaveText(
      '全球服务与行业解决方案：帮助成长型企业建立统一的数字体验'
    );
    await list.locator('.filter-toggle').focus();
    await expect(page.locator('.mat-mdc-tooltip-surface').filter({
      hasText: '全球服务与行业解决方案',
    })).toBeHidden();
    for (const width of [900, 720]) {
      await page.setViewportSize({ width, height: 800 });
      await expect(list.getByRole('button', { name: '下一页', exact: true })).toBeInViewport();
      const overflow = await list.evaluate(el => [...el.querySelectorAll('.pager, .lists, .mat-mdc-paginator-range-actions')]
        .filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.className));
      expect(overflow).toEqual([]);
      const axe = await new AxeBuilder({ page }).include('app-page-list').analyze();
      expect(axe.violations).toEqual([]);
      await page.screenshot({ path: info.outputPath(`07-${theme}-${width}.png`) });
    }
    expect(state.errors).toEqual([]);
  });
}

test('collapsed filters stay active and an empty last page recovers', async ({ page }, info) => {
  const { state, rows } = await mockPageList(page);
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  const list = page.locator('app-page-list');
  await expect(list.locator('app-page-item')).toHaveCount(10);
  await list.getByRole('button', { name: '筛选', exact: true }).click();
  await list.getByRole('combobox', { name: '语言', exact: true }).click();
  await page.getByRole('option', { name: 'EN', exact: true }).click();
  await expect(list.locator('app-page-item')).toHaveCount(1);
  await list.getByRole('button', { name: '筛选 1', exact: true }).click();
  await expect(list.getByRole('combobox', { name: '语言', exact: true })).toBeHidden();
  await list.getByRole('button', { name: '刷新', exact: true }).click();
  await expect(list.locator('app-page-item')).toHaveCount(1);
  await page.screenshot({ path: info.outputPath('08-active-filter.png') });
  await list.getByRole('button', { name: '清除筛选', exact: true }).click();
  await expect(list.locator('app-page-item')).toHaveCount(10);
  await page.goBack();
  await expect(list.locator('app-page-item')).toHaveCount(1);
  await list.getByRole('button', { name: '清除筛选', exact: true }).click();
  rows.splice(21);
  await list.getByRole('button', { name: '刷新', exact: true }).click();
  await expect(list.locator('.list-count')).toHaveText('共 21 页');
  await list.getByRole('button', { name: '下一页', exact: true }).click();
  await expect(page).toHaveURL(/page=1/);
  await list.getByRole('button', { name: '下一页', exact: true }).click();
  await expect(list.locator('app-page-item')).toHaveCount(1);
  rows.pop();
  await list.getByRole('button', { name: '刷新', exact: true }).click();
  await expect(page).toHaveURL(/page=1/);
  await expect(list.locator('app-page-item')).toHaveCount(10);
  expect(state.errors).toEqual([]);
});
