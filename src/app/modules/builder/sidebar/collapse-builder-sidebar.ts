import { InjectionToken } from '@angular/core';

/** Let a routed editor reclaim width without depending on the Builder shell component. */
export const COLLAPSE_BUILDER_SIDEBAR = new InjectionToken<() => void>('COLLAPSE_BUILDER_SIDEBAR');
