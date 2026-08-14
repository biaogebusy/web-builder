import { Injectable, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, expand, map, reduce, switchMap } from 'rxjs/operators';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { NodeService } from './node.service';

/** 默认开放的内容类型(机器名):博客、新闻、应用中心、文章、组件 */
const DEFAULT_NODE_TYPES = ['blog', 'news', 'json', 'article', 'component'];

export interface INodeFieldMeta {
  key: string;
  fieldType: string;
  targetType?: string;
  targetBundle?: string;
  multiple?: boolean;
  /** 文本字段绑定了 json 文本格式(filter.format.json),用 JSON 编辑器并按 json 格式提交 */
  jsonFormat?: boolean;
}

export interface INodeForm {
  fields: FormlyFieldConfig[];
  meta: INodeFieldMeta[];
}

export interface INodePayload {
  attributes: Record<string, any>;
  relationships: Record<string, any>;
}

/** 发布入口的内容类型选项 */
export interface INodeTypeOption {
  /** 显示名,如"博客" */
  label: string;
  /** 机器名,如 blog */
  value: string;
  /** 内容类型自身的说明(Drupal node_type.description),站点未填时为空串 */
  desc: string;
}

/**
 * 通过 Drupal field config API 内省内容类型字段,动态生成 formly 表单,
 * 并按 JSON:API 规范把表单值拆分为 attributes 与 relationships。
 */
@Injectable({
  providedIn: 'root',
})
export class NodeFieldFormService {
  private nodeService = inject(NodeService);
  private coreConfig = inject<ICoreConfig | null>(CORE_CONFIG, { optional: true });

  /**
   * 站点全部内容类型,用于发布页切换。
   * 这里不吞错误:空数组表示"站点没有可用类型",与"加载失败"是两种状态,
   * 调用方需分别处理(否则失败会被渲染成空态,且加载中标记无法复位)。
   */
  getNodeTypes(): Observable<INodeTypeOption[]> {
    return this.nodeService.fetch('/api/v1/node_type/node_type').pipe(
      map(res =>
        (res?.data || []).map((type: any) => ({
          label: type.attributes.name,
          value: type.attributes.drupal_internal__type,
          desc: type.attributes.description ?? '',
        }))
      )
    );
  }

  /**
   * 允许发布的内容类型机器名。只按配置计算,不考虑站点是否真的存在该类型,
   * 因此可同步取用(如发布区骨架屏按此数量占位,避免加载完成后高度跳动)。
   */
  getAllowedTypeNames(): string[] {
    const { disable = [], enable = [] } = this.coreConfig?.builder?.nodeTypes ?? {};
    return [...new Set([...DEFAULT_NODE_TYPES, ...enable])].filter(
      type => !disable.includes(type)
    );
  }

  /**
   * 发布入口开放的内容类型。默认只开放 DEFAULT_NODE_TYPES;
   * core_config 的 builder.nodeTypes 可在默认清单上禁用(disable)或
   * 额外开放(enable),disable 优先。
   */
  getAllowedNodeTypes(): Observable<INodeTypeOption[]> {
    const allowed = new Set(this.getAllowedTypeNames());
    return this.getNodeTypes().pipe(map(types => types.filter(type => allowed.has(type.value))));
  }

  /**
   * 拉取 JSON:API 集合的全部分页数据。Drupal 每页上限 50 条,跟随 links.next
   * 逐页取完。next 是指向后端源站的绝对地址,需转回相对路径经 apiUrl
   * (开发环境为本地代理)重发,避免跨域直连后端丢失会话。
   */
  private fetchAllPages(api: string, params = ''): Observable<any[]> {
    return this.nodeService.fetch(api, params).pipe(
      expand(res => {
        const next = res?.links?.next?.href;
        if (!next) {
          return EMPTY;
        }
        const { pathname, search } = new URL(next);
        return this.nodeService.fetch(`${pathname}${search}`);
      }),
      reduce((all: any[], res: any) => all.concat(res?.data || []), [])
    );
  }

  getForm(bundle: string): Observable<INodeForm> {
    return forkJoin({
      configs: this.fetchAllPages(
        '/api/v1/field_config/field_config',
        `filter[entity_type]=node&filter[bundle]=${bundle}`
      ).pipe(
        catchError(err => {
          console.error(`加载 ${bundle} 字段配置失败`, err);
          return of([]);
        })
      ),
      storages: this.fetchAllPages(
        '/api/v1/field_storage_config/field_storage_config',
        'filter[entity_type]=node'
      ).pipe(
        catchError(err => {
          console.error('加载字段存储配置失败', err);
          return of([]);
        })
      ),
      enabledKeys: this.getFormDisplayKeys(bundle),
    }).pipe(
      map(({ configs, storages, enabledKeys }) => this.buildForm(configs, storages, enabledKeys)),
      // app-formly 会对 fields 做 cloneDeep,options 不能是 Observable,须先解析为数组
      switchMap(form => this.resolveTermOptions(form))
    );
  }

