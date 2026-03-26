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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { merge as deepMerge } from 'lodash-es';
import { merge } from 'rxjs';

import { IBranding, IHeader, IMainMenu } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-edit-header',
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
    MatSnackBarModule,
    MonacoEditorModule,
    NgxSkeletonLoaderModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    WidgetsModule,
  ],
  templateUrl: './edit-header.component.html',
  styleUrl: './edit-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  canSave = computed(
    () => this.dirty() && !this.loading() && !this.saving() && !!this.header()
  );

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
          this.util.openSnackbar('加载配置失败');
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
            props: { label: '主题切换' },
          },
          {
            key: 'userInfo',
            type: 'toggle',
            defaultValue: params.userInfo,
            props: { label: '用户信息' },
          },
          {
            key: 'menuHoverOpen',
            type: 'toggle',
            defaultValue: params.menuHoverOpen,
            props: { label: '菜单悬停展开' },
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
          { key: 'label', type: 'input', className: 'w-full', defaultValue: logo.label, props: { label: '标签' } },
          { key: 'href', type: 'input', className: 'w-full', defaultValue: logo.href, props: { label: '链接' } },
          { key: 'src', type: 'input', className: 'w-full', defaultValue: logo.img?.src, props: { label: '图片地址' } },
          { key: 'alt', type: 'input', className: 'w-full', defaultValue: logo.img?.alt, props: { label: '图片描述' } },
          { key: 'width', type: 'input', className: 'w-full', defaultValue: logo.img?.width, props: { label: '宽度', type: 'number' } },
          { key: 'height', type: 'input', className: 'w-full', defaultValue: logo.img?.height, props: { label: '高度', type: 'number' } },
          { key: 'version', type: 'toggle', className: 'w-full', defaultValue: logo.version, props: { label: '显示版本号' } },
          { key: 'invert', type: 'input', className: 'w-full', defaultValue: logo.invert, props: { label: '反色图片地址' } },
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
          { key: 'enable', type: 'toggle', className: 'w-full', defaultValue: search.enable, props: { label: '启用搜索' } },
          { key: 'placeholder', type: 'input', className: 'w-full', defaultValue: search.placeholder, props: { label: '占位文本' } },
          { key: 'tooltip', type: 'input', className: 'w-full', defaultValue: search.tooltip, props: { label: '提示文本' } },
          { key: 'link', type: 'input', className: 'w-full', defaultValue: search.link, props: { label: '搜索链接' } },
          { key: 'type', type: 'input', className: 'w-full', defaultValue: search.type, props: { label: '类型' } },
          { key: 'key', type: 'input', className: 'w-full', defaultValue: search.key, props: { label: '关键字参数名' } },
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
        props: { addText: '添加操作按钮' },
        fieldArray: {
          fieldGroupClassName: 'grid gap-0',
          fieldGroup: [
            { key: 'label', type: 'input', className: 'w-full', props: { label: '标签', required: true } },
            { key: 'href', type: 'input', className: 'w-full', props: { label: '链接', required: true } },
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
    this.menuItems.update(items => [...items, { label: '新菜单项', classes: '' }]);
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
    const ref = this.snackBar.open(`已删除「${removed.label}」`, '撤销', { duration: 5000 });
    ref.onAction().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
    children.push({ label: '新子菜单项' });
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
      const ref = this.snackBar.open(`已删除「${removed.label}」`, '撤销', { duration: 5000 });
      ref.onAction().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
    const params = { ...header.params, ...this.paramsForm.value };
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
    const search = { ...header.search, ...this.searchForm.value };
    const actions = this.actionsForm.value?.actions ?? header.actions ?? [];
    const mainMenu = this.menuItems();

    const built: IHeader = { params, logo, mainMenu, search, actions };
    if (header.top) {
      built.top = header.top;
    }
    if (header.banner) {
      (built as unknown as Record<string, unknown>)['banner'] = header.banner;
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
        this.util.openSnackbar('JSON 格式错误，请修正后再保存', 'ok');
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
            this.util.openSnackbar('Header 配置更新成功！', 'ok');
          }
        },
        error: () => {
          this.saving.set(false);
          this.util.openSnackbar('更新失败，请重试');
        },
      });
  }
}
