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
  test(`${section} saves its language node and retains changes for an explicit retry`, async ({
    context,
    page,
  }) => {
    const writes: {
      path: string;
      body: {
        data: {
          id: string;
          type: string;
          attributes: { body: string };
          relationships: object;
        };
      };
    }[] = [];
    let rejectWrite = true;
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
      if (route.request().method() !== 'PATCH') {
        return route.fulfill({
          json: {
            data: [
              {
                id: 'branding-en',
                attributes: { langcode: 'en', path: { alias: '/core/branding' } },
              },
            ],
          },
        });
      }
      writes.push({
        path: new URL(route.request().url()).pathname,
        body: route.request().postDataJSON(),
      });
      return route.fulfill(
        rejectWrite
          ? { status: 403, json: { errors: [{ detail: 'Synthetic permission denial' }] } }
          : { json: { data: { type: 'node--json', id: 'branding-en' } } }
      );
    });
    await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
    await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));

    await page.goto(`/builder/edit-branding/${section}?uuid=branding-en&langcode=en`);
    const editor = page.locator(`app-edit-${section}`);
    await expect(editor.locator('formly-form').first()).toBeVisible();
    const save = editor.getByRole('button', { name: '保存更改', exact: true });
    expect(writes).toHaveLength(0);
    if (section === 'header') {
      await editor.getByText('主题切换', { exact: true }).click();
      await expect(editor.getByRole('switch', { name: '主题切换' })).toBeChecked();
    } else {
      await editor.getByRole('combobox', { name: '模式', exact: true }).click();
      await page.getByRole('option', { name: '反色', exact: true }).click();
    }
    await expect(save).toBeEnabled();
    await save.click();
    await expect(page.getByText('您没有权限执行此操作！', { exact: true })).toBeVisible();
    await expect(save).toBeEnabled();
    await expect(editor.locator('.dirty-label')).toBeVisible();
    expect(writes).toHaveLength(1);
    expect(writes[0].path).toBe('/en/api/v1/node/json/branding-en');
    expect(writes[0].body.data).toMatchObject({
      type: 'node--json',
      id: 'branding-en',
      relationships: {},
    });
    const saved = JSON.parse(writes[0].body.data.attributes.body);
    if (section === 'header') {
      expect(saved.header.params.themeSwitch).toBe(true);
      expect(saved.footer).toEqual(branding.footer);
    } else {
      expect(saved.footer.params.mode).toBe('inverse');
      expect(saved.header).toEqual(branding.header);
    }

    rejectWrite = false;
    await save.click();
    await expect(
      page.getByText(`${section === 'header' ? 'Header' : 'Footer'} 配置更新成功！`, {
        exact: true,
      })
    ).toBeVisible();
    await expect(save).toBeDisabled();
    await expect(editor.locator('.dirty-label')).toHaveCount(0);
    expect(writes).toHaveLength(2);
    expect(writes[1]).toEqual(writes[0]);
  });
}
