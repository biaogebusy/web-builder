import { Injectable, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { expand, map, reduce, switchMap } from 'rxjs/operators';
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
  /** JSON:API resource type of the reference target. */
  targetResourceType?: string;
  /** Format selected by Drupal for this field and account. */
  textFormat?: string;
  /** Editor appropriate for the selected format. */
  editor?: 'rich_text' | 'plain_text' | 'json';
  multiple?: boolean;
  /** Text field bound to the json text format (filter.format.json): use the JSON editor and submit as json */
  jsonFormat?: boolean;
  /**
   * Field-level handler auto_create (entity_reference to taxonomy_term): typed
   * names that match no existing term may create one on the fly.
   */
  autoCreate?: boolean;
}

export interface INodeForm {
  fields: FormlyFieldConfig[];
  meta: INodeFieldMeta[];
  /** Current content and field permissions supplied by Drupal. */
  schema: INodeFormSchema;
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

/** A moderation/publish state choice for the node publishing form */
export interface INodeStatusOption {
  value: string;
  label: string;
}

/** A field description, independent of the frontend form library. */
export interface INodeFieldDescription extends INodeFieldMeta {
  /** Field label. */
  label: string;
  /** Whether a value is required. */
  required: boolean;
  /** Maximum string length, when specified by Drupal. */
  maxLength?: number;
  /** Allowed values of list fields. */
  options?: { label: string; value: string | number }[];
}

/** Caller-specific description for creating or editing one content resource. */
export interface INodeFormSchema {
  /** Supported, accessible fields in display order. */
  fields: INodeFieldDescription[];
  /** Writable base fields, mapped from internal names to JSON:API names. */
  baseFields: Record<string, string>;
  /** Enabled base field names used when reading JSON:API data. */
  baseFieldNames: Record<string, string>;
  /** Whether Drupal applies a moderation workflow to this content. */
  moderated: boolean;
  /** Publication states the caller can select for this entity. */
  states: INodeStatusOption[];
  /** Backend defaults, or the current values when editing. */
  defaults: { state: string; promote: boolean; sticky: boolean };
  /** Whether the caller can delete the edited entity. */
  canDelete: boolean;
}

/** Converts authorized Drupal form descriptions to Formly and JSON:API payloads. */
@Injectable({
  providedIn: 'root',
})
export class NodeFieldFormService {
  private nodeService = inject(NodeService);
  private coreConfig = inject<ICoreConfig | null>(CORE_CONFIG, { optional: true });

  /**
   * All viewable content types, used by content management, including edit-only accounts.
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
    return this.nodeService.fetch('/api/v3/node-form/types').pipe(
      map(res => (res.data as INodeTypeOption[]).filter(type => allowed.has(type.value)))
    );
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

  /** Reads current field and publication permissions without loading control options. */
  getSchema(bundle: string, uuid?: string, lang?: string): Observable<INodeFormSchema> {
    const path = `/api/v3/node-form/${encodeURIComponent(bundle)}` +
      (uuid ? `/${encodeURIComponent(uuid)}` : '');
    return this.nodeService.fetch(path, lang ? { lang } : {});
  }

  /** Loads a form using create access or the specific entity's update access. */
  getForm(bundle: string, uuid?: string, lang?: string): Observable<INodeForm> {
    return this.getSchema(bundle, uuid, lang).pipe(
      map((schema: INodeFormSchema) => this.buildForm(schema)),
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
      termFields.map(m => this.getTermOptions(m.targetBundle as string))
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

  /** Maps the server's authorized field list without inferring unavailable configuration. */
  buildForm(schema: INodeFormSchema): INodeForm {
    return {
      fields: schema.fields.map(field => this.toFormlyField(field, field)),
      meta: schema.fields,
      schema,
    };
  }

  toFormlyField(meta: INodeFieldMeta, attrs: INodeFieldDescription): FormlyFieldConfig {
    const base: FormlyFieldConfig = {
      key: meta.key,
      type: 'input',
      props: {
        label: attrs.label,
        required: attrs.required,
        ...(attrs.maxLength ? { maxLength: attrs.maxLength } : {}),
      },
    };
    switch (meta.fieldType) {
      case 'text':
      case 'text_long':
      case 'text_with_summary':
        // Text fields in JSON format (e.g. component body) use the JSON editor, not rich text
        if (meta.jsonFormat) {
          return { ...base, type: 'json' };
        }
        return { ...base, type: meta.editor === 'plain_text' ? 'textarea' : 'tiptap' };
      case 'string_long':
        return { ...base, type: 'textarea', props: { ...base.props, rows: 4 } };
      case 'list_string':
      case 'list_integer':
      case 'list_float':
        return { ...base, type: 'select', props: { ...base.props, options: attrs.options } };
      case 'boolean':
        return { ...base, type: 'checkbox' };
      case 'integer':
      case 'decimal':
      case 'float':
        return { ...base, props: { ...base.props, type: 'number' } };
      case 'entity_reference':
        if (meta.targetType === 'taxonomy_term' && meta.targetBundle) {
          // auto_create fields get the combobox that creates missing terms on the fly;
          // the created term's uuid becomes the form value, so submit stays unchanged
          if (meta.autoCreate) {
            return {
              ...base,
              type: 'term-select',
              props: {
                ...base.props,
                multiple: meta.multiple,
                vocabulary: meta.targetBundle,
                // Options are filled asynchronously by resolveTermOptions
                options: [],
              },
            };
          }
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
    // Sparse fieldset: only name is read here, and skipping other fields avoids 500s
    // from vocabularies that carry fields JSON:API cannot serialize (e.g. paragraphs)
    return this.fetchAllPages(
      `/api/v1/taxonomy_term/${vocabulary}`,
      `fields[taxonomy_term--${vocabulary}]=name`
    ).pipe(
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
      } else if (['text', 'text_long', 'text_with_summary'].includes(field.fieldType)) {
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
        const type = field.targetResourceType ?? `${field.targetType}--${field.targetBundle}`;
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
      } else if (['text', 'text_long', 'text_with_summary'].includes(field.fieldType)) {
        if (field.jsonFormat) {
          attributes[field.key] = {
            value: typeof fieldValue === 'string' ? fieldValue : JSON.stringify(fieldValue),
            format: field.textFormat,
          };
        } else {
          const originalText = original?.attributes?.[field.key];
          attributes[field.key] = {
            value: fieldValue,
            format: field.textFormat,
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
