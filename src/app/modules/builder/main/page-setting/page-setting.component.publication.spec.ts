import { signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import type { FormlyFieldConfig } from '@ngx-formly/core';
import type { INodeFormSchema } from '@core/service/node-field-form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { contentFormFixture } from '@core/testing/content-form.fixture';
import { createBuilderStateMock, provideCoreMocks } from '@core/testing/mocks';
import { USER } from '@core/token/token-providers';
import { of, Subject, throwError } from 'rxjs';
import { PageSettingComponent } from './page-setting.component';

describe('Page settings publication', () => {
  let fixture: ComponentFixture<PageSettingComponent>;
  let component: PageSettingComponent;
  const getSchema = vi.fn();
  const updateAttributes = vi.fn();
  const updateUrlalias = vi.fn();
  const loadPage = vi.fn();
  const fetchNode = vi.fn();
  const builder = { ...createBuilderStateMock(), updatePageSettings: vi.fn() };
  const schema = () => contentFormFixture({
    defaults: { state: 'unpublished', promote: false, sticky: false },
  });
  const values = (state = 'published') => ({
    type: 'node--landing_page', title: 'Updated title', alias: '/home', publicationState: state,
    is_transparent: false, transparent_style: 'dark', meta_tags: { description: 'Updated SEO' },
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    getSchema.mockReturnValue(of(schema()));
    updateAttributes.mockReturnValue(of({ data: { attributes: { status: true } } }));
    updateUrlalias.mockResolvedValue(true);
    fetchNode.mockReturnValue(of({ data: { attributes: { status: true } } }));
    await TestBed.configureTestingModule({
      imports: [PageSettingComponent],
      providers: [
        ...provideCoreMocks(),
        { provide: USER, useValue: signal({ id: 'author-1' }) },
        { provide: NodeFieldFormService, useValue: { getSchema } },
        { provide: BuilderService, useValue: { updateAttributes, updateUrlalias, loadPage } },
        { provide: NodeService, useValue: { fetch: fetchNode } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: BuilderState, useValue: builder },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PageSettingComponent);
    fixture.componentRef.setInput('content', { content: {
      data: { id: 'page-1', type: 'node--landing_page', attributes: {
        title: 'Home', langcode: 'zh-hans', drupal_internal__nid: 12,
        path: { alias: '/home' }, status: false, meta_tags: {},
      } },
      included: [{ type: 'user--user', attributes: { display_name: 'Author' } }],
    } });
    component = fixture.componentInstance;
  });

  it('republishes with the other settings in one PATCH and retains the canvas', async () => {
    component.ngOnInit();
    await component.onUpdate(values());
    expect(updateAttributes).toHaveBeenCalledOnce();
    expect(updateAttributes.mock.calls[0][2]).toEqual({
      title: 'Updated title', status: true, is_transparent: false, transparent_style: 'dark',
      meta_tags: '{"description":"Updated SEO"}',
    });
    expect(updateUrlalias).not.toHaveBeenCalled();
    expect(loadPage).not.toHaveBeenCalled();
    expect(TestBed.inject(UtilitiesService).openSnackbar).toHaveBeenCalledWith(
      'BUILDER.PAGE_SETTING.PUBLISHED_SUCCESS', 'ok'
    );
    expect(builder.updatePageSettings).toHaveBeenCalledWith(
      { uuid: 'page-1', langcode: 'zh-hans' }, {
        title: 'Updated title', published: true,
        config: { headerMode: { transparent: false, style: 'dark' } },
        meta: [{ name: 'description', content: 'Updated SEO' }],
      }
    );
  });

  it('withdraws a published page through the same update action', async () => {
    getSchema.mockReturnValue(of(contentFormFixture()));
    updateAttributes.mockReturnValue(of({ data: { attributes: { status: false } } }));
    component.ngOnInit();
    await component.onUpdate(values('unpublished'));
    expect(updateAttributes.mock.calls[0][2].status).toBe(false);
    expect(builder.updatePageSettings.mock.calls[0][1].published).toBe(false);
  });

  it('does not write an unchanged publication state when other settings change', async () => {
    component.ngOnInit();
    await component.onUpdate(values('unpublished'));
    expect(updateAttributes.mock.calls[0][2]).not.toHaveProperty('status');
    expect(updateAttributes.mock.calls[0][2].title).toBe('Updated title');
  });

  it('keeps status read-only and rejects an unauthorized state change', async () => {
    getSchema.mockReturnValue(of({ ...schema(), baseFields: {}, states: [] }));
    component.ngOnInit();
    await component.onUpdate(values());
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(component.updateFailed()).toBe(true);
    await component.onUpdate(values('unpublished'));
    expect(updateAttributes.mock.calls[0][2]).not.toHaveProperty('status');
  });

  it('keeps permission retry from resetting other unsaved settings', () => {
    getSchema.mockReturnValue(throwError(() => ({ status: 403 })));
    component.ngOnInit();
    component.model.title = 'Unsaved setting';
    expect(component.publicationFailed()).toBe(true);
    expect(component.updateLabel()).toBe('BUILDER.PAGE_SETTING.UPDATE');
    getSchema.mockReturnValue(of(schema()));
    component.refreshPublication();
    expect(component.publicationFailed()).toBe(false);
    expect(component.model.title).toBe('Unsaved setting');
  });

  it('applies delayed permissions to the rendered Formly field', () => {
    const permission = new Subject<INodeFormSchema>();
    getSchema.mockReturnValue(permission);
    component.ngOnInit();
    const definition = component.fields[0].fieldGroup![0].fieldGroup!
      .find(field => field.key === 'publicationState')!;
    const rendered: FormlyFieldConfig = { ...definition, props: { ...definition.props },
      formControl: new FormControl(''), options: { detectChanges: vi.fn() } };
    (definition.hooks!.onInit as (field: FormlyFieldConfig) => void)(rendered);
    permission.next(schema());
    expect(rendered.props!.disabled).toBe(false);
    expect(rendered.formControl!.value).toBe('unpublished');
    expect(rendered.options!.detectChanges).toHaveBeenCalledWith(rendered);
    expect(component.updateLabel()).toBe('BUILDER.PAGE_SETTING.UPDATE');
    rendered.formControl!.setValue('published');
    expect(component.updateLabel()).toBe('BUILDER.PAGE_SETTING.SAVE_AND_PUBLISH');
    rendered.formControl!.setValue('draft');
    expect(component.updateLabel()).toBe('BUILDER.PAGE_SETTING.SAVE_AS_DRAFT');
    permission.complete();
  });

  it('uses the permitted workflow field and the default revision publication flag', async () => {
    getSchema.mockReturnValue(of(contentFormFixture({
      moderated: true, baseFields: { moderation_state: 'workflow' },
      baseFieldNames: { status: 'is_published' },
      defaults: { state: 'draft', promote: false, sticky: false },
      states: [{ value: 'review', label: 'Ready for review' }],
    })));
    updateAttributes.mockReturnValue(of({ data: { attributes: { is_published: false } } }));
    fetchNode.mockReturnValue(of({ data: { attributes: { is_published: true } } }));
    component.ngOnInit();
    await component.onUpdate(values('review'));
    expect(updateAttributes.mock.calls[0][2].workflow).toBe('review');
    expect(updateAttributes.mock.calls[0][2]).not.toHaveProperty('status');
    expect(fetchNode).toHaveBeenCalledWith('/api/v1/node/landing_page/page-1', {
      'fields[node--landing_page]': 'is_published',
    }, 'zh-hans');
    expect(builder.updatePageSettings.mock.calls[0][1].published).toBe(true);
  });

  it('explains when a new draft leaves the published version visible', async () => {
    getSchema.mockReturnValue(of(contentFormFixture({
      moderated: true, baseFields: { moderation_state: 'moderation_state' },
      states: [{ value: 'draft', label: 'Draft' }],
    })));
    component.ngOnInit();
    await component.onUpdate(values('draft'));
    expect(TestBed.inject(UtilitiesService).openSnackbar).toHaveBeenCalledWith(
      'BUILDER.PAGE_SETTING.DRAFT_WITH_PUBLISHED_SUCCESS', 'ok'
    );
  });

  it('does not invent a flag when settings save but the default revision read fails', async () => {
    getSchema.mockReturnValue(of(contentFormFixture({ moderated: true })));
    fetchNode.mockReturnValue(throwError(() => ({ status: 403 })));
    component.ngOnInit();
    await component.onUpdate(values('unpublished'));
    expect(builder.updatePageSettings.mock.calls[0][1]).not.toHaveProperty('published');
    expect(component.updateFailed()).toBe(false);
    expect(TestBed.inject(UtilitiesService).openSnackbar).toHaveBeenCalledWith(
      'BUILDER.PAGE_SETTING.SAVED_STATUS_UNCONFIRMED', 'ok'
    );
  });

  it('preserves local metadata when the CMS rejects the combined update', async () => {
    updateAttributes.mockReturnValue(of(false));
    component.ngOnInit();
    await component.onUpdate(values());
    expect(builder.updatePageSettings).not.toHaveBeenCalled();
    expect(component.updateFailed()).toBe(true);
    expect(component.loading()).toBe(false);
  });

  it('aborts the update when a changed URL alias cannot be saved', async () => {
    updateUrlalias.mockResolvedValue(false);
    component.ngOnInit();
    await component.onUpdate({ ...values(), alias: '/changed' });
    expect(updateAttributes).not.toHaveBeenCalled();
    expect(component.updateFailed()).toBe(true);
  });

  it('prevents duplicate submissions while the combined update is pending', async () => {
    const pending = new Subject<unknown>();
    updateAttributes.mockReturnValue(pending);
    component.ngOnInit();
    const save = component.onUpdate(values());
    await component.onUpdate(values());
    expect(updateAttributes).toHaveBeenCalledOnce();
    pending.next({ data: { attributes: { status: true } } });
    pending.complete();
    await save;
    expect(component.updating()).toBe(false);
  });
});
