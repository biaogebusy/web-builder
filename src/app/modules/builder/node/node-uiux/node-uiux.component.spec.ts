import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { IUiux } from '@core/interface/IBuilder';
import { UIUX } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
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
  // Echo the key back, appending params so count-carrying messages stay assertable
  const translate = {
    instant: vi.fn((key: string, params?: object) =>
      params ? `${key} ${JSON.stringify(params)}` : key
    ),
  };

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
        { provide: TranslateService, useValue: translate },
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

  it('nests the flat rows back into categories, subgroups and items', () => {
    seedGroups();
    component.expandedGroups.set(new Set(['Sections']));

    const tree = component.groupTree();

    expect(tree.length).toBe(1);
    expect(tree[0].name).toBe('Sections');
    // The category's own icon travels with the group, replacing a generic folder glyph
    expect(tree[0].icon).toBe('view-dashboard');
    expect(tree[0].count).toBe(2);
    expect(tree[0].subGroups.map(sub => sub.name)).toEqual(['Hero']);
    expect(tree[0].subGroups[0].items.map(item => item.label)).toEqual([
      'Hero Alpha',
      'Button Beta',
    ]);

    // Collapsed: the category still renders, its disclosure region is simply empty
    component.expandedGroups.set(new Set());
    expect(component.groupTree()[0].subGroups).toEqual([]);
  });

  it('stays in the loading state until the component feed first emits', () => {
    // A silent feed, as on a direct navigation before the shared request resolves
    TestBed.resetTestingModule();
    const pending$ = new Subject<IUiux[]>();
    TestBed.configureTestingModule({
      providers: [
        { provide: UIUX, useValue: pending$.asObservable() },
        { provide: MatDialog, useValue: dialog },
        { provide: NodeService, useValue: nodeService },
        { provide: BuilderService, useValue: builderService },
        { provide: ContentService, useValue: contentService },
        { provide: UtilitiesService, useValue: util },
        { provide: TranslateService, useValue: translate },
      ],
    });
    const pending = TestBed.runInInjectionContext(() => new NodeUiuxComponent());

    expect(pending.initialLoading()).toBe(true);

    pending$.next([]);

    // Only now is the library known to be empty, so the empty state may take over
    expect(pending.initialLoading()).toBe(false);
    expect(pending.totalCount()).toBe(0);
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
    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.CREATE_FAILED',
      'BUILDER.COMMON.OK'
    );
  });

  it('reloads the shared UIUX data after a successful create', () => {
    component.onAdd();
    const dialogConfig = dialog.open.mock.calls[0][1];
    expect(dialogConfig.disableClose).toBe(true);
    dialogConfig.data.inputData.content.form.patchValue({ title: 'Test component' });

    closed$.next(true);

    expect(contentService.reloadUIUX).toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.CREATED',
      'BUILDER.COMMON.OK'
    );
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
    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.UPDATE_FAILED',
      'BUILDER.COMMON.OK'
    );
  });

  it('shows an error and clears loading when deleting fails', () => {
    nodeService.deleteEntity.mockReturnValueOnce(
      throwError(() => new Error('Delete failed'))
    );
    component.onDelete(heroItem);

    closed$.next(true);

    expect(component.loading()).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.DELETE_FAILED',
      'BUILDER.COMMON.OK'
    );
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
      'BUILDER.NODE_UIUX.BULK_PARTIAL {"succeeded":1,"failed":1}',
      'BUILDER.COMMON.OK'
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
    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.BULK_DELETED {"count":2}',
      'BUILDER.COMMON.OK'
    );
  });
});
