import { InjectionToken } from '@angular/core';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { IBranding } from '../interface/branding/IBranding';
import { INotify } from '@core/interface/widgets/IWidgets';
import { IBuilderConfig, IUiux, IWidgets } from '@core/interface/IBuilder';
import { ILanguage } from '@core/interface/IEnvironment';
import { IManageAssets } from '@core/interface/manage/IManage';

// app state
export const API_URL = new InjectionToken<string>('api url');
export const CORE_CONFIG = new InjectionToken<ICoreConfig>('core config');
export const BRANDING = new InjectionToken<IBranding>('branding config');
export const PAGE_CONTENT = new InjectionToken<Observable<IPage | object>>('page_content');
export const LANG = new InjectionToken<ILanguage>('current lang');
export const THEME = new InjectionToken<string>('current theme');
export const USER = new InjectionToken<Observable<IUser | boolean>>('user');
export const NOTIFY_CONTENT = new InjectionToken<Observable<INotify>>('notify content');

export const MEDIA_ASSETS = new InjectionToken<Observable<IManageAssets>>('media assets');

// builder
export const BUILDER_CONFIG = new InjectionToken<IBuilderConfig>('builder config');
export const BUILDER_CURRENT_PAGE = new InjectionToken<IPage>('builder page');
export const DEBUG_ANIMATE = new InjectionToken<boolean>('debug animate');
export const BUILDER_FULL_SCREEN = new InjectionToken<Observable<boolean>>('builder full screen');
export const UIUX = new InjectionToken<IUiux[]>('builder uiux data');
export const IS_BUILDER_MODE = new InjectionToken<Observable<boolean>>('is builder mode');
