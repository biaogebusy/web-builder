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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { provideXinshiFormly } from '@uiux/combs/form/formly-feature.config';
import { shadcnFormOptions } from '@uiux/combs/form/formly-shadcn/formly-shadcn.config';
import { merge, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IBranding, IFooter } from '@core/interface/branding/IBranding';
import { IDialog } from '@core/interface/IDialog';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { BrandingPreviewComponent } from '../branding-preview/branding-preview.component';
import { formatBrandingJson, getBrandingJsonError, mergeBrandingJson } from '../branding-json.util';
import { buildFooterConfig } from '../branding-config.util';
import {
  BRANDING_JSON_ENDPOINT,
  IBrandingNode,
  buildBrandingUpdateBody,
  canSaveBranding,
  listBrandingNodes,
  pickBrandingNode,
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

interface FooterMenuGroup {
  label: string;
  child: { label: string; href?: string; target?: string; icon?: { svg: string } }[];
}

@Component({
  selector: 'app-edit-footer',
  templateUrl: './edit-footer.component.html',
  styleUrl: './edit-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SHARE_IMPORTS,
    WIDGETS_IMPORTS,
    FORM_IMPORTS,
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
export class EditFooterComponent implements OnInit, HasUnsavedChanges {
  loading = signal(false);
  saving = signal(false);
  dirty = signal(false);
  branding = signal<IBranding | null>(null);
  footer = signal<IFooter | null>(null);
  menuItems = signal<FooterMenuGroup[]>([]);
  mobileMenuItems = signal<FooterMenuGroup[]>([]);
  expandedMenuIndex = signal<number>(-1);
  expandedMobileMenuIndex = signal<number>(-1);
  nodeUuid = signal('');
  nodeLangcode = signal('');
  queryParams: Record<string, string> = {};
  // 语言切换器:多语言部署且配置了多个语言才渲染
  langs = environment.langs ?? [];
  showLangSwitch = environment.multiLang && this.langs.length > 1;
  brandingNodes = signal<IBrandingNode[]>([]);
  activeSection = signal<string>('params');
  showJson = signal(false);
  previewBranding = signal<IBranding | null>(null);

  // Custom dynamic block (rendered by the inverse footer)
  dynamicEnabled = signal(false);
  dynamicClasses = signal('');
  dynamicHtml = signal('');

  jsonEditMode = signal(false);
  jsonPreview = signal('');
  customJson = '';
  jsonError = signal('');

  canSave = computed(() =>
    canSaveBranding(this.dirty(), this.loading(), this.saving(), !!this.footer())
  );

  paramsForm = new UntypedFormGroup({});
  paramsModel: Record<string, unknown> = {};
  paramsFields: FormlyFieldConfig[] = [];
  paramsOptions = shadcnFormOptions();

  brandForm = new UntypedFormGroup({});
  brandModel: Record<string, unknown> = {};
  brandFields: FormlyFieldConfig[] = [];
  brandOptions = shadcnFormOptions();

  socialForm = new UntypedFormGroup({});
  socialModel: Record<string, unknown> = {};
  socialFields: FormlyFieldConfig[] = [];
  socialOptions = shadcnFormOptions();

  newsletterForm = new UntypedFormGroup({});
  newsletterModel: Record<string, unknown> = {};
  newsletterFields: FormlyFieldConfig[] = [];
  newsletterOptions = shadcnFormOptions();

  bottomForm = new UntypedFormGroup({});
  bottomModel: Record<string, unknown> = {};
  bottomFields: FormlyFieldConfig[] = [];
  bottomOptions = shadcnFormOptions();

  fixBarForm = new UntypedFormGroup({});
  fixBarModel: Record<string, unknown> = {};
  fixBarFields: FormlyFieldConfig[] = [];
  fixBarOptions = shadcnFormOptions();

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

  monacoHtmlOptions = {
    theme: 'vs',
    language: 'html',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    fontSize: 14,
    readOnly: false,
  };

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contentService = inject(ContentService);
  private builderService = inject(BuilderService);
  private nodeService = inject(NodeService);
  private util = inject(UtilitiesService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  /** 品牌节点列表只请求一次,无参进入的解析与语言切换器置灰共用 */
  private brandingNodes$ = listBrandingNodes(this.nodeService).pipe(shareReplay(1));

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
    if (this.showLangSwitch) {
      this.brandingNodes$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(nodes => this.brandingNodes.set(nodes));
    }
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const { uuid, langcode } = params;
      if (uuid) {
        this.initNode(uuid, langcode ?? '');
        return;
      }
      // 从管理中心/菜单直接进入或切换语言时无 uuid,按别名+目标语言解析品牌节点
      const target = langcode || this.nodeService.getLang(this.nodeService.pageUrl)?.langCode;
      this.brandingNodes$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(nodes => {
        const node = pickBrandingNode(nodes, target);
        if (!node) {
          this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.MISSING_NODE'));
          return;
        }
        this.initNode(node.uuid, node.langcode);
      });
    });
  }

  private initNode(uuid: string, langcode: string): void {
    this.nodeUuid.set(uuid);
    this.nodeLangcode.set(langcode);
    this.queryParams = { uuid, langcode };
    this.loadData();
  }

  // ── Content-language switch ──

  /** 节点列表已加载且该语言无品牌节点时置灰对应按钮 */
  isLangMissing(langCode: string): boolean {
    const nodes = this.brandingNodes();
    return nodes.length > 0 && !nodes.some(node => node.langcode === langCode);
  }

  switchLang(langCode: string): void {
    if (langCode === this.nodeLangcode()) {
      return;
    }
    if (!this.dirty()) {
      this.navigateToLang(langCode);
      return;
    }
    // canDeactivate 守卫只拦路由离开,同路由改查询参数不触发,这里手动确认
    const config: IDialog = {
      title: this.translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_TITLE'),
      yesLabel: this.translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_YES'),
      noLabel: this.translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_NO'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_CONFIRM'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '360px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.dirty.set(false);
          this.navigateToLang(langCode);
        }
      });
  }

  private navigateToLang(langCode: string): void {
    // 只带 langcode、丢弃旧 uuid,由 queryParams 订阅按目标语言重新解析节点
    this.router.navigate([], { relativeTo: this.route, queryParams: { langcode: langCode } });
  }

  loadData(): void {
    this.loading.set(true);
    // 加载语言必须与保存目标节点一致:用节点 langcode 构造语言前缀,而非当前 URL
    this.contentService
      .loadBranding(`/${this.nodeLangcode()}/`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: branding => {
          this.branding.set(branding);
          const footer = branding.footer ?? ({ params: { mode: 'light' } } as IFooter);
          this.footer.set(footer);
          this.menuItems.set([...(footer.mainMenu ?? [])]);
          this.mobileMenuItems.set([...(footer.mobileMenu ?? [])]);

          this.initParamsFields(footer);
          this.initBrandFields(footer);
          this.initSocialFields(footer);
          this.initNewsletterFields(footer);
          this.initBottomFields(footer);
          this.initFixBarFields(footer);
          this.initDynamic(footer);
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

  private listenFormChanges(): void {
    merge(
      this.paramsForm.valueChanges,
      this.brandForm.valueChanges,
      this.socialForm.valueChanges,
      this.newsletterForm.valueChanges,
      this.bottomForm.valueChanges,
      this.fixBarForm.valueChanges
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
    if (!this.footer()) {
      return;
    }
    try {
      const built = this.buildFooter();
      this.jsonPreview.set(formatBrandingJson(built));
      this.updateLivePreview(built);
    } catch {
      /* skip */
    }
  }

  private updateLivePreview(footer: IFooter): void {
    const branding = this.branding();
    if (branding) {
      this.previewBranding.set({ ...branding, footer });
    }
  }

  toggleJsonEditMode(): void {
    if (!this.jsonEditMode()) {
      this.customJson = this.jsonPreview();
      this.jsonError.set('');
    }
    this.jsonEditMode.set(!this.jsonEditMode());
  }

  onJsonChange(value: string): void {
    this.customJson = value;
    this.markDirty();
    const error = getBrandingJsonError(value);
    this.jsonError.set(error);
    if (!error) {
      try {
        this.updateLivePreview(mergeBrandingJson(this.buildFooter(), value));
      } catch {
        // keep last valid preview
      }
    }
  }

  // ── Field init (unchanged) ──

  initParamsFields(footer: IFooter): void {
    const params = footer.params ?? { mode: 'light' };
    this.paramsModel = { ...params };
    this.paramsFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'mode',
            type: 'select',
            defaultValue: params.mode,
            className: 'w-full',
            props: {
              label: this.translate.instant('BUILDER.EDIT_BRANDING.MODE'),
              options: [
                { label: this.translate.instant('BUILDER.EDIT_BRANDING.LIGHT'), value: 'light' },
                { label: this.translate.instant('BUILDER.EDIT_BRANDING.INVERSE'), value: 'inverse' },
              ],
            },
          },
          {
            key: 'shape',
            type: 'toggle',
            defaultValue: params.shape,
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.SHOW_SHAPE') },
          },
        ],
      },
    ];
  }

  initBrandFields(footer: IFooter): void {
    const brand = footer.footerBrand;
    const img = brand?.logo?.img as Record<string, unknown> | undefined;
    this.brandModel = {
      summary: brand?.summary ?? '',
      src: brand?.logo?.img?.src ?? '',
      alt: brand?.logo?.img?.alt ?? '',
      href: (img?.['href'] as string) ?? '',
      classes: (img?.['classes'] as string) ?? '',
    };
    this.brandFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'src',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['src'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LOGO_URL') },
          },
          {
            key: 'alt',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['alt'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.IMG_ALT') },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['href'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK_FIELD') },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['classes'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.CSS_CLASS') },
          },
          {
            key: 'summary',
            type: 'textarea',
            className: 'w-full',
            defaultValue: this.brandModel['summary'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.DESCRIPTION'), rows: 3 },
          },
        ],
      },
    ];
  }

  initSocialFields(footer: IFooter): void {
    this.socialModel = { social: footer.footerBrand?.social ?? [] };
    this.socialFields = [
      {
        key: 'social',
        type: 'repeat',
        props: { addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_SOCIAL') },
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
              key: 'icon',
              fieldGroup: [
                {
                  key: 'svg',
                  type: 'input',
                  className: 'w-full',
                  props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ICON_SVG'), required: true },
                },
              ],
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

  initNewsletterFields(footer: IFooter): void {
    const n = footer.footerNewsletter;
    this.newsletterModel = {
      webform_id: n?.params?.webform_id ?? '',
      label: n?.label ?? '',
      summary: n?.summary ?? '',
      actionLabel: n?.action?.label ?? '',
    };
    this.newsletterFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'label',
            type: 'input',
            className: 'w-full',
            defaultValue: this.newsletterModel['label'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.FIELD_TITLE') },
          },
          {
            key: 'webform_id',
            type: 'input',
            className: 'w-full',
            defaultValue: this.newsletterModel['webform_id'],
            props: { label: 'Webform ID' },
          },
          {
            key: 'summary',
            type: 'textarea',
            className: 'w-full',
            defaultValue: this.newsletterModel['summary'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.DESC'), rows: 2 },
          },
          {
            key: 'actionLabel',
            type: 'input',
            className: 'w-full',
            defaultValue: this.newsletterModel['actionLabel'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.BTN_TEXT') },
          },
        ],
      },
    ];
  }

  initBottomFields(footer: IFooter): void {
    const b = footer.footerBottom;
    this.bottomModel = { left: b?.left ?? '', right: b?.right ?? [] };
    this.bottomFields = [
      {
        fieldGroupClassName: 'grid gap-0',
        fieldGroup: [
          {
            key: 'left',
            type: 'input',
            className: 'w-full',
            defaultValue: this.bottomModel['left'],
            props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LEFT_HTML') },
          },
        ],
      },
      {
        key: 'right',
        type: 'repeat',
        props: { addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_FOOTER_LINK') },
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

  initFixBarFields(footer: IFooter): void {
    this.fixBarModel = { fixBar: footer.fixBar ?? [] };
    this.fixBarFields = [
      {
        key: 'fixBar',
        type: 'repeat',
        props: { addText: this.translate.instant('BUILDER.EDIT_BRANDING.ADD_FIXBAR') },
        fieldArray: {
          fieldGroupClassName: 'grid gap-0',
          fieldGroup: [
            {
              key: 'type',
              type: 'select',
              className: 'w-full',
              defaultValue: 'link',
              props: {
                label: this.translate.instant('BUILDER.EDIT_BRANDING.TYPE'),
                options: [
                  { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK'), value: 'link' },
                  { label: 'Popup', value: 'popup' },
                ],
              },
            },
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
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.LINK_FIELD') },
            },
            {
              key: 'icon',
              fieldGroup: [
                {
                  key: 'svg',
                  type: 'input',
                  className: 'w-full',
                  props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ICON_SVG') },
                },
              ],
            },
            {
              key: 'target',
              type: 'select',
              className: 'w-full',
              defaultValue: '_self',
              props: {
                label: this.translate.instant('BUILDER.EDIT_BRANDING.TARGET'),
                options: [
                  { label: '_self', value: '_self' },
                  { label: '_blank', value: '_blank' },
                ],
              },
            },
            {
              key: 'id',
              type: 'input',
              className: 'w-full',
              props: { label: this.translate.instant('BUILDER.EDIT_BRANDING.ELEMENT_ID') },
            },
          ],
        },
      },
    ];
  }

  // ── Dynamic custom block ──

  initDynamic(footer: IFooter): void {
    const dynamic = footer.dynamic;
    this.dynamicEnabled.set(!!dynamic);
    this.dynamicClasses.set(dynamic?.classes ?? '');
    this.dynamicHtml.set(dynamic?.content?.html ?? '');
  }

  addDynamicBlock(): void {
    this.dynamicEnabled.set(true);
    if (!this.dynamicClasses()) {
      this.dynamicClasses.set('flex-12/12 md:flex-3/12');
    }
    this.onDynamicChange();
  }

  removeDynamicBlock(): void {
    this.dynamicEnabled.set(false);
    this.onDynamicChange();
  }

  onDynamicClassesChange(value: string): void {
    this.dynamicClasses.set(value);
    this.onDynamicChange();
  }

  onDynamicHtmlChange(value: string): void {
    this.dynamicHtml.set(value);
    this.onDynamicChange();
  }

  private onDynamicChange(): void {
    this.markDirty();
    this.updateJsonPreview();
  }

  // ── Menu management ──

  onMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    this.menuItems.set(
      moveBrandingItems(this.menuItems(), event.previousIndex, event.currentIndex)
    );
    this.onMenuChange();
  }

  onMobileMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    this.mobileMenuItems.set(
      moveBrandingItems(this.mobileMenuItems(), event.previousIndex, event.currentIndex)
    );
    this.onMenuChange();
  }

  onChildDrop(
    list: 'main' | 'mobile',
    menuIndex: number,
    event: CdkDragDrop<FooterMenuGroup[]>
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = source();
    const children = items[menuIndex].child ?? [];
    const nextChildren = moveBrandingItems(children, event.previousIndex, event.currentIndex);
    const nextItems = [...items];
    nextItems[menuIndex] = { ...items[menuIndex], child: nextChildren };
    source.set(nextItems);
    this.onMenuChange();
  }

  toggleMenuExpand(list: 'main' | 'mobile', index: number): void {
    const sig = list === 'main' ? this.expandedMenuIndex : this.expandedMobileMenuIndex;
    sig.set(sig() === index ? -1 : index);
  }

  addMenuGroup(list: 'main' | 'mobile'): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.update(items =>
      appendBrandingItem(items, {
        label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_GROUP'),
        child: [],
      })
    );
    this.onMenuChange();
  }

  updateMenuGroup(list: 'main' | 'mobile', index: number, value: string): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.set(updateBrandingItem(source(), index, 'label', value));
    this.onMenuChange();
  }

  removeMenuGroup(list: 'main' | 'mobile', index: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const removed = source()[index];
    source.update(items => removeBrandingItem(items, index));
    const sig = list === 'main' ? this.expandedMenuIndex : this.expandedMobileMenuIndex;
    if (sig() === index) {
      sig.set(-1);
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
        source.update(items => insertBrandingItem(items, index, removed));
        this.onMenuChange();
      });
  }

  addChildLink(list: 'main' | 'mobile', menuIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.set(
      appendBrandingChild(source(), menuIndex, {
        label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_LINK'),
        href: '',
        icon: { svg: 'chevron-right' },
      })
    );
    this.onMenuChange();
  }

  updateChildLink(
    list: 'main' | 'mobile',
    menuIndex: number,
    childIndex: number,
    field: string,
    value: string
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.set(updateBrandingChild(source(), menuIndex, childIndex, field, value));
    this.onMenuChange();
  }

  removeChildLink(list: 'main' | 'mobile', menuIndex: number, childIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const removed = source()[menuIndex].child?.[childIndex];
    source.set(removeBrandingChild(source(), menuIndex, childIndex));
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
          source.set(insertBrandingChild(source(), menuIndex, childIndex, removed));
          this.onMenuChange();
        });
    }
  }

  private onMenuChange(): void {
    this.markDirty();
    this.updateJsonPreview();
  }

  toggleChildLinkTarget(list: 'main' | 'mobile', menuIndex: number, childIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const current = source()[menuIndex].child?.[childIndex]?.target;
    source.set(
      updateBrandingChild(
        source(),
        menuIndex,
        childIndex,
        'target',
        current === '_blank' ? undefined : '_blank'
      )
    );
    this.onMenuChange();
  }

  updateChildLinkIcon(
    list: 'main' | 'mobile',
    menuIndex: number,
    childIndex: number,
    svg: string
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.set(
      updateBrandingChild(source(), menuIndex, childIndex, 'icon', svg ? { svg } : undefined)
    );
    this.onMenuChange();
  }

  // Replace the mobile menu with a deep copy of the main menu (undoable)
  copyMainToMobile(): void {
    const previous = this.mobileMenuItems();
    this.mobileMenuItems.set(structuredClone(this.menuItems()));
    this.onMenuChange();
    const ref = this.snackBar.open(
      this.translate.instant('BUILDER.EDIT_BRANDING.COPIED_FROM_MAIN'),
      this.translate.instant('BUILDER.EDIT_BRANDING.UNDO'),
      { duration: 5000 }
    );
    ref
      .onAction()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.mobileMenuItems.set(previous);
        this.onMenuChange();
      });
  }

  // ── Build & Save ──

  buildFooter(): IFooter {
    // Merge model under form.value: collapsed sections never render their
    // formly-form, leaving the FormGroup empty — the model keeps the values.
    return buildFooterConfig(
      this.footer()!,
      { ...this.paramsModel, ...this.paramsForm.value },
      { ...this.brandModel, ...this.brandForm.value },
      { ...this.socialModel, ...this.socialForm.value },
      { ...this.newsletterModel, ...this.newsletterForm.value },
      { ...this.bottomModel, ...this.bottomForm.value },
      this.menuItems(),
      this.mobileMenuItems(),
      { ...this.fixBarModel, ...this.fixBarForm.value },
      {
        enabled: this.dynamicEnabled(),
        classes: this.dynamicClasses(),
        html: this.dynamicHtml(),
      }
    );
  }

  onSave(): void {
    if (!this.nodeUuid()) {
      this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.NOT_FOUND_NODE'));
      return;
    }

    this.saving.set(true);
    const branding = this.branding()!;
    let footer = this.buildFooter();

    if (this.jsonEditMode() && this.customJson) {
      try {
        footer = mergeBrandingJson(footer, this.customJson);
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
        buildBrandingUpdateBody(branding, 'footer', footer),
        {}
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.saving.set(false);
          if (res) {
            this.dirty.set(false);
            this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.FOOTER_UPDATE_SUCCESS'), 'ok');
          }
        },
        error: () => {
          this.saving.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.UPDATE_FAIL'));
        },
      });
  }
}
