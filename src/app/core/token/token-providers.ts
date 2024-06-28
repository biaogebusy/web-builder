import { InjectionToken } from '@angular/core';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { IBranding } from '../interface/branding/IBranding';
import { INotify } from '@core/interface/widgets/IWidgets';
import { IBuilderSamplePage, IUiux } from '@core/interface/IBuilder';
import { IThemePreview } from '@core/interface/combs/IThemePreview';
import { ILanguage } from '@core/interface/IEnvironment';
import { IManageAssets } from '@core/interface/manage/IManage';

export interface IManageSidebarState {
  enableSidebar: boolean;
  sidebarOpened: boolean;
}

// app state
export const API_URL = new InjectionToken<string>('api url');
export const CORE_CONFIG = new InjectionToken<ICoreConfig>('core config');
export const BRANDING = new InjectionToken<IBranding>('branding config');
export const PAGE_CONTENT = new InjectionToken<Observable<IPage | object>>(
  'page_content',
);
export const LANG = new InjectionToken<ILanguage>('current lang');
export const THEME = new InjectionToken<string>('current theme');
export const USER = new InjectionToken<IUser>('user');
export const NOTIFY_CONTENT = new InjectionToken<Observable<INotify>>(
  'notify content',
);

export const MEDIA_ASSETS = new InjectionToken<Observable<IManageAssets>>(
  'media assets',
);

// builder
export const BUILDER_CURRENT_PAGE = new InjectionToken<IPage>('builder page');
export const DEBUG_ANIMATE = new InjectionToken<boolean>('debug animate');
export const BUILDER_FULL_SCREEN = new InjectionToken<Observable<boolean>>(
  'builder full screen',
);
export const UIUX = new InjectionToken<IUiux[]>('builder uiux data');
export const IS_BUILDER_MODE = new InjectionToken<Observable<boolean>>(
  'is builder mode',
);

export const WIDGETS = new InjectionToken<any[]>(
  'builder widgets for popup select',
);

export const MANAGE_SIDEBAR_STATE = new InjectionToken<
  Observable<IManageSidebarState>
>('manage sidebar state');

export const COLOR_TEST = new InjectionToken<IThemePreview>('color test');
