import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { merge } from 'lodash-es';

import { IBranding, IFooter } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

interface FooterMenuGroup {
  label: string;
  child: { label: string; href?: string }[];
}

@Component({
  selector: 'app-edit-footer',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MonacoEditorModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    WidgetsModule,
  ],
  templateUrl: './edit-footer.component.html',
  styleUrl: './edit-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFooterComponent implements OnInit {
  loading = signal(false);
  branding = signal<IBranding | null>(null);
  footer = signal<IFooter | null>(null);
  menuItems = signal<FooterMenuGroup[]>([]);
  mobileMenuItems = signal<FooterMenuGroup[]>([]);
  expandedMenuIndex = signal<number>(-1);
  expandedMobileMenuIndex = signal<number>(-1);
  nodeUuid = signal('');
  nodeLangcode = signal('');

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

  customJson = '';
  monacoOptions = {
    theme: 'vs-dark',
    language: 'json',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    fontSize: 14,
  };

  queryParams: Record<string, string> = {};

  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private builderService = inject(BuilderService);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
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
          const footer = branding.footer ?? { params: { mode: 'light' } } as IFooter;
          this.footer.set(footer);
          this.menuItems.set([...(footer.mainMenu ?? [])]);
          this.mobileMenuItems.set([...(footer.mobileMenu ?? [])]);

          this.initParamsFields(footer);
          this.initBrandFields(footer);
          this.initSocialFields(footer);
          this.initNewsletterFields(footer);
          this.initBottomFields(footer);
          this.customJson = JSON.stringify(footer, null, 2);
          this.loading.set(false);
        },
        error: () => {
          this.util.openSnackbar('加载配置失败');
          this.loading.set(false);
        },
      });
  }

  initParamsFields(footer: IFooter): void {
    const params = footer.params ?? { mode: 'light' };
    this.paramsModel = { ...params };
    this.paramsFields = [
      {
        fieldGroupClassName: 'flex flex-wrap gap-4',
        fieldGroup: [
          {
            key: 'mode',
            type: 'mat-select',
            defaultValue: params.mode,
            className: 'w-full md:w-1/2',
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
        fieldGroupClassName: 'flex flex-wrap',
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
            className: 'w-full md:w-1/2',
            defaultValue: this.brandModel['alt'],
            props: { label: '图片描述' },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full md:w-1/2',
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
    const social = footer.footerBrand?.social ?? [];
    this.socialModel = { social };
    this.socialFields = [
      {
        key: 'social',
        type: 'repeat',
        props: { addText: '添加社交链接' },
        fieldArray: {
          fieldGroupClassName: 'flex flex-wrap',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              className: 'w-full md:w-1/3',
              props: { label: '标签', required: true },
            },
            {
              key: 'icon',
              fieldGroup: [
                {
                  key: 'svg',
                  type: 'input',
                  className: 'w-full md:w-1/3',
                  props: { label: '图标 SVG 名称', required: true },
                },
              ],
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full md:w-1/3',
              props: { label: '链接', required: true },
            },
          ],
        },
      },
    ];
  }

  initNewsletterFields(footer: IFooter): void {
    const newsletter = footer.footerNewsletter;
    this.newsletterModel = {
      webform_id: newsletter?.params?.webform_id ?? '',
      label: newsletter?.label ?? '',
      summary: newsletter?.summary ?? '',
      actionLabel: newsletter?.action?.label ?? '',
    };
    this.newsletterFields = [
      {
        fieldGroupClassName: 'flex flex-wrap',
        fieldGroup: [
          {
            key: 'label',
            type: 'input',
            className: 'w-full md:w-1/2',
            defaultValue: this.newsletterModel['label'],
            props: { label: '标题' },
          },
          {
            key: 'webform_id',
            type: 'input',
            className: 'w-full md:w-1/2',
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
            className: 'w-full md:w-1/2',
            defaultValue: this.newsletterModel['actionLabel'],
            props: { label: '按钮文本' },
          },
        ],
      },
    ];
  }

  initBottomFields(footer: IFooter): void {
    const bottom = footer.footerBottom;
    this.bottomModel = {
      left: bottom?.left ?? '',
      right: bottom?.right ?? [],
    };
    this.bottomFields = [
      {
        fieldGroupClassName: 'flex flex-wrap',
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
          fieldGroupClassName: 'flex flex-wrap',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              className: 'w-full md:w-1/2',
              props: { label: '标签', required: true },
            },
            {
              key: 'href',
              type: 'input',
              className: 'w-full md:w-1/2',
              props: { label: '链接', required: true },
            },
          ],
        },
      },
    ];
  }

  // Menu drag-drop
  onMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    const items = [...this.menuItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.menuItems.set(items);
  }

  onMobileMenuDrop(event: CdkDragDrop<FooterMenuGroup[]>): void {
    const items = [...this.mobileMenuItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.mobileMenuItems.set(items);
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
  }

  toggleMenuExpand(list: 'main' | 'mobile', index: number): void {
    const sig = list === 'main' ? this.expandedMenuIndex : this.expandedMobileMenuIndex;
    sig.set(sig() === index ? -1 : index);
  }

  addMenuGroup(list: 'main' | 'mobile'): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.update(items => [...items, { label: '新分组', child: [] }]);
  }

  updateMenuGroup(
    list: 'main' | 'mobile',
    index: number,
    value: string
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    items[index] = { ...items[index], label: value };
    source.set(items);
  }

  removeMenuGroup(list: 'main' | 'mobile', index: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    source.update(items => items.filter((_, i) => i !== index));
    const sig = list === 'main' ? this.expandedMenuIndex : this.expandedMobileMenuIndex;
    if (sig() === index) {
      sig.set(-1);
    }
  }

  addChildLink(list: 'main' | 'mobile', menuIndex: number): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    const children = [...(items[menuIndex].child ?? [])];
    children.push({ label: '新链接', href: '' });
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
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
  }

  removeChildLink(
    list: 'main' | 'mobile',
    menuIndex: number,
    childIndex: number
  ): void {
    const source = list === 'main' ? this.menuItems : this.mobileMenuItems;
    const items = [...source()];
    const children = (items[menuIndex].child ?? []).filter(
      (_, i) => i !== childIndex
    );
    items[menuIndex] = { ...items[menuIndex], child: children };
    source.set(items);
  }

  buildFooter(): IFooter {
    const footer = this.footer()!;
    const paramsVal = this.paramsForm.value;
    const brandVal = this.brandForm.value;
    const socialVal = this.socialForm.value;
    const newsletterVal = this.newsletterForm.value;
    const bottomVal = this.bottomForm.value;

    const built: IFooter = {
      params: { ...footer.params, ...paramsVal },
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

    this.loading.set(true);
    const branding = this.branding()!;
    let footer = this.buildFooter();

    try {
      const customConfig = JSON.parse(this.customJson);
      if (customConfig && typeof customConfig === 'object') {
        footer = merge({}, footer, customConfig);
      }
    } catch {
      // custom JSON invalid — use visual editor values only
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
          this.loading.set(false);
          if (res) {
            this.util.openSnackbar('Footer 配置更新成功！', 'ok');
          }
        },
        error: () => {
          this.loading.set(false);
          this.util.openSnackbar('更新失败，请重试');
        },
      });
  }
}
