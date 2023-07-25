import { InjectionToken } from '@angular/core';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { IBranding } from '../interface/branding/IBranding';
import { INotify } from '@core/interface/widgets/IWidgets';
import { IBuilderSamplePage, IUiux } from '@core/interface/IBuilder';

export interface IManageSidebarState {
  enableSidebar: boolean;
  sidebarOpened: boolean;
}

// app state
export const API_URL = new InjectionToken<string>('api url');
export const CORE_CONFIG = new InjectionToken<ICoreConfig>('core config');
export const BRANDING = new InjectionToken<IBranding>('branding config');
export const PAGE_CONTENT = new InjectionToken<Observable<IPage | object>>(
  'page_content'
);
export const THEME = new InjectionToken<string>('current theme');
export const USER = new InjectionToken<IUser>('user');
export const NOTIFY_CONTENT = new InjectionToken<Observable<INotify>>(
  'notify content'
);

export const MEDIA_ASSETS = new InjectionToken<Observable<any[]>>(
  'media assets'
);

// builder
export const DEBUG_ANIMATE = new InjectionToken<boolean>('debug animate');
export const BUILDER_FULL_SCREEN = new InjectionToken<Observable<boolean>>(
  'builder full screen'
);
export const BUILDER_SAMPLE_PAGE = new InjectionToken<IBuilderSamplePage>(
  'Builder sample page'
);
export const UIUX = new InjectionToken<IUiux[]>('builder uiux data');
export const ENABLE_BUILDER_TOOLBAR = new InjectionToken<Observable<boolean>>(
  'enable builder toolbar'
);

export const MANAGE_SIDEBAR_STATE = new InjectionToken<
  Observable<IManageSidebarState>
>('manage sidebar state');
