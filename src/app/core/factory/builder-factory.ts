import { computed, DestroyRef, inject, Injector, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorageService } from 'ngx-webstorage';

export const DEBUG_ANIMATE_KEY = 'debugAnimate';
const BUILDERPATH = '/builder';

export function builderFullScreenFactory(): WritableSignal<boolean> {
  const router = inject(Router);
  const builder = inject(BuilderState);
  const destroyRef = inject(DestroyRef);
  const isFull = signal(false);

  router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes(BUILDERPATH)) {
        isFull.set(false);
      }
    }
  });
  builder.fullScreen$.pipe(takeUntilDestroyed(destroyRef)).subscribe(state => {
    isFull.set(state);
  });
  return isFull;
}

export function builderCurrentPageFactory(): Signal<IPage | undefined | false> {
  const router = inject(Router);
  const injector = inject(Injector);
  const builder = inject(BuilderState);

  // Always use the BuilderState.version signal as the data source (consistent with the
  // version panel/toolbar); changes from other contexts (/preview new tab or iframe) are
  // bridged into the signal by BuilderState's storage event
  const currentPage = computed<IPage | undefined | false>(() => {
    const version = builder.version();
    if (!version.length) {
      return false;
    }
    return version.find((page: IPage) => page.current === true) || version[0];
  });

  if (router.url.includes(BUILDERPATH)) {
    const found = currentPage();
    if (found) {
      injector.get(BuilderService).checkIsLatestPage(found);
    }
  }

  return currentPage;
}

export function debugAnimateFactory(): WritableSignal<boolean> {
  const builder = inject(BuilderState);
  const storage = inject(LocalStorageService);
  const destroyRef = inject(DestroyRef);
  const isDebugAnimate = storage.retrieve(DEBUG_ANIMATE_KEY);
  const debugAnimate = signal<boolean>(!!isDebugAnimate);

  setTimeout(() => {
    builder.renderMarkers(isDebugAnimate);
  }, 2000);

  builder.debugAnimate$.pipe(takeUntilDestroyed(destroyRef)).subscribe(state => {
    storage.store(DEBUG_ANIMATE_KEY, state);
    debugAnimate.set(state);
  });

  return debugAnimate;
}
