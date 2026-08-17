import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { IPageMeta } from '@core/interface/IBuilder';
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

import { PageItemComponent } from './page-item.component';

describe('PageItemComponent', () => {
  let component: PageItemComponent;
  let fixture: ComponentFixture<PageItemComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();

  // MatDialog comes from modules in the component's standalone imports, so spy the real instance
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  const setPage = (page: Partial<IPageMeta>) => {
    fixture.componentRef.setInput('page', page as IPageMeta);
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PageItemComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageItemComponent);
    component = fixture.componentInstance;
    setPage({ nid: '12', uuid: 'uuid-12', langcode: 'zh-hans', title: '首页' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('warns instead of loading when the page misses its nid', () => {
    setPage({ langcode: 'en' });

    component.loadPage();

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW', 'ok');
    expect(builderService.loadPage).not.toHaveBeenCalled();
  });

  it('loads the selected page into the builder', () => {
    const load = vi.fn();
    component.pageLoad.subscribe(load);

    component.loadPage();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.LOADING_PAGE', 'ok');
    expect(load).toHaveBeenCalled();
  });

  it('copies the page as a template', () => {
    component.copyPage();

    expect(builderService.loadPage).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
      isTemplate: true,
    });
  });

  it('opens the JSON editing flow only for pages with a nid', () => {
    setPage({ langcode: 'en' });
    component.updateByJSON();
    expect(builderService.loadPageJSON).not.toHaveBeenCalled();

    setPage({ nid: '12', langcode: 'en' });
    component.updateByJSON();
    expect(builderService.loadPageJSON).toHaveBeenCalledWith({ nid: '12', langcode: 'en' });
  });

  it('opens the page setting dialog with the landing page api', () => {
    const page = { nid: '12', title: '首页' };
    setPage(page);

    component.updatePageSetting();

    expect(builderService.openPageSetting).toHaveBeenCalledWith(
      page,
      '/api/v1/node/landing_page',
      expect.any(String)
    );
  });

  it('loads the existing translation when the target language already exists', () => {
    confirmWith(true);
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });
    nodeService.fetch.mockReturnValueOnce(
      of({ langcode: 'en', label: '英文版', title: 'Home', body: [] })
    );

    component.createLangVersion('en');

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
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });
    nodeService.fetch.mockReturnValueOnce(of({ langcode: 'zh-hans', title: 'Home', body: [] }));

    component.createLangVersion('en');

    expect(builderState.loadNewPage).toHaveBeenCalledWith(
      expect.objectContaining({ translation: true, target: 'en' })
    );
  });

  it('does nothing when the language creation dialog is cancelled', () => {
    confirmWith(false);
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });

    component.createLangVersion('en');

    expect(nodeService.fetch).not.toHaveBeenCalled();
    expect(builderState.loadNewPage).not.toHaveBeenCalled();
  });

  it('deletes only the current translation for a non default language page', () => {
    confirmWith(true);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'en', title: 'Home' });

    component.deletePage();

    expect(builderService.deleteTranslation).toHaveBeenCalledWith('7', 'en');
    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
  });

  it('deletes the whole node for the source language page', () => {
    confirmWith(true);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'zh-hans', title: 'Home' });

    component.deletePage();

    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/node/landing_page', 'uuid-7');
    expect(builderService.deleteTranslation).not.toHaveBeenCalled();
  });

  it('warns that every language version goes away before deleting the source language', () => {
    const open = confirmWith(false);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'zh-hans', title: 'Home' });

    component.deletePage();

    const config: any = open.mock.calls[0][1];
    expect(config.data.inputData.content.body).toBe('BUILDER.PAGE_SETTING.DELETE_ALL_LANG_CONFIRM');
    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
    expect(builderService.deleteTranslation).not.toHaveBeenCalled();
  });

  it('flags non default language pages as translations', () => {
    setPage({ langcode: 'en' });
    expect(component.isTranslation()).toBe(true);

    setPage({ langcode: 'zh-hans' });
    expect(component.isTranslation()).toBe(false);
  });

  it('asks the owning list to refresh once the page is deleted', () => {
    confirmWith(true);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'zh-hans', title: 'Home' });
    nodeService.deleteEntity.mockReturnValueOnce(of({}));
    const refresh = vi.fn();
    component.refresh.subscribe(refresh);

    component.deletePage();

    expect(refresh).toHaveBeenCalled();
  });
});
