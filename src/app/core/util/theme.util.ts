import type { ICoreConfig } from '@core/interface/IAppConfig';

export const THEMKEY = 'themeMode';
export type ThemeName = 'light-theme' | 'dark-theme';
type ThemeConfig = Partial<Pick<ICoreConfig, 'defaultTheme' | 'theme'>>;

export function isThemeName(value: unknown): value is ThemeName {
  return value === 'light-theme' || value === 'dark-theme';
}

export function getLocalTheme(config: ThemeConfig, stored: unknown): ThemeName | undefined {
  if (isThemeName(stored) && (!config.theme || config.theme.some(item => item.style === stored))) {
    return stored;
  }
  return undefined;
}

export function resolveTheme(config: ThemeConfig, stored?: unknown): ThemeName {
  return (
    getLocalTheme(config, stored) ??
    (isThemeName(config.defaultTheme) ? config.defaultTheme : 'light-theme')
  );
}
