import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService, type INodeFormSchema } from '@core/service/node-field-form.service';
import { BuilderState } from '@core/state/BuilderState';
import { contentFormFixture } from '@core/testing/content-form.fixture';
import { createBuilderStateMock, provideCoreMocks } from '@core/testing/mocks';
import { of, Subject, throwError } from 'rxjs';
import { PagePublicationComponent } from './page-publication.component';

describe('PagePublicationComponent', () => {
  let fixture: ComponentFixture<PagePublicationComponent>;
  let component: PagePublicationComponent;
  const page = { id: 'page-1', attributes: { langcode: 'en' } };
  const getSchema = vi.fn();
  const updateAttributes = vi.fn();
  const fetchNode = vi.fn();
  const builder = { ...createBuilderStateMock(), setPagePublication: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();
    getSchema.mockReturnValue(of(contentFormFixture()));
    updateAttributes.mockReturnValue(of({ data: { attributes: { status: false } } }));
    fetchNode.mockReturnValue(of({ data: { attributes: { status: false } } }));
    await TestBed.configureTestingModule({
      imports: [PagePublicationComponent],
      providers: [
        ...provideCoreMocks(),
        { provide: NodeFieldFormService, useValue: { getSchema } },
        { provide: BuilderService, useValue: { updateAttributes } },
        { provide: NodeService, useValue: { fetch: fetchNode } },
        { provide: BuilderState, useValue: builder },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PagePublicationComponent);
    fixture.componentRef.setInput('page', page);
    component = fixture.componentInstance;
  });

  it('saves only the changed status and updates publication metadata from the server result', () => {
    fixture.detectChanges();
    expect(getSchema).toHaveBeenCalledWith('landing_page', 'page-1', 'en');
    component.state.setValue('unpublished');
    getSchema.mockReturnValue(of(contentFormFixture({
      defaults: { state: 'unpublished', promote: false, sticky: false },
    })));
    component.save();
    expect(updateAttributes).toHaveBeenCalledWith(
      { uuid: 'page-1', langcode: 'en' }, '/api/v1/node/landing_page', { status: false }, {}
    );
    expect(builder.setPagePublication).toHaveBeenCalledWith({ uuid: 'page-1', langcode: 'en' }, false);
    expect(component.state.value).toBe('unpublished');
    expect(component.canSave()).toBe(false);
    expect(component.notice()).toBe('BUILDER.PAGE_SETTING.STATE_SAVED');
  });

  it('uses public field aliases and workflow transitions without sending status', () => {
    getSchema.mockReturnValue(of(contentFormFixture({
      moderated: true, baseFields: { moderation_state: 'workflow' },
      baseFieldNames: { status: 'is_published' },
      defaults: { state: 'draft', promote: false, sticky: false },
      states: [{ value: 'review', label: 'Ready for review' }],
    })));
    updateAttributes.mockReturnValue(of({ data: { attributes: { is_published: false } } }));
    fetchNode.mockReturnValue(of({ data: { attributes: { is_published: true } } }));
    fixture.detectChanges();
    component.state.setValue('review');
    component.save();
    expect(updateAttributes.mock.calls[0][2]).toEqual({ workflow: 'review' });
    expect(fetchNode).toHaveBeenCalledWith('/api/v1/node/landing_page/page-1', {
      'fields[node--landing_page]': 'is_published',
    }, 'en');
    expect(builder.setPagePublication).toHaveBeenCalledWith({ uuid: 'page-1', langcode: 'en' }, true);
  });

  it('shows a read-only state when the account lacks publication access', () => {
    getSchema.mockReturnValue(of(contentFormFixture({ baseFields: {}, states: [] })));
    fixture.detectChanges();
    expect(component.state.disabled).toBe(true);
    expect(component.options()[0].value).toBe('published');
    component.state.setValue('unpublished');
    component.save();
    expect(updateAttributes).not.toHaveBeenCalled();
  });

  it('does not submit an unchanged or unlisted state', () => {
    fixture.detectChanges();
    component.save();
    component.state.setValue('unknown');
    component.save();
    expect(updateAttributes).not.toHaveBeenCalled();
  });

  it('keeps the local draft metadata unchanged when the CMS rejects the update', () => {
    updateAttributes.mockReturnValue(of(false));
    fixture.detectChanges();
    component.state.setValue('unpublished');
    component.save();
    expect(builder.setPagePublication).not.toHaveBeenCalled();
    expect(component.notice()).toBe('BUILDER.PAGE_SETTING.STATE_SAVE_FAILED');
    expect(component.saving()).toBe(false);
  });

  it('allows retry after a schema failure without assuming publication permission', () => {
    getSchema.mockReturnValue(throwError(() => ({ status: 403 })));
    fixture.detectChanges();
    expect(component.loadFailed()).toBe(true);
    expect(component.canSave()).toBe(false);
    getSchema.mockReturnValue(of(contentFormFixture()));
    component.retry();
    expect(component.loadFailed()).toBe(false);
    expect(component.state.disabled).toBe(false);
  });

  it('ignores a stale permission response when the selected page changes', () => {
    const previous = new Subject<INodeFormSchema>();
    getSchema.mockReturnValueOnce(previous);
    fixture.detectChanges();
    fixture.componentRef.setInput('page', { id: 'page-2', attributes: { langcode: 'zh-hans' } });
    fixture.detectChanges();
    previous.next(contentFormFixture({ baseFields: {}, states: [] }));
    component.state.setValue('unpublished');
    component.save();
    expect(updateAttributes.mock.calls[0][0]).toEqual({ uuid: 'page-2', langcode: 'zh-hans' });
  });

  it('prevents duplicate submissions and applies a late result only to the submitted page', () => {
    const write = new Subject<unknown>();
    updateAttributes.mockReturnValue(write);
    fixture.detectChanges();
    component.state.setValue('unpublished');
    component.save();
    component.save();
    expect(updateAttributes).toHaveBeenCalledOnce();
    fixture.componentRef.setInput('page', { id: 'page-2', attributes: { langcode: 'en' } });
    fixture.detectChanges();
    write.next({ data: { attributes: { status: false } } });
    write.complete();
    expect(builder.setPagePublication).toHaveBeenCalledWith({ uuid: 'page-1', langcode: 'en' }, false);
    expect(component.notice()).toBe('');
  });
});
