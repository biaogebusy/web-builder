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

  const makeLibrary = () => [
    {
      label: '基础组件',
      icon: 'cube-outline',
      type: 'base' as const,
      elements: [
        {
          id: 'hero',
          label: '首屏',
          icon: 'view-quilt',
          child: [
            { id: 'hero-1v1', label: 'Hero 1v1', mark: '大标题 + 按钮', icon: 'view-quilt' },
            { id: 'hero-2v1', label: 'Hero 2v1', mark: '左右分栏', icon: 'view-quilt' },
          ],
        },
        {
          id: 'card',
          label: '卡片',
          icon: 'card-outline',
          child: [{ id: 'card-1v1', label: '卡片 1v1', mark: '基础卡片', icon: 'card-outline' }],
        },
      ],
    },
  ];

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
        { provide: UIUX, useValue: of(makeLibrary()) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('single-level category navigation', () => {
    it('starts with category index 0 = "All" showing every component', () => {
      expect(component.activeCategoryIndex()).toBe(0);
      // 2 hero + 1 card + 1 webform = 4 total visible items
      expect(component.visibleItems()).toHaveLength(4);
    });

    it('filters to a single category when a chip is selected', () => {
      // Index 1 = first group (hero)
      component.selectCategory(1);
      expect(component.visibleItems().every(hit => hit.group.id === 'hero')).toBe(true);
      expect(component.visibleItems()).toHaveLength(2);

      // Index 2 = second group (card)
      component.selectCategory(2);
      expect(component.visibleItems().every(hit => hit.group.id === 'card')).toBe(true);
      expect(component.visibleItems()).toHaveLength(1);
    });

    it('includes the webform group as the last category when ready', () => {
      const groups = component.widgetGroups();
      expect(groups.at(-1)?.id).toBe('webform');
      expect(component.webformState()).toBe('ready');
    });

    it('drops the webform category when the deployment did not enable the endpoint', () => {
      webformPicker.getWebforms.mockReturnValueOnce(throwError(() => ({ status: 404 })));

      component.loadWebforms();

      expect(component.webformState()).toBe('unavailable');
      expect(component.widgetGroups().some(group => group.id === 'webform')).toBe(false);
    });
  });

  describe('search', () => {
    it('aggregates hits across all categories and includes group info', () => {
      component.searchQuery.set('hero');
      const hits = component.visibleItems();
      expect(hits.length).toBeGreaterThan(0);
      expect(hits.every(hit => hit.group.id === 'hero')).toBe(true);
    });

    it('ignores category selection while searching', () => {
      component.selectCategory(2); // card category
      component.searchQuery.set('hero');
      const hits = component.visibleItems();
      expect(hits.every(hit => hit.group.id === 'hero')).toBe(true);
    });

    it('returns empty array for no matches', () => {
      component.searchQuery.set('zzzzz');
      expect(component.visibleItems()).toEqual([]);
      expect(component.isSearching()).toBe(true);
    });
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
    const webformCard = () =>
      component.widgetGroups().find(g => g.id === 'webform')!.child[0];

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

    it('never sets hoveredWidget for a webform card (no preview)', () => {
      component.onPointerEnterRow(webformCard(), document.createElement('button'));

      expect(component.hoveredWidget()).toBeNull();
    });
  });
});
