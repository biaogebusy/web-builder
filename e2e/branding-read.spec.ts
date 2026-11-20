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

for (const section of ['header', 'footer'] as const) {
  test(`${section} blocks saving after a language read fails and recovers by refreshing`, async ({
    context,
    page,
  }) => {
    const writes: { path: string; data: { id: string; attributes: { body: string } } }[] = [];
    const englishReads: URL[] = [];
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    let rejectEnglish = true;
    await context.route('**/api/**', route => route.fulfill({ json: {} }));
    await context.route('**/session/token*', route => route.fulfill({ body: 'b'.repeat(43) }));
    await context.route('**/api/v3/landingPage*', route => {
      const url = new URL(route.request().url());
      const content = url.searchParams.get('content');
      if (content === '/core/base') {
        return route.fulfill({ json: { defaultTheme: 'light-theme', builder: { guard: false } } });
      }
      if (content !== '/core/branding') return route.fulfill({ json: {} });
      if (url.pathname.startsWith('/en/')) {
        englishReads.push(url);
        if (rejectEnglish) {
          return route.fulfill({ status: 503, json: { error: 'Synthetic read failure' } });
        }
        return route.fulfill({ json: { ...branding, marker: 'english' } });
      }
      return route.fulfill({ json: { ...branding, marker: 'chinese' } });
    });
    await context.route('**/api/v1/node/json**', route => {
      if (route.request().method() === 'PATCH') {
        const { data } = route.request().postDataJSON();
        writes.push({ path: new URL(route.request().url()).pathname, data });
        return route.fulfill({ json: { data: { type: 'node--json', id: data.id } } });
      }
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

    await page.goto(`/builder/edit-branding/${section}?uuid=branding-zh-hans&langcode=zh-hans`);
    const editor = page.locator(`app-edit-${section}`);
    await expect(editor.locator('formly-form').first()).toBeVisible();
    const edit = async () => {
      if (section === 'header') {
        await editor.getByText('主题切换', { exact: true }).click();
      } else {
        await editor.getByRole('combobox', { name: '模式', exact: true }).click();
        await page.getByRole('option', { name: '反色', exact: true }).click();
      }
    };
    await edit();
    await editor.getByRole('button', { name: 'EN', exact: true }).click();
    await page.getByRole('dialog').getByRole('button', { name: '切换', exact: true }).click();
    await expect(page.getByText('加载配置失败', { exact: true })).toBeVisible();
    expect(englishReads).toHaveLength(2);
    if (section === 'header') {
      await expect(editor.getByRole('switch', { name: '主题切换' })).toBeChecked();
      await editor.getByText('主题切换', { exact: true }).click();
    } else {
      await expect(editor.getByRole('combobox', { name: '模式', exact: true }))
        .toContainText('反色');
      await editor.getByRole('combobox', { name: '模式', exact: true }).click();
      await page.getByRole('option', { name: '明亮', exact: true }).click();
    }
    await expect(editor.locator('.dirty-label')).toBeVisible();
    const save = editor.getByRole('button', { name: '保存更改', exact: true });
    await expect(save).toBeDisabled();
    expect(writes).toHaveLength(0);

    rejectEnglish = false;
    await editor.getByRole('button', { name: 'refresh', exact: true }).click();
    if (section === 'header') {
      await expect(editor.getByRole('switch', { name: '主题切换' })).not.toBeChecked();
    } else {
      await expect(editor.getByRole('combobox', { name: '模式', exact: true })).toContainText(
        '明亮'
      );
    }
    await edit();
    await expect(save).toBeEnabled();
    await save.click();
    await expect(save).toBeDisabled();
    expect(writes).toHaveLength(1);
    expect(writes[0].path).toBe('/en/api/v1/node/json/branding-en');
    expect(writes[0].data.id).toBe('branding-en');
    const saved = JSON.parse(writes[0].data.attributes.body);
    expect(saved.marker).toBe('english');
    const other = section === 'header' ? 'footer' : 'header';
    expect(saved[other]).toEqual(branding[other]);
    expect(englishReads).toHaveLength(3);
    expect(englishReads.every(url => url.searchParams.get('nocache') === 'true')).toBe(true);
    expect(pageErrors).toEqual([]);
  });
}
