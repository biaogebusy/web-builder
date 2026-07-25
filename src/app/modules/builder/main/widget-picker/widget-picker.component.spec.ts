import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';
import {
  createBuilderStateMock,
  createStorageServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { LocalStorageService } from 'ngx-webstorage';
import { of, Subject } from 'rxjs';

import { WidgetPickerComponent } from './widget-picker.component';

describe('WidgetPickerComponent', () => {
  let component: WidgetPickerComponent;
  let fixture: ComponentFixture<WidgetPickerComponent>;
  const builderState = createBuilderStateMock();
  const util = createUtilitiesServiceMock();
  const copied$ = new Subject<unknown>();
  const storage = Object.assign(createStorageServiceMock(), {
    observe: vi.fn(() => copied$),
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [WidgetPickerComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: UtilitiesService, useValue: util },
        { provide: LocalStorageService, useValue: storage },
        // ngOnInit 解构组件库首项,给一条最小合法数据
        { provide: UIUX, useValue: of([{ label: '', icon: '', type: 'base', elements: [] }]) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('warns and does nothing when no target position has been selected', () => {
    component.onSelect({ type: 'btn' });

    expect(util.openSnackbar).toHaveBeenCalled();
    expect(builderState.updatePageContentByPath).not.toHaveBeenCalled();
  });

  it('replaces the widget at the path when adding as widget', () => {
    const drawerClosed = vi.fn();
    builderState.closeRightDrawer$.subscribe(drawerClosed);
    fixture.componentRef.setInput('content', {
      addType: 'widget',
      path: 'body.1',
      content: {},
    });

    component.onSelect({ type: 'btn', label: '按钮' });

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith(
      'body.1',
      { type: 'btn', label: '按钮' },
      'add'
    );
    expect(drawerClosed).toHaveBeenCalledWith(true);
  });

  it('appends the widget to the existing elements by default', () => {
    fixture.componentRef.setInput('content', {
      addType: 'element',
      path: 'body.2',
      content: { elements: [{ type: 'text' }] },
    });

    component.onSelect({ type: 'btn' });

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith('body.2.elements', [
      { type: 'text' },
      { type: 'btn' },
    ]);
  });

  it('pastes the copied component and clears the clipboard key', () => {
    fixture.componentRef.setInput('content', {
      addType: 'widget',
      path: 'body.0',
      content: {},
    });
    copied$.next({ type: 'copied-widget' });

    component.onPasteData();

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith(
      'body.0',
      { type: 'copied-widget' },
      'add'
    );
    expect(storage.clear).toHaveBeenCalledWith(builderState.COPYCOMPONENTKEY);
  });
});
