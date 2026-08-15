import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { IUiux } from '@core/interface/IBuilder';
import { UIUX } from '@core/token/token-providers';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';

import { NodeUiuxComponent } from './node-uiux.component';

describe('NodeUiuxComponent', () => {
  let component: NodeUiuxComponent;
  let closed$: Subject<unknown>;
  let uiux$: BehaviorSubject<IUiux[]>;
  const dialog = { open: vi.fn() };
  const nodeService = {
    addEntity: vi.fn(),
    deleteEntity: vi.fn(),
    fetch: vi.fn(),
  };
  const builderService = { updateAttributes: vi.fn() };
  const contentService = { reloadUIUX: vi.fn() };
  const util = { copy: vi.fn(), openSnackbar: vi.fn() };

  const heroItem = {
    uuid: 'hero-uuid',
    id: 'hero',
    label: 'Hero Alpha',
    icon: null,
    mark: null,
    content: null,
    l1Label: 'Sections',
    l2Label: 'Hero',
  };

  const seedGroups = (): void => {
    uiux$.next([
      {
        label: 'Sections',
        icon: 'view-dashboard',
        type: 'component',
        elements: [
          {
            label: 'Hero',
            child: [
              { uuid: 'hero-uuid', label: 'Hero Alpha', icon: 'image' },
              { uuid: 'button-uuid', label: 'Button Beta', icon: 'button-cursor' },
            ],
          },
        ],
      },
    ]);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    closed$ = new Subject<unknown>();
    uiux$ = new BehaviorSubject<IUiux[]>([]);
    dialog.open.mockReturnValue({ afterClosed: () => closed$ });
    nodeService.addEntity.mockReturnValue(of({ data: { id: 'component-uuid' } }));
    nodeService.deleteEntity.mockReturnValue(of({}));
    nodeService.fetch.mockReturnValue(of({ data: [], included: [] }));
    builderService.updateAttributes.mockReturnValue(of(true));
    // Mock ContentService: re-emit the shared UIUX data when a refresh is triggered
    contentService.reloadUIUX.mockImplementation(() => uiux$.next(uiux$.value));

    TestBed.configureTestingModule({
      providers: [
        { provide: UIUX, useValue: uiux$.asObservable() },
        { provide: MatDialog, useValue: dialog },
        { provide: NodeService, useValue: nodeService },
        { provide: BuilderService, useValue: builderService },
        { provide: ContentService, useValue: contentService },
        { provide: UtilitiesService, useValue: util },
      ],
    });

    component = TestBed.runInInjectionContext(() => new NodeUiuxComponent());
    component.categoriesLoaded.set(true);
  });

  it('searches components inside collapsed groups and hides unmatched groups', () => {
    uiux$.next([
      {
        label: 'Sections',
        icon: 'view-dashboard',
        type: 'component',
        elements: [
          {
            label: 'Hero',
            child: [
              { uuid: 'hero-uuid', label: 'Hero Alpha', icon: 'image' },
            ],
          },
        ],
      },
      {
        label: 'Widget',
        icon: 'widgets',
        type: 'base',
        elements: [
          {
            label: 'Controls',
            child: [
              { uuid: 'button-uuid', label: 'Button Beta', icon: 'button-cursor' },
              { uuid: 'icon-uuid', label: 'Icon Gamma', icon: 'star' },
            ],
          },
        ],
      },
    ]);
    component.expandedGroups.set(new Set(['Sections']));

    component.onSearch('button');

    const rows = component.filteredRows();
    expect(rows.map(row => component.trackRow(0, row))).toEqual([
      'l1:Widget',
      'l2:Controls',
      'item:button-uuid',
    ]);
    expect(component.asL1(rows[0]).count).toBe(1);
    expect(component.asL2(rows[1]).count).toBe(1);
  });

  it('returns no group rows when a search has no matches', () => {
    uiux$.next([
      {
        label: 'Sections',
        icon: 'view-dashboard',
        type: 'component',
        elements: [
          {
            label: 'Hero',
            child: [{ uuid: 'hero-uuid', label: 'Hero Alpha', icon: 'image' }],
          },
        ],
      },
    ]);

    component.onSearch('missing');

    expect(component.filteredRows()).toEqual([]);
    expect(component.visibleItemUuids()).toEqual([]);
  });

  it('does not start creating when the dialog close button is used', () => {
    component.onAdd();

    closed$.next('true');

    expect(nodeService.addEntity).not.toHaveBeenCalled();
    expect(component.loading()).toBe(false);
  });

  it('clears loading when creating the component fails', () => {
    nodeService.addEntity.mockReturnValueOnce(
      throwError(() => new Error('Create failed'))
    );
    component.onAdd();
    const dialogConfig = dialog.open.mock.calls[0][1];
    dialogConfig.data.inputData.content.form.patchValue({ title: 'Test component' });

    closed$.next(true);

    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('创建失败，请稍后重试', '确定');
  });

  it('reloads the shared UIUX data after a successful create', () => {
    component.onAdd();
    const dialogConfig = dialog.open.mock.calls[0][1];
    expect(dialogConfig.disableClose).toBe(true);
    dialogConfig.data.inputData.content.form.patchValue({ title: 'Test component' });

    closed$.next(true);

    expect(contentService.reloadUIUX).toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('创建成功', '确定');
    expect(component.loading()).toBe(false);
  });

  it('preloads current categories when editing and keeps them on save', () => {
    nodeService.fetch.mockReturnValueOnce(
      of({
        data: {
          relationships: {
            category: { data: [{ type: 'taxonomy_term--component_type', id: 'cat-1' }] },
          },
        },
      })
    );

    component.onEdit(heroItem);

    expect(nodeService.fetch).toHaveBeenCalledWith(
      '/api/v1/node/component/hero-uuid',
      'fields[node--component]=category'
    );
    const dialogConfig = dialog.open.mock.calls[0][1];
    expect(dialogConfig.data.inputData.content.form.value.category).toEqual(['cat-1']);

    closed$.next(true);

    expect(builderService.updateAttributes).toHaveBeenCalledWith(
      { uuid: 'hero-uuid' },
      '/api/v1/node/component',
      { title: 'Hero Alpha', icon: null },
      { category: { data: [{ type: 'taxonomy_term--component_type', id: 'cat-1' }] } }
    );
    expect(contentService.reloadUIUX).toHaveBeenCalled();
  });

  it('shows an error and clears loading when updating fails', () => {
    builderService.updateAttributes.mockReturnValueOnce(
      throwError(() => new Error('Update failed'))
    );
    component.onEdit(heroItem);

    closed$.next(true);

    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('更新失败，请稍后重试', '确定');
  });

  it('shows an error and clears loading when deleting fails', () => {
    nodeService.deleteEntity.mockReturnValueOnce(
      throwError(() => new Error('Delete failed'))
    );
    component.onDelete(heroItem);

    closed$.next(true);

    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('删除失败，请稍后重试', '确定');
  });

  it('lists component names in the bulk delete confirmation', () => {
    seedGroups();
    component.selectedIds.set(new Set(['hero-uuid', 'button-uuid']));

    component.onDeleteSelected();

    const body = dialog.open.mock.calls[0][1].data.inputData.content.body;
    expect(body).toContain('Hero Alpha');
    expect(body).toContain('Button Beta');
  });

  it('keeps only failed items selected after a partial bulk delete failure', () => {
    seedGroups();
    nodeService.deleteEntity.mockImplementation((_path: string, id: string) =>
      id === 'button-uuid' ? throwError(() => new Error('Delete failed')) : of({})
    );
    component.selectedIds.set(new Set(['hero-uuid', 'button-uuid']));

    component.onDeleteSelected();
    closed$.next(true);

    expect(component.selectedIds()).toEqual(new Set(['button-uuid']));
    expect(contentService.reloadUIUX).toHaveBeenCalled();
    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith(
      '已删除 1 个，1 个删除失败，已保留其选中状态',
      '确定'
    );
  });

  it('clears the selection and reloads after a fully successful bulk delete', () => {
    seedGroups();
    component.selectedIds.set(new Set(['hero-uuid', 'button-uuid']));

    component.onDeleteSelected();
    closed$.next(true);

    expect(component.selectedIds().size).toBe(0);
    expect(contentService.reloadUIUX).toHaveBeenCalled();
    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('成功删除 2 个组件', '确定');
  });
});
