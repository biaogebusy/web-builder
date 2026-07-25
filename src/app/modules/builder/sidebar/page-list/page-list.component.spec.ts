import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderServiceMock,
  createBuilderStateMock,
  createNodeServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { of } from 'rxjs';

import { PageListComponent } from './page-list.component';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();

  // MatDialog 由组件 standalone imports 内的模块提供,须 spy 实际实例
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PageListComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the pending page queued by the builder on init', () => {
    builderState.consumePageLoad.mockReturnValueOnce({ nid: '9', langcode: 'en' });

    component.ngOnInit();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '9', langcode: 'en' });
  });

  it('warns instead of loading when the page misses its nid', () => {
    component.loadPage({ langcode: 'en' });

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW', 'ok');
    expect(builderService.loadPage).not.toHaveBeenCalled();
  });

  it('loads the selected page into the builder', () => {
    component.loadPage({ nid: '12', langcode: 'zh-hans' });

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
  });

  it('copies the page as a template', () => {
    component.copyPage({ nid: '12', langcode: 'zh-hans' });

    expect(builderService.loadPage).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
      isTemplate: true,
    });
  });

  it('opens the JSON editing flow only for pages with a nid', () => {
    component.updateByJSON({ langcode: 'en' });
    expect(builderService.loadPageJSON).not.toHaveBeenCalled();

    component.updateByJSON({ nid: '12', langcode: 'en' });
    expect(builderService.loadPageJSON).toHaveBeenCalledWith({ nid: '12', langcode: 'en' });
  });

  it('opens the page setting dialog with the landing page api', () => {
    const page = { nid: '12', title: '首页' } as never;

    component.updatePageSetting(page);

    expect(builderService.openPageSetting).toHaveBeenCalledWith(
      page,
      '/api/v1/node/landing_page',
      expect.any(String)
    );
  });

  it('loads the existing translation when the target language already exists', () => {
    confirmWith(true);
    nodeService.fetch.mockReturnValueOnce(
      of({ langcode: 'en', label: '英文版', title: 'Home', body: [] })
    );

    component.createLangVersion({ nid: '7', langcode: 'zh-hans', title: 'Home' } as never, 'en');

    expect(nodeService.fetch).toHaveBeenCalledWith(
      '/api/v3/landingPage/json/7',
      { noCache: 1 },
      'en'
    );
    expect(builderState.loadNewPage).toHaveBeenCalledWith(
      expect.objectContaining({ langcode: 'en' })
    );
  });

  it('queues a new translation draft when the target language is missing', () => {
    confirmWith(true);
    nodeService.fetch.mockReturnValueOnce(of({ langcode: 'zh-hans', title: 'Home', body: [] }));

    component.createLangVersion({ nid: '7', langcode: 'zh-hans', title: 'Home' } as never, 'en');

    expect(builderState.loadNewPage).toHaveBeenCalledWith(
      expect.objectContaining({ translation: true, target: 'en' })
    );
  });

  it('does nothing when the language creation dialog is cancelled', () => {
    confirmWith(false);

    component.createLangVersion({ nid: '7', langcode: 'zh-hans', title: 'Home' } as never, 'en');

    expect(nodeService.fetch).not.toHaveBeenCalled();
    expect(builderState.loadNewPage).not.toHaveBeenCalled();
  });
});
