import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { ContentService } from '@core/service/content.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { Subject, of, throwError } from 'rxjs';

import { ComponentToolbarComponent } from './component-toolbar.component';

describe('ComponentToolbarComponent', () => {
  let component: ComponentToolbarComponent;
  let fixture: ComponentFixture<ComponentToolbarComponent>;
  let canvasItem: HTMLDivElement;
  const user = signal<IUser | false>(false);
  const contentService = { reloadUIUX: vi.fn() };
  let closed$: Subject<boolean>;
  const dialog = { open: vi.fn(), getDialogById: vi.fn() };
  const categories = [{
    uuid: 'sections',
    label: 'Sections',
    elements: [
      { uuid: 'hero-category', label: 'Hero' },
      { uuid: 'cards-category', label: 'Cards' },
    ],
  }];

  const setUser = (roles: string[], uid = '2'): void => {
    user.set({ current_user: { uid, name: 'Test', roles } } as IUser);
  };

  const uploadForm = (): FormGroup => dialog.open.mock.calls.at(-1)![1].data.inputData.content.form;

  beforeEach(async () => {
    vi.clearAllMocks();
    user.set(false);
    closed$ = new Subject<boolean>();
    dialog.open.mockReturnValue({ afterClosed: () => closed$ });
    await TestBed.configureTestingModule({
      imports: [ComponentToolbarComponent, MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: USER, useValue: user },
        { provide: MatDialog, useValue: dialog },
        { provide: ContentService, useValue: contentService },
      ],
    }).compileComponents();

    vi.mocked(TestBed.inject(UserService).checkShow)
      .mockImplementation(UserService.prototype.checkShow);
    vi.mocked(TestBed.inject(NodeService).fetch).mockReturnValue(of(categories));
    fixture = TestBed.createComponent(ComponentToolbarComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
    canvasItem = document.createElement('div');
    canvasItem.className = 'component-item';
    canvasItem.tabIndex = 0;
    const slot = document.createElement('div');
    slot.setAttribute('data-path', '0');
    canvasItem.appendChild(slot);
    slot.appendChild(fixture.nativeElement);
    document.body.appendChild(canvasItem);
  });

  afterEach(() => canvasItem.remove());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([false, true])('returns copy focus to its canvas group (nested: %s)', nested => {
    const group = nested ? document.createElement('app-dynamic-component') : canvasItem;
    if (nested) {
      group.tabIndex = 0;
      fixture.nativeElement.before(group);
      group.appendChild(fixture.nativeElement);
    }
    const content = { type: 'btn', label: 'Copy me' };
    fixture.componentRef.setInput('content', content);
    const util = TestBed.inject(UtilitiesService);
    component.onCopy();
    expect(util.copy).toHaveBeenCalledWith(JSON.stringify(content));
    expect(document.activeElement).toBe(group);
  });

  it('should act on the rebound component when its slot is reused', () => {
    // generatePath() walks up to the nearest `.component-item`, so mirror the builder DOM
    const item = document.createElement('div');
    item.className = 'component-item';
    const slot = document.createElement('div');
    slot.setAttribute('data-path', '0');
    item.appendChild(slot);
    slot.appendChild(fixture.nativeElement);
    document.body.appendChild(item);

    // The builder `@for` blocks track by `$index`: inserting a component in front of
    // an existing one reuses this toolbar instance and only rebinds `content`.
    fixture.componentRef.setInput('content', { type: 'btn', label: '了解更多' });
    fixture.detectChanges();

    const chart = { type: 'chart', title: { text: '年度活动金额预算' } };
    fixture.componentRef.setInput('content', chart);
    fixture.detectChanges();

    const builder = TestBed.inject(BuilderState);
    component.onSetting();

    expect(component.type()).toBe('chart');
    expect(builder.showComponentSetting).toHaveBeenCalledWith(chart, expect.anything(), '0');

    item.remove();
  });

  it('only allows administrators and the Drupal root user to upload', () => {
    const node = TestBed.inject(NodeService);
    fixture.componentRef.setInput('content', { type: 'text', body: 'Example' });
    component.onUpload();
    setUser(['authenticated', 'editor']);
    component.onUpload();
    expect(component.canUpload()).toBe(false);
    expect(node.fetch).not.toHaveBeenCalled();
    expect(dialog.open).not.toHaveBeenCalled();

    setUser(['authenticated'], '1');
    expect(component.canUpload()).toBe(true);
    setUser(['authenticated', 'administrator']);
    component.onUpload();
    expect(dialog.open).toHaveBeenCalledOnce();
  });

  it('opens a named toolbar action with category and searchable icon selectors', async () => {
    fixture.componentRef.setInput('content', { type: 'text', body: 'Example' });
    await fixture.whenStable();
    const selector = 'button[aria-label="BUILDER.NODE_UIUX.UPLOAD"]';
    expect(fixture.nativeElement.querySelector(selector)).toBeNull();

    setUser(['administrator']);
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(selector);
    expect(button.closest('[aria-hidden="true"]')).toBeNull();
    button.click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector(selector).disabled).toBe(true);
    const { fields } = dialog.open.mock.calls[0][1].data.inputData.content;
    // Formly rebuilds control validators from the field config, so the whitespace
    // guard has to be declared here to keep space-only titles invalid in the dialog.
    expect(fields.find((field: { key: string }) => field.key === 'title').props).toMatchObject({
      required: true,
      pattern: /\S/,
      maxLength: 255,
    });
    expect(fields.find((field: { key: string }) => field.key === 'category').props).toMatchObject({
      required: true,
      multiple: true,
      options: [
        { value: 'hero-category', label: 'Sections > Hero' },
        { value: 'cards-category', label: 'Sections > Cards' },
      ],
    });
    expect(fields.find((field: { key: string }) => field.key === 'icon')).toMatchObject({
      type: 'mat-select', props: { type: 'icon', search: true },
    });
  });

  it('uploads the rebound component snapshot and selected metadata in a single create request', () => {
    setUser(['administrator']);
    fixture.componentRef.setInput('content', { type: 'btn', label: 'Old component' });
    const current = {
      type: 'layout-builder',
      elements: [{ type: 'text', body: 'Current draft' }],
      extra: { uuid: 'page-block-uuid' },
      relationships: { page: 'page-uuid' },
    };
    fixture.componentRef.setInput('content', current);
    component.onUpload();
    expect(current.extra).toEqual({ uuid: 'page-block-uuid' });
    expect(current.relationships).toEqual({ page: 'page-uuid' });
    current.elements[0].body = 'Changed after opening';
    fixture.componentRef.setInput('content', { type: 'btn', label: 'Another slot' });
    uploadForm().setValue({
      title: '  Saved layout  ', icon: 'star', category: ['hero-category', 'cards-category'],
    });
    closed$.next(true);

    expect(TestBed.inject(NodeService).addEntity).toHaveBeenCalledExactlyOnceWith(
      '/api/v1/node/component',
      {
        title: 'Saved layout', icon: 'star', status: true,
        body: JSON.stringify({
          type: 'layout-builder', elements: [{ type: 'text', body: 'Current draft' }],
        }),
      },
      { category: { data: [
        { type: 'taxonomy_term--component_type', id: 'hero-category' },
        { type: 'taxonomy_term--component_type', id: 'cards-category' },
      ] } }
    );
    expect(contentService.reloadUIUX).toHaveBeenCalledOnce();
    expect(component.uploading()).toBe(false);
  });

  it('preserves wrapped dynamic inputs when uploading', () => {
    setUser(['administrator']);
    const wrapped = { content: { type: 'text', body: 'Wrapped' }, fullWidth: true };
    fixture.componentRef.setInput('content', wrapped);
    component.onUpload();
    uploadForm().patchValue({ category: ['hero-category'] });
    closed$.next(true);
    expect(TestBed.inject(NodeService).addEntity).toHaveBeenCalledWith(
      '/api/v1/node/component',
      expect.objectContaining({ body: JSON.stringify(wrapped) }),
      expect.anything()
    );
  });

  it.each(['cancel', 'blank-title', 'missing-category', 'permission-lost'])(
    'does not create a component on %s', reason => {
      setUser(['administrator']);
      fixture.componentRef.setInput('content', { type: 'text', body: 'Example' });
      component.onUpload();
      uploadForm().patchValue({
        title: reason === 'blank-title' ? '   ' : 'Saved component',
        category: reason === 'missing-category' ? [] : ['hero-category'],
      });
      if (reason === 'permission-lost') user.set(false);
      closed$.next(reason !== 'cancel');
      expect(TestBed.inject(NodeService).addEntity).not.toHaveBeenCalled();
      expect(contentService.reloadUIUX).not.toHaveBeenCalled();
      expect(component.uploading()).toBe(false);
    }
  );

  it.each(['failed', 'empty'])('handles %s category loading without opening the form', state => {
    setUser(['administrator']);
    fixture.componentRef.setInput('content', { type: 'text' });
    vi.mocked(TestBed.inject(NodeService).fetch).mockReturnValue(
      state === 'failed' ? throwError(() => new Error('Unavailable')) : of([])
    );
    component.onUpload();
    expect(dialog.open).not.toHaveBeenCalled();
    expect(component.uploading()).toBe(false);
    expect(TestBed.inject(UtilitiesService).openSnackbar).toHaveBeenCalledWith(
      `BUILDER.NODE_UIUX.${state === 'failed' ? 'LOAD_CATEGORIES_FAILED' : 'NO_CATEGORIES'}`,
      'BUILDER.COMMON.OK'
    );
    // The busy state recreates the toolbar button, so early exits must hand focus
    // back to the canvas group instead of leaving it on BODY and hiding the toolbar.
    expect(document.activeElement).toBe(canvasItem);
  });

  it('prevents duplicate uploads and resets after a failed save', () => {
    setUser(['administrator']);
    fixture.componentRef.setInput('content', { type: 'text', body: 'Example' });
    const request$ = new Subject<unknown>();
    const node = TestBed.inject(NodeService);
    vi.mocked(node.addEntity).mockReturnValue(request$);
    component.onUpload();
    component.onUpload();
    expect(dialog.open).toHaveBeenCalledOnce();
    uploadForm().patchValue({ category: ['hero-category'] });
    closed$.next(true);
    component.onUpload();
    expect(node.addEntity).toHaveBeenCalledOnce();
    expect(component.uploading()).toBe(true);

    request$.error(new Error('Failed'));
    expect(component.uploading()).toBe(false);
    expect(contentService.reloadUIUX).not.toHaveBeenCalled();
    expect(TestBed.inject(UtilitiesService).openSnackbar).toHaveBeenCalledWith(
      'BUILDER.NODE_UIUX.CREATE_FAILED', 'BUILDER.COMMON.OK'
    );
  });
});
