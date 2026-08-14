import { Component, DestroyRef, OnInit, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IUser } from '@core/interface/IUser';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { NodeService } from '@core/service/node.service';
import {
  INodeFieldMeta,
  INodeForm,
  NodeFieldFormService,
} from '@core/service/node-field-form.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, FormlyModule, FormlyMaterialModule],
})
export class NodeAddComponent implements OnInit {
  private nodeService = inject(NodeService);
  private fieldFormService = inject(NodeFieldFormService);
  private tagsService = inject(TagsService);
  private activateRoute = inject(ActivatedRoute);
  public user = inject(USER);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  public type = signal<string>('');
  /** 编辑模式下的节点 uuid;为空即新建 */
  public editUuid = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  /** 中间编辑区字段:标题 + 正文类(rich-editor/json) */
  public mainFields = signal<FormlyFieldConfig[]>([]);
  /** 右侧属性面板字段:标签、布尔、数值等元数据 */
  public sideFields = signal<FormlyFieldConfig[]>([]);
  /** 发布设置字段:URL 别名、修订说明(写入 path.alias / revision_log 基础字段) */
  public publishFields = signal<FormlyFieldConfig[]>([]);
  /** 编辑模式的表单回填模型 */
  public model = signal<any>({});
  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  // getNodeTypes 出错时会发出空数组,需与"加载中"区分,避免骨架屏常驻
  public typesLoading = signal(true);
  public submitting = signal(false);
  /** 当前类型的显示名(如 "博客"),未匹配时回退机器名 */
  public typeLabel = computed(
    () => this.nodeTypes().find(t => t.value === this.type())?.label ?? this.type()
  );
  /** 中间区含富文本时,顶栏下渲染独立的编辑器工具栏通栏 */
  public hasRichEditor = computed(() => this.mainFields().some(f => f.type === 'tiptap'));
  private fieldMeta: INodeFieldMeta[] = [];
  /** 编辑模式加载的节点原始数据,用于 PATCH 时的往返保真与最小差异提交 */
  private originalNode: any = null;
  /** 编辑加载时的 changed 时间戳,保存前比对检测并发修改 */
  private loadedChanged = '';

