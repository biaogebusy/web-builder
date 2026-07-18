import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NodeService } from '@core/service/node.service';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { IBuilderComponent, IUiux } from '@core/interface/IBuilder';
import { UIUX } from '@core/token/token-providers';
import { Observable, forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface IComponentItem {
  uuid: string;
  id: string;
  label: string;
  icon: string | null;
  mark: string | null;
  content: any;
  l1Label: string;
  l2Label: string;
}

interface GroupL1Row {
  isL1Group: true;
  name: string;
  count: number;
}

interface GroupL2Row {
  isL2Group: true;
  name: string;
  count: number;
}

interface ICategoryOption {
  id: string;
  name: string;
  l1Name: string;
}

type TableRow = GroupL1Row | GroupL2Row | IComponentItem;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manage-uiux',
  templateUrl: './manage-uiux.component.html',
  styleUrl: './manage-uiux.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    IconComponent,
    LoadingComponent,
  ],
})
export class ManageUiuxComponent {
  private uiuxData = toSignal(inject<Observable<IUiux[]>>(UIUX), { initialValue: [] as IUiux[] });
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  categories = signal<ICategoryOption[]>([]);
  categoriesLoaded = signal(false);
  searchText = '';
  private searchQuery = signal('');
  expandedGroups = signal<Set<string>>(new Set());
  selectedIds = signal<Set<string>>(new Set());
  private injector = inject(Injector);
  private groupsInitialized = false;

  readonly displayedColumns = ['label', 'icon', 'actions'];
  readonly l1GroupColumns = ['l1group'];
  readonly l2GroupColumns = ['l2group'];

  totalCount = computed(() =>
    this.uiuxData().reduce((sum, l1) => {
      const elements = Array.isArray(l1.elements) ? (l1.elements as IBuilderComponent[]) : [];
      return sum + elements.reduce((s, l2) => s + (l2.child?.length || 0), 0);
    }, 0)
  );

  visibleItemUuids = computed<string[]>(() => {
    const ids: string[] = [];
    this.filteredRows().forEach(row => {
      if (!('uuid' in row) || !(row as IComponentItem).uuid) {
        return;
      }
      ids.push((row as IComponentItem).uuid);
    });
    return ids;
  });

  selectedCount = computed(() => this.selectedIds().size);

  isAllSelected = computed(() => {
    const visible = this.visibleItemUuids();
    if (visible.length === 0) {
      return false;
    }
    const sel = this.selectedIds();
    return visible.every(id => sel.has(id));
  });

  isIndeterminate = computed(() => {
    const visible = this.visibleItemUuids();
    const sel = this.selectedIds();
    const someSelected = visible.some(id => sel.has(id));
    return someSelected && !visible.every(id => sel.has(id));
  });

  isItemSelected = (uuid: string): boolean => this.selectedIds().has(uuid);

  trackRow = (_: number, row: TableRow): string => {
    if ((row as GroupL1Row).isL1Group) {
      return `l1:${(row as GroupL1Row).name}`;
    }
    if ((row as GroupL2Row).isL2Group) {
      return `l2:${(row as GroupL2Row).name}`;
    }
    return `item:${(row as IComponentItem).uuid}`;
  };

  toggleSelect(uuid: string, checked: boolean): void {
    this.selectedIds.update(set => {
      const next = new Set(set);
      if (checked) {
        next.add(uuid);
      } else {
        next.delete(uuid);
      }
      return next;
    });
  }

  toggleSelectAll(checked: boolean): void {
    this.selectedIds.update(set => {
      const next = new Set(set);
      if (checked) {
        this.visibleItemUuids().forEach(id => next.add(id));
      } else {
        this.visibleItemUuids().forEach(id => next.delete(id));
      }
      return next;
    });
  }

  clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  constructor() {
    effect(() => {
      const data = this.uiuxData();
      if (data.length > 0 && !this.groupsInitialized) {
        this.groupsInitialized = true;
        this.expandedGroups.set(new Set([data[0].label]));
      }
    }, { injector: this.injector });
  }

