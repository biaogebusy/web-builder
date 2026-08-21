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
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentService } from '@core/service/content.service';
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
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, skip, switchMap, take, tap } from 'rxjs/operators';

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
  selector: 'app-node-uiux',
  templateUrl: './node-uiux.component.html',
  styleUrl: './node-uiux.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    IconComponent,
    LoadingComponent,
  ],
})
export class NodeUiuxComponent {
  private uiux$ = inject<Observable<IUiux[]>>(UIUX);
  private uiuxData = toSignal(this.uiux$, { initialValue: [] as IUiux[] });
  private orderedUiuxData = computed(() => {
    const groups = this.uiuxData();
    const regularGroups = groups.filter(group => !this.isWidgetGroup(group));
    const widgetGroups = groups.filter(group => this.isWidgetGroup(group));
    return [...regularGroups, ...widgetGroups];
  });
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private contentService = inject(ContentService);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  categories = signal<ICategoryOption[]>([]);
  categoriesLoaded = signal(false);
  searchText = '';
  private searchQuery = signal('');
  readonly hasSearchQuery = computed(() => this.searchQuery().trim().length > 0);
  expandedGroups = signal<Set<string>>(new Set());
  selectedIds = signal<Set<string>>(new Set());
  private injector = inject(Injector);
  private groupsInitialized = false;

