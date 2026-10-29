import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, firstValueFrom, of, throwError } from 'rxjs';
import { PageDeletionService, type PageDeletionTarget } from './page-deletion.service';

describe('PageDeletionService', () => {
  const target: PageDeletionTarget = {
    uuid: 'page-7', nid: '7', langcode: 'zh-hans', title: 'About us',
  };
  const resource = (langcode = 'zh-hans', original: unknown = false) => ({
    data: { id: 'page-7', type: 'node--landing_page', attributes: {
      langcode, default_langcode: original, drupal_internal__nid: 7,
    } },
  });
  const fetch = vi.fn();
  const deleteEntity = vi.fn();
  const deleteTranslation = vi.fn();
  const open = vi.fn();
  const openSnackbar = vi.fn();
  const instant = vi.fn((key: string, params?: unknown) => `${key}:${JSON.stringify(params)}`);
  let service: PageDeletionService;

  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockReturnValue(of(resource()));
    deleteEntity.mockReturnValue(of(null));
    deleteTranslation.mockReturnValue(of({ status: true }));
    open.mockReturnValue({ afterClosed: () => of(true) });
    TestBed.configureTestingModule({ providers: [
      PageDeletionService,
      { provide: NodeService, useValue: { fetch, deleteEntity } },
      { provide: BuilderService, useValue: { deleteTranslation } },
      { provide: MatDialog, useValue: { open } },
      { provide: UtilitiesService, useValue: { openSnackbar } },
      { provide: TranslateService, useValue: { instant } },
    ] });
    service = TestBed.inject(PageDeletionService);
  });

  it('deletes a Chinese translation without deleting its English original', async () => {
    expect(await firstValueFrom(service.delete(target))).toBe('translation');
    expect(fetch).toHaveBeenCalledWith('/api/v1/node/landing_page/page-7', {
      'noCache': expect.any(Number),
      'fields[node--landing_page]': 'langcode,default_langcode,drupal_internal__nid',
    }, 'zh-hans');
    expect(deleteTranslation).toHaveBeenCalledWith('7', 'zh-hans');
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(open.mock.calls[0][1].data.yesLabel).toContain('DELETE_TRANSLATION');
  });

  it('explicitly confirms every language when the original language is English', async () => {
    fetch.mockReturnValue(of(resource('en', true)));
    expect(await firstValueFrom(service.delete({ ...target, langcode: 'en' }))).toBe('page');
    expect(open.mock.calls[0][1].data.yesLabel).toContain('DELETE_ALL_LANG');
    expect(deleteEntity).toHaveBeenCalledWith('/api/v1/node/landing_page', 'page-7');
    expect(deleteTranslation).not.toHaveBeenCalled();
  });

  it.each([undefined, null, 'false', 0])('refuses missing or invalid original flags: %s', async flag => {
    const data = resource();
    data.data.attributes.default_langcode = flag;
    fetch.mockReturnValue(of(data));
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(open).not.toHaveBeenCalled();
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(deleteTranslation).not.toHaveBeenCalled();
    expect(openSnackbar.mock.calls[0][0]).toContain('DELETE_CHECK_FAILED');
  });

  it.each(['language', 'uuid', 'nid', 'type'])('rejects a mismatched %s before confirmation', async field => {
    const data = resource();
    if (field === 'language') data.data.attributes.langcode = 'en';
    if (field === 'uuid') data.data.id = 'another-page';
    if (field === 'nid') data.data.attributes.drupal_internal__nid = 8;
    if (field === 'type') data.data.type = 'node--article';
    fetch.mockReturnValue(of(data));
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(open).not.toHaveBeenCalled();
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(deleteTranslation).not.toHaveBeenCalled();
  });

  it('keeps all versions when confirmation is dismissed', async () => {
    open.mockReturnValue({ afterClosed: () => of(undefined) });
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(deleteTranslation).not.toHaveBeenCalled();
    expect(openSnackbar).not.toHaveBeenCalled();
    expect(service.busy()).toBe(false);
  });

  it('retains the captured page identity and prevents duplicate confirmations', async () => {
    const confirmation = new Subject<boolean>();
    open.mockReturnValue({ afterClosed: () => confirmation });
    const selected = { ...target };
    const completed = firstValueFrom(service.delete(selected));
    selected.uuid = 'another-page';
    selected.langcode = 'en';
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(open).toHaveBeenCalledOnce();
    confirmation.next(true);
    expect(await completed).toBe('translation');
    expect(deleteTranslation).toHaveBeenCalledWith('7', 'zh-hans');
    expect(service.busy()).toBe(false);
  });

  it('does not show success or widen the scope after a denied translation delete', async () => {
    deleteTranslation.mockReturnValue(throwError(() => ({ status: 403 })));
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(openSnackbar).toHaveBeenCalledOnce();
    expect(openSnackbar.mock.calls[0][0]).toContain('NO_PERMISSION');
  });

  it('retains the page if its language cannot be read', async () => {
    fetch.mockReturnValue(throwError(() => ({ status: 503 })));
    expect(await firstValueFrom(service.delete(target))).toBe(false);
    expect(open).not.toHaveBeenCalled();
    expect(deleteEntity).not.toHaveBeenCalled();
    expect(deleteTranslation).not.toHaveBeenCalled();
  });

  it('escapes the page title in the HTML confirmation', async () => {
    await firstValueFrom(service.delete({ ...target, title: '<strong>Misleading title</strong>' }));
    expect(open.mock.calls[0][1].data.inputData.content.body)
      .toContain('&lt;strong&gt;Misleading title&lt;/strong&gt;');
  });
});
