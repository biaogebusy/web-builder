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
  /** Node uuid in edit mode; empty means create-new */
  public editUuid = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  /** Middle editing area fields: title + body fields (tiptap/json) */
  public mainFields = signal<FormlyFieldConfig[]>([]);
  /** Right property panel fields: metadata such as labels, booleans, numbers */
  public sideFields = signal<FormlyFieldConfig[]>([]);
  /** Publish settings fields: URL alias, revision note (written to the path.alias / revision_log base fields) */
  public publishFields = signal<FormlyFieldConfig[]>([]);
  /** Form backfill model for edit mode */
  public model = signal<any>({});
  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  // getNodeTypes emits an empty array on error, which must be distinguished from "loading" to avoid a stuck skeleton
  public typesLoading = signal(true);
  public submitting = signal(false);
  /** Display name of the current type (e.g. "Blog"); falls back to the machine name when unmatched */
  public typeLabel = computed(
    () => this.nodeTypes().find(t => t.value === this.type())?.label ?? this.type()
  );
  /** When the middle area has rich text, render a standalone editor toolbar bar under the top bar */
  public hasRichEditor = computed(() => this.mainFields().some(f => f.type === 'tiptap'));
  private fieldMeta: INodeFieldMeta[] = [];
  /** Raw node data loaded in edit mode, used for round-trip fidelity and minimal-diff commits on PATCH */
  private originalNode: any = null;
  /** changed timestamp from the edit-time load; compared before saving to detect concurrent edits */
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
        // Reset on failure too, otherwise the type-picker skeleton spins forever
        error: () => this.typesLoading.set(false),
      });

    // switchMap: any route-param change cancels the previous in-flight load, preventing stale page data from landing in the new page
    // (navigating within the same route config reuses the component, e.g. editing another node or switching type on create)
    this.activateRoute.params
      .pipe(
        tap(params => this.resetForParams(params)),
        switchMap(params => this.loadForm$(params)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(load => this.applyForm(load));
  }

  /** On every route-param change: reset all page state and destroy the old form (app-formly snapshots fields and model only at creation) */
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
    // Edit mode first fetches the node for backfill (with the language prefix,
    // hitting the current language's translation); on failure it falls back to the create form
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
    // Introspect the content type's fields via the field config API to build the form dynamically
    return forkJoin({
      form: this.fieldFormService.getForm(type),
      node: node$,
    }).pipe(map(({ form, node }) => ({ node, form })));
  }

  /** Missing form means the json type (no field introspection); otherwise build the dynamic form from the introspection result */
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
    // Body fields go to the middle editing area; remaining metadata goes to the right property panel
    const bodyKeys = new Set(
      meta
        .filter(m => m.fieldType === 'text_long' || m.fieldType === 'text_with_summary')
        .map(m => m.key)
    );
    // The first rich-text body projects its toolbar into the standalone bar under
    // the top bar. Additional rich-text fields keep their toolbar in their own box.
    const richBodyKey = fields.find(f => bodyKeys.has(f.key as string) && f.type === 'tiptap')?.key;
    const bodyFields = fields
      .filter(f => bodyKeys.has(f.key as string))
      .map(f => {
        if (f.type !== 'tiptap') {
          return { ...f, className: 'node-body-field' };
        }
        const props = { ...f.props, autoLoad: true };
        return {
          ...f,
          className: 'node-body-field',
          // A content type may have multiple long-text fields; only the first
          // takes over the bar toolbar, the rest render their toolbars inside
          // their own editor boxes to avoid stacking several toolbars in one container
          props:
            f.key === richBodyKey
              ? { ...props, toolbarContainer: '#node-editor-toolbar' }
              : props,
        };
      });
    this.mainFields.set([this.getTitleField(), ...bodyFields]);
    this.sideFields.set(fields.filter(f => !bodyKeys.has(f.key as string)));
    this.publishFields.set(this.getPublishFields());
    // field_config requires the administer node fields permission; data is empty without it
    if (fields.length === 0) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.NO_FIELDS'), 'ok');
    }
  }

  /** The json type stores body as a string; restore it to an object before backfill */
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
      // Hook for the large borderless title style in the middle editing area (see component scss)
      className: 'node-title-field',
      props: {
        label: this.translate.instant('BUILDER.NODE_ADD.FIELD_TITLE'),
        // Label is visually hidden; the placeholder hints the title input (Frase-style document title)
        placeholder: this.translate.instant('BUILDER.NODE_ADD.TITLE_PLACEHOLDER'),
        required: true,
      },
    };
  }

  /** Publish settings: URL alias + revision note. These are node base fields and must avoid the custom field keys from the field config introspection */
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
    // Validate required fields client-side and mark them touched to show errors, rather than relying on a backend 422 for feedback
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
      // Carry the original text format on edit so a plain-string submit does not reset the json format to the site default
      const format = this.originalNode?.attributes?.body?.format;
      attributes = {
        title,
        body: format ? { value: JSON.stringify(body), format } : JSON.stringify(body),
      };
    } else {
      const { title, ...rest } = value;
      // Pass the original node on edit: cleared fields send explicit null, text keeps the original format/summary, references carry meta back
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
   * Node base fields: publish status, revision note, URL alias, language.
   * - Types with content moderation enabled cannot write status directly
   *   (403: Cannot edit the published field of moderated entities); write
   *   moderation_state instead and let the workflow decide the actual publish.
   *   Other types write status.
   * - On edit, status/alias are only submitted when actually changed (minimal
   *   diff), avoiding unnecessary permission-check failures (status needs
   *   administer nodes, path needs the url alias permission).
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
    // On create in a non-default language, carry langcode explicitly so the node language matches the site prefix
    if (!original && lang) {
      attrs.langcode = lang;
    }
    return attrs;
  }

  /** On edit, judge by the node response first (a moderation_state means moderated); on create, use the config */
  private isModeratedType(): boolean {
    if (this.originalNode) {
      return typeof this.originalNode.attributes?.moderation_state === 'string';
    }
    return (this.coreConfig?.builder?.nodeTypes?.moderated ?? []).includes(this.type());
  }

  /** Normalize the alias to a path starting with /; empty values return '' */
  private normalizeAlias(raw: any): string {
    const alias = typeof raw === 'string' ? raw.trim() : '';
    if (!alias) {
      return '';
    }
    return alias.startsWith('/') ? alias : `/${alias}`;
  }

  /**
   * Lightly fetch changed before saving and compare; abort when someone else
   * modified it in the meantime (JSON:API has no If-Unmodified-Since, so the
   * frontend must check itself); a failed pre-check does not block saving.
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

  /** On create success, clear the form and stay; on edit success, return to the content manage list */
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
