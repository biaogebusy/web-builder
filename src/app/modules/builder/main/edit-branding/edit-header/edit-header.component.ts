import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateService } from '@ngx-translate/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';
import { merge as deepMerge } from 'lodash-es';
import { merge } from 'rxjs';

import { IBranding, IHeader, IMainMenu } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrl: './edit-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ShareModule,
    WidgetsModule,
    FormModule,
    FormsModule,
    RouterLink,
    DragDropModule,
    MatIconModule,
    MatProgressBarModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    MonacoEditorModule,
    NgxSkeletonLoaderModule,
  ],
})
export class EditHeaderComponent implements OnInit, HasUnsavedChanges {
  loading = signal(false);
  saving = signal(false);
  dirty = signal(false);
  branding = signal<IBranding | null>(null);
  header = signal<IHeader | null>(null);
  menuItems = signal<IMainMenu[]>([]);
  expandedMenuIndex = signal<number>(-1);
  nodeUuid = signal('');
  nodeLangcode = signal('');
  queryParams: Record<string, string> = {};
  activeSection = signal<string>('params');
  showJson = signal(false);

  // JSON panel
  jsonEditMode = signal(false);
  jsonPreview = signal('');
  customJson = '';
  jsonError = signal('');

  // Save button state
  canSave = computed(() => this.dirty() && !this.loading() && !this.saving() && !!this.header());

  paramsForm = new UntypedFormGroup({});
  paramsModel: Record<string, unknown> = {};
  paramsFields: FormlyFieldConfig[] = [];

  logoForm = new UntypedFormGroup({});
  logoModel: Record<string, unknown> = {};
  logoFields: FormlyFieldConfig[] = [];

  searchForm = new UntypedFormGroup({});
  searchModel: Record<string, unknown> = {};
  searchFields: FormlyFieldConfig[] = [];

  actionsForm = new UntypedFormGroup({});
  actionsModel: Record<string, unknown> = {};
  actionsFields: FormlyFieldConfig[] = [];

