import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG } from '@core/token/token-providers';

import { NodeAddComponent } from './node-add.component';

/** 后端内容类型多于默认开放清单,用于验证过滤 */
const NODE_TYPE_RESPONSE = {
  data: [
    { attributes: { name: '文章', drupal_internal__type: 'article' } },
    { attributes: { name: '博客', drupal_internal__type: 'blog' } },
    { attributes: { name: 'Drupal 案例', drupal_internal__type: 'case' } },
    { attributes: { name: '公司', drupal_internal__type: 'company' } },
    { attributes: { name: '新闻', drupal_internal__type: 'news' } },
    { attributes: { name: '应用中心', drupal_internal__type: 'json' } },
    { attributes: { name: '组件', drupal_internal__type: 'component' } },
    { attributes: { name: '着陆页', drupal_internal__type: 'landing_page' } },
  ],
};

describe('NodeAddComponent', () => {
  let component: NodeAddComponent;
  let fixture: ComponentFixture<NodeAddComponent>;

  const setup = async (coreConfig: any = {}) => {
    const nodeServiceMock = createNodeServiceMock();
    nodeServiceMock.fetch = vi.fn((api: string) =>
      api === '/api/v1/node_type/node_type' ? of(NODE_TYPE_RESPONSE) : of({})
    );
    await TestBed.configureTestingModule({
      imports: [NodeAddComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
  };

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('默认只开放博客、新闻、应用中心、文章、组件', async () => {
    await setup();
    component.ngOnInit();
    expect(component.nodeTypes().map(type => type.value)).toEqual([
      'article',
      'blog',
      'news',
      'json',
      'component',
    ]);
  });

  it('core_config 可禁用默认清单中的类型', async () => {
    await setup({ builder: { nodeTypes: { disable: ['news', 'json'] } } });
    component.ngOnInit();
    expect(component.nodeTypes().map(type => type.value)).toEqual([
      'article',
      'blog',
      'component',
    ]);
  });

  it('core_config 可额外开放默认清单以外的类型', async () => {
    await setup({ builder: { nodeTypes: { enable: ['case', 'landing_page'] } } });
    component.ngOnInit();
    expect(component.nodeTypes().map(type => type.value)).toEqual([
      'article',
      'blog',
      'case',
      'news',
      'json',
      'component',
      'landing_page',
    ]);
  });
});
