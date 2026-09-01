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
import { Observable, of, Subject, throwError } from 'rxjs';

import { WebformPickerService } from './webform/webform-picker.service';
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
  const webformPicker = {
    getWebforms: vi.fn((): Observable<any> =>
      of([{ id: 'contact', title: '联系我们', description: '客服表单' }])
    ),
    getFields: vi.fn((): Observable<any> => of({})),
    buildDynamicForm: vi.fn((): Observable<any> =>
      of({ content: { type: 'dynamic-form', form: { id: 'contact' } }, warnings: [] })
    ),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    webformPicker.getWebforms.mockReturnValue(
      of([{ id: 'contact', title: '联系我们', description: '客服表单' }])
    );
    webformPicker.buildDynamicForm.mockReturnValue(
      of({ content: { type: 'dynamic-form', form: { id: 'contact' } }, warnings: [] })
    );
    await TestBed.configureTestingModule({
      imports: [WidgetPickerComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: UtilitiesService, useValue: util },
        { provide: LocalStorageService, useValue: storage },
        { provide: WebformPickerService, useValue: webformPicker },
        // ngOnInit destructures the first library entry, so provide one minimal valid dataset
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

  describe('webform group', () => {
    const webformCard = () => component.widgetGroups().at(-1)!.child[0];

    it('appends a webform category built from the CMS list', () => {
      const group = component.widgetGroups().at(-1)!;

      expect(group.id).toBe('webform');
      expect(group.child).toEqual([
        {
          id: 'webform:contact',
          type: 'webform',
          label: '联系我们',
          mark: '客服表单',
          icon: 'form-select',
        },
      ]);
      expect(component.webformState()).toBe('ready');
    });

    it('flags the error state and keeps the list empty when loading fails', () => {
      webformPicker.getWebforms.mockReturnValueOnce(throwError(() => new Error('offline')));

      component.loadWebforms();

      expect(component.webformState()).toBe('error');
      expect(component.webforms()).toEqual([]);
    });

    it('drops the category when the deployment did not enable the endpoint', () => {
      webformPicker.getWebforms.mockReturnValueOnce(throwError(() => ({ status: 404 })));

      component.loadWebforms();

      // A category that can only ever report an error is worse than no category
      expect(component.webformState()).toBe('unavailable');
      expect(component.widgetGroups().some(group => group.id === 'webform')).toBe(false);
    });

    it('leaves the open group when it turns out to be unavailable', () => {
      component.selectGroup(component.widgetGroups().at(-1)!);
      webformPicker.getWebforms.mockReturnValueOnce(throwError(() => ({ status: 403 })));

      component.loadWebforms();

      expect(component.currentGroup()).toBeNull();
    });

    it('keeps showing the live webform group after the list arrives', () => {
      const stale = component.widgetGroups().at(-1)!;
      component.selectGroup(stale);

      expect(component.currentGroup()?.id).toBe('webform');
      expect(component.currentGroup()?.child).toHaveLength(1);
    });

    it('fetches the fields and inserts the built dynamic-form node', () => {
      fixture.componentRef.setInput('content', {
        addType: 'widget',
        path: 'body.1',
        content: {},
      });

      component.onPick(webformCard());

      expect(webformPicker.buildDynamicForm).toHaveBeenCalledWith(
        { id: 'contact', title: '联系我们', description: '客服表单' },
        'BUILDER.WIDGET_PICKER.WEBFORM_SUBMIT'
      );
      expect(builderState.updatePageContentByPath).toHaveBeenCalledWith(
        'body.1',
        { type: 'dynamic-form', form: { id: 'contact' } },
        'add'
      );
      expect(component.insertingWebform()).toBeNull();
    });

    it('warns before inserting when unsupported elements were dropped', () => {
      webformPicker.buildDynamicForm.mockReturnValueOnce(
        of({
          content: { type: 'dynamic-form' },
          warnings: [
            { key: 'cv', type: 'managed_file', reason: 'unsupported' },
            { key: 'other', type: 'textfield', reason: 'conditional' },
          ],
        })
      );
      fixture.componentRef.setInput('content', {
        addType: 'widget',
        path: 'body.1',
        content: {},
      });

      component.onPick(webformCard());

      expect(util.openSnackbar).toHaveBeenCalledWith(
        'BUILDER.WIDGET_PICKER.WEBFORM_PARTIAL',
        'ok'
      );
    });

    it('asks for a target position before fetching any fields', () => {
      component.onPick(webformCard());

      expect(webformPicker.buildDynamicForm).not.toHaveBeenCalled();
      expect(util.openSnackbar).toHaveBeenCalledWith(
        'BUILDER.WIDGET_PICKER.SELECT_POSITION_FIRST',
        'ok'
      );
    });

    it('reports a failed field fetch and clears the busy state', () => {
      webformPicker.buildDynamicForm.mockReturnValueOnce(throwError(() => new Error('500')));
      fixture.componentRef.setInput('content', {
        addType: 'widget',
        path: 'body.1',
        content: {},
      });

      component.onPick(webformCard());

      expect(util.openSnackbar).toHaveBeenCalledWith(
        'BUILDER.WIDGET_PICKER.WEBFORM_INSERT_FAILED',
        'ok'
      );
      expect(component.insertingWebform()).toBeNull();
      expect(builderState.updatePageContentByPath).not.toHaveBeenCalled();
    });

    it('never opens the hover preview for a webform card', () => {
      component.onHoverWidget(webformCard(), document.createElement('button'));

      expect(component.hoveredWidget()).toBeNull();
    });
  });
});
