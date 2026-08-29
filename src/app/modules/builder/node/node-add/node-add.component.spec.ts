import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
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
        getModerationStates: () => of([]),
        buildModel: () => ({}),
        buildPayload: () => ({ attributes: {}, relationships: {} }),
      },
      { type: 'blog', uuid: 'u1' }
    );
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/blog/u1') {
        // A request asking for the changed field is the pre-save check; the noCache-only one is the edit backfill load
        const isChangedCheck = typeof params === 'string' && params.includes('changed');
        return isChangedCheck
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

  it('tiptap 正文字段将工具栏投影到顶栏下的通栏容器', async () => {
    await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () =>
          of({
            fields: [
              { key: 'body', type: 'tiptap', props: { label: '正文' } },
              { key: 'field_tags', type: 'mat-select', props: {} },
            ],
            meta: [
              { key: 'body', fieldType: 'text_long' },
              { key: 'field_tags', fieldType: 'entity_reference' },
            ],
          }),
        getModerationStates: () => of([]),
        buildModel: () => ({}),
      }
    );

    component.ngOnInit();

    const body = component.mainFields().find(field => field.key === 'body');
    expect(body?.type).toBe('tiptap');
    expect(body?.props?.['autoLoad']).toBe(true);
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
              { key: 'body', type: 'tiptap', props: {} },
              { key: 'field_extra', type: 'tiptap', props: {} },
            ],
            meta: [
              { key: 'body', fieldType: 'text_with_summary' },
              { key: 'field_extra', fieldType: 'text_long' },
            ],
          }),
        getModerationStates: () => of([]),
        buildModel: () => ({}),
      }
    );

    component.ngOnInit();

    const [, body, extra] = component.mainFields();
    expect(body.props?.['autoLoad']).toBe(true);
    expect(extra.props?.['autoLoad']).toBe(true);
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

  it('新建默认发布状态,选未发布提交 status=false,非默认语言下携带 langcode 并走语言前缀', async () => {
    const nodeServiceMock = await setup();
    component.type.set('blog');

    component.onSubmit({ title: 'Hi' }, { id: 1 });
    expect(nodeServiceMock.addEntity).toHaveBeenCalledWith(
      '/api/v1/node/blog',
      expect.objectContaining({ title: 'Hi', status: true }),
      {},
      undefined
    );

    nodeServiceMock.resolveLangCode = vi.fn(() => 'en');
    component.onSubmit({ title: 'Hi', state: 'unpublished' }, { id: 1 });
    const [, attrs, , lang] = (nodeServiceMock.addEntity as any).mock.calls[1];
    expect(attrs.status).toBe(false);
    expect(attrs.langcode).toBe('en');
    expect(lang).toBe('en');
  });

  it('配置为审核类型时新建写 moderation_state 而非 status', async () => {
    const nodeServiceMock = await setup({ builder: { nodeTypes: { moderated: ['blog'] } } });
    component.type.set('blog');

    component.onSubmit({ title: 'Hi' }, { id: 1 });

    const attrs = (nodeServiceMock.addEntity as any).mock.calls[0][1];
    expect(attrs.moderation_state).toBe('published');
    expect(attrs.status).toBeUndefined();
  });

  it('审核类型的状态选项来自后台工作流,新建默认已发布', async () => {
    await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () => of({ fields: [], meta: [] }),
        getModerationStates: () =>
          of([
            { value: 'published', label: '已发布' },
            { value: 'draft', label: '草稿' },
            { value: 'archived', label: '已归档' },
          ]),
        buildModel: () => ({}),
      }
    );
    component.ngOnInit();

    const stateField = component.publishFields().find(field => field.key === 'state');
    expect(stateField?.props?.['options']).toEqual([
      { label: '已发布', value: 'published' },
      { label: '草稿', value: 'draft' },
      { label: '已归档', value: 'archived' },
    ]);
    expect(component.model().state).toBe('published');
  });

  it('非审核类型的状态选项为已发布/未发布,编辑回填当前状态', async () => {
    await setupEdit({ status: false });

    const stateField = component.publishFields().find(field => field.key === 'state');
    // Labels go through translate (mocked identity in specs); assert machine values
    const options = (stateField?.props?.['options'] as any[]) ?? [];
    expect(options.map(option => option.value)).toEqual([
      'published',
      'unpublished',
    ]);
    expect(component.model().state).toBe('unpublished');
  });

  it('审核类型编辑回填当前 moderation_state,状态不变时不提交该字段', async () => {
    const nodeServiceMock = await setupEdit({ moderation_state: 'draft', status: false });

    expect(component.model().state).toBe('draft');

    component.onSubmit({ title: 'New', path_alias: '/old-alias', state: 'draft' }, { id: 1 });

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.moderation_state).toBeUndefined();
    expect(attrs.status).toBeUndefined();
  });

  it('推荐到首页/置顶编辑回填,按最小差异提交', async () => {
    const nodeServiceMock = await setupEdit({ promote: true, sticky: true });

    expect(component.model().promote).toBe(true);
    expect(component.model().sticky).toBe(true);

    // Unchecking promote submits false; leaving sticky checked submits nothing
    component.onSubmit(
      { title: 'New', path_alias: '/old-alias', state: 'published', promote: false, sticky: true },
      { id: 1 }
    );

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.promote).toBe(false);
    expect(attrs.sticky).toBeUndefined();
  });

  it('新建勾选推荐/置顶才提交,未勾选不覆盖后台默认', async () => {
    const nodeServiceMock = await setup();
    component.type.set('blog');

    component.onSubmit({ title: 'Hi', promote: true }, { id: 1 });

    const attrs = (nodeServiceMock.addEntity as any).mock.calls[0][1];
    expect(attrs.promote).toBe(true);
    expect(attrs.sticky).toBeUndefined();
  });

  it('编辑回填发布设置,基础字段仅提交有变化的部分(最小差异)', async () => {
    const nodeServiceMock = await setupEdit();

    expect(component.publishFields().map(f => f.key)).toEqual([
      'state',
      'promote',
      'sticky',
      'path_alias',
      'revision_log',
    ]);
    expect(component.model().path_alias).toBe('/old-alias');
    // The state select backfills the node's current status
    expect(component.model().state).toBe('published');

    // State (published) and alias are both unchanged: no status/path submitted; the revision note is submitted as entered
    component.onSubmit(
      { title: 'New', path_alias: '/old-alias', revision_log: '修正错字' },
      { id: 1 }
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

  it('编辑选未发布提交 status=false,清空别名提交 path.alias=null', async () => {
    const nodeServiceMock = await setupEdit();

    component.onSubmit({ title: 'New', path_alias: '', state: 'unpublished' }, { id: 1 });

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.status).toBe(false);
    expect(attrs.path).toEqual({ alias: null });
  });

  it('节点受内容审核时按 moderation_state 流转,不写 status', async () => {
    const nodeServiceMock = await setupEdit({ moderation_state: 'draft', status: false });

    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 });

    const attrs = (nodeServiceMock.updateEntity as any).mock.calls[0][2];
    expect(attrs.moderation_state).toBe('published');
    expect(attrs.status).toBeUndefined();
  });

  it('保存前比对 changed,他人已修改则中止更新并复位提交态', async () => {
    const nodeServiceMock = await setupEdit({}, '2026-02-02T00:00:00+00:00');

    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 });

    expect(nodeServiceMock.updateEntity).not.toHaveBeenCalled();
    expect(component.submitting()).toBe(false);
  });

  it('编辑加载失败进入错误态而非新建表单,重试成功后回填', async () => {
    let fail = true;
    const nodeServiceMock = await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '博客', value: 'blog' }]),
        getForm: () => of({ fields: [], meta: [] }),
        getModerationStates: () => of([]),
        buildModel: () => ({}),
      },
      { type: 'blog', uuid: 'u1' }
    );
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/blog/u1') {
        if (typeof params === 'string' && params.includes('changed')) {
          return of({ data: { attributes: { changed: '2026-01-01T00:00:00+00:00' } } });
        }
        // Backfill load fails first, succeeds after retry
        return fail ? throwError(() => new Error('network')) : of({
          data: {
            id: 'u1',
            attributes: { title: 'Recovered', status: true, changed: '2026-01-01T00:00:00+00:00' },
            relationships: {},
          },
        });
      }
      return of({});
    });
    component.ngOnInit();

    expect(component.loadFailed()).toBe(true);
    // No create form is built: a save here would have duplicated the node
    expect(component.mainFields().length).toBe(0);

    fail = false;
    component.retry();
    await Promise.resolve();

    expect(component.loadFailed()).toBe(false);
    expect(component.model().title).toBe('Recovered');
  });

  it('编辑保存成功后留在当前页,并刷新 changed 基线避免误报冲突', async () => {
    const nodeServiceMock = await setupEdit();
    // The server-side changed moves forward with each save; the pre-check fetch must follow
    let changed = '2026-01-01T00:00:00+00:00';
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/blog/u1') {
        if (typeof params === 'string' && params.includes('changed')) {
          return of({ data: { attributes: { changed } } });
        }
        return of({
          data: {
            id: 'u1',
            attributes: { title: 'Old title', status: true, changed },
            relationships: {},
          },
        });
      }
      return of({});
    });
    (nodeServiceMock.updateEntity as any).mockImplementation(() => {
      changed = '2026-03-03T00:00:00+00:00';
      return of({ data: { attributes: { changed } } });
    });
    const navigate = vi.mocked(TestBed.inject(Router).navigate);

    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 });
    expect(navigate).not.toHaveBeenCalled();

    // A second save right away must not trip the conflict check on the stale timestamp
    component.onSubmit({ title: 'New', path_alias: '/old-alias' }, { id: 1 });
    expect(nodeServiceMock.updateEntity).toHaveBeenCalledTimes(2);

    // The saved form becomes the pristine baseline for the leave guard
    expect(component.hasUnsavedChanges()).toBe(false);
  });

  it('hasUnsavedChanges 反映表单脏态,保存成功后复位', async () => {
    await setupEdit();

    expect(component.hasUnsavedChanges()).toBe(false);

    component.form.addControl('title', new UntypedFormControl('Dirty'));
    component.form.markAsDirty();
    expect(component.hasUnsavedChanges()).toBe(true);
  });

  it('json 类型编辑时 body 带回原文本格式', async () => {
    const nodeServiceMock = await setup(
      {},
      {
        getAllowedNodeTypes: () => of([{ label: '应用中心', value: 'json' }]),
        getModerationStates: () => of([]),
      },
      { type: 'json', uuid: 'u1' }
    );
    nodeServiceMock.fetch = vi.fn((api: string, params?: any) => {
      if (api === '/api/v1/node/json/u1') {
        const isChangedCheck = typeof params === 'string' && params.includes('changed');
        return isChangedCheck
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

    component.onSubmit({ title: 'App', body: { a: 2 } }, { id: 1 });

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
      getModerationStates: () => of([]),
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
