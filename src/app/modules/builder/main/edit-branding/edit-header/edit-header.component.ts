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
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
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
import { provideXinshiFormly } from '@uiux/combs/form/formly-feature.config';
import { shadcnFormOptions } from '@uiux/combs/form/formly-shadcn/formly-shadcn.config';
import { merge } from 'rxjs';

import { IBranding, IHeader, IMainMenu } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';
import { BrandingPreviewComponent } from '../branding-preview/branding-preview.component';
import { formatBrandingJson, getBrandingJsonError, mergeBrandingJson } from '../branding-json.util';
import { buildHeaderConfig } from '../branding-config.util';
import {
  BRANDING_JSON_ENDPOINT,
  buildBrandingUpdateBody,
  canSaveBranding,
} from '../branding-save.util';
import {
  appendBrandingChild,
  appendBrandingItem,
  insertBrandingChild,
  insertBrandingItem,
  moveBrandingItems,
  removeBrandingChild,
  removeBrandingItem,
  updateBrandingChild,
  updateBrandingItem,
} from '../branding-menu.util';

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
    BrandingPreviewComponent,
  ],
  providers: [provideXinshiFormly()],
})
export class EditHeaderComponent implements OnInit, HasUnsavedChanges {
  loading = signal(false);
  saving = signal(false);
  dirty = signal(false);
  branding = signal<IBranding | null>(null);
  header = signal<IHeader | null>(null);
  menuItems = signal<IMainMenu[]>([]);
  expandedMenuIndex = signal<number>(-1);
  expandedChildKey = signal<string>('');
  nodeUuid = signal('');
  nodeLangcode = signal('');
  queryParams: Record<string, string> = {};
  activeSection = signal<string>('params');
  showJson = signal(false);
  previewBranding = signal<IBranding | null>(null);

  // JSON panel
  jsonEditMode = signal(false);
  jsonPreview = signal('');
  customJson = '';
  jsonError = signal('');

  // Save button state
  canSave = computed(() =>
    canSaveBranding(this.dirty(), this.loading(), this.saving(), !!this.header())
  );

  paramsForm = new UntypedFormGroup({});
  paramsModel: Record<string, unknown> = {};
  paramsFields: FormlyFieldConfig[] = [];
  paramsOptions = shadcnFormOptions();

  logoForm = new UntypedFormGroup({});
  logoModel: Record<string, unknown> = {};
  logoFields: FormlyFieldConfig[] = [];
  logoOptions = shadcnFormOptions();

  searchForm = new UntypedFormGroup({});
  searchModel: Record<string, unknown> = {};
  searchFields: FormlyFieldConfig[] = [];
  searchOptions = shadcnFormOptions();

  actionsForm = new UntypedFormGroup({});
  actionsModel: Record<string, unknown> = {};
  actionsFields: FormlyFieldConfig[] = [];
  actionsOptions = shadcnFormOptions();

