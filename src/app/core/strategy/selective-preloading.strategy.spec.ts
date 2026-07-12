import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { Route } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import {
  AUTHENTICATED_IDLE_PRELOAD,
  SelectivePreloadingStrategy,
} from './selective-preloading.strategy';

interface StrategyOptions {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
  online?: boolean;
  platformId?: string;
  user?: IUser | boolean;
}

describe('SelectivePreloadingStrategy', () => {
  function createStrategy(options: StrategyOptions = {}) {
    const requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
      callback({ didTimeout: false, timeRemaining: () => 50 });
      return 1;
    });
    const documentMock = {
      defaultView: {
        cancelIdleCallback: vi.fn(),
        navigator: {
          connection: options.connection,
          onLine: options.online ?? true,
        },
        requestIdleCallback,
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: documentMock },
        { provide: PLATFORM_ID, useValue: options.platformId ?? 'browser' },
        { provide: USER, useValue: signal(options.user ?? false) },
      ],
    });

    return {
      requestIdleCallback,
      strategy: TestBed.inject(SelectivePreloadingStrategy),
    };
  }

  async function preload(strategy: SelectivePreloadingStrategy, route: Route) {
    return firstValueFrom(
      strategy.preload(route, () => of('loaded')),
      {
        defaultValue: 'skipped',
      }
    );
  }

  afterEach(() => TestBed.resetTestingModule());

  it('preloads an explicitly enabled lightweight route', async () => {
    const { strategy } = createStrategy({ connection: { effectiveType: '3g' } });

    await expect(preload(strategy, { data: { preload: true } })).resolves.toBe('loaded');
  });

  it('does not preload an unmarked route', async () => {
    const { strategy } = createStrategy();

    await expect(preload(strategy, {})).resolves.toBe('skipped');
  });

  it('does not preload when data saver is enabled', async () => {
    const { strategy } = createStrategy({ connection: { saveData: true } });

    await expect(preload(strategy, { data: { preload: true } })).resolves.toBe('skipped');
  });

  it('preloads Builder when the user is authenticated and the browser is idle', async () => {
    const user = {
      access_token: 'token',
      authenticated: true,
    } as IUser;
    const { requestIdleCallback, strategy } = createStrategy({
      connection: { effectiveType: '4g' },
      user,
    });

    await expect(
      preload(strategy, { data: { preload: AUTHENTICATED_IDLE_PRELOAD } })
    ).resolves.toBe('loaded');
    expect(requestIdleCallback).toHaveBeenCalledOnce();
  });

  it('does not preload Builder for an anonymous user', async () => {
    const { strategy } = createStrategy({ connection: { effectiveType: '4g' } });

    await expect(
      preload(strategy, { data: { preload: AUTHENTICATED_IDLE_PRELOAD } })
    ).resolves.toBe('skipped');
  });

  it('does not preload Builder on a 3g connection', async () => {
    const user = {
      access_token: 'token',
      authenticated: true,
    } as IUser;
    const { strategy } = createStrategy({
      connection: { effectiveType: '3g' },
      user,
    });

    await expect(
      preload(strategy, { data: { preload: AUTHENTICATED_IDLE_PRELOAD } })
    ).resolves.toBe('skipped');
  });

  it('does not preload routes during SSR', async () => {
    const { strategy } = createStrategy({ platformId: 'server' });

    await expect(preload(strategy, { data: { preload: true } })).resolves.toBe('skipped');
  });
});