  toggleGroup(name: string): void {
    this.expandedGroups.update(set => {
      const next = new Set(set);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  isExpanded(name: string): boolean {
    return this.expandedGroups().has(name);
  }

  tableRows = computed<TableRow[]>(() => {
    const rows: TableRow[] = [];
    this.uiuxData().forEach(l1 => {
      const elements = Array.isArray(l1.elements) ? (l1.elements as IBuilderComponent[]) : [];
      const l1Count = elements.reduce((s, l2) => s + (l2.child?.length || 0), 0);
      rows.push({ isL1Group: true, name: l1.label, count: l1Count });
      elements.forEach(l2 => {
        const items: IComponentItem[] = (l2.child || []).map(item => ({
          uuid: item.uuid || '',
          id: item.id || '',
          label: item.label || '',
          icon: item.icon || null,
          mark: item.mark || null,
          content: item.content ?? null,
          l1Label: l1.label,
          l2Label: l2.label,
        }));
        rows.push({ isL2Group: true, name: l2.label, count: items.length });
        rows.push(...items);
      });
    });
    return rows;
  });

  filteredRows = computed<TableRow[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const expanded = this.expandedGroups();
    const rows = this.tableRows();
    const result: TableRow[] = [];
    let currentL1 = '';
    let l2Row: GroupL2Row | null = null;
    let l1Added = false;
    let l2Added = false;

    rows.forEach(row => {
      if ((row as GroupL1Row).isL1Group) {
        currentL1 = (row as GroupL1Row).name;
        l2Row = null; l1Added = false; l2Added = false;
        result.push(row); // always show L1 headers
      } else if (!expanded.has(currentL1)) {
        // collapsed — skip everything inside
      } else if ((row as GroupL2Row).isL2Group) {
        l2Row = row as GroupL2Row; l2Added = false;
        if (!q) result.push(row);
      } else {
        const item = row as IComponentItem;
        const matches = !q ||
          item.label.toLowerCase().includes(q) ||
          (item.icon || '').toLowerCase().includes(q);
        if (matches) {
          if (q && !l1Added) { l1Added = true; } // L1 already pushed
          if (q && !l2Added && l2Row) { result.push(l2Row); l2Added = true; }
          result.push(item);
        }
      }
    });
    return result;
  });

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  isL1Group = (_: number, row: TableRow) => !!(row as GroupL1Row).isL1Group;
  isL2Group = (_: number, row: TableRow) => !!(row as GroupL2Row).isL2Group;
  isData = (_: number, row: TableRow) =>
    !(row as GroupL1Row).isL1Group && !(row as GroupL2Row).isL2Group;

  asL1 = (row: TableRow) => row as GroupL1Row;
  asL2 = (row: TableRow) => row as GroupL2Row;
  asItem = (row: TableRow) => row as IComponentItem;

  onAdd(): void {
    this.withCategories(cats => {
      const form = new UntypedFormGroup({
        title: new FormControl(''),
        icon: new FormControl(''),
        category: new FormControl([]),
        body: new FormControl({}),
      });
      const model = { title: '', icon: '', category: [], body: {} };
      this.dialog
        .open(DialogComponent, { width: '900px', data: this.buildFormDialog('新增组件', form, model, cats, true) })
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(confirmed => {
          if (!confirmed) return;
          const { title, icon, category, body } = form.value;
          const bodyValue = body && typeof body === 'object' ? body : {};
          this.loading.set(true);
          this.nodeService
            .addEntity('/api/v1/node/component', {
              title: title?.trim(),
              icon: icon || null,
              body: JSON.stringify(bodyValue),
            })
            .pipe(
              map((res: any) => res.data.id),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(uuid => {
              const catData = (category || []).map((id: string) => ({
                type: 'taxonomy_term--component_type', id,
              }));
              this.builderService
                .updateAttributes({ uuid }, '/api/v1/node/component', {}, { category: { data: catData } })
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                  this.util.openSnackbar('创建成功', 'ok');
                  this.loading.set(false);
                });
            });
        });
    });
  }

  onEdit(item: IComponentItem): void {
    this.withCategories(cats => {
      const form = new UntypedFormGroup({
        title: new FormControl(item.label),
        icon: new FormControl(item.icon || ''),
        category: new FormControl([]),
      });
      const model = { title: item.label, icon: item.icon || '', category: [] };
      this.dialog
        .open(DialogComponent, { width: '500px', data: this.buildFormDialog('编辑组件', form, model, cats) })
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(confirmed => {
          if (!confirmed) return;
          const { title, icon, category } = form.value;
          this.loading.set(true);
          const catData = (category || []).map((id: string) => ({
            type: 'taxonomy_term--component_type', id,
          }));
          this.builderService
            .updateAttributes(
              { uuid: item.uuid },
              '/api/v1/node/component',
              { title: title?.trim(), icon: icon || null },
              { category: { data: catData } }
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.util.openSnackbar('更新成功', 'ok');
              this.loading.set(false);
            });
        });
    });
  }

