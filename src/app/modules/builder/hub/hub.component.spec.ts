import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError, NEVER } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock, createUserServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';

import { HubComponent } from './hub.component';

// description 分三种情况:有说明、显式 null、字段缺失
const NODE_TYPE_RESPONSE = {
  data: [
    {
      attributes: { name: '文章', drupal_internal__type: 'article', description: '常规图文内容' },
    },
    { attributes: { name: '博客', drupal_internal__type: 'blog', description: null } },
    { attributes: { name: '新闻', drupal_internal__type: 'news' } },
    { attributes: { name: 'Drupal 案例', drupal_internal__type: 'case', description: '客户案例' } },
  ],
};

const TYPES_API = '/api/v1/node_type/node_type';

/** 分组入口的固定链接(发布入口之后按分组顺序渲染) */
const GROUP_LINKS = [
  '/builder/node/manage',
  '/builder/page-list',
  '/builder/edit-branding/header',
  '/builder/edit-branding/footer',
  '/builder/node/uiux',
  '/builder/settings',
  '/builder/config-check',
];

describe('HubComponent', () => {
  let fixture: ComponentFixture<HubComponent>;
  let nodeServiceMock: ReturnType<typeof createNodeServiceMock>;

  const setup = async (
    coreConfig: any = {},
    options: {
      /** 内容类型接口的返回,默认成功 */
      types?: Observable<any>;
      /** 角色判定,默认全部可见(同共享 mock) */
      checkShow?: (content: any) => boolean;
    } = {}
  ) => {
    nodeServiceMock = createNodeServiceMock();
    nodeServiceMock.fetch = vi.fn((api: string) =>
      api === TYPES_API ? (options.types ?? of(NODE_TYPE_RESPONSE)) : of({})
    ) as any;
    const userServiceMock = createUserServiceMock();
    if (options.checkShow) {
      userServiceMock.checkShow = vi.fn(options.checkShow) as any;
    }
    await TestBed.configureTestingModule({
      imports: [HubComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HubComponent);
    fixture.detectChanges();
    fixture.detectChanges();
  };

  const el = (): HTMLElement => fixture.nativeElement as HTMLElement;

  const links = (): string[] =>
    Array.from(el().querySelectorAll<HTMLAnchorElement>('a.entry-card')).map(
      a => a.getAttribute('href') ?? ''
    );

  const sectionTitles = (): string[] =>
    Array.from(el().querySelectorAll('.section-title')).map(node => node.textContent?.trim() ?? '');

  // 共享 mock 的 UserService.checkShow 恒为 true,管理员专属的组件管理入口也会渲染
  it('按开放的内容类型渲染发布入口,并渲染全部分组管理入口', async () => {
    await setup();
    expect(links()).toEqual([
      '/builder/node/add/article',
      '/builder/node/add/blog',
      '/builder/node/add/news',
      ...GROUP_LINKS,
    ]);
  });

  it('core_config 禁用的类型不出现在发布入口', async () => {
    await setup({ builder: { nodeTypes: { disable: ['news'], enable: ['case'] } } });
    expect(links()).toEqual([
      '/builder/node/add/article',
      '/builder/node/add/blog',
      '/builder/node/add/case',
      ...GROUP_LINKS,
    ]);
  });

  it('页面标题为 h1,分组标题为 h2,不塌陷成同级', async () => {
    await setup();
    expect(el().querySelectorAll('h1').length).toBe(1);
    expect(el().querySelector('h1')?.textContent?.trim()).toBe('BUILDER.HUB.PAGE_TITLE');
    // 发布区 + 3 个分组,全部是 h2
    expect(el().querySelectorAll('h2.section-title').length).toBe(4);
  });

  it('发布卡片用 aria-label 给出完整动作名,说明取自内容类型自身', async () => {
    await setup();
    const cards = el().querySelectorAll('a.entry-card.is-publish');
    expect(cards.length).toBe(3);
    expect(cards[0].getAttribute('aria-label')).toBe('BUILDER.HUB.ADD_ARIA');
    // 有说明时渲染,并用 aria-describedby 关联而非拼进链接的无障碍名
    expect(cards[0].querySelector('.entry-desc')?.textContent?.trim()).toBe('常规图文内容');
    expect(cards[0].getAttribute('aria-describedby')).toBe('hub-type-article');
    expect(cards[0].querySelector('.entry-desc')?.id).toBe('hub-type-article');
  });

  it('内容类型没有说明时不渲染副标题,不再逐张重复同一句提示', async () => {
    await setup();
    const cards = el().querySelectorAll('a.entry-card.is-publish');
    // 博客 description 为 null,新闻没有该字段
    expect(cards[1].querySelector('.entry-desc')).toBeNull();
    expect(cards[1].getAttribute('aria-describedby')).toBeNull();
    expect(cards[2].querySelector('.entry-desc')).toBeNull();
  });

  it('每个入口都渲染图标,且发布卡与管理卡可区分', async () => {
    await setup();
    const cards = Array.from(el().querySelectorAll('a.entry-card'));
    expect(cards.every(card => card.querySelector('app-icon'))).toBe(true);
    expect(el().querySelectorAll('a.entry-card.is-publish').length).toBe(3);
    expect(
      el().querySelector('a[href="/builder/settings"]')?.classList.contains('is-publish')
    ).toBe(false);
  });

  it('骨架屏按配置允许发布的类型数占位,而不是固定值', async () => {
    await setup({}, { types: NEVER });
    // 默认清单 5 种
    expect(el().querySelectorAll('ngx-skeleton-loader').length).toBe(5);
  });

  it('禁用类型后骨架屏占位数同步减少', async () => {
    await setup({ builder: { nodeTypes: { disable: ['news', 'json'] } } }, { types: NEVER });
    expect(el().querySelectorAll('ngx-skeleton-loader').length).toBe(3);
  });

  it('内容类型加载失败时显示错误态与重试,而不是空态', async () => {
    await setup({}, { types: throwError(() => new Error('network')) });
    expect(el().querySelector('.state-text')?.textContent?.trim()).toBe('BUILDER.HUB.LOAD_FAILED');
    expect(el().querySelector('.empty')).toBeNull();
    // 骨架屏必须复位,否则会常驻
    expect(el().querySelector('ngx-skeleton-loader')).toBeNull();
    expect(el().querySelector('.state button')).not.toBeNull();
  });

  it('点击重试会重新拉取内容类型', async () => {
    await setup({}, { types: throwError(() => new Error('network')) });
    const typeCalls = () =>
      nodeServiceMock.fetch.mock.calls.filter(([api]: any[]) => api === TYPES_API).length;
    expect(typeCalls()).toBe(1);

    el().querySelector<HTMLButtonElement>('.state button')?.click();
    fixture.detectChanges();

    expect(typeCalls()).toBe(2);
  });

  it('角色不匹配时隐藏受限入口,其余入口保留', async () => {
    await setup({}, { checkShow: content => !content?.params?.reqRoles?.length });
    expect(links()).not.toContain('/builder/node/uiux');
    expect(links()).toContain('/builder/edit-branding/header');
    expect(sectionTitles().length).toBe(4);
  });

  it('分组入口被角色全部过滤后,不渲染该分组标题(避免孤儿标题)', async () => {
    await setup({}, { checkShow: () => false });
    // 只剩发布区标题,3 个分组连标题一起消失
    expect(sectionTitles()).toEqual(['BUILDER.HUB.PUBLISH_TITLE']);
    expect(links().every(href => href.startsWith('/builder/node/add/'))).toBe(true);
  });
});
