import { EnvironmentProviders, Provider } from '@angular/core';
import { vi } from 'vitest';

import { TourService } from '@core/service/tour.service';
import { provideCoreMocks } from '@core/testing/mocks';

/**
 * builder 模块脚手架 spec 的共享 mock 工厂,在 provideCoreMocks 之上补充
 * builder 特有依赖。约定同 @core/testing/mocks:需要断言 mock 的行为测试
 * 自建局部 mock,并在 providers 数组中后置覆盖同名 provider。
 */

export const createTourServiceMock = () => ({
  init: vi.fn(),
});

export function provideBuilderMocks(): (Provider | EnvironmentProviders)[] {
  return [
    ...provideCoreMocks(),
    { provide: TourService, useValue: createTourServiceMock() },
  ];
}
