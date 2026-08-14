import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG } from '@core/token/token-providers';

import { HubComponent } from './hub.component';

const NODE_TYPE_RESPONSE = {
  data: [
    { attributes: { name: '文章', drupal_internal__type: 'article' } },
    { attributes: { name: '博客', drupal_internal__type: 'blog' } },
    { attributes: { name: '新闻', drupal_internal__type: 'news' } },
    { attributes: { name: 'Drupal 案例', drupal_internal__type: 'case' } },
  ],
};

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

  const setup = async (coreConfig: any = {}) => {
    const nodeServiceMock = createNodeServiceMock();
    nodeServiceMock.fetch = vi.fn((api: string) =>
      api === '/api/v1/node_type/node_type' ? of(NODE_TYPE_RESPONSE) : of({})
    );
    await TestBed.configureTestingModule({
      imports: [HubComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HubComponent);
    fixture.detectChanges();
    fixture.detectChanges();
  };

  const links = (): string[] =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a.entry-card')
    ).map(a => a.getAttribute('href') ?? '');

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
});
