import { EnvironmentProviders, Provider } from '@angular/core';
import { Subject, of } from 'rxjs';
import { vi } from 'vitest';

import { AmapService } from '@core/service/amap.service';
import { ConfigService } from '@core/service/config.service';
import { provideCoreMocks } from '@core/testing/mocks';

/**
 * uiux(widgets/combs)脚手架 spec 的共享 mock 工厂,在 provideCoreMocks
 * 之上补充 uiux 特有依赖。FormService / DialogService / CalendarState 不在
 * 此列——它们的依赖已被 core mock 覆盖,直接用真实实例保真。
 * 约定同 @core/testing/mocks:需要断言 mock 的行为测试自建局部 mock,
 * 并在 providers 数组中后置覆盖同名 provider。
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
