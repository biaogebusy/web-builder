import { Injectable, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, expand, map, reduce, switchMap } from 'rxjs/operators';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { NodeService } from './node.service';

/** Default open content types (machine names): blog, news, app center, article, component */
const DEFAULT_NODE_TYPES = ['blog', 'news', 'json', 'article', 'component'];

export interface INodeFieldMeta {
  key: string;
  fieldType: string;
  targetType?: string;
  targetBundle?: string;
  multiple?: boolean;
  /** Text field bound to the json text format (filter.format.json): use the JSON editor and submit as json */
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

/** Content type options for the publishing entry point */
export interface INodeTypeOption {
  /** Display name, e.g. "Blog" */
  label: string;
  /** Machine name, e.g. blog */
  value: string;
  /** Content type description (Drupal node_type.description); empty string when the site has none */
  desc: string;
}

/**
 * Introspects content type fields via the Drupal field config API to dynamically build
 * formly forms, and splits form values into attributes and relationships per JSON:API.
 */
@Injectable({
  providedIn: 'root',
})
export class NodeFieldFormService {
  private nodeService = inject(NodeService);
  private coreConfig = inject<ICoreConfig | null>(CORE_CONFIG, { optional: true });

  /**
   * All content types of the site, used by the publishing page switcher.
   * Errors are not swallowed here: an empty array means "the site has no usable types",
   * which is distinct from "load failed": callers must handle both separately
   * (otherwise a failure renders as an empty state and the loading flag never resets).
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
   * Machine names of content types allowed for publishing. Computed from config only,
   * regardless of whether the type really exists on the site, so it can be used
   * synchronously (e.g. the publishing skeleton reserves this many placeholders to
   * avoid height jumps after loading).
   */
  getAllowedTypeNames(): string[] {
    const { disable = [], enable = [] } = this.coreConfig?.builder?.nodeTypes ?? {};
    return [...new Set([...DEFAULT_NODE_TYPES, ...enable])].filter(
      type => !disable.includes(type)
    );
  }

  /**
   * Content types open at the publishing entry point. Only DEFAULT_NODE_TYPES are open
   * by default; core_config's builder.nodeTypes can disable or enable extra types on
   * top of the default list, with disable taking precedence.
   */
  getAllowedNodeTypes(): Observable<INodeTypeOption[]> {
    const allowed = new Set(this.getAllowedTypeNames());
    return this.getNodeTypes().pipe(map(types => types.filter(type => allowed.has(type.value))));
  }

  /**
   * Fetches all pages of a JSON:API collection. Drupal caps each page at 50 items, so
   * follow links.next until the end. next points to an absolute backend URL, so it is
   * converted back to a relative path and re-sent through apiUrl (the local proxy in
   * dev) to avoid cross-origin requests that lose the session.
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
      // app-formly cloneDeep's fields, so options cannot be Observables; resolve them to arrays first
      switchMap(form => this.resolveTermOptions(form))
    );
  }

  /**
   * Field set enabled in the content type's default form display (entity_form_display,
   * the "content" keys). Fields dragged into the "disabled" area in the admin form
   * display only exist in hidden, and Drupal's node form does not render them; content
   * is used as the whitelist here too. On load failure or missing data (e.g. no
   * administer node form display permission) returns null meaning unknown, and callers
   * skip filtering.
   */
  private getFormDisplayKeys(bundle: string): Observable<Set<string> | null> {
    return this.nodeService
      .fetch(
        '/api/v1/entity_form_display/entity_form_display',
        `filter[targetEntityType]=node&filter[bundle]=${bundle}&filter[mode]=default`
      )
      .pipe(
        map(res => {
          // Double-check against the attributes in case the filter params fail and a display config of another type slips in
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
    // Field types that no simple control can express and that would error when submitted
    // as-is: metatag/link need structured values, image/file are file references with
    // meta, date types require a strict format. Skip them (not submitting on edit keeps
    // the original value) so they never render as text boxes whose plain-text submission
    // would cause 422s or corrupt data
    const skipTypes = ['metatag', 'image', 'file', 'link', 'datetime', 'daterange'];

    configs.forEach(config => {
      const attrs = config.attributes;
      if (skipTypes.includes(attrs.field_type)) {
        return;
      }
      // Fields disabled in the form display are not rendered (matching the Drupal node
      // form); they also stay out of meta so edits never touch them and the original
      // values are preserved
      if (enabledKeys && !enabledKeys.has(attrs.field_name)) {
        return;
      }
      const storage = storageMap.get(attrs.field_name);
      const targetBundles = attrs.settings?.handler_settings?.target_bundles;
      const isText = attrs.field_type === 'text_long' || attrs.field_type === 'text_with_summary';
      const fieldMeta: INodeFieldMeta = {
        key: attrs.field_name,
        fieldType: attrs.field_type,
        // When storage is missing (e.g. no permission), infer the target type from the handler (default: taxonomy_term)
        targetType: storage?.settings?.target_type ?? attrs.settings?.handler?.split(':')[1],
        targetBundle: targetBundles ? Object.keys(targetBundles)[0] : undefined,
        multiple: storage ? storage.cardinality !== 1 : false,
        // A field whose config depends on filter.format.json stores JSON content
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
        // Text fields in JSON format (e.g. component body) use the JSON editor, not rich text
        if (meta.jsonFormat) {
          return { ...base, type: 'json' };
        }
        return { ...base, type: 'tiptap' };
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
              // Options are filled asynchronously by resolveTermOptions
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
              // Button labels are translated by the formly translate extension
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

  /** Reverse of buildPayload: map node JSON:API data back to the formly form model (edit prefill) */
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

  /** The JSON editor holds an object; restore the stored string before prefilling; keep the raw value if parsing fails */
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
   * @param original the node's original data loaded for editing (JSON:API resource object).
   * When passed, edit mode applies:
   * - Cleared fields submit explicit null / empty data (JSON:API semantics: absent = unchanged, null = cleared)
   * - Text fields keep the original format (avoid silently upgrading basic_html content to full_html) and retain summary
   * - Reference fields carry back the original meta (e.g. image alt) by target id, so PATCHing relationships loses nothing
   */
  buildPayload(meta: INodeFieldMeta[], value: Record<string, any>, original?: any): INodePayload {
    const attributes: Record<string, any> = {};
    const relationships: Record<string, any> = {};

    meta.forEach(field => {
      const fieldValue = value[field.key];
      const isRef = field.fieldType === 'entity_reference' && !!field.targetType;
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        // On create, skipping empty values is enough; on edit they must be cleared explicitly or the old value persists
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

  /** Index original relationship meta by target id, carried back when the submission still points at the same target */
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
