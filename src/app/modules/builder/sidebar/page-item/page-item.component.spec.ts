import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
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
  const currentPage = signal<IPage | undefined | false>(undefined);

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
    currentPage.set(undefined);
    builderState.version.set([]);
    builderState.loading.set(false);
    builderState.getLocalPageByPage.mockReturnValue(undefined);
    builderState.isPageDirty.mockReturnValue(false);
    await TestBed.configureTestingModule({
      imports: [PageItemComponent, MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
        { provide: BUILDER_CURRENT_PAGE, useValue: currentPage },
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

  it('does not reload the page that is already being edited', () => {
    currentPage.set({
      nid: '12',
      langcode: 'zh-hans',
      title: '首页',
      body: [],
      dirty: true,
    });

    component.loadPage();

    expect(builderService.loadPage).not.toHaveBeenCalled();
    expect(builderState.loadNewPage).not.toHaveBeenCalled();
  });

  it('switches to an unsaved local version instead of overwriting it from the server', () => {
    const localPage: IPage = {
      nid: '12',
      langcode: 'zh-hans',
      title: '本地首页',
      body: [],
      dirty: true,
    };
    builderState.getLocalPageByPage.mockReturnValue(localPage);
    confirmWith(false);

    component.loadPage();

    expect(builderState.loadNewPage).toHaveBeenCalledWith(localPage);
    expect(builderService.loadPage).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.LOADING_LOCAL_DRAFT', 'ok');
  });

  it('discards the local version only when the server copy is explicitly chosen', () => {
    builderState.getLocalPageByPage.mockReturnValue({
      nid: '12',
      langcode: 'zh-hans',
      title: '本地首页',
      body: [],
      dirty: true,
    });
    confirmWith(true);

    component.loadPage();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
    expect(builderState.loadNewPage).not.toHaveBeenCalled();
  });

  it('opens a clean page from the server without asking anything', () => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const open = vi.spyOn(dialog, 'open');

    component.openPage();

    expect(builderService.loadPage).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
    });
    expect(open).not.toHaveBeenCalled();
  });

  // The merged menu entry is the only way left to pull the page again, so unlike the title it
  // stays available while that page is open
  it('reloads the page that is already open from the menu entry', () => {
    currentPage.set({
      nid: '12',
      langcode: 'zh-hans',
      title: '首页',
      body: [],
      dirty: false,
    });

    component.openPage();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
  });

  it('appends preview mode without discarding existing query parameters', () => {
    setPage({ url: '/about?view=full' });

    expect(component.previewUrl()).toBe('/about?view=full&preview=true');
  });

  // A translation draft is stored under its target language, so the source language row must
  // stay loadable and must not borrow the draft's unsaved state
  describe('while a translation draft is open', () => {
    beforeEach(() => {
      currentPage.set({
        nid: '12',
        langcode: 'zh-hans',
        title: '首页',
        body: [],
        translation: true,
        target: 'en',
        dirty: true,
      });
    });

    it('does not treat the source language row as the page being edited', () => {
      expect(component.active()).toBe(false);
      expect(component.dirty()).toBe(false);
    });

    it('tells the source language row which translation draft is open', () => {
      expect(component.translationDraft()).toBe('EN');
    });

    it('still loads the source language page from the server', () => {
      component.loadPage();

      expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
    });

    it('treats the target language row as the page being edited', () => {
      setPage({ nid: '12', uuid: 'uuid-12', langcode: 'en', title: '首页' });

      expect(component.active()).toBe(true);
      expect(component.translationDraft()).toBe('');
    });
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
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const open = vi.spyOn(dialog, 'open');
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
    expect(open).not.toHaveBeenCalled();
  });

  it('opens an unsaved local translation draft without fetching and overwriting it', () => {
    const localTranslation: IPage = {
      nid: '7',
      langcode: 'zh-hans',
      title: 'Home',
      body: [],
      translation: true,
      target: 'en',
      dirty: true,
    };
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });
    builderState.getLocalPageByPage.mockReturnValue(localTranslation);

    component.createLangVersion('en');

    expect(builderState.loadNewPage).toHaveBeenCalledWith(localTranslation);
    expect(nodeService.fetch).not.toHaveBeenCalled();
  });

  it('refetches a synced local translation copy instead of reopening stale content', () => {
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });
    builderState.getLocalPageByPage.mockReturnValue({
      nid: '7',
      langcode: 'zh-hans',
      title: 'Home',
      body: [],
      translation: true,
      target: 'en',
      dirty: false,
    });
    nodeService.fetch.mockReturnValueOnce(
      of({ langcode: 'en', label: '英文版', title: 'Home', body: [] })
    );

    component.createLangVersion('en');

    expect(nodeService.fetch).toHaveBeenCalledWith(
      '/api/v3/landingPage/json/7',
      { noCache: 1 },
      'en'
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

  it('checks for an existing translation before asking to create a new draft', () => {
    confirmWith(false);
    setPage({ nid: '7', langcode: 'zh-hans', title: 'Home' });
    nodeService.fetch.mockReturnValueOnce(of({ langcode: 'zh-hans', title: 'Home', body: [] }));

    component.createLangVersion('en');

    expect(nodeService.fetch).toHaveBeenCalledWith(
      '/api/v3/landingPage/json/7',
      { noCache: 1 },
      'en'
    );
    expect(builderState.loadNewPage).not.toHaveBeenCalled();
  });

  it('deletes only the current translation for a non default language page', () => {
    confirmWith(true);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'en', title: 'Home' });

    component.deletePage();

    expect(builderService.deleteTranslation).toHaveBeenCalledWith('7', 'en');
    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
    expect(builderState.deleteLocalPageByPage).toHaveBeenCalledWith(
      expect.objectContaining({ nid: '7', langcode: 'en' }),
      false
    );
  });

  it('deletes the whole node for the source language page', () => {
    confirmWith(true);
    setPage({ nid: '7', uuid: 'uuid-7', langcode: 'zh-hans', title: 'Home' });

    component.deletePage();

    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/node/landing_page', 'uuid-7');
    expect(builderService.deleteTranslation).not.toHaveBeenCalled();
    expect(builderState.deleteLocalPageByPage).toHaveBeenCalledWith(
      expect.objectContaining({ nid: '7', langcode: 'zh-hans' }),
      true
    );
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

  // The default language is the norm on every row, so only translations earn a badge
  it('badges the language of translation rows only', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.language-badge')).toBeNull();

    setPage({ nid: '12', uuid: 'uuid-12', langcode: 'en', title: 'Home' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.language-badge')?.textContent.trim()).toBe('EN');
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
