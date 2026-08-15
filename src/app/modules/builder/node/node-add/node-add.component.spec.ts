import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { createNodeServiceMock } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { CORE_CONFIG } from '@core/token/token-providers';

import { NodeAddComponent } from './node-add.component';

/** Backend content types exceed the default open list; used to verify filtering */
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

  const setup = async (coreConfig: any = {}, fieldFormService?: any, routeParams?: any) => {
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
        ...(routeParams
          ? [{ provide: ActivatedRoute, useValue: { params: of(routeParams) } }]
          : []),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
    return nodeServiceMock;
  };

  /** Edit mode: the route carries uuid and fetch returns the node; preFetchChanged is the changed value seen by the pre-save comparison */
  const setupEdit = async (nodeAttributes: any = {}, preFetchChanged?: string) => {
    const attributes = {
      title: 'Old title',
      status: true,
      changed: '2026-01-01T00:00:00+00:00',
      path: { alias: '/old-alias' },
      ...nodeAttributes,
    };
    const nodeServiceMock = await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () => of({ fields: [], meta: [] }),
        buildModel: () => ({}),
        buildPayload: () => ({ attributes: {}, relationships: {} }),
      },
      { type: 'blog', uuid: 'u1' }
    );
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/blog/u1') {
        // A request with fields params is the pre-save changed check; otherwise it is the edit backfill load
        return params
          ? of({ data: { attributes: { changed: preFetchChanged ?? attributes.changed } } })
          : of({ data: { id: 'u1', attributes, relationships: {} } });
      }
      return of({});
    });
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.ngOnInit();
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
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
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
    // Non-body fields still stay in the right property panel
    expect(component.sideFields().map(field => field.key)).toEqual(['field_tags']);
  });

  it('多个长文本字段时只有第一个接管通栏工具栏', async () => {
    await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
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

    component.onSubmit(component.form.value, { id: 1 }, true);

    expect(nodeServiceMock.addEntity).not.toHaveBeenCalled();
    expect(component.form.touched).toBe(true);
    expect(component.submitting()).toBe(false);
  });

  it('新建按动作提交 status,非默认语言下携带 langcode 并走语言前缀', async () => {
    const nodeServiceMock = await setup();
    component.type.set('blog');

    component.onSubmit({ title: 'Hi' }, { id: 1 }, true);
    expect(nodeServiceMock.addEntity).toHaveBeenCalledWith(
      '/api/v1/node/blog',
      expect.objectContaining({ title: 'Hi', status: true }),
      {},
      undefined
    );

    nodeServiceMock.resolveLangCode = vi.fn(() => 'en');
    component.onSubmit({ title: 'Hi' }, { id: 1 }, false);
    const [, attrs, , lang] = (nodeServiceMock.addEntity as any).mock.calls[1];
    expect(attrs.status).toBe(false);
    expect(attrs.langcode).toBe('en');
    expect(lang).toBe('en');
  });

  it('配置为审核类型时新建写 moderation_state 而非 status', async () => {
    const nodeServiceMock = await setup({ builder: { nodeTypes: { moderated: ['blog'] } } });
    component.type.set('blog');

    component.onSubmit({ title: 'Hi' }, { id: 1 }, true);

    const attrs = (nodeServiceMock.addEntity as any).mock.calls[0][1];
    expect(attrs.moderation_state).toBe('published');
    expect(attrs.status).toBeUndefined();
  });

  it('编辑回填发布设置,基础字段仅提交有变化的部分(最小差异)', async () => {
    const nodeServiceMock = await setupEdit();

    expect(component.publishFields().map(f => f.key)).toEqual(['path_alias', 'revision_log']);
    expect(component.model().path_alias).toBe('/old-alias');

    // Status (published -> publish) and alias are both unchanged: no status/path submitted; the revision note is submitted as entered
    component.onSubmit(
      { title: 'New', path_alias: '/old-alias', revision_log: '修正错字' },
      { id: 1 },
      true
    );
    const [path, uuid, attrs, , lang] = (nodeServiceMock.updateEntity as any).mock.calls[0];
    expect(path).toBe('/api/v1/node/blog');
    expect(uuid).toBe('u1');
    expect(attrs.status).toBeUndefined();
    expect(attrs.path).toBeUndefined();
    expect(attrs.langcode).toBeUndefined();
    expect(attrs.revision_log).toBe('修正错字');
    expect(lang).toBeUndefined();
  });

  it('编辑转草稿提交 status=false,清空别名提交 path.alias=null', async () => {
    const nodeServiceMock = await setupEdit();

    component.onSubmit({ title: 'New', path_alias: '' }, { id: 1 }, false);

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.status).toBe(false);
    expect(attrs.path).toEqual({ alias: null });
  });

  it('节点受内容审核时按 moderation_state 流转,不写 status', async () => {
    const nodeServiceMock = await setupEdit({ moderation_state: 'draft', status: false });

    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 }, true);

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.moderation_state).toBe('published');
    expect(attrs.status).toBeUndefined();
  });

  it('保存前比对 changed,他人已修改则中止更新并复位提交态', async () => {
    const nodeServiceMock = await setupEdit({}, '2026-02-02T00:00:00+00:00');

    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 }, true);

    expect(nodeServiceMock.updateEntity).not.toHaveBeenCalled();
    expect(component.submitting()).toBe(false);
  });

  it('json 类型编辑时 body 带回原文本格式', async () => {
    const nodeServiceMock = await setup(
      {},
      { getAllowedNodeTypes: () => of([{ label: '应用中心', value: 'json' }]) },
      { type: 'json', uuid: 'u1' }
    );
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/json/u1') {
        return params
          ? of({ data: { attributes: { changed: '2026-01-01T00:00:00+00:00' } } })
          : of({
              data: {
                id: 'u1',
                attributes: {
                  title: 'App',
                  status: true,
                  changed: '2026-01-01T00:00:00+00:00',
                  body: { value: '{"a":1}', format: 'json' },
                },
              },
            });
      }
      return of({});
    });
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.ngOnInit();

    component.onSubmit({ title: 'App', body: { a: 2 } }, { id: 1 }, true);

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.body).toEqual({ value: '{"a":2}', format: 'json' });
  });
});

