import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import type { IPage } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { LocalStorageService } from 'ngx-webstorage';
import { BuilderState } from './BuilderState';

describe('BuilderState', () => {
  const storage = {
    retrieve: vi.fn(),
    store: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    storage.retrieve.mockReturnValue([]);
    TestBed.configureTestingModule({
      providers: [
        BuilderState,
        { provide: DOCUMENT, useValue: document },
        { provide: MatDialog, useValue: {} },
        { provide: UtilitiesService, useValue: {} },
        { provide: ScreenService, useValue: { scrollToAnchor: vi.fn() } },
        { provide: LocalStorageService, useValue: storage },
      ],
    });
  });

  it('deletes a persisted page history record by page identity', () => {
    const service = TestBed.inject(BuilderState);
    service.version.set([
      {
        title: 'English page',
        body: [],
        uuid: 'page-uuid',
        nid: '42',
        langcode: 'en',
        current: true,
      },
      {
        title: 'Other page',
        body: [],
        uuid: 'other-uuid',
        nid: '43',
        langcode: 'en',
      },
    ]);

    service.deleteLocalPageByPage({
      title: 'Submitted page',
      body: [],
      uuid: 'page-uuid',
      nid: '42',
      langcode: 'en',
    });

    expect(service.version()).toEqual([
      {
        title: 'Other page',
        body: [],
        uuid: 'other-uuid',
        nid: '43',
        langcode: 'en',
        current: true,
      },
    ]);
    expect(storage.store).toHaveBeenCalledWith('version', service.version());
  });

  it('deletes an unsaved draft by object identity', () => {
    const service = TestBed.inject(BuilderState);
    const draft: IPage = {
      title: 'Draft',
      body: [],
      current: true,
    };
    service.version.set([
      draft,
      {
        title: 'Other draft',
        body: [],
      },
    ]);

    service.deleteLocalPageByPage(draft);

    expect(service.version()).toEqual([
      {
        title: 'Other draft',
        body: [],
        current: true,
      },
    ]);
  });

  it('does not change history when the page is not found', () => {
    const service = TestBed.inject(BuilderState);
    service.version.set([
      {
        title: 'Existing page',
        body: [],
        uuid: 'existing-uuid',
        current: true,
      },
    ]);

    service.deleteLocalPageByPage({
      title: 'Missing page',
      body: [],
      uuid: 'missing-uuid',
    });

    expect(service.version()).toHaveLength(1);
    expect(storage.store).not.toHaveBeenCalled();
  });

  it('starts a fresh draft after deleting the final history record', () => {
    const service = TestBed.inject(BuilderState);
    const page: IPage = {
      title: 'Submitted page',
      body: [{ type: 'text' }],
      current: true,
    };
    service.version.set([page]);

    service.deleteLocalPageByPage(page);

    expect(service.version()).toEqual([
      expect.objectContaining({
        title: '着陆页',
        body: [],
        current: true,
      }),
    ]);
  });
});
