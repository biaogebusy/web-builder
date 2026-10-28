import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import type { IManageAssets, IManageImg } from '@core/interface/manage/IManage';
import { MediaLibraryService } from '@core/service/media-library.service';
import { ManageService } from '@core/service/manage.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { BUILDER_CONFIG, USER } from '@core/token/token-providers';
import { BuilderState } from '@core/state/BuilderState';
import {
  createManageServiceMock,
  createMatDialogMock,
  createUserServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { ManageMediaComponent } from './manage-media.component';

const row = (uuid: string, extra: Partial<IManageImg> = {}): IManageImg => ({
  id: uuid, uuid, title: uuid, src: '/hero.png', source: '/hero.png',
  kind: 'image', mimeType: 'image/png', canRename: true, canRemove: true, ...extra,
});
const page = (rows: IManageImg[], nextCursor: string | null = null): IManageAssets => ({
  rows, nextCursor, scope: 'mine',
});

describe('ManageMediaComponent catalog', () => {
  const user = signal<unknown>({ id: 'alice' });
  const library = {
    list: vi.fn((_filters: Record<string, unknown>) => of(page([]))),
    capabilities: vi.fn(() => of({ canViewAll: false, types: [] })),
  };
  const manage = createManageServiceMock();
  const dialog = createMatDialogMock();
  const userService = createUserServiceMock();

  async function setup(mode = 'manage') {
    await TestBed.configureTestingModule({
      imports: [ManageMediaComponent, MatIconTestingModule],
      providers: [provideRouter([]), ...provideCoreMocks(),
        { provide: USER, useValue: user },
        { provide: MediaLibraryService, useValue: library },
        { provide: ManageService, useValue: manage },
        { provide: UserService, useValue: userService },
        { provide: MatDialog, useValue: dialog },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: BUILDER_CONFIG, useValue: of({ manageMedia: { row: 2, sidebar: { form: [] } } }) },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ManageMediaComponent);
    fixture.componentRef.setInput('content', { type: 'manage-media', mode, time: new Date() });
    fixture.detectChanges();
    return { fixture, component: fixture.componentInstance };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    library.list.mockReturnValue(of(page([])));
    user.set({ id: 'alice' });
  });

  it('appends unique rows and uses server cursors without fabricated totals', async () => {
    library.list.mockReturnValueOnce(of(page([row('1')], '100')))
      .mockReturnValueOnce(of(page([row('1'), row('2')])));
    const { component } = await setup();
    component.loadMore();
    expect(library.list.mock.calls[1][0]['cursor']).toBe('100');
    expect(component.visibleAssets()?.rows.map(item => item.uuid)).toEqual(['1', '2']);
    expect(component.hasMore()).toBe(false);
  });

  it('continues through an empty authorized page when a cursor remains', async () => {
    library.list.mockReturnValueOnce(of(page([], '80')))
      .mockReturnValueOnce(of(page([row('1')])));
    const { component } = await setup();
    expect(component.hasMore()).toBe(true);
    component.loadMore();
    expect(component.visibleAssets()?.rows).toHaveLength(1);
  });

  it('cancels obsolete requests on search, account switch and destruction', async () => {
    const first = new Subject<IManageAssets>();
    const second = new Subject<IManageAssets>();
    const third = new Subject<IManageAssets>();
    library.list.mockReturnValueOnce(first).mockReturnValueOnce(second).mockReturnValueOnce(third);
    const { component, fixture } = await setup();
    component.onSearch({ name: 'new' });
    expect(first.observed).toBe(false);
    second.next(page([row('old-account')]));
    user.set({ id: 'bob' });
    fixture.detectChanges();
    expect(second.observed).toBe(false);
    expect(component.visibleAssets()).toBeUndefined();
    fixture.destroy();
    expect(third.observed).toBe(false);
  });

  it('shows a sign-in prompt and hides the toolbar for anonymous visitors', async () => {
    user.set(false);
    const { fixture } = await setup();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.toolbar')).toBeNull();
    expect(element.querySelector('.media-grid')?.classList.contains('guest')).toBe(true);
    expect(element.querySelector('.login-required')?.textContent)
      .toContain('MANAGE.MEDIA.LOGIN_TITLE');
    expect(library.list).not.toHaveBeenCalled();
  });

  it('opens the in-place login dialog and fades the sign-in prompt', async () => {
    user.set(false);
    const { component, fixture } = await setup();
    userService.openLoginDialog.mockResolvedValue({ afterClosed: () => of(undefined) });
    const pending = component.onLogin();
    expect(userService.openLoginDialog).toHaveBeenCalledTimes(1);
    expect(component.signingIn()).toBe(true);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.login-required.is-leaving')
    ).not.toBeNull();
    await pending;
    expect(component.signingIn()).toBe(false);
  });

  it('reloads the library after the login dialog signs the user in', async () => {
    user.set(false);
    const { component, fixture } = await setup();
    const closed = new Subject<boolean>();
    userService.openLoginDialog.mockResolvedValue({ afterClosed: () => closed });
    void component.onLogin();
    await Promise.resolve();
    expect(library.list).not.toHaveBeenCalled();
    user.set({ id: 'bob' });
    fixture.detectChanges();
    expect(library.list).toHaveBeenCalledTimes(1);
    closed.next(true);
    closed.complete();
    expect(component.signingIn()).toBe(false);
  });

  it('keeps filter labels accessible but visually hidden', async () => {
    const { fixture } = await setup();
    const labels = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.toolbar-actions label > span')
    );
    expect(labels).toHaveLength(1);
    expect(labels.every(label => label.classList.contains('sr-only'))).toBe(true);
  });

  it('does not retry failed pages automatically and retains loaded rows', async () => {
    library.list.mockReturnValueOnce(of(page([row('1')], '90')))
      .mockReturnValueOnce(throwError(() => new Error('offline')))
      .mockReturnValueOnce(of(page([row('2')])));
    const { component } = await setup();
    component.loadMore();
    component.loadMore();
    expect(library.list).toHaveBeenCalledTimes(2);
    expect(component.visibleAssets()?.rows).toHaveLength(1);
    component.retryLoad();
    expect(component.visibleAssets()?.rows).toHaveLength(2);
  });

  it('keeps paged navigation with previous/next cursors', async () => {
    library.list.mockReturnValueOnce(of(page([row('1')], '90')))
      .mockReturnValueOnce(of(page([row('2')])));
    const { component } = await setup();
    component.manageMediaConfig.set({ row: 2, pagination: 'paged' });
    component.onPageChange(1);
    expect(component.visibleAssets()?.rows.map(item => item.uuid)).toEqual(['2']);
    expect(component.pageIndex()).toBe(1);
  });

  it('selects removable rows only and sends no physical deletion request', async () => {
    library.list.mockReturnValue(of(page([row('1'), row('2', { canRemove: false })])));
    const { component } = await setup();
    component.selectLoaded();
    expect(component.selectedIds()).toEqual(['1']);
    dialog.open.mockReturnValueOnce({ afterClosed: () => of(true) } as never);
    component.bulkDelete(['1', '2']);
    expect(manage.deleteMedia).toHaveBeenCalledWith('1');
    expect(manage.deleteMedia).toHaveBeenCalledTimes(1);
  });

  it('rejects SVG for model inputs and keeps original media and file IDs for raster images', async () => {
    const { component, fixture } = await setup('');
    fixture.componentRef.setInput('content', { type: 'manage-media', purpose: 'raster-image' });
    const selected = vi.fn();
    TestBed.inject(BuilderState).selectedMedia$.subscribe(selected);
    component.onSelect(row('vector', { source: '/logo.svg', mimeType: 'image/svg+xml' }));
    expect(selected).not.toHaveBeenCalled();
    component.onSelect(row('media', { fileId: 'file' }));
    expect(selected.mock.calls[0][0].img).toMatchObject({ uuid: 'media', fileId: 'file', src: '/hero.png' });
  });
});
