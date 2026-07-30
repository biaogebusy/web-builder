import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import {
  BUILDER_CURRENT_PAGE,
  BUILDER_FULL_SCREEN,
  USER,
} from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { BuilderToolbarComponent } from './builder-toolbar.component';

describe('BuilderToolbarComponent', () => {
  let component: BuilderToolbarComponent;

  const builder = {
    currentPage: {} as IPage,
    loading: { set: vi.fn() },
    updateSuccess$: { next: vi.fn() },
    deleteLocalPageByPage: vi.fn(),
    fullScreen$: { next: vi.fn() },
    saveLocalVersions: vi.fn(),
  };
  const builderService = {
    addTranslation: vi.fn(),
    checkTranslationExists: vi.fn(() => of(false)),
    createLandingPage: vi.fn(),
    updateLandingPage: vi.fn(),
    loadPage: vi.fn(),
  };
  const util = { openSnackbar: vi.fn() };
  const storage = { retrieve: vi.fn(), observe: vi.fn(() => of([])), store: vi.fn() };
  const userService = { openLoginDialog: vi.fn() };
  const user = signal<unknown>(true);
  const router = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    user.set(true);
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: user },
        { provide: BUILDER_FULL_SCREEN, useValue: signal(false) },
        { provide: BUILDER_CURRENT_PAGE, useValue: signal(false) },
        { provide: MatDialog, useValue: { open: vi.fn() } },
        { provide: BuilderState, useValue: builder },
        { provide: UtilitiesService, useValue: util },
        { provide: ScreenState, useValue: {} },
        {
          provide: LocalStorageService,
          useValue: storage,
        },
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => false) } },
        { provide: BuilderService, useValue: builderService },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
        { provide: TranslateService, useValue: { instant: vi.fn((key: string) => key) } },
      ],
    });
    component = TestBed.runInInjectionContext(() => new BuilderToolbarComponent());
  });

  it('deletes the submitted draft history after creating a page', () => {
    const page: IPage = {
      title: 'New page',
      body: [{ type: 'text' }],
    };
    builder.currentPage = page;
    builderService.createLandingPage.mockReturnValue(of({ status: true, message: 'created' }));

    component.onSubmit(page);

    expect(builderService.createLandingPage).toHaveBeenCalledWith(page, false);
    expect(builder.deleteLocalPageByPage).toHaveBeenCalledWith(page);
  });

  it('deletes the translation draft history after submitting a translation', () => {
    const page: IPage = {
      title: 'Translation draft',
      body: [{ type: 'text' }],
      uuid: 'page-uuid',
      nid: '42',
      langcode: 'en',
      translation: true,
      target: 'zh-hans',
    };
    builder.currentPage = page;
    builderService.addTranslation.mockReturnValue(of({ status: true }));

    component.onSubmit(page);

    expect(builder.deleteLocalPageByPage).toHaveBeenCalledWith(page);
    expect(builderService.loadPage).toHaveBeenCalledWith({
      langcode: 'zh-hans',
      nid: '42',
    });
  });

  it('keeps the draft and skips submission when the translation already exists', () => {
    const page: IPage = {
      title: 'Translation draft',
      body: [{ type: 'text' }],
      uuid: 'page-uuid',
      nid: '42',
      langcode: 'en',
      translation: true,
      target: 'zh-hans',
    };
    builder.currentPage = page;
    builderService.checkTranslationExists.mockReturnValueOnce(of(true));

    component.onSubmit(page);

    expect(builderService.addTranslation).not.toHaveBeenCalled();
    expect(builder.deleteLocalPageByPage).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.TOOLBAR.TRANSLATION_EXISTS', 'ok');
  });

  it('deletes the submitted page history after updating a page', () => {
    const page: IPage = {
      title: 'Existing page',
      body: [{ type: 'text' }],
      uuid: 'page-uuid',
      nid: '42',
    };
    builder.currentPage = page;
    builderService.updateLandingPage.mockReturnValue(of({ status: true, message: 'updated' }));

    component.onSubmit(page);

    expect(builderService.updateLandingPage).toHaveBeenCalledWith(page, false);
    expect(builder.deleteLocalPageByPage).toHaveBeenCalledWith(page);
  });

  it('keeps page history when the update fails', () => {
    const page: IPage = {
      title: 'Existing page',
      body: [{ type: 'text' }],
      uuid: 'page-uuid',
      nid: '42',
    };
    builder.currentPage = page;
    builderService.updateLandingPage.mockReturnValue(of({ status: false, message: 'failed' }));

    component.onSubmit(page);

    expect(builder.deleteLocalPageByPage).not.toHaveBeenCalled();
  });

  it('navigates to the page list and broadcasts success after updating', () => {
    const page: IPage = {
      title: 'Existing page',
      body: [{ type: 'text' }],
      uuid: 'page-uuid',
      nid: '42',
    };
    builder.currentPage = page;
    builderService.updateLandingPage.mockReturnValue(of({ status: true, message: 'updated' }));

    component.onSubmit(page);

    expect(builder.updateSuccess$.next).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/builder/page-list'], { queryParams: {} });
  });

  it('sends signed-out users to the login dialog instead of saving', () => {
    user.set(false);

    component.onSubmit({ title: 'Draft', body: [{ type: 'text' }] });

    expect(userService.openLoginDialog).toHaveBeenCalled();
    expect(builderService.createLandingPage).not.toHaveBeenCalled();
    expect(builderService.updateLandingPage).not.toHaveBeenCalled();
    expect(builderService.addTranslation).not.toHaveBeenCalled();
  });

  it('blocks submission until the page has at least one component', () => {
    component.page = { title: 'Empty', body: [] };

    component.onSubmit({ title: 'Empty', body: [] });

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.TOOLBAR.ADD_COMPONENT_FIRST', 'ok');
    expect(builderService.createLandingPage).not.toHaveBeenCalled();
    expect(builderService.updateLandingPage).not.toHaveBeenCalled();
    expect(builderService.addTranslation).not.toHaveBeenCalled();
  });

  it('persists the fullscreen switch and broadcasts it', () => {
    component.onFullScreen({ checked: true } as never);

    expect(storage.store).toHaveBeenCalledWith('builderFullScreen', true);
    expect(builder.fullScreen$.next).toHaveBeenCalledWith(true);
  });

  it('renames the current page and saves the local versions', () => {
    builder.currentPage = { title: 'Old', body: [] };

    component.onTitle({ target: { textContent: '新标题' } });

    expect(builder.currentPage.title).toBe('新标题');
    expect(builder.saveLocalVersions).toHaveBeenCalled();
  });

  it('keeps the title when the edited text is empty', () => {
    builder.currentPage = { title: 'Old', body: [] };

    component.onTitle({ target: { textContent: '' } });

    expect(builder.currentPage.title).toBe('Old');
    expect(builder.saveLocalVersions).not.toHaveBeenCalled();
  });
});
