import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { vi } from 'vitest';

import { builderCurrentPageFactory } from './factory';

describe('builderCurrentPageFactory', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const setup = (url: string, pages: IPage[]) => {
    const version = signal<IPage[]>(pages);
    const checkIsLatestPage = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { url } },
        { provide: BuilderState, useValue: { version } },
        { provide: BuilderService, useValue: { checkIsLatestPage } },
      ],
    });

    const currentPage = TestBed.runInInjectionContext(() => builderCurrentPageFactory());
    return { currentPage, version, checkIsLatestPage };
  };

  it('returns the current page and follows version signal changes', () => {
    const { currentPage, version } = setup('/preview', [
      { title: 'A', body: [], current: true },
      { title: 'B', body: [] },
    ]);

    expect(currentPage()).toMatchObject({ title: 'A' });

    version.set([
      { title: 'A', body: [] },
      { title: 'B', body: [], current: true },
    ]);

    expect(currentPage()).toMatchObject({ title: 'B' });
  });

  it('falls back to the first page and to false when the list is empty', () => {
    const { currentPage, version } = setup('/preview', [{ title: 'A', body: [] }]);

    expect(currentPage()).toMatchObject({ title: 'A' });

    version.set([]);

    expect(currentPage()).toBe(false);
  });

  it('kicks off the latest-page check only on the builder path', () => {
    const pages: IPage[] = [{ title: 'A', body: [], current: true, nid: '1' }];

    const builderRun = setup('/builder', pages);
    expect(builderRun.checkIsLatestPage).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'A' })
    );

    TestBed.resetTestingModule();

    const previewRun = setup('/preview', pages);
    expect(previewRun.checkIsLatestPage).not.toHaveBeenCalled();
  });
});