  monacoReadonlyOptions = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    fontSize: 14,
    readOnly: true,
  };

  monacoEditableOptions = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    fontSize: 14,
    readOnly: false,
  };

  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private builderService = inject(BuilderService);
  private util = inject(UtilitiesService);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  // #1 canDeactivate
  hasUnsavedChanges(): boolean {
    return this.dirty();
  }

  toggleSection(id: string): void {
    this.activeSection.set(this.activeSection() === id ? '' : id);
  }

  isSectionOpen(id: string): boolean {
    return this.activeSection() === id;
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const { uuid, langcode } = params;
      if (!uuid) {
        this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.MISSING_NODE'));
        return;
      }
      this.nodeUuid.set(uuid);
      this.nodeLangcode.set(langcode ?? '');
      this.queryParams = { uuid, langcode: langcode ?? '' };
      this.loadData();
    });
  }

  loadData(): void {
    this.loading.set(true);
    this.contentService
      .loadBranding()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: branding => {
          this.branding.set(branding);
          this.header.set(branding.header);
          this.menuItems.set([...(branding.header.mainMenu || [])]);

          this.initParamsFields(branding.header);
          this.initLogoFields(branding.header);
          this.initSearchFields(branding.header);
          this.initActionsFields(branding.header);
          this.updateJsonPreview();
          this.loading.set(false);
          this.dirty.set(false);
          this.listenFormChanges();
        },
        error: () => {
          this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.LOAD_FAIL'));
          this.loading.set(false);
        },
      });
  }

  // #3 Listen to form changes → update JSON preview + dirty flag
  private listenFormChanges(): void {
    merge(
      this.paramsForm.valueChanges,
      this.logoForm.valueChanges,
      this.searchForm.valueChanges,
      this.actionsForm.valueChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.markDirty();
        this.updateJsonPreview();
      });
  }

  markDirty(): void {
    this.dirty.set(true);
  }

  updateJsonPreview(): void {
    if (!this.header()) {
      return;
    }
    try {
      const preview = JSON.stringify(this.buildHeader(), null, 2);
      this.jsonPreview.set(preview);
    } catch {
      // skip
    }
  }

  // #3 Toggle JSON edit mode
  toggleJsonEditMode(): void {
    if (!this.jsonEditMode()) {
      this.customJson = this.jsonPreview();
      this.jsonError.set('');
    }
    this.jsonEditMode.set(!this.jsonEditMode());
  }

  // #5 Validate JSON on input
  onJsonChange(value: string): void {
    this.customJson = value;
    this.markDirty();
    try {
      JSON.parse(value);
      this.jsonError.set('');
    } catch (e: unknown) {
      this.jsonError.set((e as Error).message);
    }
  }

  initParamsFields(header: IHeader): void {
    const { params } = header;
    this.paramsModel = { ...params };
    this.paramsFields = [
      {
        fieldGroupClassName: 'flex flex-wrap gap-4',
        fieldGroup: [
          {
            key: 'themeSwitch',
            type: 'toggle',
            defaultValue: params.themeSwitch,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.THEME_SWITCH') },
          },
          {
            key: 'userInfo',
            type: 'toggle',
            defaultValue: params.userInfo,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.USER_INFO') },
          },
          {
            key: 'menuHoverOpen',
            type: 'toggle',
            defaultValue: params.menuHoverOpen,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.HOVER_MENU') },
          },
        ],
      },
    ];
  }

  initLogoFields(header: IHeader): void {
    const logo = header.logo ?? { label: '', href: '/', version: false };
    this.logoModel = {
      label: logo.label,
      href: logo.href,
      version: logo.version,
      invert: logo.invert ?? '',
      src: logo.img?.src ?? '',
      alt: logo.img?.alt ?? '',
      width: logo.img?.width ?? 0,
      height: logo.img?.height ?? 0,
    };
    this.logoFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'label',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.label,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LABEL') },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.href,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK_FIELD') },
          },
          {
            key: 'src',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.img?.src,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.IMG_URL') },
          },
          {
            key: 'alt',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.img?.alt,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.IMG_ALT') },
          },
          {
            key: 'width',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.img?.width,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.WIDTH'), type: 'number' },
          },
          {
            key: 'height',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.img?.height,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.HEIGHT'), type: 'number' },
          },
          {
            key: 'version',
            type: 'toggle',
            className: 'w-full',
            defaultValue: logo.version,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.SHOW_VERSION') },
          },
          {
            key: 'invert',
            type: 'input',
            className: 'w-full',
            defaultValue: logo.invert,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.INVERSE_LOGO') },
          },
        ],
      },
    ];
  }

  initSearchFields(header: IHeader): void {
    const { search } = header;
    this.searchModel = { ...search };
    this.searchFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'enable',
            type: 'toggle',
            className: 'w-full',
            defaultValue: search.enable,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ENABLE_SEARCH') },
          },
          {
            key: 'placeholder',
            type: 'input',
            className: 'w-full',
            defaultValue: search.placeholder,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.PLACEHOLDER') },
          },
          {
            key: 'tooltip',
            type: 'input',
            className: 'w-full',
            defaultValue: search.tooltip,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.TOOLTIP') },
          },
          {
            key: 'link',
            type: 'input',
            className: 'w-full',
            defaultValue: search.link,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.SEARCH_URL') },
          },
          {
            key: 'type',
            type: 'input',
            className: 'w-full',
            defaultValue: search.type,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.TYPE') },
          },
          {
            key: 'key',
            type: 'input',
            className: 'w-full',
            defaultValue: search.key,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.KEYWORD_PARAM') },
          },
        ],
      },
    ];
  }

  initActionsFields(header: IHeader): void {
    const actions = header.actions ?? [];
    this.actionsModel = { actions };
    this.actionsFields = [
      {
        key: 'actions',
        type: 'repeat',
        props: { addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_ACTION_BTN') },
        fieldArray: {
          fieldGroupClassName: 'grid gap-0',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LABEL'), required: true },
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK_FIELD'), required: true },
            },
          ],
        },
      },
    ];
  }

  // ── Menu management ──

  onMenuDrop(event: CdkDragDrop<IMainMenu[]>): void {
    const items = [...this.menuItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.menuItems.set(items);
    this.onMenuChange();
  }

  onChildMenuDrop(menuIndex: number, event: CdkDragDrop<IMainMenu[]>): void {
    const items = [...this.menuItems()];
    const children = [...(items[menuIndex].child ?? [])];
    moveItemInArray(children, event.previousIndex, event.currentIndex);
    items[menuIndex] = { ...items[menuIndex], child: children };
    this.menuItems.set(items);
    this.onMenuChange();
  }

  toggleMenuExpand(index: number): void {
    this.expandedMenuIndex.set(this.expandedMenuIndex() === index ? -1 : index);
  }

  addMenuItem(): void {
    this.menuItems.update(items => [...items, { label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_MENU_ITEM'), classes: '' }]);
    this.onMenuChange();
  }

  // #8 Use (input) instead of (blur)
  updateMenuItem(index: number, field: string, value: string): void {
    const items = [...this.menuItems()];
    items[index] = { ...items[index], [field]: value };
    this.menuItems.set(items);
    this.onMenuChange();
  }

  // #2 Delete with undo
  removeMenuItem(index: number): void {
    const removed = this.menuItems()[index];
    this.menuItems.update(items => items.filter((_, i) => i !== index));
    if (this.expandedMenuIndex() === index) {
      this.expandedMenuIndex.set(-1);
    }
    this.onMenuChange();
    const ref = this.snackBar.open(
      this.translate.instant('BUILDER.EDIT_BRANDING.DELETED_TOAST', { label: removed.label }),
      this.translate.instant('BUILDER.EDIT_BRANDING.UNDO'),
      { duration: 5000 }
    );
    ref
      .onAction()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.menuItems.update(items => {
          const copy = [...items];
          copy.splice(index, 0, removed);
          return copy;
        });
        this.onMenuChange();
      });
  }

  addChildMenuItem(menuIndex: number): void {
    const items = [...this.menuItems()];
    const children = [...(items[menuIndex].child ?? [])];
    children.push({ label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_CHILD_MENU') });
    items[menuIndex] = { ...items[menuIndex], child: children };
    this.menuItems.set(items);
    this.onMenuChange();
  }

  updateChildMenuItem(menuIndex: number, childIndex: number, field: string, value: string): void {
    const items = [...this.menuItems()];
    const children = [...(items[menuIndex].child ?? [])];
    children[childIndex] = { ...children[childIndex], [field]: value };
    items[menuIndex] = { ...items[menuIndex], child: children };
    this.menuItems.set(items);
    this.onMenuChange();
  }

  // #2 Delete child with undo
  removeChildMenuItem(menuIndex: number, childIndex: number): void {
    const removed = this.menuItems()[menuIndex].child?.[childIndex];
    const items = [...this.menuItems()];
    const children = (items[menuIndex].child ?? []).filter((_, i) => i !== childIndex);
    items[menuIndex] = { ...items[menuIndex], child: children };
    this.menuItems.set(items);
    this.onMenuChange();
    if (removed) {
      const ref = this.snackBar.open(
      this.translate.instant('BUILDER.EDIT_BRANDING.DELETED_TOAST', { label: removed.label }),
      this.translate.instant('BUILDER.EDIT_BRANDING.UNDO'),
      { duration: 5000 }
    );
      ref
        .onAction()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const current = [...this.menuItems()];
          const ch = [...(current[menuIndex].child ?? [])];
          ch.splice(childIndex, 0, removed);
          current[menuIndex] = { ...current[menuIndex], child: ch };
          this.menuItems.set(current);
          this.onMenuChange();
        });
    }
  }

  private onMenuChange(): void {
    this.markDirty();
    this.updateJsonPreview();
  }

  // ── Build & Save ──

  buildHeader(): IHeader {
    const header = this.header()!;
    const logoVal = this.logoForm.value;
    const logo = {
      ...header.logo,
      label: logoVal.label,
      href: logoVal.href,
      version: logoVal.version,
      invert: logoVal.invert,
      img: {
        ...(header.logo?.img ?? {}),
        src: logoVal.src,
        alt: logoVal.alt,
        width: Number(logoVal.width),
        height: Number(logoVal.height),
      },
    };

    return {
      ...header,
      params: { ...header.params, ...this.paramsForm.value },
      logo,
      mainMenu: this.menuItems(),
      search: { ...header.search, ...this.searchForm.value },
      actions: this.actionsForm.value?.actions ?? header.actions ?? [],
    };
  }

  onSave(): void {
    if (!this.nodeUuid()) {
      this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.NOT_FOUND_NODE'));
      return;
    }

    this.saving.set(true);
    const branding = this.branding()!;
    let header = this.buildHeader();

    // #3 + #5 JSON edit mode merge with error handling
    if (this.jsonEditMode() && this.customJson) {
      try {
        const customConfig = JSON.parse(this.customJson);
        if (customConfig && typeof customConfig === 'object') {
          header = deepMerge({}, header, customConfig);
        }
        this.jsonError.set('');
      } catch {
        this.saving.set(false);
        this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.JSON_FORMAT_ERROR'), 'ok');
        return;
      }
    }

    const updatedBranding: IBranding = { ...branding, header };

    this.builderService
      .updateAttributes(
        { uuid: this.nodeUuid(), langcode: this.nodeLangcode() },
        '/api/v1/node/json',
        { body: JSON.stringify(updatedBranding) },
        {}
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.saving.set(false);
          if (res) {
            this.dirty.set(false);
            this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.HEADER_UPDATE_SUCCESS'), 'ok');
          }
        },
        error: () => {
          this.saving.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.UPDATE_FAIL'));
        },
      });
  }
}