  ngOnInit(): void {
    this.fieldFormService
      .getAllowedNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: types => {
          this.nodeTypes.set(types);
          this.typesLoading.set(false);
        },
        // 失败时也要复位,否则类型选择区的骨架屏会一直转
        error: () => this.typesLoading.set(false),
      });

    // switchMap:路由参数一变即取消上一轮在途加载,防止旧页面数据迟到写入新页面
    // (同一路由配置间导航时组件被复用,如编辑切另一节点、新建切换类型)
    this.activateRoute.params
      .pipe(
        tap(params => this.resetForParams(params)),
        switchMap(params => this.loadForm$(params)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(load => this.applyForm(load));
  }

  /** 每次路由参数变化:重置全部页面状态,销毁旧表单(app-formly 只在创建时快照 fields 与 model) */
  private resetForParams(params: Params): void {
    const type = params['type'];
    const uuid = params['uuid'] || '';
    this.tagsService.setTitle(
      this.translate.instant(
        uuid ? 'BUILDER.NODE_ADD.EDIT_TITLE' : 'BUILDER.NODE_ADD.CREATE_TITLE',
        { type }
      )
    );
    this.type.set(type);
    this.editUuid.set(uuid);
    this.mainFields.set([]);
    this.sideFields.set([]);
    this.publishFields.set([]);
    this.model.set({});
    this.form = new UntypedFormGroup({});
    this.fieldMeta = [];
    this.originalNode = null;
    this.loadedChanged = '';
  }

  private loadForm$(params: Params): Observable<{ node: any; form?: INodeForm }> {
    const type = params['type'];
    const uuid = params['uuid'] || '';
    // 编辑模式先取节点数据用于回填(带语言前缀,命中当前语言的翻译);
    // 失败时回落为新建表单
    const node$ = uuid
      ? this.nodeService
          .fetch(`/api/v1/node/${type}/${uuid}`, '', this.nodeService.resolveLangCode())
          .pipe(
            map(res => res?.data ?? null),
            catchError(err => {
              console.error('加载节点数据失败', err);
              this.util.openSnackbar(
                this.translate.instant('BUILDER.NODE_ADD.LOAD_NODE_FAILED'),
                'ok'
              );
              return of(null);
            }),
            tap(node => {
              this.originalNode = node;
              this.loadedChanged = node?.attributes?.changed ?? '';
            })
          )
      : of(null);
    if (type === 'json') {
      return node$.pipe(map(node => ({ node })));
    }
    // 通过 field config API 内省该内容类型的字段,动态生成表单
    return forkJoin({
      form: this.fieldFormService.getForm(type),
      node: node$,
    }).pipe(map(({ form, node }) => ({ node, form })));
  }

  /** form 缺省即 json 类型(不走字段内省),否则按内省结果构建动态表单 */
  private applyForm({ node, form }: { node: any; form?: INodeForm }): void {
    if (!form) {
      if (node) {
        this.model.set({
          title: node.attributes?.title,
          path_alias: node.attributes?.path?.alias ?? '',
          body: this.parseJsonBody(node),
        });
      }
      this.mainFields.set([
        this.getTitleField(),
        {
          key: 'body',
          type: 'json',
          className: 'node-body-field',
          props: {
            label: 'JSON',
            required: true,
            rows: 10,
          },
        },
      ]);
      this.publishFields.set(this.getPublishFields());
      return;
    }
    const { fields, meta } = form;
    this.fieldMeta = meta;
    if (node) {
      this.model.set({
        title: node.attributes?.title,
        path_alias: node.attributes?.path?.alias ?? '',
        ...this.fieldFormService.buildModel(meta, node),
      });
    }
    // 正文类字段进中间编辑区,其余元数据进右侧属性面板
    const bodyKeys = new Set(
      meta
        .filter(m => m.fieldType === 'text_long' || m.fieldType === 'text_with_summary')
        .map(m => m.key)
    );
    // 正文富文本统一换用 tiptap,工具栏抽离到顶栏下的独立通栏容器
    // (模板中的 #node-editor-toolbar);node-body-field 与标题字段共用同一
    // 左对齐文档容器(见 scss)
    const richBodyKey = fields.find(
      f => bodyKeys.has(f.key as string) && f.type === 'rich-editor'
    )?.key;
    const bodyFields = fields
      .filter(f => bodyKeys.has(f.key as string))
      .map(f => {
        if (f.type !== 'rich-editor') {
          return { ...f, className: 'node-body-field' };
        }
        return {
          ...f,
          className: 'node-body-field',
          type: 'tiptap',
          // 一个内容类型可能有多个长文本字段,只让第一个接管通栏工具栏,
          // 其余在各自的编辑器盒子内渲染工具栏,避免多条工具栏叠进同一容器
          props:
            f.key === richBodyKey
              ? { ...f.props, toolbarContainer: '#node-editor-toolbar' }
              : f.props,
        };
      });
    this.mainFields.set([this.getTitleField(), ...bodyFields]);
    this.sideFields.set(fields.filter(f => !bodyKeys.has(f.key as string)));
    this.publishFields.set(this.getPublishFields());
    // field_config 需要 administer node fields 权限,无权限时 data 为空
    if (fields.length === 0) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.NO_FIELDS'), 'ok');
    }
  }

  /** json 类型的 body 以字符串存储,回填前还原为对象 */
  private parseJsonBody(node: any): any {
    const raw = node?.attributes?.body?.value ?? node?.attributes?.body ?? '';
    if (typeof raw !== 'string' || !raw) {
      return raw || {};
    }
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  onTypeSelect(event: Event): void {
    this.switchType((event.target as HTMLSelectElement).value);
  }

  switchType(type: string): void {
    if (type !== this.type() || this.editUuid()) {
      this.router.navigate(['/builder/node/add', type]);
    }
  }

  private getTitleField(): FormlyFieldConfig {
    return {
      key: 'title',
      type: 'input',
      // 中间编辑区的大号无边框标题样式挂钩(见组件 scss)
      className: 'node-title-field',
      props: {
        label: this.translate.instant('BUILDER.NODE_ADD.FIELD_TITLE'),
        // label 视觉隐藏,以占位符提示标题输入位(Frase 式文档标题)
        placeholder: this.translate.instant('BUILDER.NODE_ADD.TITLE_PLACEHOLDER'),
        required: true,
      },
    };
  }

  /** 发布设置:URL 别名 + 修订说明。为节点基础字段,须避开 field config 内省的自定义字段键名 */
  private getPublishFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'path_alias',
        type: 'input',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.FIELD_ALIAS'),
        },
      },
      {
        key: 'revision_log',
        type: 'textarea',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.FIELD_REVISION_LOG'),
          placeholder: this.translate.instant('BUILDER.NODE_ADD.REVISION_LOG_PLACEHOLDER'),
          rows: 2,
        },
      },
    ];
  }

  onSubmit(value: any, user: IUser | any, publish: boolean): void {
    if (!user) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.LOGIN_FIRST'), 'ok');
      return;
    }
    if (this.submitting()) {
      return;
    }
    // 必填项前端先校验并标记 touched 显示错误,避免依赖后端 422 才有反馈
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.FORM_INVALID'), 'ok');
      return;
    }
    this.submitting.set(true);
    const type = this.type();
    const uuid = this.editUuid();
    const lang = this.nodeService.resolveLangCode();
    let attributes: any;
    let relationships: any;
    if (type === 'json') {
      const { title, body } = value;
      // 编辑时带回原文本格式,避免纯字符串提交把 json 格式重置为站点默认
      const format = this.originalNode?.attributes?.body?.format;
      attributes = {
        title,
        body: format ? { value: JSON.stringify(body), format } : JSON.stringify(body),
      };
    } else {
      const { title, ...rest } = value;
      // 编辑时传入原始节点:清空字段发显式 null,文本沿用原 format/summary,引用回带 meta
      const payload = this.fieldFormService.buildPayload(this.fieldMeta, rest, this.originalNode);
      attributes = { title, ...payload.attributes };
      relationships = payload.relationships;
    }
    Object.assign(attributes, this.buildBaseFieldAttributes(value, publish, lang));
    const path = `/api/v1/node/${type}`;
    const request$ = uuid
      ? this.updateWithConflictCheck$(path, type, uuid, attributes, relationships, lang)
      : this.nodeService.addEntity(path, attributes, relationships, lang);
    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.onSubmitSuccess(!!uuid),
      error: err => this.showSubmitError(err),
    });
  }

  /**
   * 节点基础字段:发布状态、修订说明、URL 别名、语言。
   * - 启用内容审核(content moderation)的类型禁止直接写 status
   *   (403: Cannot edit the published field of moderated entities),改写 moderation_state,
   *   由工作流决定实际发布;其余类型写 status
   * - 编辑时状态/别名仅在实际变化时提交(最小差异),避免触发不必要的
   *   权限校验失败(status 需 administer nodes,path 需 url alias 权限)
   */
  private buildBaseFieldAttributes(
    value: any,
    publish: boolean,
    lang?: string
  ): Record<string, any> {
    const attrs: Record<string, any> = {};
    const original = this.originalNode;
    if (this.isModeratedType()) {
      const state = publish ? 'published' : 'draft';
      if (!original || original.attributes?.moderation_state !== state) {
        attrs.moderation_state = state;
      }
    } else if (!original || !!original.attributes?.status !== publish) {
      attrs.status = publish;
    }
    if (value.revision_log) {
      attrs.revision_log = value.revision_log;
    }
    const alias = this.normalizeAlias(value.path_alias);
    const originalAlias = original?.attributes?.path?.alias ?? '';
    if (original ? alias !== originalAlias : alias) {
      attrs.path = { alias: alias || null };
    }
    // 非默认语言下新建,显式携带 langcode 使节点语言与站点前缀一致
    if (!original && lang) {
      attrs.langcode = lang;
    }
    return attrs;
  }

  /** 编辑时优先按节点响应判断(有 moderation_state 即受审核),新建时按配置 */
  private isModeratedType(): boolean {
    if (this.originalNode) {
      return typeof this.originalNode.attributes?.moderation_state === 'string';
    }
    return (this.coreConfig?.builder?.nodeTypes?.moderated ?? []).includes(this.type());
  }

  /** 别名统一为以 / 开头的路径;空值返回 '' */
  private normalizeAlias(raw: any): string {
    const alias = typeof raw === 'string' ? raw.trim() : '';
    if (!alias) {
      return '';
    }
    return alias.startsWith('/') ? alias : `/${alias}`;
  }

  /**
   * 保存前轻取 changed 比对,他人已修改则中止(JSON:API 无 If-Unmodified-Since,
   * 只能前端自查);预检请求失败不阻塞保存
   */
  private updateWithConflictCheck$(
    path: string,
    type: string,
    uuid: string,
    attributes: any,
    relationships: any,
    lang?: string
  ) {
    return this.nodeService.fetch(`${path}/${uuid}`, `fields[node--${type}]=changed`, lang).pipe(
      catchError(() => of(null)),
      switchMap(res => {
        const changed = res?.data?.attributes?.changed;
        if (this.loadedChanged && changed && changed !== this.loadedChanged) {
          return throwError(() => ({ editConflict: true }));
        }
        return this.nodeService.updateEntity(path, uuid, attributes, relationships, lang);
      })
    );
  }

  /** 新建成功清空表单停留本页;编辑成功返回内容管理列表 */
  private onSubmitSuccess(isEdit: boolean): void {
    this.submitting.set(false);
    if (isEdit) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.UPDATE_SUCCESS'), 'ok');
      this.router.navigate(['/builder/node/manage']);
    } else {
      this.form.reset();
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.SUBMIT_SUCCESS'), 'ok');
    }
  }

  private showSubmitError(err: any): void {
    this.submitting.set(false);
    if (err?.editConflict) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.EDIT_CONFLICT'), 'ok');
      return;
    }
    const message = err?.error?.errors?.[0]?.detail || err?.message || '';
    this.util.openSnackbar(
      this.translate.instant('BUILDER.NODE_ADD.SUBMIT_FAILED', { message }),
      'ok'
    );
  }
}
