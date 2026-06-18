import { InjectionToken, Signal } from '@angular/core';
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
export const BRANDING = new InjectionToken<Observable<IBranding>>('branding config');
export const PAGE_CONTENT = new InjectionToken<Signal<IPage | undefined | false>>('page_content');
export const LANG = new InjectionToken<ILanguage>('current lang');
export const THEME = new InjectionToken<string>('current theme');
export const USER = new InjectionToken<Signal<IUser | boolean>>('user');
export const NOTIFY_CONTENT = new InjectionToken<Signal<INotify[] | boolean>>('notify content');

export const MEDIA_ASSETS = new InjectionToken<Signal<IManageAssets | boolean>>('media assets');

// builder
export const BUILDER_CONFIG = new InjectionToken<Observable<IBuilderConfig>>('builder config');
export const BUILDER_CURRENT_PAGE = new InjectionToken<Signal<IPage | undefined | false>>('builder page');
export const DEBUG_ANIMATE = new InjectionToken<Signal<boolean>>('debug animate');
export const BUILDER_FULL_SCREEN = new InjectionToken<Signal<boolean>>('builder full screen');
export const UIUX = new InjectionToken<Observable<IUiux[]>>('builder uiux data');