  onEditJson(item: IComponentItem): void {
    const jsonWidget: IJsoneditor = {
      type: 'jsoneditor',
      data: item.content ?? {},
      isSetting: true,
      fullWidth: true,
      schemaType: 'none',
      actions: [{ type: 'update', label: '保存', params: { uuid: item.uuid, api: '/api/v1/node/component' } }],
    };
    this.dialog.open(DialogComponent, {
      width: '900px',
      panelClass: ['close-outside', 'close-icon-white'],
      data: { disableActions: true, inputData: { content: jsonWidget } } as IDialog,
    });
  }

  onDelete(item: IComponentItem): void {
    const config: IDialog = {
      title: '删除组件',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '删除',
      inputData: { content: { type: 'text', fullWidth: true, body: `确定要删除 <strong>${item.label}</strong> 吗？` } },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.loading.set(true);
        this.nodeService
          .deleteEntity('/api/v1/node/component', item.uuid)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.util.openSnackbar('删除成功', 'ok');
            this.loading.set(false);
          });
      });
  }

  onDeleteSelected(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) {
      return;
    }
    const config: IDialog = {
      title: '批量删除组件',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '删除',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `确定要删除选中的 <strong>${ids.length}</strong> 个组件吗？`,
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.loading.set(true);
        const requests = ids.map(uuid =>
          this.nodeService.deleteEntity('/api/v1/node/component', uuid),
        );
        forkJoin(requests)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.clearSelection();
              this.util.openSnackbar(`成功删除 ${ids.length} 个组件`, 'ok');
              this.loading.set(false);
            },
            error: () => {
              this.util.openSnackbar('部分删除失败，请稍后重试', 'ok');
              this.loading.set(false);
            },
          });
      });
  }

  // Lazily fetch categories once, then cache
  private withCategories(cb: (cats: ICategoryOption[]) => void): void {
    if (this.categoriesLoaded()) {
      cb(this.categories());
      return;
    }
    this.nodeService
      .fetch('/api/v1/taxonomy_term/component_type', 'include=parent&page[limit]=200')
      .pipe(
        take(1),
        map((res: any) => {
          const allTerms: any[] = res.data || [];
          const included: any[] = res.included || [];
          const nameMap = new Map<string, string>();
          [...allTerms, ...included].forEach((t: any) => {
            if (t.attributes?.name) nameMap.set(t.id, t.attributes.name);
          });
          const parentMap = new Map<string, string>();
          allTerms.forEach((t: any) => {
            const real = (t.relationships?.parent?.data || []).find(
              (p: any) => p.type === 'taxonomy_term--component_type' && p.id !== 'virtual' && p.id !== t.id
            );
            if (real) parentMap.set(t.id, real.id);
          });
          const getL1 = (id: string, depth = 0): string => {
            if (depth > 5) return nameMap.get(id) || id;
            const pid = parentMap.get(id);
            return pid ? getL1(pid, depth + 1) : (nameMap.get(id) || id);
          };
          const getPath = (id: string, depth = 0): string => {
            if (depth > 5) return nameMap.get(id) || id;
            const pid = parentMap.get(id);
            const name = nameMap.get(id) || id;
            return pid ? `${getPath(pid, depth + 1)} > ${name}` : name;
          };
          return allTerms.map((t: any) => ({
            id: t.id,
            name: getPath(t.id),
            l1Name: getL1(t.id),
          }));
        })
      )
      .subscribe(cats => {
        this.categories.set(cats);
        this.categoriesLoaded.set(true);
        cb(cats);
      });
  }

  private buildFormDialog(
    title: string,
    form: UntypedFormGroup,
    model: any,
    cats: ICategoryOption[],
    includeBody = false,
  ): IDialog {
    const fields: FormlyFieldConfig[] = [
      { type: 'input', key: 'title', props: { label: '标题', appearance: 'fill', required: true } },
      { type: 'input', key: 'icon', props: { label: '图标', appearance: 'fill', description: 'Material Design Icons 图标名称' } },
      { type: 'select', key: 'category', props: { label: '分类', appearance: 'fill', multiple: true, options: cats.map(c => ({ value: c.id, label: c.name })) } },
    ];
    if (includeBody) {
      fields.push({
        type: 'json',
        key: 'body',
        defaultValue: {},
        props: { label: 'Body (组件数据)', description: 'JSON 格式的组件内容数据,默认为空对象 {}' },
      });
    }
    return {
      title, noLabel: '取消', yesLabel: '确认',
      inputData: { content: { content: { type: 'formly' }, form, model, fullWidth: true, fields } },
    };
  }
}
