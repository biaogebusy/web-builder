import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { createBuilderStateMock, createUtilitiesServiceMock } from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { SwitchPreviewComponent } from './switch-preview.component';

describe('SwitchPreviewComponent', () => {
  let component: SwitchPreviewComponent;
  let fixture: ComponentFixture<SwitchPreviewComponent>;
  const currentPage = signal<IPage | undefined | false>(undefined);
  const builderState = createBuilderStateMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    currentPage.set(undefined);
    await TestBed.configureTestingModule({
      imports: [SwitchPreviewComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BUILDER_CURRENT_PAGE, useValue: currentPage },
        { provide: BuilderState, useValue: builderState },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('refuses to preview an empty page', () => {
    const switched = vi.fn();
    builderState.switchPreivew$.subscribe(switched);

    component.onSwitch({ value: 'sm', icon: { svg: 'tablet' } });

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.SWITCH_PREVIEW.EMPTY_PAGE');
    expect(switched).not.toHaveBeenCalled();
    expect(component.currentPreview()).toBe('none');
  });

  it('switches the breakpoint, closes the drawer and broadcasts it', () => {
    currentPage.set({ title: 'Home', body: [{ type: 'text' }] });
    const switched = vi.fn();
    const drawerClosed = vi.fn();
    builderState.switchPreivew$.subscribe(switched);
    builderState.closeRightDrawer$.subscribe(drawerClosed);

    component.onSwitch({ value: 'sm', icon: { svg: 'tablet' } });

    expect(component.currentPreview()).toBe('sm');
    expect(component.currentIcon()).toBe('tablet');
    expect(drawerClosed).toHaveBeenCalledWith(true);
    expect(switched).toHaveBeenCalledWith('sm');
  });

  it('restores the default icon when leaving the preview', () => {
    currentPage.set({ title: 'Home', body: [{ type: 'text' }] });

    component.onSwitch({ value: 'none', icon: { svg: 'undo-variant' } });

    expect(component.currentPreview()).toBe('none');
    expect(component.currentIcon()).toBe('cellphone-link');
  });
});
