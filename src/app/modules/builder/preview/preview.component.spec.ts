import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { selectCurrentBuilderPage } from '@core/state/BuilderPageState';
import { ContentState } from '@core/state/ContentState';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import type { IPage } from '@core/interface/IAppConfig';
import type { IText } from '@core/interface/widgets/IText';
import { createBuilderStateMock } from '@core/testing/mocks';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;
  let builder: ReturnType<typeof createBuilderStateMock>;
  const fetch = vi.fn();
  const route = { snapshot: { queryParamMap: convertToParamMap({}) } };
  const instant = vi.fn((_key: string, params: { title: string }) => `${params.title} preview`);

  beforeEach(async () => {
    vi.clearAllMocks();
    fetch.mockReset();
    builder = createBuilderStateMock();
    builder.version.set([{ title: '', body: [] }]);
    Object.defineProperty(builder, 'currentPage', {
      get: () => selectCurrentBuilderPage(builder.version()),
    });
    route.snapshot.queryParamMap = convertToParamMap({});
    await TestBed.configureTestingModule({
      imports: [PreviewComponent],
      providers: [provideRouter([]), ...provideBuilderMocks(),
        { provide: ActivatedRoute, useValue: route },
        { provide: BuilderState, useValue: builder },
        { provide: NodeService, useValue: { fetch } },
        { provide: TranslateService, useValue: { instant } },
      ],
    }).overrideComponent(PreviewComponent, {
      set: { imports: [], template: '{{ currentPage()?.title }}' },
    }).compileComponents();
  });

  function createPreview(params: Record<string, string> = {}): void {
    route.snapshot.queryParamMap = convertToParamMap(params);
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('previews the current canvas when no page is requested', () => {
    createPreview();
    expect(component.currentPage()).toBe(builder.currentPage);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('updates the open draft, configuration and title after its saved version changes', () => {
    createPreview();
    const content: IText = { type: 'text', body: 'Updated content' };
    const updated: IPage = {
      title: 'Updated draft',
      body: [content],
      config: { headerMode: { transparent: true, style: 'light' } },
    };
    builder.version.set([updated]);
    fixture.detectChanges();

    expect(component.currentPage()).toBe(updated);
    expect(fixture.nativeElement.textContent).toContain('Updated draft');
    expect(TestBed.inject(ContentState).pageConfig()).toBe(updated.config);
    expect(TestBed.inject(TagsService).setTitle).toHaveBeenLastCalledWith('Updated draft preview');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('follows the current draft selection and the first-draft fallback', () => {
    createPreview();
    const first = { title: 'First draft', body: [] };
    const second = { title: 'Second draft', body: [] };
    builder.version.set([first, second]);
    fixture.detectChanges();
    expect(component.currentPage()).toBe(first);

    const selected = { ...second, current: true };
    builder.version.set([first, selected]);
    fixture.detectChanges();
    expect(component.currentPage()).toBe(selected);
  });

  it('previews the requested local draft without changing the current canvas', () => {
    const draft = { nid: '12', langcode: 'en', title: 'Local edits', body: [] };
    builder.getLocalPageByPage.mockReturnValue(draft);
    createPreview({ nid: '12', lang: 'en' });
    builder.version.set([{ title: 'Other canvas edits', body: [] }]);
    fixture.detectChanges();
    expect(builder.getLocalPageByPage).toHaveBeenCalledWith({ nid: '12', langcode: 'en' });
    expect(component.currentPage()).toBe(draft);
    expect(builder.currentPage).not.toBe(draft);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('reads an uncached unpublished page through the private language API', () => {
    fetch.mockReturnValue(of({ status: true, published: false, nid: '12',
      title: 'Unpublished page', body: [{ type: 'json', attributes: {
        body: { type: 'text', body: 'Private content' },
      } }] }));
    createPreview({ nid: '12', lang: 'en' });
    expect(fetch).toHaveBeenCalledWith('/api/v3/landingPage/json/12', { noCache: 1 }, 'en');
    expect(component.currentPage()?.body[0]).toMatchObject({ body: 'Private content' });
    expect(builder.currentPage.title).toBe('');
  });

  it('keeps a requested page empty during its read and separate from later canvas changes', () => {
    const response = new Subject<IPage>();
    fetch.mockReturnValue(response);
    createPreview({ nid: '12', lang: 'en' });
    builder.version.set([{ title: 'Other draft', body: [] }]);
    fixture.detectChanges();
    expect(component.currentPage()).toBeUndefined();

    response.next({ status: true, title: 'Requested page', body: [] });
    fixture.detectChanges();
    expect(component.currentPage()?.title).toBe('Requested page');
    builder.version.set([{ title: 'Another draft', body: [] }]);
    fixture.detectChanges();
    expect(component.currentPage()?.title).toBe('Requested page');
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('does not display another draft when the requested page is denied', () => {
    fetch.mockReturnValue(throwError(() => ({ status: 403 })));
    createPreview({ nid: '12', lang: 'en' });
    builder.version.set([{ title: 'Other canvas edits', body: [] }]);
    fixture.detectChanges();
    expect(component.currentPage()).toBeUndefined();
    expect(component.failed()).toBe(true);
  });

  it('stops updating preview metadata after the component is destroyed', () => {
    createPreview();
    fixture.destroy();
    vi.clearAllMocks();
    builder.version.set([{ title: 'Later edit', body: [] }]);
    TestBed.tick();
    expect(TestBed.inject(TagsService).setTitle).not.toHaveBeenCalled();
  });
});