  topForm = new UntypedFormGroup({});
  topModel: Record<string, unknown> = {};
  topFields: FormlyFieldConfig[] = [];
  topOptions = shadcnFormOptions();

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
          this.initTopFields(branding.header);
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
      this.actionsForm.valueChanges,
      this.topForm.valueChanges
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
      const built = this.buildHeader();
      this.jsonPreview.set(formatBrandingJson(built));
      this.updateLivePreview(built);
    } catch {
      // skip
    }
  }

  private updateLivePreview(header: IHeader): void {
    const branding = this.branding();
    if (branding) {
      this.previewBranding.set({ ...branding, header });
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
    const error = getBrandingJsonError(value);
    this.jsonError.set(error);
    if (!error) {
      try {
        this.updateLivePreview(mergeBrandingJson(this.buildHeader(), value));
      } catch {
        // keep last valid preview
      }
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
          {
            key: 'inverse',
            type: 'toggle',
            defaultValue: params.inverse ?? false,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.INVERSE_HEADER') },
          },
        ],
      },
    ];
  }

  initTopFields(header: IHeader): void {
    const banner = header.top?.banner;
    this.topModel = {
      left: (banner?.left ?? []).map(item => ({
        svg: item.icon?.svg ?? '',
        label: item.label ?? '',
      })),
      right: (banner?.right ?? []).map(item => ({
        label: item.label ?? '',
        svg: item.svg ?? '',
        href: item.href ?? '',
      })),
    };
    this.topFields = [
      {
        template: `<div class="field-label">${this.translate.instant('BUILDER.EDIT_BRANDING.TOP_LEFT')}</div>`,
      },
      {
        key: 'left',
        type: 'repeat',
        props: {
          addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_TOP_LEFT'),
        },
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
              key: 'svg',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ICON_SVG') },
            },
          ],
        },
      },
      {
        template: `<div class="field-label">${this.translate.instant('BUILDER.EDIT_BRANDING.TOP_RIGHT')}</div>`,
      },
      {
        key: 'right',
        type: 'repeat',
        props: {
          addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_TOP_RIGHT'),
        },
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
              key: 'svg',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ICON_SVG') },
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK_FIELD') },
            },
          ],
        },
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
    this.menuItems.set(
      moveBrandingItems(this.menuItems(), event.previousIndex, event.currentIndex)
    );
    this.onMenuChange();
  }

  onChildMenuDrop(menuIndex: number, event: CdkDragDrop<IMainMenu[]>): void {
    const items = this.menuItems();
    const children = items[menuIndex].child ?? [];
    const nextChildren = moveBrandingItems(children, event.previousIndex, event.currentIndex);
    const nextItems = [...items];
    nextItems[menuIndex] = { ...items[menuIndex], child: nextChildren };
    this.menuItems.set(nextItems);
    this.onMenuChange();
  }

  toggleMenuExpand(index: number): void {
    this.expandedMenuIndex.set(this.expandedMenuIndex() === index ? -1 : index);
  }

  addMenuItem(): void {
    this.menuItems.update(items =>
      appendBrandingItem(items, {
        label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_MENU_ITEM'),
        classes: '',
      })
    );
    this.onMenuChange();
  }

  // #8 Use (input) instead of (blur)
  updateMenuItem(index: number, field: string, value: string): void {
    this.menuItems.set(updateBrandingItem(this.menuItems(), index, field, value));
    this.onMenuChange();
  }

  // #2 Delete with undo
  removeMenuItem(index: number): void {
    const removed = this.menuItems()[index];
    this.menuItems.update(items => removeBrandingItem(items, index));
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
        this.menuItems.update(items => insertBrandingItem(items, index, removed));
        this.onMenuChange();
      });
  }

  addChildMenuItem(menuIndex: number): void {
    this.menuItems.set(
      appendBrandingChild(this.menuItems(), menuIndex, {
        label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_CHILD_MENU'),
      })
    );
    this.onMenuChange();
  }

  updateChildMenuItem(menuIndex: number, childIndex: number, field: string, value: string): void {
    this.menuItems.set(updateBrandingChild(this.menuItems(), menuIndex, childIndex, field, value));
    this.onMenuChange();
  }

  // #2 Delete child with undo
  removeChildMenuItem(menuIndex: number, childIndex: number): void {
    const removed = this.menuItems()[menuIndex].child?.[childIndex];
    this.menuItems.set(removeBrandingChild(this.menuItems(), menuIndex, childIndex));
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
          this.menuItems.set(
            insertBrandingChild(this.menuItems(), menuIndex, childIndex, removed)
          );
          this.onMenuChange();
        });
    }
  }

  private onMenuChange(): void {
    this.markDirty();
    this.updateJsonPreview();
  }

  // ── Dynamic menu / target / third-level menu ──

  toggleMenuDynamic(index: number, enabled: boolean): void {
    this.menuItems.set(updateBrandingItem(this.menuItems(), index, 'dynamicMenu', enabled || undefined));
    this.onMenuChange();
  }

  updateMenuUuid(index: number, value: string): void {
    this.menuItems.set(updateBrandingItem(this.menuItems(), index, 'uuid', value || undefined));
    this.onMenuChange();
  }

  toggleChildTarget(menuIndex: number, childIndex: number): void {
    const current = this.menuItems()[menuIndex].child?.[childIndex]?.target;
    this.menuItems.set(
      updateBrandingChild(
        this.menuItems(),
        menuIndex,
        childIndex,
        'target',
        current === '_blank' ? undefined : '_blank'
      )
    );
    this.onMenuChange();
  }

  toggleChildExpand(menuIndex: number, childIndex: number): void {
    const key = `${menuIndex}:${childIndex}`;
    this.expandedChildKey.set(this.expandedChildKey() === key ? '' : key);
  }

  isChildExpanded(menuIndex: number, childIndex: number): boolean {
    return this.expandedChildKey() === `${menuIndex}:${childIndex}`;
  }

  private setChildren(menuIndex: number, children: IMainMenu[]): void {
    const items = [...this.menuItems()];
    items[menuIndex] = { ...items[menuIndex], child: children };
    this.menuItems.set(items);
  }

  private childrenOf(menuIndex: number): IMainMenu[] {
    return [...(this.menuItems()[menuIndex].child ?? [])];
  }

  addGrandChild(menuIndex: number, childIndex: number): void {
    this.setChildren(
      menuIndex,
      appendBrandingChild(this.childrenOf(menuIndex), childIndex, {
        label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_CHILD_MENU'),
      })
    );
    this.onMenuChange();
  }

  updateGrandChild(
    menuIndex: number,
    childIndex: number,
    grandIndex: number,
    field: string,
    value: string
  ): void {
    this.setChildren(
      menuIndex,
      updateBrandingChild(this.childrenOf(menuIndex), childIndex, grandIndex, field, value)
    );
    this.onMenuChange();
  }

  toggleGrandChildTarget(menuIndex: number, childIndex: number, grandIndex: number): void {
    const current =
      this.menuItems()[menuIndex].child?.[childIndex]?.child?.[grandIndex]?.target;
    this.setChildren(
      menuIndex,
      updateBrandingChild(
        this.childrenOf(menuIndex),
        childIndex,
        grandIndex,
        'target',
        current === '_blank' ? undefined : '_blank'
      )
    );
    this.onMenuChange();
  }

  removeGrandChild(menuIndex: number, childIndex: number, grandIndex: number): void {
    const removed = this.menuItems()[menuIndex].child?.[childIndex]?.child?.[grandIndex];
    this.setChildren(
      menuIndex,
      removeBrandingChild(this.childrenOf(menuIndex), childIndex, grandIndex)
    );
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
          this.setChildren(
            menuIndex,
            insertBrandingChild(this.childrenOf(menuIndex), childIndex, grandIndex, removed)
          );
          this.onMenuChange();
        });
    }
  }

  onGrandChildDrop(menuIndex: number, childIndex: number, event: CdkDragDrop<IMainMenu[]>): void {
    const children = this.childrenOf(menuIndex);
    const grandChildren = moveBrandingItems(
      children[childIndex].child ?? [],
      event.previousIndex,
      event.currentIndex
    );
    children[childIndex] = { ...children[childIndex], child: grandChildren };
    this.setChildren(menuIndex, children);
    this.onMenuChange();
  }

  // ── Build & Save ──

  buildHeader(): IHeader {
    // Merge model under form.value: collapsed sections never render their
    // formly-form, leaving the FormGroup empty — the model keeps the values.
    return buildHeaderConfig(
      this.header()!,
      { ...this.paramsModel, ...this.paramsForm.value },
      { ...this.logoModel, ...this.logoForm.value },
      this.menuItems(),
      { ...this.searchModel, ...this.searchForm.value },
      { ...this.actionsModel, ...this.actionsForm.value },
      { ...this.topModel, ...this.topForm.value }
    );
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
        header = mergeBrandingJson(header, this.customJson);
        this.jsonError.set('');
      } catch {
        this.saving.set(false);
        this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.JSON_FORMAT_ERROR'), 'ok');
        return;
      }
    }

    this.builderService
      .updateAttributes(
        { uuid: this.nodeUuid(), langcode: this.nodeLangcode() },
        BRANDING_JSON_ENDPOINT,
        buildBrandingUpdateBody(branding, 'header', header),
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
