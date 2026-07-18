import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { of, throwError } from 'rxjs';

import { BuilderShowcaseComponent } from './builder-showcase.component';

describe('BuilderShowcaseComponent', () => {
  let component: BuilderShowcaseComponent;
  let fixture: ComponentFixture<BuilderShowcaseComponent>;
  const builder = {
    COPYCOMPONENTKEY: 'cck',
    currentPage: { body: [] },
    currentShowcase: signal(false),
    cancelFixedShowcase: vi.fn(),
    pushComponent: vi.fn(),
  };
  const dialog = { open: vi.fn() };
  const nodeService = { deleteEntity: vi.fn(() => of({})) };
  const util = { copy: vi.fn(), openSnackbar: vi.fn() };
  const translate = {
    instant: vi.fn((key: string, params?: { type?: string }) =>
      params?.type ? `${key}:${params.type}` : key
    ),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [BuilderShowcaseComponent],
      providers: [
        { provide: BuilderState, useValue: builder },
        { provide: MatDialog, useValue: dialog },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
        {
          provide: ScreenService,
          useValue: { isPlatformBrowser: () => false, scrollToAnchor: vi.fn() },
        },
        { provide: LocalStorageService, useValue: { store: vi.fn() } },
        { provide: TranslateService, useValue: translate },
        {
          provide: USER,
          useValue: signal({
            roles: ['administrator'],
            current_user: { roles: ['administrator'] },
          }),
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BuilderShowcaseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the showcased component after confirmation', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });

    component.onDelete({ uuid: 'component-uuid', content: { type: 'hero-1v1' } });

    expect(nodeService.deleteEntity).toHaveBeenCalledWith(
      '/api/v1/node/component',
      'component-uuid'
    );
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.SHOWCASE.DELETED:hero-1v1', 'ok');
    expect(builder.cancelFixedShowcase).toHaveBeenCalled();
    expect(component.deleting()).toBe(false);
  });

  it('should keep the showcase open when deletion fails', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });
    nodeService.deleteEntity.mockReturnValueOnce(throwError(() => new Error('Delete failed')));

    component.onDelete({ uuid: 'component-uuid', content: { type: 'hero-1v1' } });

    expect(builder.cancelFixedShowcase).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.SHOWCASE.DELETE_FAILED', 'ok');
    expect(component.deleting()).toBe(false);
  });
});
