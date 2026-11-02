import type { Page, Route } from '@playwright/test';

/** Synthetic CMS for page-list interactions; no real writes or login are used. */
export async function mockPageList(page: Page) {
  const context = page.context();
  const state = {
    failure: false,
    empty: false,
    hold: false,
    pending: undefined as Route | undefined,
    reads: [] as string[],
    writes: [] as unknown[],
    errors: [] as string[],
  };
  const titles = [
    '全球服务与行业解决方案：帮助成长型企业建立统一的数字体验',
    'Global services and industry solutions for growing businesses',
    '2026 秋季新品发布活动',
    '客户案例：城市公共服务平台',
    '企业服务介绍',
    '品牌故事与团队',
    '新闻中心',
    '联系我们',
    '合作伙伴计划',
    '产品帮助中心',
  ];
  const rows = Array.from({ length: 25 }, (_, i) => ({
    nid: String(i + 12),
    uuid: `audit-page-${i + 12}`,
    langcode: i === 1 ? 'en' : 'zh-hans',
    title: titles[i % titles.length] + (i >= 10 ? ` ${i + 1}` : ''),
    url:
      i === 0
        ? '/solutions/digital-experience/enterprise-services-overview'
        : `/pages/audit-${i + 12}`,
    published: i % 3 !== 2,
    moderation_state: i % 3 === 2 ? 'draft' : 'published',
    default_langcode: i !== 1,
    translation_languages: i < 2 ? ['zh-hans', 'en'] : ['zh-hans'],
    taxonomy: i % 2 ? '产品与解决方案' : '品牌与企业信息',
    author: '内容运营团队',
    changed: '2026-10-31T09:45:00Z',
    group: i % 2 ? '2' : '1',
  }));
  function localPage(row: (typeof rows)[number], current = false) {
    return {
      ...row,
      current,
      dirty: true,
      body: [{ type: 'text', body: '<p>本地草稿：正在准备的新内容，尚未提交到服务器。</p>' }],
    };
  }
  await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
  await context.route('**/session/token', route =>
    route.fulfill({ contentType: 'text/plain', body: 't'.repeat(43) })
  );
  await context.route('**/oauth/token', route =>
    route.fulfill({
      json: {
        access_token: 'synthetic-editor',
        refresh_token: 'synthetic-refresh',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    })
  );
  await context.route('**/api/v3/accountProfile*', route =>
    route.fulfill({ json: { uid: 7, name: 'editor', roles: ['authenticated', 'editor'] } })
  );
  await context.route('**/api/v1/user/user*', route =>
    route.fulfill({
      json: {
        data: [
          {
            id: 'editor-uuid',
            display_name: 'Editor',
            login: '2026-01-01T00:00:00+00:00',
            roles: [{ meta: { drupal_internal__target_id: 'editor' } }],
          },
        ],
      },
    })
  );
  await context.route('**/api/v2/taxonomy/page_group*', route =>
    route.fulfill({
      json: {
        rows: [
          { id: '1', tid: '1', name: '品牌与企业信息' },
          { id: '2', tid: '2', name: '产品与解决方案' },
        ],
      },
    })
  );
  await context.route('**/api/v2/node/landing-page*', route => {
    const url = new URL(route.request().url());
    state.reads.push(url.search);
    if (state.failure)
      return route.fulfill({ status: 500, json: { error: 'Synthetic audit failure' } });
    const filtered = state.empty
      ? []
      : rows.filter(
          row =>
            (!url.searchParams.get('title') || row.title.includes(url.searchParams.get('title') || '')) &&
            (!url.searchParams.get('langcode') ||
              row.langcode === url.searchParams.get('langcode')) &&
            (!url.searchParams.get('group') || row.group === url.searchParams.get('group'))
        );
    const current = Number(url.searchParams.get('page') || 0);
    if (state.hold) {
      state.pending = route;
      return;
    }
    return route.fulfill({
      json: {
        rows: filtered.slice(current * 10, (current + 1) * 10),
        pager: {
          current_page: current,
          total_pages: Math.ceil(filtered.length / 10),
          total_items: filtered.length,
          items_per_page: 10,
        },
      },
    });
  });
  await context.route('**/api/v3/landingPage**', route => {
    const url = new URL(route.request().url());
    const id = url.pathname.match(/\/json\/(\d+)$/)?.[1];
    if (id) {
      const row = rows.find(x => x.nid === id)!;
      return route.fulfill({
        json: {
          ...row,
          status: true,
          body: [
            {
              type: 'json',
              uuid: `block-${id}`,
              attributes: { body: { type: 'text', body: '<p>已保存的页面内容</p>' } },
            },
          ],
        },
      });
    }
    return route.fulfill({
      json:
        url.searchParams.get('content') === '/core/base'
          ? { defaultTheme: 'light-theme', builder: { guard: false, enable: true } }
          : {},
    });
  });
  await context.route('**/api/v3/node-form/landing_page/*', route => {
    const row = rows.find(x => route.request().url().includes(x.uuid));
    return route.fulfill({
      json: {
        fields: [],
        baseFields: { status: 'status' },
        baseFieldNames: { status: 'status' },
        moderated: false,
        defaults: {
          state: row?.published ? 'published' : 'unpublished',
          promote: false,
          sticky: false,
        },
        canDelete: true,
        states: [
          { value: 'published', label: '已发布' },
          { value: 'unpublished', label: '未发布' },
        ],
      },
    });
  });
  await context.route('**/api/v1/node/landing_page/*', route => {
    const req = route.request();
    const row = rows.find(x => req.url().includes(x.uuid));
    if (!row) return route.fulfill({ status: 404, json: {} });
    if (req.method() === 'PATCH') {
      const payload = req.postDataJSON();
      state.writes.push({ method: req.method(), attributes: payload.data.attributes });
      if (payload.data.attributes.title !== undefined) row.title = payload.data.attributes.title;
      if (typeof payload.data.attributes.status === 'boolean')
        row.published = payload.data.attributes.status;
      row.moderation_state = row.published ? 'published' : 'unpublished';
    }
    if (req.method() === 'DELETE') {
      state.writes.push({ method: 'DELETE', id: row.nid });
      rows.splice(rows.indexOf(row), 1);
      return route.fulfill({ status: 204 });
    }
    return route.fulfill({
      json: {
        data: {
          id: row.uuid,
          type: 'node--landing_page',
          attributes: {
            title: row.title,
            langcode: row.langcode,
            default_langcode: row.default_langcode,
            drupal_internal__nid: Number(row.nid),
            changed: row.changed,
            path: { alias: row.url },
            meta_tags: {},
            status: row.published,
          },
        },
        included: [{ type: 'user--user', attributes: { display_name: '内容运营团队' } }],
      },
    });
  });
  page.on('pageerror', e => state.errors.push(e.message));
  await page.addInitScript(
    ({ drafts }) => {
      if (!sessionStorage.getItem('audit-initialized')) {
        localStorage.setItem('ngx-webstorage:version', JSON.stringify(drafts));
        sessionStorage.setItem(
          'xinshi-oauth-pkce',
          JSON.stringify({
            verifier: 'test-verifier',
            state: 'test-state',
            mode: 'redirect',
            returnUrl: '/builder/page-list',
          })
        );
        sessionStorage.setItem('audit-initialized', 'yes');
      }
    },
    { drafts: [localPage(rows[0], true), localPage(rows[4])] }
  );
  return { state, rows };
}
