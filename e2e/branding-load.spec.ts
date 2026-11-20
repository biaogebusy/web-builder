import type { Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures/test';

const branding = {
  header: {
    params: { themeSwitch: false, userInfo: false, menuHoverOpen: false },
    mainMenu: [],
    search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
    actions: [],
  },
  footer: { params: { mode: 'light' }, mainMenu: [] },
};

async function editSection(page: Page, editor: Locator, section: 'header' | 'footer') {
  if (section === 'header') {
    await editor.getByText('主题切换', { exact: true }).click();
    await expect(editor.getByRole('switch', { name: '主题切换' })).toBeChecked();
  } else {
    await editor.getByRole('combobox', { name: '模式', exact: true }).click();
    await page.getByRole('option', { name: '反色', exact: true }).click();
  }
  await expect(editor.locator('.dirty-label')).toBeVisible();
}

for (const section of ['header', 'footer'] as const) {
  test(`${section} resolves a direct entry, switches language, refreshes and saves that node`, async ({
    context,
    page,
  }) => {
    const writes: { path: string; node: string; body: typeof branding }[] = [];
    let listReads = 0;
    await context.route('**/api/**', route => route.fulfill({ json: {} }));
    await context.route('**/session/token*', route => route.fulfill({ body: 'b'.repeat(43) }));
    await context.route('**/api/v3/landingPage*', route => {
      const content = new URL(route.request().url()).searchParams.get('content');
      return route.fulfill({
        json:
          content === '/core/base'
            ? { defaultTheme: 'light-theme', builder: { guard: false } }
            : content === '/core/branding'
              ? branding
              : {},
      });
    });
    await context.route('**/api/v1/node/json**', route => {
      if (route.request().method() === 'PATCH') {
        const data = route.request().postDataJSON().data;
        writes.push({
          path: new URL(route.request().url()).pathname,
          node: data.id,
          body: JSON.parse(data.attributes.body),
        });
        return route.fulfill({ json: { data: { type: 'node--json', id: data.id } } });
      }
      listReads++;
      return route.fulfill({
        json: {
          data: ['zh-hans', 'en'].map(langcode => ({
            id: `branding-${langcode}`,
            attributes: { langcode, path: { alias: '/core/branding' } },
          })),
        },
      });
    });
    await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));

    await page.goto(`/builder/edit-branding/${section}?langcode=en`);
    const editor = page.locator(`app-edit-${section}`);
    await expect(editor.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await editSection(page, editor, section);
    const chinese = editor.getByRole('button', { name: '中文', exact: true });
    await chinese.click();
    await page.getByRole('dialog').getByRole('button', { name: '留下', exact: true }).click();
    await expect(page).toHaveURL(/langcode=en$/);
    await expect(editor.locator('.dirty-label')).toBeVisible();
    await chinese.click();
    await page.getByRole('dialog').getByRole('button', { name: '切换', exact: true }).click();
    await expect(chinese).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(/langcode=zh-hans$/);

    await editSection(page, editor, section);
    await editor.getByRole('button', { name: 'refresh', exact: true }).click();
    if (section === 'header') {
      await expect(editor.getByRole('switch', { name: '主题切换' })).not.toBeChecked();
    } else {
      await expect(editor.getByRole('combobox', { name: '模式', exact: true })).toContainText(
        '明亮'
      );
    }
    await editSection(page, editor, section);
    const save = editor.getByRole('button', { name: '保存更改', exact: true });
    await save.click();
    await expect(save).toBeDisabled();
    expect(listReads).toBe(1);
    expect(writes).toHaveLength(1);
    expect(writes[0].node).toBe('branding-zh-hans');
    expect(writes[0].path).toBe('/api/v1/node/json/branding-zh-hans');
    if (section === 'header') {
      expect(writes[0].body.header.params.themeSwitch).toBe(true);
      expect(writes[0].body.footer).toEqual(branding.footer);
    } else {
      expect(writes[0].body.footer.params.mode).toBe('inverse');
      expect(writes[0].body.header).toEqual(branding.header);
    }
  });
}
