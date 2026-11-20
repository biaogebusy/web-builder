import { Injectable, inject, DOCUMENT, signal } from '@angular/core';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { getLocalTheme, isThemeName, resolveTheme, THEMKEY, ThemeName } from '@core/util/theme.util';
import { LocalStorageService } from 'ngx-webstorage';
import { ICustomTheme, SYS_TOKEN_MAP, ThemeVariant } from '@core/util/theme-palette.tokens';
export type { ICustomTheme, ThemeVariant } from '@core/util/theme-palette.tokens';

export const CUSTOM_THEME_KEY = 'customTheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject<Document>(DOCUMENT);
  private storage = inject(LocalStorageService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private baseTheme = resolveTheme(this.coreConfig, this.storage.retrieve(THEMKEY));
  private themeRevision = 0;
  private activeTheme = signal(this.baseTheme);
  readonly currentTheme = this.activeTheme.asReadonly();

  private get root(): HTMLElement {
    return this.document.getElementsByTagName('html')[0];
  }

  /** Applies preferences before rendering and upgrades legacy local palettes with resolved vars. */
  async initTheme(): Promise<void> {
    this.setTheme(resolveTheme(this.coreConfig, this.storage.retrieve(THEMKEY)));
    const custom = this.getCustomTheme();
    if (custom?.seed) {
      if (custom.vars) {
        this.applyThemeVars(custom.vars, custom.isDark);
      } else {
        const local = this.storage.retrieve(CUSTOM_THEME_KEY) as ICustomTheme | null;
        try {
          const vars = await this.applyCustomTheme(
            custom.seed, custom.isDark, custom.variant ?? 'content'
          );
          if (vars && local?.seed) {
            this.saveCustomTheme(custom.seed, custom.isDark, custom.variant ?? 'content', vars);
          }
        } catch (error) {
          console.error('Failed to generate custom theme:', error);
        }
      }
    }
  }

  // A local custom palette wins over a local ordinary theme. Site defaults apply
  // only when neither preference exists; clearing a palette does not opt back in.
  getCustomTheme(): ICustomTheme | undefined {
    const local = this.storage.retrieve(CUSTOM_THEME_KEY) as ICustomTheme | null;
    if (local?.seed) {
      return local;
    }
    if (getLocalTheme(this.coreConfig, this.storage.retrieve(THEMKEY))) {
      return undefined;
    }
    return this.coreConfig.customTheme;
  }

  setTheme(theme: string): void {
    this.themeRevision++;
    this.baseTheme = isThemeName(theme) ? theme : 'light-theme';
    this.removeThemeVars();
    this.applyMode(this.baseTheme);
  }

  selectTheme(theme: string): void {
    this.setTheme(theme);
    this.storage.clear(CUSTOM_THEME_KEY);
    this.storage.store(THEMKEY, this.baseTheme);
  }

  /** Clears local preferences and waits for the site palette, including legacy seed-only config. */
  async restoreSiteTheme(): Promise<void> {
    this.storage.clear(THEMKEY);
    this.storage.clear(CUSTOM_THEME_KEY);
    await this.initTheme();
  }

  private applyMode(theme: ThemeName): void {
    const root = this.root;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(theme);
    root.style.colorScheme = theme === 'dark-theme' ? 'dark' : 'light';
    this.activeTheme.set(theme);
  }

  private removeThemeVars(): void {
    SYS_TOKEN_MAP.forEach(([, cssVar]) => this.root.style.removeProperty(cssVar));
  }

  /** Loads the generator on demand; a newer theme selection cancels this application. */
  async applyCustomTheme(
    seed: string, isDark: boolean, variant: ThemeVariant = 'content'
  ): Promise<Record<string, string> | undefined> {
    const revision = ++this.themeRevision;
    const { generateThemeVars } = await import('@core/util/theme-palette.util');
    if (revision === this.themeRevision) {
      const vars = generateThemeVars(seed, isDark, variant);
      this.applyThemeVars(vars, isDark);
      return vars;
    }
    return undefined;
  }

  /** Applies saved tokens without loading the palette generator. */
  applyThemeVars(vars: Record<string, string>, isDark: boolean): void {
    this.themeRevision++;
    const root = this.root;
    this.removeThemeVars();
    SYS_TOKEN_MAP.forEach(([, cssVar]) => {
      if (vars[cssVar]) {
        root.style.setProperty(cssVar, vars[cssVar]);
      }
    });
    this.applyMode(isDark ? 'dark-theme' : 'light-theme');
  }

  // Return to the last ordinary theme. Opt into the site palette via restoreSiteTheme().
  clearCustomTheme(persist = true): void {
    if (persist) {
      this.selectTheme(this.baseTheme);
    } else {
      this.setTheme(this.baseTheme);
    }
  }

  /** Saves resolved tokens so returning users do not need the palette generator at startup. */
  saveCustomTheme(
    seed: string, isDark: boolean, variant: ThemeVariant, vars: Record<string, string>
  ): void {
    this.storage.store(CUSTOM_THEME_KEY, { seed, isDark, variant, vars } satisfies ICustomTheme);
  }
}
