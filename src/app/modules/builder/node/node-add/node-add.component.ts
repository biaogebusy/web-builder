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
  INodeStatusOption,
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
  /**
   * Moderation states of the current type's workflow, loaded from the backend;
   * empty means the type is not moderated (or the workflow API is unreadable),
   * in which case the state select falls back to the plain published/unpublished pair.
   */
  public moderationStates = signal<INodeStatusOption[]>([]);
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
    this.moderationStates.set([]);
    this.form = new UntypedFormGroup({});
    this.fieldMeta = [];
    this.originalNode = null;
    this.loadedChanged = '';
  }

  private loadForm$(params: Params): Observable<{ node: any; form?: INodeForm; states: INodeStatusOption[] }> {
    const type = params['type'];
    const uuid = params['uuid'] || '';
    // Edit mode first fetches the node for backfill (with the language prefix,
    // hitting the current language's translation); noCache bypasses the backend
    // page cache so re-entering edit always shows the latest revision. On failure
    // it falls back to the create form
    const node$ = uuid
      ? this.nodeService
          .fetch(`/api/v1/node/${type}/${uuid}`, { noCache: 1 }, this.nodeService.resolveLangCode())
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
    const states$ = this.fieldFormService.getModerationStates(type);
    if (type === 'json') {
      return forkJoin({ node: node$, states: states$ }).pipe(map(({ node, states }) => ({ node, states })));
    }
    // Introspect the content type's fields via the field config API to build the form dynamically
    return forkJoin({
      form: this.fieldFormService.getForm(type),
      node: node$,
      states: states$,
    }).pipe(map(({ form, node, states }) => ({ node, form, states })));
  }

  /** Missing form means the json type (no field introspection); otherwise build the dynamic form from the introspection result */
  private applyForm({ node, form, states }: { node: any; form?: INodeForm; states: INodeStatusOption[] }): void {
    this.moderationStates.set(states);
    // The state select defaults to "published" on create and backfills the node's current state on edit
    const state = node ? this.currentState(node) : 'published';
    // Base-field backfill shared by every type: promote (front page) / sticky (top of lists)
    const baseFields = node
      ? {
          state,
          promote: !!node.attributes?.promote,
          sticky: !!node.attributes?.sticky,
        }
      : { state, promote: false, sticky: false };
    if (!form) {
      if (node) {
        this.model.set({
          title: node.attributes?.title,
          path_alias: node.attributes?.path?.alias ?? '',
          ...baseFields,
          body: this.parseJsonBody(node),
        });
      } else {
        this.model.set({ ...baseFields });
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
        ...baseFields,
        ...this.fieldFormService.buildModel(meta, node),
      });
    } else {
      this.model.set({ ...baseFields });
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

  /** Publish settings: state select (default published, other states per the backend workflow), promote/sticky flags, URL alias + revision note */
  private getPublishFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'state',
        type: 'select',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.FIELD_STATE'),
          options: this.stateOptions().map(option => ({
            label: option.label,
            value: option.value,
          })),
        },
      },
      {
        key: 'promote',
        type: 'checkbox',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.FIELD_PROMOTE'),
        },
      },
      {
        key: 'sticky',
        type: 'checkbox',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.FIELD_STICKY'),
        },
      },
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

  /**
   * State choices for the select: the backend workflow's moderation states for
   * moderated types; otherwise the plain published/unpublished pair mapped to status.
   */
  private stateOptions(): INodeStatusOption[] {
    if (this.isModeratedType()) {
      // Workflow states unreadable (permission/API missing): fall back to the core moderation states
      return this.moderationStates().length
        ? this.moderationStates()
        : [
            { value: 'draft', label: this.translate.instant('BUILDER.NODE_ADD.STATE_DRAFT') },
            { value: 'published', label: this.translate.instant('BUILDER.NODE_ADD.STATE_PUBLISHED') },
          ];
    }
    return [
      { value: 'published', label: this.translate.instant('BUILDER.NODE_ADD.STATE_PUBLISHED') },
      { value: 'unpublished', label: this.translate.instant('BUILDER.NODE_ADD.STATE_UNPUBLISHED') },
    ];
  }

  /** The node's current state as a select value: moderation_state, or status mapped to published/unpublished */
  private currentState(node: any): string {
    if (typeof node.attributes?.moderation_state === 'string') {
      return node.attributes.moderation_state;
    }
    return node.attributes?.status ? 'published' : 'unpublished';
  }

  onSubmit(value: any, user: IUser | any): void {
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
    // The state select defaults to published when the form has not touched it
    const state = value.state || 'published';
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
    Object.assign(attributes, this.buildBaseFieldAttributes(value, state, lang));
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
   * Node base fields: publish state, promote/sticky, revision note, URL alias, language.
   * - Moderated types cannot write status directly
   *   (403: Cannot edit the published field of moderated entities); the state
   *   select value is the moderation_state, and the workflow decides the
   *   actual publish. Other types map published/unpublished to status.
   * - On edit, state/alias are only submitted when actually changed (minimal
   *   diff), avoiding unnecessary permission-check failures (status needs
   *   administer nodes, path needs the url alias permission).
   */
  private buildBaseFieldAttributes(
    value: any,
    state: string,
    lang?: string
  ): Record<string, any> {
    const attrs: Record<string, any> = {};
    const original = this.originalNode;
    if (this.isModeratedType()) {
      if (!original || original.attributes?.moderation_state !== state) {
        attrs.moderation_state = state;
      }
    } else {
      const publish = state === 'published';
      if (!original || !!original.attributes?.status !== publish) {
        attrs.status = publish;
      }
    }
    // Promote/sticky: on edit submit only when changed; on create only when checked,
    // so an unchecked box leaves the type's backend defaults untouched
    const promote = !!value.promote;
    const sticky = !!value.sticky;
    if (original ? !!original.attributes?.promote !== promote : promote) {
      attrs.promote = promote;
    }
    if (original ? !!original.attributes?.sticky !== sticky : sticky) {
      attrs.sticky = sticky;
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

  /**
   * On edit, judge by the node response first (a moderation_state means moderated);
   * on create, the loaded workflow states take precedence, with the config as fallback
   * for when the workflow API is unreadable.
   */
  private isModeratedType(): boolean {
    if (this.originalNode) {
      return typeof this.originalNode.attributes?.moderation_state === 'string';
    }
    return (
      this.moderationStates().length > 0 ||
      (this.coreConfig?.builder?.nodeTypes?.moderated ?? []).includes(this.type())
    );
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
    // noCache keeps the changed pre-check honest: a cached response would silently
    // report the old timestamp and skip the conflict detection
    return this.nodeService
      .fetch(`${path}/${uuid}`, `fields[node--${type}]=changed&noCache=1`, lang)
      .pipe(
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
