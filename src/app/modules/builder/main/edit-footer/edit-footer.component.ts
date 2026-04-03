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
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { merge as deepMerge } from 'lodash-es';
import { merge } from 'rxjs';

import { IBranding, IFooter } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';

interface FooterMenuGroup {
  label: string;
  child: { label: string; href?: string }[];
}

@Component({
  selector: 'app-edit-footer',
  templateUrl: './edit-footer.component.html',
  styleUrl: './edit-footer.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.util.openSnackbar('缺少节点参数，请从页面设置进入');
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
          this.util.openSnackbar('加载配置失败');
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
              label: '模式',
              options: [
                { label: '明亮', value: 'light' },
                { label: '反色', value: 'inverse' },
              ],
            },
          },
          {
            key: 'shape',
            type: 'toggle',
            defaultValue: params.shape,
            props: { label: '显示装饰形状' },
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
            props: { label: 'Logo 图片地址' },
          },
          {
            key: 'alt',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['alt'],
            props: { label: '图片描述' },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['href'],
            props: { label: '链接' },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'w-full',
            defaultValue: this.brandModel['classes'],
            props: { label: 'CSS 类' },
          },
          {
            key: 'summary',
            type: 'textarea',
            className: 'w-full',
            defaultValue: this.brandModel['summary'],
            props: { label: '简介', rows: 3 },
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
        props: { addText: '添加社交链接' },
        fieldArray: {
          fieldGroupClassName: 'grid gap-0',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              className: 'w-full',
              props: { label: '标签', required: true },
            },
            {
              key: 'icon',
              fieldGroup: [
                {
                  key: 'svg',
                  type: 'input',
                  className: 'w-full',
                  props: { label: '图标 SVG', required: true },
                },
              ],
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full',
              props: { label: '链接', required: true },
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
            props: { label: '标题' },
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
            props: { label: '描述', rows: 2 },
          },
          {
            key: 'actionLabel',
            type: 'input',
            className: 'w-full',
            defaultValue: this.newsletterModel['actionLabel'],
            props: { label: '按钮文本' },
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
            props: { label: '左侧文本（支持 HTML）' },
          },
        ],
      },
      {
        key: 'right',
        type: 'repeat',
        props: { addText: '添加底部链接' },
        fieldArray: {
          fieldGroupClassName: 'grid gap-0',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              className: 'w-full',
              props: { label: '标签', required: true },
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full',
              props: { label: '链接', required: true },
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
    source.update(items => [...items, { label: '新分组', child: [] }]);
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
    const ref = this.snackBar.open(`已删除「${removed.label}」`, '撤销', { duration: 5000 });
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
    children.push({ label: '新链接', href: '' });
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
      const ref = this.snackBar.open(`已删除「${removed.label}」`, '撤销', { duration: 5000 });
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

    const built: IFooter = {
      params: { ...footer.params, ...this.paramsForm.value },
      footerBrand: {
        ...footer.footerBrand,
        logo: {
          img: {
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
        params: { webform_id: newsletterVal.webform_id },
        label: newsletterVal.label,
        summary: newsletterVal.summary,
        action: { label: newsletterVal.actionLabel },
      },
      footerBottom: {
        left: bottomVal.left,
        right: bottomVal.right ?? footer.footerBottom?.right ?? [],
      },
    };

    if (footer.dynamicFooter) {
      built.dynamicFooter = footer.dynamicFooter;
    }
    if (footer.fixBar) {
      built.fixBar = footer.fixBar;
    }
    if (footer.logo) {
      built.logo = footer.logo;
    }
    if (footer.copyRight) {
      built.copyRight = footer.copyRight;
    }
    if (footer.content) {
      built.content = footer.content;
    }
    return built;
  }

  onSave(): void {
    if (!this.nodeUuid()) {
      this.util.openSnackbar('未找到配置节点信息，无法保存');
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
        this.util.openSnackbar('JSON 格式错误，请修正后再保存', 'ok');
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
            this.util.openSnackbar('Footer 配置更新成功！', 'ok');
          }
        },
        error: () => {
          this.saving.set(false);
          this.util.openSnackbar('更新失败，请重试');
        },
      });
  }
}
