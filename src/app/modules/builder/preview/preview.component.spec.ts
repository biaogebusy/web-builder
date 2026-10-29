import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { NodeService } from '@core/service/node.service';
import { createBuilderStateMock } from '@core/testing/mocks';
import { of, throwError } from 'rxjs';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;
  const builder = createBuilderStateMock();
  const fetch = vi.fn();
  const route = { snapshot: { queryParamMap: convertToParamMap({}) } };

  beforeEach(async () => {
    vi.clearAllMocks();
    builder.getLocalPageByPage.mockReturnValue(undefined);
    route.snapshot.queryParamMap = convertToParamMap({});
    await TestBed.configureTestingModule({
      imports: [PreviewComponent],
      providers: [provideRouter([]), ...provideBuilderMocks(),
        { provide: ActivatedRoute, useValue: route },
        { provide: BuilderState, useValue: builder },
        { provide: NodeService, useValue: { fetch } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
  });

  it('previews the current canvas when no page is requested', () => {
    component.ngOnInit();
    expect(component.currentPage()).toBe(builder.currentPage);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('previews the requested local draft without changing the current canvas', () => {
    route.snapshot.queryParamMap = convertToParamMap({ nid: '12', lang: 'en' });
    const draft = { nid: '12', langcode: 'en', title: 'Local edits', body: [] };
    builder.getLocalPageByPage.mockReturnValue(draft);
    component.ngOnInit();
    expect(builder.getLocalPageByPage).toHaveBeenCalledWith({ nid: '12', langcode: 'en' });
    expect(component.currentPage()).toBe(draft);
    expect(builder.currentPage).not.toBe(draft);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('reads an uncached unpublished page through the private language API', () => {
    route.snapshot.queryParamMap = convertToParamMap({ nid: '12', lang: 'en' });
    fetch.mockReturnValue(of({ status: true, published: false, nid: '12',
      title: 'Unpublished page', body: [{ type: 'json', attributes: {
        body: { type: 'text', body: 'Private content' },
      } }] }));
    component.ngOnInit();
    expect(fetch).toHaveBeenCalledWith('/api/v3/landingPage/json/12', { noCache: 1 }, 'en');
    expect(component.currentPage()?.body[0]).toMatchObject({ body: 'Private content' });
    expect(builder.currentPage.title).toBe('');
  });

  it('does not display another draft when the requested page is denied', () => {
    route.snapshot.queryParamMap = convertToParamMap({ nid: '12', lang: 'en' });
    fetch.mockReturnValue(throwError(() => ({ status: 403 })));
    component.ngOnInit();
    expect(component.currentPage()).toBeUndefined();
    expect(component.failed()).toBe(true);
  });
});