/**
 * Page switching under real route navigation: jumps between edit/create and
 * races with in-flight requests, verifying that data from the previous page
 * neither lingers nor lands late in the next page.
 */
describe('NodeAddComponent 路由切换', () => {
  const NODE_U1 = {
    data: {
      id: 'u1',
      attributes: {
        title: 'U1 title',
        status: true,
        changed: '2026-01-01T00:00:00+00:00',
        path: { alias: '/old-alias' },
      },
      relationships: {},
    },
  };
  const NODE_U2 = {
    data: {
      id: 'u2',
      attributes: {
        title: 'U2 title',
        status: true,
        changed: '2026-01-02T00:00:00+00:00',
        path: { alias: '/u2-alias' },
      },
      relationships: {},
    },
  };

  /** u1 responds slowly (30ms), u2 fast, to simulate a still in-flight request while switching */
  const setupHarness = async (getFormByBundle?: (bundle: string) => any) => {
    const nodeServiceMock = createNodeServiceMock();
    nodeServiceMock.fetch = vi.fn((api: string) => {
      if (api === '/api/v1/node/article/u1') {
        return of(NODE_U1).pipe(delay(30));
      }
      if (api === '/api/v1/node/article/u2') {
        return of(NODE_U2).pipe(delay(1));
      }
      return of({});
    });
    const fieldFormMock = {
      getAllowedNodeTypes: () =>
        of([
          { label: '文章', value: 'article' },
          { label: '博客', value: 'blog' },
        ]),
      getForm: vi.fn((bundle: string) =>
        getFormByBundle ? getFormByBundle(bundle) : of({ fields: [], meta: [] }).pipe(delay(1))
      ),
      buildModel: () => ({}),
      buildPayload: () => ({ attributes: {}, relationships: {} }),
    };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'builder/node/add/:type', component: NodeAddComponent },
          { path: 'builder/node/edit/:type/:uuid', component: NodeAddComponent },
        ]),
        ...provideBuilderMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: CORE_CONFIG, useValue: {} },
        { provide: NodeFieldFormService, useValue: fieldFormMock },
      ],
    });
    const harness = await RouterTestingHarness.create();
    return { harness, nodeServiceMock, fieldFormMock };
  };

  const flush = async (harness: RouterTestingHarness, ms = 60) => {
    await new Promise(resolve => setTimeout(resolve, ms));
    harness.detectChanges();
  };

  const inputValues = (harness: RouterTestingHarness) =>
    Array.from(
      harness.routeNativeElement?.querySelectorAll<HTMLInputElement>('input.shad-input') ?? []
    ).map(el => el.value);

  it('编辑加载完成后切到新建,别名与标题不残留', async () => {
    const { harness } = await setupHarness();
    const edit = await harness.navigateByUrl(
      '/builder/node/edit/article/u1',
      NodeAddComponent
    );
    await flush(harness);
    expect(edit.model().path_alias).toBe('/old-alias');
    expect(inputValues(harness)).toContain('/old-alias');

    const create = await harness.navigateByUrl('/builder/node/add/article', NodeAddComponent);
    await flush(harness);
    expect(create.model().path_alias ?? '').toBe('');
    expect(inputValues(harness)).not.toContain('/old-alias');
  });

  it('编辑数据仍在途时切到新建,迟到的加载结果不得写入新建表单', async () => {
    const { harness } = await setupHarness();
    await harness.navigateByUrl('/builder/node/edit/article/u1', NodeAddComponent);
    // Switch to create immediately without waiting for u1
    const create = await harness.navigateByUrl('/builder/node/add/article', NodeAddComponent);
    await flush(harness);
    expect(create.model().path_alias ?? '').toBe('');
    expect(inputValues(harness)).not.toContain('/old-alias');
  });

  it('编辑页仍在加载时切到另一节点,旧节点数据不得迟到覆盖', async () => {
    const { harness } = await setupHarness();
    await harness.navigateByUrl('/builder/node/edit/article/u1', NodeAddComponent);
    // Switch to u2 (fast) while u1 (slow) is in flight: same route config, component reused
    const edit2 = await harness.navigateByUrl(
      '/builder/node/edit/article/u2',
      NodeAddComponent
    );
    await flush(harness);
    expect(edit2.model().path_alias).toBe('/u2-alias');
    expect(inputValues(harness)).not.toContain('/old-alias');
  });

  it('新建页字段仍在加载时切换类型,上一类型的字段不得迟到写入', async () => {
    const { harness } = await setupHarness(bundle =>
      bundle === 'article'
        ? of({
            fields: [{ key: 'field_article_only', type: 'input', props: {} }],
            meta: [{ key: 'field_article_only', fieldType: 'string' }],
          }).pipe(delay(30))
        : of({ fields: [], meta: [] }).pipe(delay(1))
    );
    await harness.navigateByUrl('/builder/node/add/article', NodeAddComponent);
    // Switch to blog while article's field introspection (slow) is in flight: same route config, component reused
    const create = await harness.navigateByUrl('/builder/node/add/blog', NodeAddComponent);
    await flush(harness);
    expect(create.sideFields().map(f => f.key)).not.toContain('field_article_only');
  });
});
