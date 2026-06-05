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
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';
import { merge as deepMerge } from 'lodash-es';
import { merge } from 'rxjs';

import { IBranding, IFooter } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';
import { TranslateService } from '@ngx-translate/core';

interface FooterMenuGroup {
  label: string;
  child: { label: string; href?: string }[];
}

@Component({
  selector: 'app-edit-footer',
  templateUrl: './edit-footer.component.html',
  styleUrl: './edit-footer.component.scss',
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
  activeSection = signal<string>('params');
  showJson = signal(false);

  jsonEditMode = signal(false);
  jsonPreview = signal('');
  customJson = '';
  jsonError = signal('');

  canSave = computed(() => this.dirty() && !this.loading() && !this.saving() && !!this.footer());

  paramsForm = new UntypedFormGroup({});
  paramsModel: Record<string, unknown> = {};
  paramsFields: FormlyFieldConfig[] = [];

  brandForm = new UntypedFormGroup({});
  brandModel: Record<string, unknown> = {};
  brandFields: FormlyFieldConfig[] = [];

  socialForm = new UntypedFormGroup({});
  socialModel: Record<string, unknown> = {};
  socialFields: FormlyFieldConfig[] = [];

  newsletterForm = new UntypedFormGroup({});
  newsletterModel: Record<string, unknown> = {};
  newsletterFields: FormlyFieldConfig[] = [];

  bottomForm = new UntypedFormGroup({});
  bottomModel: Record<string, unknown> = {};
  bottomFields: FormlyFieldConfig[] = [];

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
          const footer = branding.footer ?? ({ params: { mode: 'light' } } as IFooter);
          this.footer.set(footer);
          this.menuItems.set([...(footer.mainMenu ?? [])]);
          this.mobileMenuItems.set([...(footer.mobileMenu ?? [])]);

          this.initParamsFields(footer);
          this.initBrandFields(footer);
          this.initSocialFields(footer);
          this.initNewsletterFields(footer);
          this.initBottomFields(footer);
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
      this.bottomForm.valueChanges
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
      this.jsonPreview.set(JSON.stringify(this.buildFooter(), null, 2));
    } catch {
      /* skip */
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
    try {
      JSON.parse(value);
      this.jsonError.set('');
    } catch (e: unknown) {
      this.jsonError.set((e as Error).message);
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
            type: 'mat-select',
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

  // ── Menu management ──

  onMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    const items = [...this.menuItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.menuItems.set(items);
    this.onMenuChange();
  }

  onMobileMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    const items = [...this.mobileMenuItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.mobileMenuItems.set(items);
    this.onMenuChange();
  }

  onChildDrop(
    list: 'main' | 'mobile',
    menuIndex: number,
    event: CdkDragDrop<FooterMenuGroup[]>
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    const children = [...(items[menuIndex].child ?? [])];
    moveItemInArray(children, event.previousIndex, event.currentIndex);
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
    this.onMenuChange();
  }

  toggleMenuExpand(list: 'main' | 'mobile', index: number): void {
    const sig = list === 'main' ? this.expandedMenuIndex : this.expandedMobileMenuIndex;
    sig.set(sig() === index ? -1 : index);
  }

  addMenuGroup(list: 'main' | 'mobile'): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.update(items => [...items, { label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_GROUP'), child: [] }]);
    this.onMenuChange();
  }

  updateMenuGroup(list: 'main' | 'mobile', index: number, value: string): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    items[index] = { ...items[index], label: value };
    source.set(items);
    this.onMenuChange();
  }

  removeMenuGroup(list: 'main' | 'mobile', index: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const removed = source()[index];
    source.update(items => items.filter((_, i) => i !== index));
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
        source.update(items => {
          const c = [...items];
          c.splice(index, 0, removed);
          return c;
        });
        this.onMenuChange();
      });
  }

  addChildLink(list: 'main' | 'mobile', menuIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    const children = [...(items[menuIndex].child ?? [])];
    children.push({ label: this.translate.instant('BUILDER.EDIT_BRANDING.NEW_LINK'), href: '' });
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
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
    const items = [...source()];
    const children = [...(items[menuIndex].child ?? [])];
    children[childIndex] = { ...children[childIndex], [field]: value };
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
    this.onMenuChange();
  }

  removeChildLink(list: 'main' | 'mobile', menuIndex: number, childIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const removed = source()[menuIndex].child?.[childIndex];
    const items = [...source()];
    const children = (items[menuIndex].child ?? []).filter((_, i) => i !== childIndex);
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
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
          const cur = [...source()];
          const ch = [...(cur[menuIndex].child ?? [])];
          ch.splice(childIndex, 0, removed);
          cur[menuIndex] = { ...cur[menuIndex], child: ch };
          source.set(cur);
          this.onMenuChange();
        });
    }
  }

  private onMenuChange(): void {
    this.markDirty();
    this.updateJsonPreview();
  }

  // ── Build & Save ──

  buildFooter(): IFooter {
    const footer = this.footer()!;
    const brandVal = this.brandForm.value;
    const socialVal = this.socialForm.value;
    const newsletterVal = this.newsletterForm.value;
    const bottomVal = this.bottomForm.value;

    return {
      ...footer,
      params: { ...footer.params, ...this.paramsForm.value },
      footerBrand: {
        ...footer.footerBrand,
        logo: {
          ...footer.footerBrand?.logo,
          img: {
            ...(footer.footerBrand?.logo?.img ?? {}),
            src: brandVal.src,
            alt: brandVal.alt,
            href: brandVal.href,
            classes: brandVal.classes,
          },
        },
        summary: brandVal.summary,
        social: socialVal.social ?? footer.footerBrand?.social ?? [],
      },
      mainMenu: this.menuItems(),
      mobileMenu: this.mobileMenuItems(),
      footerNewsletter: {
        ...footer.footerNewsletter,
        form: footer.footerNewsletter?.form ?? [],
        params: {
          ...footer.footerNewsletter?.params,
          webform_id: newsletterVal.webform_id,
        },
        label: newsletterVal.label,
        summary: newsletterVal.summary,
        action: {
          ...footer.footerNewsletter?.action,
          label: newsletterVal.actionLabel,
        },
      },
      footerBottom: {
        ...footer.footerBottom,
        left: bottomVal.left,
        right: bottomVal.right ?? footer.footerBottom?.right ?? [],
      },
    };
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
        const customConfig = JSON.parse(this.customJson);
        if (customConfig && typeof customConfig === 'object') {
          footer = deepMerge({}, footer, customConfig);
        }
        this.jsonError.set('');
      } catch {
        this.saving.set(false);
        this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.JSON_FORMAT_ERROR'), 'ok');
        return;
      }
    }

    const updatedBranding: IBranding = { ...branding, footer };
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