  totalCount = computed(() =>
    this.orderedUiuxData().reduce((sum, l1) => {
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

  // After successful CRUD, refresh the shared UIUX data: wait for the new data to land before hiding loading, and drop selected items that no longer exist
  private refreshList(): void {
    this.uiux$.pipe(skip(1), take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const valid = new Set(
        this.tableRows()
          .filter((row): row is IComponentItem => 'uuid' in row)
          .map(item => item.uuid)
      );
      this.selectedIds.update(set => new Set([...set].filter(id => valid.has(id))));
      this.loading.set(false);
    });
    this.contentService.reloadUIUX();
  }

  constructor() {
    effect(() => {
      const data = this.orderedUiuxData();
      if (data.length > 0 && !this.groupsInitialized) {
        this.groupsInitialized = true;
        this.expandedGroups.set(new Set([data[0].label]));
      }
    }, { injector: this.injector });
  }

  toggleGroup(name: string): void {
    this.expandedGroups.update(set => {
      const next = new Set(set);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  isExpanded(name: string): boolean {
    return this.expandedGroups().has(name);
  }

  allExpanded = computed(() => {
    const groups = this.orderedUiuxData();
    return groups.length > 0 && groups.every(group => this.expandedGroups().has(group.label));
  });

  toggleExpandAll(): void {
    if (this.allExpanded()) {
      this.expandedGroups.set(new Set());
    } else {
      this.expandedGroups.set(new Set(this.orderedUiuxData().map(group => group.label)));
    }
  }

  tableRows = computed<TableRow[]>(() => {
    const rows: TableRow[] = [];
    this.orderedUiuxData().forEach(l1 => {
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
    const rows = this.tableRows();
    if (!q) {
      const expanded = this.expandedGroups();
      let currentL1 = '';
      return rows.filter(row => {
        if ((row as GroupL1Row).isL1Group) {
          currentL1 = (row as GroupL1Row).name;
          return true;
        }
        return expanded.has(currentL1);
      });
    }

    const result: TableRow[] = [];
    let currentL1: GroupL1Row | null = null;
    let currentL2: GroupL2Row | null = null;
    let l2Matches: IComponentItem[] = [];
    let matchedSections: { group: GroupL2Row; items: IComponentItem[] }[] = [];

    const flushL2 = (): void => {
      if (currentL2 && l2Matches.length > 0) {
        matchedSections.push({
          group: { ...currentL2, count: l2Matches.length },
          items: l2Matches,
        });
      }
      l2Matches = [];
    };

    const flushL1 = (): void => {
      flushL2();
      if (currentL1 && matchedSections.length > 0) {
        const count = matchedSections.reduce((sum, section) => sum + section.items.length, 0);
        result.push({ ...currentL1, count });
        matchedSections.forEach(section => {
          result.push(section.group, ...section.items);
        });
      }
      matchedSections = [];
    };

    rows.forEach(row => {
      if ((row as GroupL1Row).isL1Group) {
        flushL1();
        currentL1 = row as GroupL1Row;
        currentL2 = null;
        return;
      }
      if ((row as GroupL2Row).isL2Group) {
        flushL2();
        currentL2 = row as GroupL2Row;
        return;
      }

      const item = row as IComponentItem;
      const matches = item.label.toLowerCase().includes(q) ||
        (item.icon || '').toLowerCase().includes(q);
      if (matches) {
        l2Matches.push(item);
      }
    });
    flushL1();

    return result;
  });

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchQuery.set('');
  }

  isL1Group = (_: number, row: TableRow) => !!(row as GroupL1Row).isL1Group;
  isL2Group = (_: number, row: TableRow) => !!(row as GroupL2Row).isL2Group;
  isData = (_: number, row: TableRow) =>
    !(row as GroupL1Row).isL1Group && !(row as GroupL2Row).isL2Group;

  asL1 = (row: TableRow) => row as GroupL1Row;
  asL2 = (row: TableRow) => row as GroupL2Row;
  asItem = (row: TableRow) => row as IComponentItem;

  private isWidgetGroup(group: IUiux): boolean {
    return group.type === 'base' || group.label.trim().toLowerCase() === 'widget';
  }

  onCopyId(item: IComponentItem): void {
    this.util.copy(item.uuid);
    this.util.openSnackbar('组件 ID 已复制', '确定');
  }

  onPreview(item: IComponentItem): void {
    if (!item.content || typeof item.content !== 'object') {
      this.util.openSnackbar('该组件暂无可预览内容', '确定');
      return;
    }

    const config: IDialog = {
      title: `预览：${item.label}`,
      disableActions: true,
      inputData: {
        content: { ...item.content, animate: false },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: ['close-outside', 'close-icon-white'],
      data: config,
    });
  }

  onAdd(): void {
    this.loading.set(true);
    this.categories$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: cats => {
          this.loading.set(false);
          const form = new UntypedFormGroup({
            title: new FormControl('', Validators.required),
            icon: new FormControl(''),
            category: new FormControl([]),
            body: new FormControl({}),
          });
          const model = { title: '', icon: '', category: [], body: {} };
          this.dialog
            .open(DialogComponent, {
              width: '900px',
              disableClose: true,
              data: this.buildFormDialog('新增组件', form, model, cats, true),
            })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(confirmed => {
              if (confirmed !== true) return;
              const { title, icon, category, body } = form.value;
              const trimmedTitle = title?.trim();
              if (!trimmedTitle) {
                this.util.openSnackbar('标题不能为空', '确定');
                return;
              }
              const bodyValue = body && typeof body === 'object' ? body : {};
              const catData = (category || []).map((id: string) => ({
                type: 'taxonomy_term--component_type', id,
              }));
              this.loading.set(true);
              this.nodeService
                .addEntity('/api/v1/node/component', {
                  title: trimmedTitle,
                  icon: icon || null,
                  body: JSON.stringify(bodyValue),
                })
                .pipe(
                  switchMap((res: any) =>
                    this.builderService.updateAttributes(
                      { uuid: res.data.id },
                      '/api/v1/node/component',
                      {},
                      { category: { data: catData } }
                    )
                  ),
                  takeUntilDestroyed(this.destroyRef)
                )
                .subscribe({
                  next: () => {
                    this.util.openSnackbar('创建成功', '确定');
                    this.refreshList();
                  },
                  error: () => {
                    this.loading.set(false);
                    this.util.openSnackbar('创建失败，请稍后重试', '确定');
                  },
                });
            });
        },
        error: () => {
          this.loading.set(false);
          this.util.openSnackbar('加载分类失败，请稍后重试', '确定');
        },
      });
  }

  onEdit(item: IComponentItem): void {
    this.loading.set(true);
    forkJoin({
      cats: this.categories$(),
      node: this.nodeService.fetch(
        `/api/v1/node/component/${item.uuid}`,
        'fields[node--component]=category'
      ),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ cats, node }) => {
          this.loading.set(false);
          // Backfill the current categories so saving does not clear the existing ones
          const currentCatIds: string[] = (node?.data?.relationships?.category?.data || []).map(
            (c: any) => c.id
          );
          const form = new UntypedFormGroup({
            title: new FormControl(item.label, Validators.required),
            icon: new FormControl(item.icon || ''),
            category: new FormControl(currentCatIds),
          });
          const model = { title: item.label, icon: item.icon || '', category: currentCatIds };
          this.dialog
            .open(DialogComponent, {
              width: '500px',
              disableClose: true,
              data: this.buildFormDialog('编辑组件', form, model, cats),
            })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(confirmed => {
              if (confirmed !== true) return;
              const { title, icon, category } = form.value;
              const trimmedTitle = title?.trim();
              if (!trimmedTitle) {
                this.util.openSnackbar('标题不能为空', '确定');
                return;
              }
              this.loading.set(true);
              const catData = (category || []).map((id: string) => ({
                type: 'taxonomy_term--component_type', id,
              }));
              this.builderService
                .updateAttributes(
                  { uuid: item.uuid },
                  '/api/v1/node/component',
                  { title: trimmedTitle, icon: icon || null },
                  { category: { data: catData } }
                )
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                  next: () => {
                    this.util.openSnackbar('更新成功', '确定');
                    this.refreshList();
                  },
                  error: () => {
                    this.loading.set(false);
                    this.util.openSnackbar('更新失败，请稍后重试', '确定');
                  },
                });
            });
        },
        error: () => {
          this.loading.set(false);
          this.util.openSnackbar('加载组件信息失败，请稍后重试', '确定');
        },
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
      disableClose: true,
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
          .subscribe({
            next: () => {
              this.util.openSnackbar('删除成功', '确定');
              this.refreshList();
            },
            error: () => {
              this.loading.set(false);
              this.util.openSnackbar('删除失败，请稍后重试', '确定');
            },
          });
      });
  }