  /**
   * 该内容类型默认表单显示(entity_form_display)中启用的字段集合(content 键)。
   * 后台「管理表单显示」拖入"已禁用"区的字段只存在 hidden 中,Drupal 节点表单
   * 不渲染,这里同样以 content 为白名单。加载失败或无数据(如无
   * administer node form display 权限)返回 null 表示未知,调用方不做过滤。
   */
  private getFormDisplayKeys(bundle: string): Observable<Set<string> | null> {
    return this.nodeService
      .fetch(
        '/api/v1/entity_form_display/entity_form_display',
        `filter[targetEntityType]=node&filter[bundle]=${bundle}&filter[mode]=default`
      )
      .pipe(
        map(res => {
          // 再按属性核对一次,防止过滤参数失效时误用其他类型的显示配置
          const display = (res?.data || []).find(
            (d: any) =>
              d?.attributes?.targetEntityType === 'node' &&
              d?.attributes?.bundle === bundle &&
              d?.attributes?.mode === 'default'
          );
          const content = display?.attributes?.content;
          return content ? new Set(Object.keys(content)) : null;
        }),
        catchError(err => {
          console.error(`加载 ${bundle} 表单显示配置失败`, err);
          return of(null);
        })
      );
  }

  private resolveTermOptions(form: INodeForm): Observable<INodeForm> {
    const termFields = form.meta.filter(
      m =>
        m.fieldType === 'entity_reference' && m.targetType === 'taxonomy_term' && m.targetBundle
    );
    if (termFields.length === 0) {
      return of(form);
    }
    return forkJoin(
      termFields.map(m =>
        this.getTermOptions(m.targetBundle as string).pipe(
          catchError(err => {
            console.error(`加载词汇表 ${m.targetBundle} 词条失败`, err);
            return of([]);
          })
        )
      )
    ).pipe(
      map(optionLists => {
        termFields.forEach((m, index) => {
          const field = form.fields.find(f => f.key === m.key);
          if (field?.props) {
            field.props.options = optionLists[index];
          }
        });
        return form;
      })
    );
  }

  buildForm(configs: any[], storages: any[], enabledKeys?: Set<string> | null): INodeForm {
    const storageMap = new Map<string, any>();
    storages.forEach(storage => {
      storageMap.set(storage.attributes.field_name, storage.attributes);
    });

    const meta: INodeFieldMeta[] = [];
    const fields: FormlyFieldConfig[] = [];
    // 无法用简单控件表达且原样提交会报错的字段类型:metatag/link 需要结构化值,
    // image/file 是带 meta 的文件引用,date 类要求严格格式;跳过(编辑时不提交
    // 即保持原值),避免渲染成文本框后以纯文本提交导致 422 或坏数据
    const skipTypes = ['metatag', 'image', 'file', 'link', 'datetime', 'daterange'];

    configs.forEach(config => {
      const attrs = config.attributes;
      if (skipTypes.includes(attrs.field_type)) {
        return;
      }
      // 表单显示中禁用的字段不渲染(与 Drupal 节点表单一致);也不进 meta,
      // 编辑提交时不触碰该字段,原值得以保留
      if (enabledKeys && !enabledKeys.has(attrs.field_name)) {
        return;
      }
      const storage = storageMap.get(attrs.field_name);
      const targetBundles = attrs.settings?.handler_settings?.target_bundles;
      const isText = attrs.field_type === 'text_long' || attrs.field_type === 'text_with_summary';
      const fieldMeta: INodeFieldMeta = {
        key: attrs.field_name,
        fieldType: attrs.field_type,
        // storage 缺失时(如无权限)从 handler(default:taxonomy_term)推断目标类型
        targetType: storage?.settings?.target_type ?? attrs.settings?.handler?.split(':')[1],
        targetBundle: targetBundles ? Object.keys(targetBundles)[0] : undefined,
        multiple: storage ? storage.cardinality !== 1 : false,
        // 字段配置依赖 filter.format.json 即该文本字段存储 JSON 内容
        jsonFormat: isText && (attrs.dependencies?.config || []).includes('filter.format.json'),
      };
      meta.push(fieldMeta);
      fields.push(this.toFormlyField(fieldMeta, attrs));
    });

    return { fields, meta };
  }

  toFormlyField(meta: INodeFieldMeta, attrs: any): FormlyFieldConfig {
    const base: FormlyFieldConfig = {
      key: meta.key,
      type: 'input',
      props: {
        label: attrs.label,
        required: attrs.required,
      },
    };
    switch (meta.fieldType) {
      case 'text_long':
      case 'text_with_summary':
        // JSON 格式的文本字段(如 component 的 body)用 JSON 编辑器,而非富文本
        if (meta.jsonFormat) {
          return { ...base, type: 'json' };
        }
        return { ...base, type: 'rich-editor' };
      case 'string_long':
        return { ...base, type: 'textarea', props: { ...base.props, rows: 4 } };
      case 'boolean':
        return { ...base, type: 'checkbox' };
      case 'integer':
      case 'decimal':
      case 'float':
        return { ...base, props: { ...base.props, type: 'number' } };
      case 'entity_reference':
        if (meta.targetType === 'taxonomy_term' && meta.targetBundle) {
          return {
            ...base,
            type: 'select',
            props: {
              ...base.props,
              multiple: meta.multiple,
              // 选项由 resolveTermOptions 异步填充
              options: [],
            },
          };
        }
        if (meta.targetType === 'media') {
          return {
            ...base,
            type: 'img-picker',
            props: {
              ...base.props,
              valueIsUUID: true,
              // 按钮文案由 formly translate extension 翻译
              addLabel: 'BUILDER.FACTORY.IMG_ADD',
              updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
              deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
            },
          };
        }
        return base;
      default:
        return base;
    }
  }

