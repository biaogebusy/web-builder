import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
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

  const setup = async (coreConfig: any = {}, fieldFormService?: any) => {
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
        ...(fieldFormService
          ? [{ provide: NodeFieldFormService, useValue: fieldFormService }]
          : []),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
    return nodeServiceMock;
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

  it('正文字段换用 tiptap,工具栏投影到顶栏下的通栏容器', async () => {
    await setup(
      {},
      {
        getNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () =>
          of({
            fields: [
              { key: 'body', type: 'rich-editor', props: { label: '正文' } },
              { key: 'field_tags', type: 'mat-select', props: {} },
            ],
            meta: [
              { key: 'body', fieldType: 'text_long' },
              { key: 'field_tags', fieldType: 'entity_reference' },
            ],
          }),
        buildModel: () => ({}),
      }
    );

    component.ngOnInit();

    const body = component.mainFields().find(field => field.key === 'body');
    expect(body?.type).toBe('tiptap');
    expect(body?.props?.['toolbarContainer']).toBe('#node-editor-toolbar');
    expect(component.hasRichEditor()).toBe(true);
    // 非正文字段仍留在右侧属性面板
    expect(component.sideFields().map(field => field.key)).toEqual(['field_tags']);
  });

  it('多个长文本字段时只有第一个接管通栏工具栏', async () => {
    await setup(
      {},
      {
        getNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () =>
          of({
            fields: [
              { key: 'body', type: 'rich-editor', props: {} },
              { key: 'field_extra', type: 'rich-editor', props: {} },
            ],
            meta: [
              { key: 'body', fieldType: 'text_with_summary' },
              { key: 'field_extra', fieldType: 'text_long' },
            ],
          }),
        buildModel: () => ({}),
      }
    );

    component.ngOnInit();

    const [, body, extra] = component.mainFields();
    expect(body.props?.['toolbarContainer']).toBe('#node-editor-toolbar');
    expect(extra.props?.['toolbarContainer']).toBeUndefined();
  });

  it('表单无效时不提交,标记 touched 并提示', async () => {
    const nodeServiceMock = await setup();
    component.form.addControl('title', new UntypedFormControl(null, Validators.required));

    component.onSubmit(component.form.value, { id: 1 });

    expect(nodeServiceMock.addEntity).not.toHaveBeenCalled();
    expect(component.form.touched).toBe(true);
    expect(component.submitting()).toBe(false);
  });
});
