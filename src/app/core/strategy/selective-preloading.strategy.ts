import { DOCUMENT, Injectable, PLATFORM_ID, Signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

export const AUTHENTICATED_IDLE_PRELOAD = 'authenticated-idle';

interface NetworkInformationLike {
  effectiveType?: string;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

type WindowWithIdleCallback = Omit<Window, 'cancelIdleCallback' | 'requestIdleCallback'> &
  Partial<Pick<Window, 'cancelIdleCallback' | 'requestIdleCallback'>>;

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly user = inject<Signal<IUser | boolean>>(USER);

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }

    const preloadMode = route.data?.['preload'];

    if (preloadMode === true) {
      return this.isNetworkAllowed(false) ? load() : EMPTY;
    }

    if (preloadMode !== AUTHENTICATED_IDLE_PRELOAD) {
      return EMPTY;
    }

    if (!this.isAuthenticated() || !this.isNetworkAllowed(true)) {
      return EMPTY;
    }

    return this.waitForIdle().pipe(switchMap(() => load()));
  }

  private isAuthenticated(): boolean {
    const user = this.user();
    return typeof user === 'object' && user.authenticated === true && !!user.access_token;
  }

  private isNetworkAllowed(requireFastConnection: boolean): boolean {
    const navigator = this.document.defaultView?.navigator as NavigatorWithConnection | undefined;

    if (!navigator || navigator.onLine === false) {
      return false;
    }

    const connection = navigator.connection;
    if (!connection) {
      return true;
    }

    if (connection.saveData) {
      return false;
    }

    const effectiveType = connection.effectiveType?.toLowerCase();
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return false;
    }

    return !requireFastConnection || !effectiveType || effectiveType === '4g';
  }

  private waitForIdle(): Observable<void> {
    return new Observable(subscriber => {
      const view = this.document.defaultView as WindowWithIdleCallback | null;
      if (!view) {
        subscriber.complete();
        return;
      }

      const complete = () => {
        subscriber.next();
        subscriber.complete();
      };

      if (view.requestIdleCallback) {
        const idleId = view.requestIdleCallback(complete, { timeout: 2000 });
        return () => view.cancelIdleCallback?.(idleId);
      }

      const timeoutId = view.setTimeout(complete, 1500);
      return () => view.clearTimeout(timeoutId);
    });
  }
}
