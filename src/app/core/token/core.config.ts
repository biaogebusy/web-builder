import { InjectionToken } from '@angular/core';
import { ICoreConfig } from '@core/mobx/IAppConfig';

export const CORE_CONFIG = new InjectionToken<ICoreConfig>('core config');
