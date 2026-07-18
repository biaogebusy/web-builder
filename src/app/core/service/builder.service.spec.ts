import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import type { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { of, Subject } from 'rxjs';
import { BuilderService } from './builder.service';
import { ContentService } from './content.service';
import { NodeService } from './node.service';
import { UtilitiesService } from './utilities.service';

describe('BuilderService', () => {
  it('waits for builder config before updating a landing page', () => {
    const builderConfig$ = new Subject<IBuilderConfig>();
    const patch = vi.fn((_url: string, _body: unknown, _options: unknown) =>
      of({ status: false })
    );
    const loadingSet = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        BuilderService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { patch } },
        { provide: MatDialog, useValue: {} },
        { provide: BuilderState, useValue: { loading: { set: loadingSet } } },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: NodeService, useValue: {} },
        { provide: ContentService, useValue: { loadBuilderConfig: () => builderConfig$ } },
        { provide: Router, useValue: { url: '/builder' } },
        { provide: LocalStorageService, useValue: {} },
      ],
    });

    const service = TestBed.inject(BuilderService);
    const page = { nid: '42', title: 'Test page', body: [] } as IPage;

    service.updateLandingPage(page).subscribe();

    expect(loadingSet).toHaveBeenCalledWith(true);
    expect(patch).not.toHaveBeenCalled();

    builderConfig$.next({
      api: {
        create: '/api/pages',
        update: '/api/pages',
        translate: '/api/pages/translate',
      },
    } as IBuilderConfig);

    expect(patch).toHaveBeenCalledOnce();
    expect(patch.mock.calls[0][0]).toBe('https://example.com/api/pages/42');
  });
});
