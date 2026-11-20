import { Component, DestroyRef, ElementRef, OnInit, computed, effect, inject, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Params, Router, convertToParamMap } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import {
  INodeFieldMeta,
  INodeForm,
  INodeFormSchema,
  INodeStatusOption,
  NodeFieldFormService,
} from '@core/service/node-field-form.service';
import { TagsService } from '@core/service/tags.service';
import { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject, Subscription, combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { buildNodeBaseFieldAttributes } from './node-base-field-payload';

/** A language row in the translations panel */
export interface INodeTranslation {
  langCode: string;
  label: string;
  /** Currently edited language */
  current: boolean;
  /** The translation exists on the node */
  exists: boolean;
  /** moderation_state, or published/unpublished mapped from status */
  state: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, FormlyModule, FormlyMaterialModule],
  host: {
    // Ctrl/Cmd+S saves; the document-level binding also catches presses inside the rich-text editor
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class NodeAddComponent implements OnInit {
  private nodeService = inject(NodeService);
  private fieldFormService = inject(NodeFieldFormService);
  private tagsService = inject(TagsService);
  private activateRoute = inject(ActivatedRoute);
  public user = inject(USER);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);
  private storage = inject(LocalStorageService);
  public type = signal<string>('');
  /** Node uuid in edit mode; empty means create-new */
  public editUuid = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  /** Separate form for the type-switch select (not part of the node form; changing it navigates away) */
  public typeForm = new UntypedFormGroup({});
  /** Type-select model snapshot; app-formly reads it once at creation, hence the rekey in the template */
  public typeModel = computed(() => ({ type: this.type() }));
  /** Middle editing area fields: title + body fields (tiptap/json) */
  public mainFields = signal<FormlyFieldConfig[]>([]);
  /** Right property panel fields: metadata such as labels, booleans, numbers */
  public sideFields = signal<FormlyFieldConfig[]>([]);
  /** Publish settings fields: state select, URL alias, revision note */
  public publishFields = signal<FormlyFieldConfig[]>([]);
  /** Promotion fields: promote (front page) / sticky (top of lists), rendered as a separate panel group */
  public promotionFields = signal<FormlyFieldConfig[]>([]);
  /** Form backfill model for edit mode */
  public model = signal<any>({});
  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  // An empty allowed-type list is distinct from a request that is still loading.
  public typesLoading = signal(true);
  public submitting = signal(false);
  /** States the current account can select, as authorized by Drupal. */
  public moderationStates = signal<INodeStatusOption[]>([]);
  /** Failed loads block submission so an unavailable edit cannot create a duplicate. */
  public loadFailed = signal(false);
  /** Translation key for the failed content or form load. */
  public loadErrorKey = signal('BUILDER.NODE_ADD.LOAD_NODE_ERROR');
  /** Access failures replace the editor and its unavailable property panel. */
  public accessDenied = computed(
    () => this.loadFailed() && this.loadErrorKey() === 'BUILDER.NODE_ADD.FORM_ACCESS_DENIED'
  );
  /** Identify the active account without exposing roles or authentication details. */
  public accountName = computed(() => {
    const user = this.user();
    return typeof user === 'object'
      ? user.display_name || user.name || user.current_user?.name || ''
      : '';
  });
  /** Return to the management center in the current interface language. */
  public get managementUrl(): string {
    return this.router.createUrlTree(['hub'], {
      relativeTo: this.activateRoute.parent?.parent,
    }).toString();
  }
  private accessHeading = viewChild<ElementRef<HTMLElement>>('accessHeading');
  // Retry replaces the panel, so return keyboard focus to its outcome when access is still denied.
  private focusAccessHeading = effect(() => this.accessHeading()?.nativeElement.focus());
  /** Current Drupal permissions; null until the complete form is available. */
  public formSchema = signal<INodeFormSchema | null>(null);
  /** A legitimate title-only form is ready even when no configurable fields exist. */
  public formReady = computed(() => this.formSchema() !== null && !this.loadFailed());
  /** Site languages; empty when multi-language is off */
  private langs = environment.langs || [];
  private multiLang = !!environment.multiLang;
  /** Language code of the translation being edited ('' = site default language) */
  public editLang = signal<string>('');
  /** Per-language overview of the loaded node's translations (edit mode, multi-language sites) */
  public translations = signal<INodeTranslation[]>([]);
  /**
   * The requested translation does not exist yet: the lang-prefixed load fell
   * back to the default translation, so saving creates the translation
   * (prefilled from the source language).
   */
  public creatingTranslation = signal(false);
  /** Display label of the edited language (e.g. "EN"); falls back to the langcode */
  public editLangLabel = computed(
    () => this.langs.find(l => l.langCode === this.editLang())?.label ?? this.editLang()
  );
  /** Show the language-scope hint on the publishing panel */
  public showLangHint = computed(
    () => this.multiLang && (!!this.editUuid() || !!this.apiLang())
  );
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
  /** Retriggers the load for the current route params (edit-load retry button) */
  private retryLoad$ = new Subject<void>();
  /** Draft autosave subscription; re-created whenever the form object is rebuilt */
  private draftSub: Subscription | null = null;
  /** Current route params, kept so a conflict reload can re-run the load */
  private currentParams: Params = {};
  /** Route query params of the current load, kept for the same purpose as currentParams */
  private currentQuery: ParamMap | null = null;

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

    // switchMap: any route change cancels the previous in-flight load, preventing stale page data from landing in the new page
    // (navigating within the same route config reuses the component, e.g. editing another node, switching type on create,
    // or switching the edited translation via the ?lang= query param)
    combineLatest([
      this.activateRoute.params,
      // Specs stub ActivatedRoute with params only; default to an empty map there
      this.activateRoute.queryParamMap ?? of(convertToParamMap({})),
    ])
      .pipe(
        tap(([params, query]) => this.resetForParams(params, query)),
        // A retry re-runs the load for the current params without resetting the page state
        switchMap(([params]) => this.retryLoad$.pipe(startWith(null), map(() => params))),
        switchMap(params => this.loadForm$(params)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(load => {
        this.applyForm(load);
        this.loadTranslations(load.node);
      });
  }

  /** Retry the failed edit load; keeps the route params, only clears the error state */
  retry(): void {
    if (!this.loadFailed()) {
      return;
    }
    this.loadFailed.set(false);
    this.retryLoad$.next();
  }

  /** Whether the loaded form has unsaved edits; the leave guard warns before discarding them */
  hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.submitting();
  }

  /** Ctrl/Cmd+S saves from anywhere on the page, including inside the rich-text editor */
  onKeydown(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 's') {
      return;
    }
    // Prevent the browser's save-page dialog; without loaded fields there is nothing to save
    event.preventDefault();
    if (this.formReady() && !this.submitting()) {
      this.onSubmit(this.form.value, this.user());
    }
  }

  /** On every route change: reset all page state and destroy the old form (app-formly snapshots fields and model only at creation) */
  private resetForParams(params: Params, query?: ParamMap | null): void {
    const type = params['type'];
    const uuid = params['uuid'] || '';
    this.currentParams = params;
    this.currentQuery = query ?? null;
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
    this.promotionFields.set([]);
    this.model.set({});
    this.moderationStates.set([]);
    this.loadFailed.set(false);
    this.translations.set([]);
    this.creatingTranslation.set(false);
    this.form = new UntypedFormGroup({});
    this.typeForm = new UntypedFormGroup({});
    this.fieldMeta = [];
    this.formSchema.set(null);
    this.loadErrorKey.set('BUILDER.NODE_ADD.LOAD_NODE_ERROR');
    this.draftSub?.unsubscribe();
    this.originalNode = null;
    this.loadedChanged = '';
    // Editing language: the explicit ?lang= wins (the manage list's edit button
    // passes the row's language); without it, follow the page URL prefix as before
    const queryLang = this.langs.find(l => l.langCode === query?.get('lang'));
    this.editLang.set(
      queryLang ? queryLang.langCode : this.nodeService.resolveLangCode() ?? this.defaultLangCode()
    );
  }

  /** Langcode of the site default language ('' when no language is configured) */
  private defaultLangCode(): string {
    return this.langs.find(l => l.default)?.langCode ?? '';
  }

  /** Non-default langcode for language-prefixed API calls; undefined = site default */
  private apiLang(): string | undefined {
    const lang = this.langs.find(l => l.langCode === this.editLang());
    return lang && !lang.default ? lang.langCode : undefined;
  }

  private loadForm$(params: Params): Observable<{
    node: any;
    form?: INodeForm;
    states: INodeStatusOption[];
  }> {
    const type = params['type'];
    const uuid = params['uuid'] || '';
    // Edit mode first fetches the node for backfill (with the language prefix,
    // hitting the requested translation); noCache bypasses the backend
    // page cache so re-entering edit always shows the latest revision
    const node$ = uuid
      ? this.nodeService
          .fetch(`/api/v1/node/${type}/${uuid}`, { noCache: 1 }, this.apiLang())
          .pipe(
            map(res => res?.data ?? null),
            catchError(err => {
              console.error('加载节点数据失败', err);
              // A blank create form would silently turn the failed edit into a
              // duplicate node on save; stop at an error state with retry instead
              this.loadFailed.set(true);
              this.loadErrorKey.set(err.status === 403
                ? 'BUILDER.NODE_ADD.FORM_ACCESS_DENIED'
                : err.status === 401
                  ? 'BUILDER.NODE_ADD.FORM_SIGN_IN_REQUIRED'
                  : 'BUILDER.NODE_ADD.LOAD_NODE_ERROR');
              return of(null);
            }),
            tap(node => {
              this.originalNode = node;
              this.loadedChanged = node?.attributes?.changed ?? '';
            })
          )
      : of(null);
    return forkJoin({
      form: this.fieldFormService.getForm(type, uuid || undefined, this.editLang() || undefined),
      node: node$,
    }).pipe(
      map(({ form, node }) => {
        if (node) {
          // Base fields may have public aliases configured in JSON:API Extras.
          const attributes = { ...node.attributes };
          Object.entries(form.schema.baseFieldNames).forEach(([internal, publicName]) => {
            if (publicName in attributes) {
              attributes[internal] = attributes[publicName];
            }
          });
          node = { ...node, attributes };
          this.originalNode = node;
        }
        return { node, form, states: form.schema.states };
      }),
      catchError(error => {
        this.loadFailed.set(true);
        this.loadErrorKey.set(
          error.status === 403
            ? 'BUILDER.NODE_ADD.FORM_ACCESS_DENIED'
            : error.status === 401
              ? 'BUILDER.NODE_ADD.FORM_SIGN_IN_REQUIRED'
              : error.status === 422
                ? 'BUILDER.NODE_ADD.FORM_UNSUPPORTED'
                : 'BUILDER.NODE_ADD.LOAD_FORM_ERROR'
        );
        return of({ node: null, states: [] });
      })
    );
  }

  /** Builds controls only after Drupal has authorized the complete form description. */
  private applyForm(load: {
    node: any;
    form?: INodeForm;
    states: INodeStatusOption[];
  }): void {
    const { node, form, states } = load;
    if (this.loadFailed() || !form) {
      return;
    }
    this.formSchema.set(form.schema);
    this.moderationStates.set(states);
    // A lang-prefixed GET falls back to the default translation when the
    // requested translation does not exist; the langcode mismatch means this
    // save creates the translation (with content prefilled from the source)
    const requestedLang = this.apiLang();
    this.creatingTranslation.set(
      !!node &&
        !!requestedLang &&
        node.attributes?.langcode !== undefined &&
        node.attributes.langcode !== requestedLang
    );
    // Defaults come from the backend, including types that publish immediately on creation.
    const state = form.schema.defaults.state;
    // Base-field backfill shared by every type: promote (front page) / sticky (top of lists)
    const baseFields = node
      ? {
          state,
          promote: !!node.attributes?.promote,
          sticky: !!node.attributes?.sticky,
        }
      : { ...form.schema.defaults };
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
        .filter(m => ['text', 'text_long', 'text_with_summary'].includes(m.fieldType))
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
    this.mainFields.set([
      ...(form.schema.baseFields['title'] ? [this.getTitleField()] : []),
      ...bodyFields,
    ]);
    this.sideFields.set(fields.filter(f => !bodyKeys.has(f.key as string)));
    this.publishFields.set(this.getPublishFields());
    this.promotionFields.set(this.getPromotionFields());
    this.wireLocalDraft(node);
  }

  /**
   * Local crash-recovery draft: autosave dirty form values to localStorage
   * (debounced), and on load offer to restore a draft newer than the server
   * data. The draft key is scoped per type + uuid (create shares one slot).
   */
  private wireLocalDraft(node: any): void {
    this.draftSub?.unsubscribe();
    // Capture the key: the subscription must keep writing to the draft slot of
    // the language it was created for, even if the page switches right after
    const key = this.draftKey();
    this.draftSub = this.form.valueChanges
      .pipe(debounceTime(800))
      .subscribe(() => {
        if (this.form.dirty) {
          this.storage.store(key, {
            value: this.form.getRawValue(),
            savedAt: Date.now(),
          });
        }
      });
    this.checkLocalDraft(node);
  }

  private draftKey(): string {
    // Language-scoped: drafts of different translations must not overwrite each other
    return `nodeDraft:${this.type()}:${this.editUuid() || 'create'}:${this.editLang() || 'default'}`;
  }

  private readDraft(): { value: Record<string, any>; savedAt: number } | null {
    const draft = this.storage.retrieve(this.draftKey());
    return draft?.value && draft?.savedAt ? draft : null;
  }

  /**
   * Offer restoring a local draft. Stale drafts (server changed after the draft
   * was saved) are dropped silently; the form is already built from server
   * data, so keeping the draft just patches the controls.
   */
  private checkLocalDraft(node: any): void {
    const draft = this.readDraft();
    if (!draft) {
      return;
    }
    const serverChanged = Date.parse(node?.attributes?.changed ?? '');
    if (serverChanged && serverChanged >= draft.savedAt) {
      this.storage.clear(this.draftKey());
      return;
    }
    const key = this.draftKey();
    const config: IDialog = {
      title: this.translate.instant('BUILDER.NODE_ADD.DRAFT_TITLE'),
      noLabel: this.translate.instant('BUILDER.NODE_ADD.DRAFT_DISCARD'),
      yesLabel: this.translate.instant('BUILDER.NODE_ADD.DRAFT_KEEP'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.NODE_ADD.DRAFT_CONFIRM'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '360px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(keep => {
        // The user may have switched nodes while the dialog was open; only
        // touch the form/storage when the draft still belongs to this page
        if (this.draftKey() !== key) {
          return;
        }
        if (keep) {
          this.form.patchValue(draft.value, { emitEvent: false });
          // Restored edits count as unsaved, so the leave guard protects them again
          this.form.markAsDirty();
          this.util.openSnackbar(
            this.translate.instant('BUILDER.NODE_ADD.DRAFT_RESTORED'),
            'ok'
          );
        } else {
          this.storage.clear(key);
        }
      });
  }

  /** Type-switch select change: navigate to the selected type's create/edit page */
  onTypeChange(model: any): void {
    this.switchType(model?.type);
  }

  /**
   * Delete the node being edited (edit mode only). Confirm first: the action is
   * irreversible. After deletion the form's unsaved state is moot, so it is
   * marked pristine to keep the leave guard from asking twice.
   */
  onDelete(): void {
    if (!this.formReady() || !this.formSchema()?.canDelete) {
      return;
    }
    if (!this.editUuid()) {
      return;
    }
    const config: IDialog = {
      title: this.translate.instant('BUILDER.NODE_ADD.DELETE_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.NODE_ADD.DELETE'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.NODE_ADD.DELETE_BODY'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        this.submitting.set(true);
        this.nodeService
          .deleteEntity(`/api/v1/node/${this.type()}`, this.editUuid())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.submitting.set(false);
              // The node is gone: drop its local draft too
              this.storage.clear(this.draftKey());
              this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.DELETED'), 'ok');
              this.form.markAsPristine();
              this.router.navigate(['/builder/node/manage']);
            },
            error: err => {
              this.submitting.set(false);
              const message = err?.error?.errors?.[0]?.detail || err?.message || '';
              this.util.openSnackbar(
                this.translate.instant('BUILDER.NODE_ADD.DELETE_FAILED', { message }),
                'ok'
              );
            },
          });
      });
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

  /** Publish controls filtered by the current field and transition permissions. */
  private getPublishFields(): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
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
    const writable = this.formSchema()?.baseFields ?? {};
    return fields.filter(field => {
      if (field.key === 'state') {
        return this.stateOptions().length > 0;
      }
      return !!writable[field.key === 'path_alias' ? 'path' : field.key as string];
    });
  }

  /** Type-switch select config; options require the loaded node types, so the section renders only after the load */
  getTypeFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'type',
        type: 'select',
        props: {
          label: this.translate.instant('BUILDER.NODE_ADD.TYPE_TITLE'),
          options: this.nodeTypes().map(option => ({
            label: option.label,
            value: option.value,
          })),
        },
      },
    ];
  }

  /** Promotion options group: promote to front page / sticky at top of lists */
  private getPromotionFields(): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [
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
    ];
    return fields.filter(field => !!this.formSchema()?.baseFields[field.key as string]);
  }

  /**
   * State choices for the select: the backend workflow's moderation states for
   * moderated types; otherwise the plain published/unpublished pair mapped to status.
   */
  private stateOptions(): INodeStatusOption[] {
    return this.formSchema()?.states ?? [];
  }

  /** The node's current state as a select value: moderation_state, or status mapped to published/unpublished */
  private currentState(node: any): string {
    if (typeof node.attributes?.moderation_state === 'string') {
      return node.attributes.moderation_state;
    }
    return node.attributes?.status ? 'published' : 'unpublished';
  }

  /** Human label of a translation row's publish state: workflow state labels, or published/unpublished */
  stateLabel(state: string): string {
    if (!state) {
      return '';
    }
    const moderation = this.moderationStates().find(s => s.value === state);
    if (moderation) {
      return moderation.label;
    }
    return this.translate.instant(
      state === 'unpublished'
        ? 'BUILDER.NODE_ADD.STATE_UNPUBLISHED'
        : 'BUILDER.NODE_ADD.STATE_PUBLISHED'
    );
  }

  /**
   * Per-language overview of the loaded node's translations. The currently
   * edited language comes from the main load; the others are probed
   * individually: a lang-prefixed GET falls back to the default translation
   * when the translation is missing, and the returned langcode exposes that
   * fallback (missing = returned langcode differs from the requested one).
   */
  private loadTranslations(node: any): void {
    this.translations.set([]);
    if (!node || !this.multiLang || this.langs.length < 2 || !this.editUuid()) {
      return;
    }
    const type = this.type();
    const uuid = this.editUuid();
    const currentLang = this.editLang();
    this.translations.set(
      this.langs.map(lang => ({
        langCode: lang.langCode,
        label: lang.label,
        current: lang.langCode === currentLang,
        exists: lang.langCode === currentLang ? !this.creatingTranslation() : false,
        state: lang.langCode === currentLang ? this.currentState(node) : '',
      }))
    );
    this.langs
      .filter(lang => lang.langCode !== currentLang)
      .forEach(lang => {
        const langCode = lang.default ? undefined : lang.langCode;
        this.nodeService
          // String params keep this probe distinguishable from the object-params backfill load
          .fetch(`/api/v1/node/${type}/${uuid}`, 'noCache=1', langCode)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: res => {
              // The probe may land after the page switched nodes or language; ignore stale results
              const stale =
                this.type() !== type || this.editUuid() !== uuid || this.editLang() !== currentLang;
              if (stale) {
                return;
              }
              const attributes = res?.data?.attributes;
              const exists = attributes?.langcode === lang.langCode;
              const state = exists ? this.currentState(res.data) : '';
              this.translations.update(list =>
                list.map(item =>
                  item.langCode === lang.langCode ? { ...item, exists, state } : item
                )
              );
            },
            // A failed probe (e.g. permissions) leaves the language shown as not translated
            error: () => {},
          });
      });
  }

  /**
   * Switch the edited translation via the translations panel. Unsaved edits
   * are confirmed first; on switch they are snapshotted into the per-language
   * local draft (restorable when switching back).
   */
  onSwitchTranslation(translation: INodeTranslation): void {
    if (translation.current || this.submitting()) {
      return;
    }
    if (this.hasUnsavedChanges()) {
      const config: IDialog = {
        title: this.translate.instant('BUILDER.NODE_ADD.TRANS_SWITCH_TITLE'),
        noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
        yesLabel: this.translate.instant('BUILDER.NODE_ADD.TRANS_SWITCH_CONFIRM'),
        inputData: {
          content: {
            type: 'text',
            fullWidth: true,
            body: this.translate.instant('BUILDER.NODE_ADD.TRANS_SWITCH_BODY'),
          },
        },
      };
      this.dialog
        .open(DialogComponent, { width: '360px', data: config })
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(confirmed => {
          if (confirmed) {
            this.switchTranslation(translation);
          }
        });
      return;
    }
    this.switchTranslation(translation);
  }

  private switchTranslation(translation: INodeTranslation): void {
    // Snapshot synchronously: the debounced autosave may not have caught the latest keystrokes
    if (this.form.dirty) {
      this.storage.store(this.draftKey(), {
        value: this.form.getRawValue(),
        savedAt: Date.now(),
      });
    }
    // ?lang= drives the reload; switching to the default language clears the param
    const queryParams =
      translation.langCode === this.defaultLangCode() ? {} : { lang: translation.langCode };
    this.router.navigate([], { relativeTo: this.activateRoute, queryParams });
  }

  onSubmit(value: any, user: IUser | any): void {
    if (!user) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.LOGIN_FIRST'), 'ok');
      return;
    }
    if (this.submitting() || !this.formReady()) {
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
    const lang = this.apiLang();
    // An untouched state retains the default authorized by Drupal.
    const state = value.state ?? this.formSchema()!.defaults.state;
    const { title, ...rest } = value;
    const payload = this.fieldFormService.buildPayload(this.fieldMeta, rest, this.originalNode);
    const attributes = { ...payload.attributes };
    const titleKey = this.formSchema()!.baseFields['title'];
    if (titleKey && title !== undefined) {
      attributes[titleKey] = title;
    }
    const relationships = payload.relationships;
    Object.assign(attributes, buildNodeBaseFieldAttributes(value, state, {
      originalNode: this.originalNode,
      schema: this.formSchema(),
      creatingTranslation: this.creatingTranslation(),
      editUuid: uuid,
      lang,
    }));
    const path = `/api/v1/node/${type}`;
    const request$ = uuid
      ? this.creatingTranslation()
        ? this.createTranslation$(path, uuid, attributes, relationships, lang)
        : this.updateWithConflictCheck$(path, type, uuid, attributes, relationships, lang)
      : this.nodeService.addEntity(path, attributes, relationships, lang);
    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.onSubmitSuccess(!!uuid, res),
      error: err => this.showSubmitError(err),
    });
  }

  /**
   * Core JSON:API cannot create a translation (PATCH on a missing translation
   * is a 405), so create it first via the v3 endpoint (the server copies the
   * source translation), then PATCH the submitted values onto the fresh
   * translation. The conflict pre-check is skipped: the fresh translation's
   * changed timestamp legitimately differs from the source baseline.
   */
  private createTranslation$(
    path: string,
    uuid: string,
    attributes: any,
    relationships: any,
    lang?: string
  ) {
    const nid = this.originalNode?.attributes?.drupal_internal__nid;
    const source = this.originalNode?.attributes?.langcode;
    if (!nid || !source || !lang) {
      return throwError(() => ({
        error: { errors: [{ detail: 'Missing node or language for translation.' }] },
      }));
    }
    return this.nodeService.createNodeTranslation(nid, source, lang).pipe(
      switchMap(res => {
        if (res?.status === false) {
          return throwError(() => ({
            error: { errors: [{ detail: res.message || 'Failed to create the translation.' }] },
          }));
        }
        return this.nodeService.updateEntity(path, uuid, attributes, relationships, lang);
      })
    );
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

  /**
   * On success both modes stay on the page (consistent behavior, the user can
   * keep tweaking or leave via the type switch / manage list); create clears
   * the form for the next entry, edit refreshes the baseline instead.
   */
  private onSubmitSuccess(isEdit: boolean, res?: any): void {
    this.submitting.set(false);
    // Both modes: the persisted copy is now the source of truth, the local draft goes
    this.storage.clear(this.draftKey());
    if (isEdit) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.UPDATE_SUCCESS'), 'ok');
      this.applyUpdatedNode(res?.data);
      if (this.creatingTranslation()) {
        // The translation exists from now on: leave create mode and reflect it in the panel
        this.creatingTranslation.set(false);
        const langCode = this.editLang();
        this.translations.update(list =>
          list.map(item => (item.langCode === langCode ? { ...item, exists: true } : item))
        );
      }
      // The saved state becomes the new pristine baseline, so the leave guard no longer blocks
      this.form.markAsPristine();
    } else {
      this.form.reset();
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.SUBMIT_SUCCESS'), 'ok');
    }
  }

  /**
   * Sync the edit baseline from the PATCH response: the next save neither
   * false-flags a conflict on the stale changed timestamp nor resubmits base
   * fields that just persisted. Relationships merge conservatively in case the
   * response omits them, keeping reference meta for the next minimal-diff PATCH.
   */
  private applyUpdatedNode(data: any): void {
    if (!data?.attributes) {
      return;
    }
    this.originalNode = {
      ...this.originalNode,
      attributes: { ...this.originalNode?.attributes, ...data.attributes },
      ...(data.relationships ? { relationships: data.relationships } : {}),
    };
    this.loadedChanged = data.attributes.changed ?? this.loadedChanged;
  }

  private showSubmitError(err: any): void {
    this.submitting.set(false);
    if (err?.editConflict) {
      this.promptConflictReload();
      return;
    }
    const message = err?.error?.errors?.[0]?.detail || err?.message || '';
    this.util.openSnackbar(
      this.translate.instant('BUILDER.NODE_ADD.SUBMIT_FAILED', { message }),
      'ok'
    );
  }

  /**
   * On an edit conflict the user needs the other editor's version; offer a
   * reload right in the dialog instead of leaving them to re-enter the page.
   */
  private promptConflictReload(): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.NODE_ADD.EDIT_CONFLICT_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.NODE_ADD.CONFLICT_RELOAD'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.NODE_ADD.EDIT_CONFLICT_BODY'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '360px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(reload => {
        if (!reload) {
          return;
        }
        // "Load latest" explicitly discards the local edits; drop the draft too
        this.storage.clear(this.draftKey());
        this.resetForParams(this.currentParams, this.currentQuery);
        this.retryLoad$.next();
      });
  }
}
