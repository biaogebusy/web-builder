import { Injectable, inject, DOCUMENT } from '@angular/core';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import {
  argbFromHex,
  hexFromArgb,
  Hct,
  DynamicScheme,
  SchemeContent,
  SchemeTonalSpot,
  SchemeVibrant,
  MaterialDynamicColors,
} from '@material/material-color-utilities';

export const CUSTOM_THEME_KEY = 'customTheme';

// Material 3 scheme variants exposed to the custom-theme picker.
export type ThemeVariant = 'content' | 'tonalSpot' | 'vibrant';

const SCHEME_CTORS: Record<
  ThemeVariant,
  new (source: Hct, isDark: boolean, contrast: number) => DynamicScheme
> = {
  content: SchemeContent,
  tonalSpot: SchemeTonalSpot,
  vibrant: SchemeVibrant,
};

export interface ICustomTheme {
  seed: string;
  isDark: boolean;
  variant: ThemeVariant;
  // Full resolved --mat-sys-* token map, persisted alongside the seed so the
  // backend config can apply the palette directly without recomputing.
  vars?: Record<string, string>;
}

// MaterialDynamicColors role -> --mat-sys-* CSS variable
const SYS_TOKEN_MAP: [keyof typeof MaterialDynamicColors, string][] = [
  ['primary', '--mat-sys-primary'],
  ['surfaceTint', '--mat-sys-surface-tint'],
  ['onPrimary', '--mat-sys-on-primary'],
  ['primaryContainer', '--mat-sys-primary-container'],
  ['onPrimaryContainer', '--mat-sys-on-primary-container'],
  ['secondary', '--mat-sys-secondary'],
  ['onSecondary', '--mat-sys-on-secondary'],
  ['secondaryContainer', '--mat-sys-secondary-container'],
  ['onSecondaryContainer', '--mat-sys-on-secondary-container'],
  ['tertiary', '--mat-sys-tertiary'],
  ['onTertiary', '--mat-sys-on-tertiary'],
  ['tertiaryContainer', '--mat-sys-tertiary-container'],
  ['onTertiaryContainer', '--mat-sys-on-tertiary-container'],
  ['error', '--mat-sys-error'],
  ['onError', '--mat-sys-on-error'],
  ['errorContainer', '--mat-sys-error-container'],
  ['onErrorContainer', '--mat-sys-on-error-container'],
  ['background', '--mat-sys-background'],
  ['onBackground', '--mat-sys-on-background'],
  ['surface', '--mat-sys-surface'],
  ['onSurface', '--mat-sys-on-surface'],
  ['surfaceVariant', '--mat-sys-surface-variant'],
  ['onSurfaceVariant', '--mat-sys-on-surface-variant'],
  ['outline', '--mat-sys-outline'],
  ['outlineVariant', '--mat-sys-outline-variant'],
  ['shadow', '--mat-sys-shadow'],
  ['scrim', '--mat-sys-scrim'],
  ['inverseSurface', '--mat-sys-inverse-surface'],
  ['inverseOnSurface', '--mat-sys-inverse-on-surface'],
  ['inversePrimary', '--mat-sys-inverse-primary'],
  ['primaryFixed', '--mat-sys-primary-fixed'],
  ['onPrimaryFixed', '--mat-sys-on-primary-fixed'],
  ['primaryFixedDim', '--mat-sys-primary-fixed-dim'],
  ['onPrimaryFixedVariant', '--mat-sys-on-primary-fixed-variant'],
  ['secondaryFixed', '--mat-sys-secondary-fixed'],
  ['onSecondaryFixed', '--mat-sys-on-secondary-fixed'],
  ['secondaryFixedDim', '--mat-sys-secondary-fixed-dim'],
  ['onSecondaryFixedVariant', '--mat-sys-on-secondary-fixed-variant'],
  ['tertiaryFixed', '--mat-sys-tertiary-fixed'],
  ['onTertiaryFixed', '--mat-sys-on-tertiary-fixed'],
  ['tertiaryFixedDim', '--mat-sys-tertiary-fixed-dim'],
  ['onTertiaryFixedVariant', '--mat-sys-on-tertiary-fixed-variant'],
  ['surfaceDim', '--mat-sys-surface-dim'],
  ['surfaceBright', '--mat-sys-surface-bright'],
  ['surfaceContainerLowest', '--mat-sys-surface-container-lowest'],
  ['surfaceContainerLow', '--mat-sys-surface-container-low'],
  ['surfaceContainer', '--mat-sys-surface-container'],
  ['surfaceContainerHigh', '--mat-sys-surface-container-high'],
  ['surfaceContainerHighest', '--mat-sys-surface-container-highest'],
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject<Document>(DOCUMENT);
  private theme = inject(THEME);
  private storage = inject(LocalStorageService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  private get root(): HTMLElement {
    return this.document.getElementsByTagName('html')[0];
  }

  initTheme(): void {
    this.setTheme(this.theme);
    // localStorage wins (local debugging takes effect immediately); the backend
    // config (/core/base customTheme) is the fallback when there is no local override.
    const local = this.storage.retrieve(CUSTOM_THEME_KEY) as ICustomTheme | null;
    const custom = local?.seed ? local : this.coreConfig?.customTheme;
    if (custom?.seed) {
      if (custom.vars) {
        this.applyThemeVars(custom.vars, custom.isDark);
      } else {
        this.applyCustomTheme(custom.seed, custom.isDark, custom.variant ?? 'content');
      }
    }
  }

  setTheme(theme: string): void {
    const root = this.root;
    root.removeAttribute('class');
    root.classList.add(theme);
  }

  // Generate a full M3 palette from a seed color and write it to the
  // --mat-sys-* CSS variables as inline styles for instant preview.
  applyCustomTheme(seed: string, isDark: boolean, variant: ThemeVariant = 'content'): void {
    const scheme = this.buildScheme(seed, isDark, variant);
    const root = this.root;
    SYS_TOKEN_MAP.forEach(([role, cssVar]) => {
      root.style.setProperty(cssVar, this.roleHex(role, scheme));
    });
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }

  // Resolve role hexes for a seed without mutating the DOM (for previews).
  generatePalette(
    seed: string,
    isDark: boolean,
    roles: (keyof typeof MaterialDynamicColors)[],
    variant: ThemeVariant = 'content'
  ): Record<string, string> {
    const scheme = this.buildScheme(seed, isDark, variant);
    return roles.reduce<Record<string, string>>((acc, role) => {
      acc[role as string] = this.roleHex(role, scheme);
      return acc;
    }, {});
  }

  // Full resolved --mat-sys-* token map for a seed, keyed by CSS variable name.
  generateThemeVars(
    seed: string,
    isDark: boolean,
    variant: ThemeVariant = 'content'
  ): Record<string, string> {
    const scheme = this.buildScheme(seed, isDark, variant);
    return SYS_TOKEN_MAP.reduce<Record<string, string>>((acc, [role, cssVar]) => {
      acc[cssVar] = this.roleHex(role, scheme);
      return acc;
    }, {});
  }

  // Apply a previously resolved token map directly, without recomputing the palette.
  applyThemeVars(vars: Record<string, string>, isDark: boolean): void {
    const root = this.root;
    Object.entries(vars).forEach(([cssVar, value]) => root.style.setProperty(cssVar, value));
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }

  // Serialize the full M3 palette as a :root CSS block of --mat-sys-* tokens,
  // ready to drop into a stylesheet outside the app.
  exportThemeCss(seed: string, isDark: boolean, variant: ThemeVariant = 'content'): string {
    const scheme = this.buildScheme(seed, isDark, variant);
    const lines = SYS_TOKEN_MAP.map(
      ([role, cssVar]) => `  ${cssVar}: ${this.roleHex(role, scheme)};`
    );
    return `:root {\n  color-scheme: ${isDark ? 'dark' : 'light'};\n${lines.join('\n')}\n}\n`;
  }

  private buildScheme(seed: string, isDark: boolean, variant: ThemeVariant): DynamicScheme {
    const Ctor = SCHEME_CTORS[variant] ?? SchemeContent;
    return new Ctor(Hct.fromInt(argbFromHex(seed)), isDark, 0);
  }

  private roleHex(role: keyof typeof MaterialDynamicColors, scheme: DynamicScheme): string {
    const color = MaterialDynamicColors[role] as { getArgb(s: DynamicScheme): number };
    return hexFromArgb(color.getArgb(scheme));
  }

  clearCustomTheme(persist = true): void {
    const root = this.root;
    SYS_TOKEN_MAP.forEach(([, cssVar]) => root.style.removeProperty(cssVar));
    root.style.removeProperty('color-scheme');
    if (persist) {
      this.storage.clear(CUSTOM_THEME_KEY);
    }
  }

  saveCustomTheme(seed: string, isDark: boolean, variant: ThemeVariant = 'content'): void {
    this.storage.store(CUSTOM_THEME_KEY, { seed, isDark, variant } as ICustomTheme);
  }
}
