import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE, USER } from '@core/token/token-providers';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderListComponent } from './builder-list.component';

describe('BuilderListComponent', () => {
  let component: BuilderListComponent;
  let fixture: ComponentFixture<BuilderListComponent>;
  const builderService = { restoreRevision: vi.fn(), loadPage: vi.fn() };
  const userService = { openLoginDialog: vi.fn(), checkShow: vi.fn(() => true) };
  const user = signal<unknown>(true);
  const currentPage = signal<IPage | undefined>(undefined);

  beforeEach(async () => {
    vi.clearAllMocks();
    user.set(true);
    currentPage.set(undefined);
    await TestBed.configureTestingModule({
      imports: [BuilderListComponent, MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: USER, useValue: user },
        { provide: BUILDER_CURRENT_PAGE, useValue: currentPage },
        { provide: BuilderService, useValue: builderService },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reports the previewed revision only while the draft came from one', () => {
    expect(component.revisionPreview()).toBeNull();

    currentPage.set({ title: 'Page', body: [], nid: '42', langcode: 'en', revisionVid: '28' });

    expect(component.revisionPreview()).toEqual({ nid: '42', langcode: 'en', vid: '28' });
  });

  it('restores the previewed revision through the builder service', () => {
    component.onRestoreRevision({ nid: '42', langcode: 'en', vid: '28' });

    expect(builderService.restoreRevision).toHaveBeenCalledWith({
      nid: '42',
      langcode: 'en',
      vid: '28',
    });
  });

  it('sends signed-out users to the login dialog instead of restoring', () => {
    user.set(false);

    component.onRestoreRevision({ nid: '42', vid: '28' });

    expect(userService.openLoginDialog).toHaveBeenCalled();
    expect(builderService.restoreRevision).not.toHaveBeenCalled();
  });

  it('drops the preview by reloading the published page', () => {
    component.onDiscardRevision({ nid: '42', langcode: 'en' });

    expect(builderService.loadPage).toHaveBeenCalledWith({ langcode: 'en', nid: '42' });
  });

  it('renders the device preview iframe on the first breakpoint switch', () => {
    currentPage.set({ title: 'Page', body: [{ type: 'text' }] });
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-iframe')).toBeNull();

    TestBed.inject(BuilderState).switchPreview$.next('sm');
    fixture.detectChanges();

    expect(el.querySelector('.wrapper')?.classList).toContain('preview-sm');
    expect(el.querySelector('app-iframe')).not.toBeNull();
  });

  it('keeps the loading overlay until both canvas and settings work finish', async () => {
    TestBed.inject(UtilitiesService).initAnimate = vi.fn();
    currentPage.set({ title: 'Page', body: [{ type: 'text' }] });
    const state = TestBed.inject(BuilderState);
    state.loading.set(true);
    state.pageSettingsLoading.set(true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-loading')).not.toBeNull();
    state.loading.set(false);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-loading')).not.toBeNull();
    state.pageSettingsLoading.set(false);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-loading')).toBeNull();
  });
});
