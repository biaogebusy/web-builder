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

import { SYS_TOKEN_MAP, ThemeVariant } from './theme-palette.tokens';

const SCHEME_CTORS: Record<
  ThemeVariant,
  new (source: Hct, isDark: boolean, contrast: number) => DynamicScheme
> = {
  content: SchemeContent,
  tonalSpot: SchemeTonalSpot,
  vibrant: SchemeVibrant,
};

/** Resolves preview colors without mutating the active theme. */
export function generatePalette(
  seed: string,
  isDark: boolean,
  roles: (keyof typeof MaterialDynamicColors)[],
  variant: ThemeVariant = 'content'
): Record<string, string> {
  const scheme = buildScheme(seed, isDark, variant);
  return roles.reduce<Record<string, string>>((acc, role) => {
    acc[role as string] = roleHex(role, scheme);
    return acc;
  }, {});
}

/** Generates the token map used by both saved preferences and live previews. */
export function generateThemeVars(
  seed: string,
  isDark: boolean,
  variant: ThemeVariant = 'content'
): Record<string, string> {
  const scheme = buildScheme(seed, isDark, variant);
  return SYS_TOKEN_MAP.reduce<Record<string, string>>((acc, [role, cssVar]) => {
    acc[cssVar] = roleHex(role, scheme);
    return acc;
  }, {});
}

/** Exports the palette for use in a stylesheet outside the application. */
export function exportThemeCss(seed: string, isDark: boolean, variant: ThemeVariant = 'content'): string {
  const scheme = buildScheme(seed, isDark, variant);
  const lines = SYS_TOKEN_MAP.map(
    ([role, cssVar]) => `  ${cssVar}: ${roleHex(role, scheme)};`
  );
  return `:root {\n  color-scheme: ${isDark ? 'dark' : 'light'};\n${lines.join('\n')}\n}\n`;
}

function buildScheme(seed: string, isDark: boolean, variant: ThemeVariant): DynamicScheme {
  const Ctor = SCHEME_CTORS[variant] ?? SchemeContent;
  return new Ctor(Hct.fromInt(argbFromHex(seed)), isDark, 0);
}

function roleHex(role: keyof typeof MaterialDynamicColors, scheme: DynamicScheme): string {
  const color = MaterialDynamicColors[role] as { getArgb(s: DynamicScheme): number };
  return hexFromArgb(color.getArgb(scheme));
}
