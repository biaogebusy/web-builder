import { Injectable, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, expand, map, reduce, switchMap } from 'rxjs/operators';
import { NodeService } from './node.service';

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

/**
 * 通过 Drupal field config API 内省内容类型字段,动态生成 formly 表单,
 * 并按 JSON:API 规范把表单值拆分为 attributes 与 relationships。
 */
@Injectable({
  providedIn: 'root',
})
export class NodeFieldFormService {
  private nodeService = inject(NodeService);

  /** 站点全部内容类型,用于发布页切换 */
  getNodeTypes(): Observable<{ label: string; value: string }[]> {
    return this.nodeService.fetch('/api/v1/node_type/node_type').pipe(
      map(res =>
        (res?.data || []).map((type: any) => ({
          label: type.attributes.name,
          value: type.attributes.drupal_internal__type,
        }))
      ),
      catchError(err => {
        console.error('加载内容类型列表失败', err);
        return of([]);
      })
    );
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
    }).pipe(
      map(({ configs, storages }) => this.buildForm(configs, storages)),
      // app-formly 会对 fields 做 cloneDeep,options 不能是 Observable,须先解析为数组
      switchMap(form => this.resolveTermOptions(form))
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

  buildForm(configs: any[], storages: any[]): INodeForm {
    const storageMap = new Map<string, any>();
    storages.forEach(storage => {
      storageMap.set(storage.attributes.field_name, storage.attributes);
    });

    const meta: INodeFieldMeta[] = [];
    const fields: FormlyFieldConfig[] = [];
    // 无法用简单控件表达且原样提交会报错的字段类型
    const skipTypes = ['metatag'];

    configs.forEach(config => {
      const attrs = config.attributes;
      if (skipTypes.includes(attrs.field_type)) {
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

  buildPayload(meta: INodeFieldMeta[], value: Record<string, any>): INodePayload {
    const attributes: Record<string, any> = {};
    const relationships: Record<string, any> = {};

    meta.forEach(field => {
      const fieldValue = value[field.key];
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        return;
      }
      if (field.fieldType === 'entity_reference' && field.targetType) {
        const type = `${field.targetType}--${field.targetBundle || field.targetType}`;
        relationships[field.key] = {
          data: field.multiple
            ? (Array.isArray(fieldValue) ? fieldValue : [fieldValue]).map(id => ({ type, id }))
            : { type, id: fieldValue },
        };
      } else if (field.fieldType === 'text_long' || field.fieldType === 'text_with_summary') {
        if (field.jsonFormat) {
          attributes[field.key] = {
            value: typeof fieldValue === 'string' ? fieldValue : JSON.stringify(fieldValue),
            format: 'json',
          };
        } else {
          attributes[field.key] = { value: fieldValue, format: 'full_html' };
        }
      } else {
        attributes[field.key] = fieldValue;
      }
    });

    return { attributes, relationships };
  }
}
