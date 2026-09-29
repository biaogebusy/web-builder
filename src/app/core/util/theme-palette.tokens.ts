import type { MaterialDynamicColors } from '@material/material-color-utilities';

/** Material 3 scheme variants supported by the custom-theme picker. */
export type ThemeVariant = 'content' | 'tonalSpot' | 'vibrant';

/** Portable palette preferences shared by site config and local storage. */
export interface ICustomTheme {
  /** Hex seed used to regenerate or edit the palette. */
  seed: string;
  /** Selects dark roles and the matching base theme. */
  isDark: boolean;
  /** Algorithm used to derive the Material roles from the seed. */
  variant: ThemeVariant;
  /** Resolved tokens avoid generation at startup; absent in legacy seed-only preferences. */
  vars?: Record<string, string>;
}

/** Shared role mapping keeps stored palettes and generated CSS aligned without runtime imports. */
export const SYS_TOKEN_MAP: [keyof typeof MaterialDynamicColors, string][] = [
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
