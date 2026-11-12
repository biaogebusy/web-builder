import { EnvironmentProviders, Provider } from '@angular/core';
import { vi } from 'vitest';

import { TourService } from '@core/service/tour.service';
import { provideCoreMocks } from '@core/testing/mocks';
import { BuilderInsertionService } from '../main/builder-workspace/builder-insertion.service';

/**
 * Shared mock factory for builder module scaffold specs, adding builder-specific
 * deps on top of provideCoreMocks. Same convention as @core/testing/mocks:
 * tests that need to assert on mock behavior build local mocks and override
 * same-name providers later in the providers array.
 */

export const createTourServiceMock = () => ({
  init: vi.fn(),
});

export function provideBuilderMocks(): (Provider | EnvironmentProviders)[] {
  return [
    ...provideCoreMocks(),
    BuilderInsertionService,
    { provide: TourService, useValue: createTourServiceMock() },
  ];
}
