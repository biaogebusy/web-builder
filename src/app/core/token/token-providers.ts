import { InjectionToken } from '@angular/core';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { IBranding } from '../interface/branding/IBranding';
import { INotify } from '@core/interface/widgets/IWidgets';
import { IBuilderTab } from '@core/interface/IBuilder';

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

// builder
export const DISABLE_BRAND = new InjectionToken<boolean>('disable branding');
export const DEBUG_ANIMATE = new InjectionToken<boolean>('debug animate');
export const BUILDER_FULL_SCREEN = new InjectionToken<Observable<boolean>>(
  'builder full screen'
);
export const GSAP_SCROLLER = new InjectionToken<string>('gsap scroller');
export const BUILDER_TABS = new InjectionToken<IBuilderTab[]>(
  'builder tabs data'
);
export const ENABLE_TOOLBAR = new InjectionToken<Observable<boolean>>(
  'enable builder toolbar'
);

export const MANAGE_SIDEBAR_STATE = new InjectionToken<
  Observable<IManageSidebarState>
>('manage sidebar state');
