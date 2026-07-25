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
  };
  const builderService = {
    addTranslation: vi.fn(),
    createLandingPage: vi.fn(),
    updateLandingPage: vi.fn(),
    loadPage: vi.fn(),
  };
  const router = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(true) },
        { provide: BUILDER_FULL_SCREEN, useValue: signal(false) },
        { provide: BUILDER_CURRENT_PAGE, useValue: signal(false) },
        { provide: MatDialog, useValue: { open: vi.fn() } },
        { provide: BuilderState, useValue: builder },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: ScreenState, useValue: {} },
        {
          provide: LocalStorageService,
          useValue: { retrieve: vi.fn(), observe: vi.fn(() => of([])), store: vi.fn() },
        },
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => false) } },
        { provide: BuilderService, useValue: builderService },
        { provide: UserService, useValue: { openLoginDialog: vi.fn() } },
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
});
