import { computed, Injectable, signal } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';

/** Selects the first current draft index, defaulting to 0 even for an empty list. */
export function selectCurrentBuilderPageIndex(pages: readonly IPage[]): number {
  const index = pages.findIndex(page => page.current === true);
  return index === -1 ? 0 : index;
}

/** Returns the first explicitly current draft, or the first draft as a fallback. */
export function selectCurrentBuilderPage(pages: readonly IPage[]) {
  return pages[selectCurrentBuilderPageIndex(pages)];
}

/** Shared draft data only; persistence and editing stay in the lazy BuilderState. */
@Injectable({ providedIn: 'root' })
export class BuilderPageState {
  readonly version = signal<IPage[]>([]);
  readonly currentPage = computed(() => selectCurrentBuilderPage(this.version()));
}
