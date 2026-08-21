import { EnvironmentProviders, Provider } from '@angular/core';
import { Subject, of } from 'rxjs';
import { vi } from 'vitest';

import { AmapService } from '@core/service/amap.service';
import { ConfigService } from '@core/service/config.service';
import { provideCoreMocks } from '@core/testing/mocks';

/**
 * Shared mock factory for uiux (widgets/combs) scaffold specs; layers uiux-specific
 * dependencies on top of provideCoreMocks. FormService / DialogService / CalendarState
 * are excluded here because their dependencies are already covered by the core mocks,
 * so the real instances stay faithful.
 * Convention matches @core/testing/mocks: tests that need to assert mock behavior
 * build their own local mocks and override the same-named providers later in the
 * providers array.
 */

export const createConfigServiceMock = () => ({
  switchChange$: new Subject<void>(),
  init: vi.fn(),
});

export const createAmapServiceMock = () => ({
  markers$: new Subject<unknown>(),
  load: vi.fn(() => of(false)),
  getMarker: vi.fn(() => ({})),
});

export function provideUiuxMocks(): (Provider | EnvironmentProviders)[] {
  return [
    ...provideCoreMocks(),
    { provide: ConfigService, useValue: createConfigServiceMock() },
    { provide: AmapService, useValue: createAmapServiceMock() },
  ];
}
