import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG } from '@core/token/token-providers';

import { NodeHubComponent } from './node-hub.component';

const NODE_TYPE_RESPONSE = {
  data: [
    { attributes: { name: '文章', drupal_internal__type: 'article' } },
    { attributes: { name: '博客', drupal_internal__type: 'blog' } },
    { attributes: { name: '新闻', drupal_internal__type: 'news' } },
    { attributes: { name: 'Drupal 案例', drupal_internal__type: 'case' } },
  ],
};

describe('NodeHubComponent', () => {
  let fixture: ComponentFixture<NodeHubComponent>;

  const setup = async (coreConfig: any = {}) => {
    const nodeServiceMock = createNodeServiceMock();
    nodeServiceMock.fetch = vi.fn((api: string) =>
      api === '/api/v1/node_type/node_type' ? of(NODE_TYPE_RESPONSE) : of({})
    );
    await TestBed.configureTestingModule({
      imports: [NodeHubComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeHubComponent);
    fixture.detectChanges();
    fixture.detectChanges();
  };

  const links = (): string[] =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a.entry-card')
    ).map(a => a.getAttribute('href') ?? '');

  it('按开放的内容类型渲染发布入口,并有管理列表固定入口', async () => {
    await setup();
    expect(links()).toEqual([
      '/builder/node/add/article',
      '/builder/node/add/blog',
      '/builder/node/add/news',
      '/builder/node/manage',
    ]);
  });

  it('core_config 禁用的类型不出现在发布入口', async () => {
    await setup({ builder: { nodeTypes: { disable: ['news'], enable: ['case'] } } });
    expect(links()).toEqual([
      '/builder/node/add/article',
      '/builder/node/add/blog',
      '/builder/node/add/case',
      '/builder/node/manage',
    ]);
  });
});
