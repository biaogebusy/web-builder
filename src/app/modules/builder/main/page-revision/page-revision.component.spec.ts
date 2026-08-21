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
import { RevisionDiffComponent } from './revision-diff/revision-diff.component';

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

  const revision = (vid: string, current = false, changed = 1740226733) => ({
    vid,
    current,
    changed,
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

  // The drawer header only says "revision history", so the panel has to name the page
  it('names the page the history belongs to', () => {
    init();

    expect(fixture.nativeElement.querySelector('.revision-page-title').textContent.trim()).toBe(
      '首页'
    );
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

  it('refetches the list after a save, which added a revision', () => {
    init();
    builderService.getPageRevisions.mockClear();

    builderState.updateSuccess$.next(true);

    expect(builderService.getPageRevisions).toHaveBeenCalledTimes(1);
  });

  it('offers a comparison only once exactly two revisions are ticked', () => {
    init();

    expect(component.canCompare()).toBe(false);
    component.toggleCompare('29');
    expect(component.canCompare()).toBe(false);
    component.toggleCompare('28');
    expect(component.canCompare()).toBe(true);
    component.toggleCompare('28');
    expect(component.canCompare()).toBe(false);
  });

  it('stops a third revision from being ticked', () => {
    builderService.getPageRevisions.mockReturnValue(
      of({
        status: true,
        message: '',
        revisions: [revision('29', true), revision('28'), revision('27')],
      })
    );
    init();

    component.toggleCompare('29');
    component.toggleCompare('28');
    fixture.detectChanges();

    const boxes = fixture.nativeElement.querySelectorAll('.revision-select input');
    expect(boxes[0].disabled).toBe(false);
    expect(boxes[2].disabled).toBe(true);
  });

  // The checkbox sits beside the preview button rather than inside it, so ticking must not preview
  it('does not touch the draft when a checkbox is ticked', () => {
    init();

    fixture.nativeElement.querySelector('.revision-select input').click();
    fixture.detectChanges();

    expect(component.selectedVids()).toEqual(['29']);
    expect(builderService.loadPageRevision).not.toHaveBeenCalled();
  });

  // The diff has to read as what changed over time, whichever order the pair was ticked in
  it('compares with the older revision on the left', () => {
    builderService.getPageRevisions.mockReturnValue(
      of({
        status: true,
        message: '',
        revisions: [revision('29', true, 1740226733), revision('28', false, 1740140000)],
      })
    );
    init();
    const open = confirmWith(false);
    component.toggleCompare('29');
    component.toggleCompare('28');

    component.onCompare();

    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toBe(RevisionDiffComponent);
    expect(open.mock.calls[0][1]?.data).toMatchObject({
      nid: '12',
      langcode: 'zh-hans',
      title: '首页',
      original: { vid: '28', time: 1740140000000 },
      modified: { vid: '29', time: 1740226733000 },
    });
  });

  // A layout only save leaves `changed` untouched, so the timestamp cannot order the pair
  it('compares by revision id when both revisions share a timestamp', () => {
    builderService.getPageRevisions.mockReturnValue(
      of({
        status: true,
        message: '',
        revisions: [revision('29', true, 1740226733), revision('28', false, 1740226733)],
      })
    );
    init();
    const open = confirmWith(false);
    component.toggleCompare('29');
    component.toggleCompare('28');

    component.onCompare();

    expect(open.mock.calls[0][1]?.data).toMatchObject({
      original: { vid: '28' },
      modified: { vid: '29' },
    });
  });

  it('drops the selection when the list is refetched', () => {
    init();
    component.toggleCompare('29');
    component.toggleCompare('28');

    builderState.updateSuccess$.next(true);

    expect(component.selectedVids()).toEqual([]);
  });
});