  onDeleteSelected(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) {
      return;
    }
    // List the components to be deleted in the confirm dialog to avoid deleting off-screen selections by mistake
    const labelByUuid = new Map(
      this.tableRows()
        .filter((row): row is IComponentItem => 'uuid' in row)
        .map(item => [item.uuid, item.label] as [string, string])
    );
    const names = ids.map(id => labelByUuid.get(id) || id);
    const shownNames = names.slice(0, 8).join('、');
    const restCount = names.length - Math.min(names.length, 8);
    const config: IDialog = {
      title: '批量删除组件',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '删除',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body:
            `确定要删除以下 <strong>${ids.length}</strong> 个组件吗？<br>` +
            `${shownNames}${restCount > 0 ? `……（另 ${restCount} 个）` : ''}`,
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '420px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.loading.set(true);
        // Collect results per item instead of fail-fast, keeping failed items for targeted retries
        const requests = ids.map(uuid =>
          this.nodeService.deleteEntity('/api/v1/node/component', uuid).pipe(
            map(() => ({ uuid, ok: true })),
            catchError(() => of({ uuid, ok: false }))
          )
        );
        forkJoin(requests)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(results => {
            const failed = results.filter(result => !result.ok);
            const succeeded = results.length - failed.length;
            if (failed.length === 0) {
              this.clearSelection();
              this.util.openSnackbar(`成功删除 ${succeeded} 个组件`, '确定');
            } else {
              this.selectedIds.set(new Set(failed.map(result => result.uuid)));
              this.util.openSnackbar(
                `已删除 ${succeeded} 个，${failed.length} 个删除失败，已保留其选中状态`,
                '确定'
              );
            }
            this.refreshList();
          });
      });
  }

  // Lazily fetch categories once, then cache
  private categories$(): Observable<ICategoryOption[]> {
    if (this.categoriesLoaded()) {
      return of(this.categories());
    }
    return this.nodeService
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
        }),
        tap(cats => {
          this.categories.set(cats);
          this.categoriesLoaded.set(true);
        })
      );
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
