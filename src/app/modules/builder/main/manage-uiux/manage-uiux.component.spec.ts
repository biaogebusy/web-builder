import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { IUiux } from '@core/interface/IBuilder';
import { UIUX } from '@core/token/token-providers';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';

import { ManageUiuxComponent } from './manage-uiux.component';

describe('ManageUiuxComponent', () => {
  let component: ManageUiuxComponent;
  let closed$: Subject<unknown>;
  let uiux$: BehaviorSubject<IUiux[]>;
  const dialog = { open: vi.fn() };
  const nodeService = {
    addEntity: vi.fn(() => of({ data: { id: 'component-uuid' } })),
    fetch: vi.fn(() => of({ data: [], included: [] })),
  };
  const builderService = { updateAttributes: vi.fn(() => of(true)) };
  const util = { copy: vi.fn(), openSnackbar: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    closed$ = new Subject<unknown>();
    uiux$ = new BehaviorSubject<IUiux[]>([]);
    dialog.open.mockReturnValue({ afterClosed: () => closed$ });

    TestBed.configureTestingModule({
      providers: [
        { provide: UIUX, useValue: uiux$.asObservable() },
        { provide: MatDialog, useValue: dialog },
        { provide: NodeService, useValue: nodeService },
        { provide: BuilderService, useValue: builderService },
        { provide: UtilitiesService, useValue: util },
      ],
    });

    component = TestBed.runInInjectionContext(() => new ManageUiuxComponent());
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
    expect(util.openSnackbar).toHaveBeenCalledWith('创建失败，请稍后重试', 'ok');
  });
});
