import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import type { IPageRevisionPanel } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderServiceMock,
  createBuilderStateMock,
  createScreenServiceMock,
  createUserServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { of, throwError } from 'rxjs';

import { PageRevisionComponent } from './page-revision.component';

describe('PageRevisionComponent', () => {
  let component: PageRevisionComponent;
  let fixture: ComponentFixture<PageRevisionComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const screenService = createScreenServiceMock();
  const userService = createUserServiceMock();

  const panel: IPageRevisionPanel = {
    type: 'page-revision',
    fullWidth: true,
    content: { nid: '12', title: '首页', langcode: 'zh-hans' },
  };

  const revision = (vid: string, current = false) => ({
    vid,
    current,
    changed: 1740226733,
    log: '',
    author: 'admin',
  });

  // MatDialog comes from modules in the component's standalone imports, so spy the real instance
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  // The list is only fetched in the browser
  const init = () => {
    screenService.isPlatformBrowser.mockReturnValue(true);
    fixture.componentRef.setInput('content', panel);
    component.ngOnInit();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    builderState.isPageDirty.mockReturnValue(false);
    builderService.getPageRevisions.mockReturnValue(
      of({ status: true, message: '', revisions: [revision('29', true), revision('28')] })
    );
    await TestBed.configureTestingModule({
      imports: [PageRevisionComponent, MatIconTestingModule],
      providers: [
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: ScreenService, useValue: screenService },
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageRevisionComponent);
    component = fixture.componentInstance;
  });

  it('lists the revisions of the page it was opened for', () => {
    init();

    expect(builderService.getPageRevisions).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
    });
    expect(component.revisions().length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.revision-row').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.revision-badge')).not.toBeNull();
  });

  // Drupal sends seconds, the date pipe reads milliseconds
  it('converts the revision timestamp to milliseconds', () => {
    init();

    expect(component.revisions()[0].time).toBe(1740226733000);
  });

  it('reports a failed list request instead of showing an empty history', () => {
    builderService.getPageRevisions.mockReturnValue(throwError(() => new Error('offline')));

    init();

    expect(component.error()).toBe(true);
    expect(component.revisions().length).toBe(0);
  });

  it('treats a rejected response as an error', () => {
    builderService.getPageRevisions.mockReturnValue(of({ status: false, message: 'no access' }));

    init();

    expect(component.error()).toBe(true);
  });

  it('asks an unauthorized user to sign in instead of reporting a failure', () => {
    builderService.getPageRevisions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 403 }))
    );

    init();

    expect(component.forbidden()).toBe(true);
    expect(component.error()).toBe(false);
    expect(fixture.nativeElement.querySelector('app-btn')).not.toBeNull();
  });

  it('reloads the list after the login dialog reports a success', async () => {
    builderService.getPageRevisions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 403 }))
    );
    init();
    builderService.getPageRevisions.mockClear();
    userService.openLoginDialog.mockResolvedValue({ afterClosed: () => of(true) });
    builderService.getPageRevisions.mockReturnValue(
      of({ status: true, message: '', revisions: [] })
    );

    await component.openLogin();

    expect(builderService.getPageRevisions).toHaveBeenCalledTimes(1);
    expect(component.forbidden()).toBe(false);
  });

  it('keeps the sign in prompt when the login dialog is dismissed', async () => {
    builderService.getPageRevisions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 403 }))
    );
    init();
    builderService.getPageRevisions.mockClear();
    userService.openLoginDialog.mockResolvedValue({ afterClosed: () => of(undefined) });

    await component.openLogin();

    expect(builderService.getPageRevisions).not.toHaveBeenCalled();
    expect(component.forbidden()).toBe(true);
  });

  it('loads the picked revision into the draft without asking when nothing is unsaved', () => {
    init();
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const open = vi.spyOn(dialog, 'open');

    component.onRevision(component.revisions()[1]);

    expect(builderService.loadPageRevision).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
      vid: '28',
    });
    expect(open).not.toHaveBeenCalled();
  });

  it('keeps an unsaved draft when the overwrite is not confirmed', () => {
    builderState.isPageDirty.mockReturnValue(true);
    init();
    confirmWith(false);

    component.onRevision(component.revisions()[1]);

    expect(builderService.loadPageRevision).not.toHaveBeenCalled();
  });

  it('overwrites an unsaved draft only after confirmation', () => {
    builderState.isPageDirty.mockReturnValue(true);
    init();
    confirmWith(true);

    component.onRevision(component.revisions()[1]);

    expect(builderService.loadPageRevision).toHaveBeenCalledWith({
      nid: '12',
      langcode: 'zh-hans',
      vid: '28',
    });
  });
});
