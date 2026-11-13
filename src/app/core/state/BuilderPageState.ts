import { computed, Injectable, signal } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';

/** Returns the first explicitly current draft, or the first draft as a fallback. */
export function selectCurrentBuilderPage(pages: readonly IPage[]) {
  return pages.find(page => page.current === true) ?? pages[0];
}

/** Shared draft data only; persistence and editing stay in the lazy BuilderState. */
@Injectable({ providedIn: 'root' })
export class BuilderPageState {
  readonly version = signal<IPage[]>([]);
  readonly currentPage = computed(() => selectCurrentBuilderPage(this.version()));
}
