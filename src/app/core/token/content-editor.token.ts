import { InjectionToken } from '@angular/core';

/** Supplied by the builder route so public widgets do not depend on its implementation. */
export const CONTENT_EDITOR = new InjectionToken<{
  updatePageContentByPath(path: string, content: string): void;
}>('content editor');