  getTermOptions(vocabulary: string): Observable<{ label: string; value: string }[]> {
    return this.fetchAllPages(`/api/v1/taxonomy_term/${vocabulary}`).pipe(
      map(terms =>
        terms.map((term: any) => ({
          label: term.attributes.name,
          value: term.id,
        }))
      )
    );
  }

  /** buildPayload 的逆向:把节点 JSON:API 数据映射为 formly 表单模型(编辑回填) */
  buildModel(meta: INodeFieldMeta[], node: any): Record<string, any> {
    const model: Record<string, any> = {};
    meta.forEach(field => {
      if (field.fieldType === 'entity_reference' && field.targetType) {
        const rel = node?.relationships?.[field.key]?.data;
        if (field.multiple) {
          model[field.key] = (Array.isArray(rel) ? rel : rel ? [rel] : []).map((d: any) => d.id);
        } else {
          model[field.key] = Array.isArray(rel) ? rel[0]?.id : rel?.id;
        }
      } else if (field.fieldType === 'text_long' || field.fieldType === 'text_with_summary') {
        const value = node?.attributes?.[field.key];
        const raw = value?.value ?? '';
        model[field.key] = field.jsonFormat ? this.parseJsonValue(raw) : raw;
      } else {
        model[field.key] = node?.attributes?.[field.key];
      }
    });
    return model;
  }

  /** JSON 编辑器的值是对象,回填前把存储的字符串还原;解析失败保留原文 */
  private parseJsonValue(raw: any): any {
    if (typeof raw !== 'string' || raw === '') {
      return raw;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  /**
   * @param original 编辑时加载的节点原始数据(JSON:API resource object)。传入即编辑模式:
   * - 清空的字段提交显式 null / 空 data(JSON:API 语义:缺省 = 不变,null = 清空)
   * - 文本字段沿用原 format(避免把 basic_html 内容静默升级为 full_html)并保留 summary
   * - 引用字段按目标 id 回带原 meta(如图片 alt),避免 PATCH 关系时丢失
   */
  buildPayload(meta: INodeFieldMeta[], value: Record<string, any>, original?: any): INodePayload {
    const attributes: Record<string, any> = {};
    const relationships: Record<string, any> = {};

    meta.forEach(field => {
      const fieldValue = value[field.key];
      const isRef = field.fieldType === 'entity_reference' && !!field.targetType;
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        // 新建时跳过空值即可;编辑时须显式清空,否则旧值保留
        if (original) {
          if (isRef) {
            relationships[field.key] = { data: field.multiple ? [] : null };
          } else {
            attributes[field.key] = null;
          }
        }
        return;
      }
      if (isRef) {
        const type = `${field.targetType}--${field.targetBundle || field.targetType}`;
        const originalMeta = this.originalRefMeta(original, field.key);
        const toRef = (id: string) => {
          const refMeta = originalMeta.get(id);
          return { type, id, ...(refMeta ? { meta: refMeta } : {}) };
        };
        relationships[field.key] = {
          data: field.multiple
            ? (Array.isArray(fieldValue) ? fieldValue : [fieldValue]).map(toRef)
            : toRef(fieldValue),
        };
      } else if (field.fieldType === 'text_long' || field.fieldType === 'text_with_summary') {
        if (field.jsonFormat) {
          attributes[field.key] = {
            value: typeof fieldValue === 'string' ? fieldValue : JSON.stringify(fieldValue),
            format: 'json',
          };
        } else {
          const originalText = original?.attributes?.[field.key];
          attributes[field.key] = {
            value: fieldValue,
            format: originalText?.format ?? 'full_html',
            ...(field.fieldType === 'text_with_summary' && originalText?.summary != null
              ? { summary: originalText.summary }
              : {}),
          };
        }
      } else {
        attributes[field.key] = fieldValue;
      }
    });

    return { attributes, relationships };
  }

  /** 原始关系数据按目标 id 索引 meta,提交仍指向同一目标时回带 */
  private originalRefMeta(original: any, key: string): Map<string, any> {
    const data = original?.relationships?.[key]?.data;
    const items = Array.isArray(data) ? data : data ? [data] : [];
    const map = new Map<string, any>();
    items.forEach((item: any) => {
      if (item?.id && item.meta) {
        map.set(item.id, item.meta);
      }
    });
    return map;
  }
}
