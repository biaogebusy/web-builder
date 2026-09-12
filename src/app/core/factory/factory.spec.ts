import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { vi } from 'vitest';
import { LocalStorageService } from 'ngx-webstorage';

import { builderCurrentPageFactory, themeFactory } from './factory';

describe('themeFactory', () => {
  afterEach(() => TestBed.resetTestingModule());

  const resolve = (config: Partial<ICoreConfig>, stored: unknown = null) => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: { retrieve: () => stored } }],
    });
    return TestBed.runInInjectionContext(() => themeFactory(config as ICoreConfig));
  };

  it.each([undefined, '', 'blue-theme'])('uses light-theme for an invalid default: %s', value => {
    expect(resolve({ defaultTheme: value })).toBe('light-theme');
  });

  it('uses the configured supported default', () => {
    expect(resolve({ defaultTheme: 'dark-theme' })).toBe('dark-theme');
  });

  it('honours a supported local preference when the menu config is absent', () => {
    expect(resolve({}, 'dark-theme')).toBe('dark-theme');
  });

  it('rejects obsolete names even if a stale menu still lists them', () => {
    expect(resolve({ theme: [{ name: 'Blue', style: 'blue-theme' }] }, 'blue-theme'))
      .toBe('light-theme');
  });

  it('falls back when the configured menu no longer offers the local preference', () => {
    expect(resolve({
      defaultTheme: 'dark-theme',
      theme: [{ name: 'Dark', style: 'dark-theme' }],
    }, 'light-theme')).toBe('dark-theme');
  });
});

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
