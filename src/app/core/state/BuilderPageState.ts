import { computed, Injectable, signal } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';

/** Shared draft data only; persistence and editing stay in the lazy BuilderState. */
@Injectable({ providedIn: 'root' })
export class BuilderPageState {
  readonly version = signal<IPage[]>([]);
  readonly currentPage = computed(() => {
    const pages = this.version();
    return pages.find(page => page.current === true) ?? pages[0];
  });
}
