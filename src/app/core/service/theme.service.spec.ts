import { generatePalette, generateThemeVars, exportThemeCss } from '@core/util/theme-palette.util';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_THEME_KEY, ICustomTheme, ThemeService } from '@core/service/theme.service';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { THEMKEY } from '@core/util/theme.util';
import { LocalStorageService } from 'ngx-webstorage';

const createStorageMock = () => {
  const values = new Map<string, unknown>();
  return {
    retrieve: vi.fn((key: string): unknown => values.get(key) ?? null),
    store: vi.fn((key: string, value: unknown) => values.set(key, value)),
    clear: vi.fn((key: string) => values.delete(key)),
  };
};

const SEED = '#0049db';

describe('ThemeService', () => {
  let service: ThemeService;
  let storage: ReturnType<typeof createStorageMock>;
  let root: HTMLElement;

  const setup = (coreConfig: Record<string, unknown> = {}) => {
    storage = createStorageMock();
    // Tests that need a different CORE_CONFIG re-run setup, so start from a clean module
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: THEME, useValue: 'light-theme' },
        { provide: CORE_CONFIG, useValue: coreConfig },
        { provide: LocalStorageService, useValue: storage },
      ],
    });
    service = TestBed.inject(ThemeService);
    root = TestBed.inject(DOCUMENT).getElementsByTagName('html')[0];
  };

  beforeEach(() => setup());

  afterEach(() => {
    root.removeAttribute('class');
    root.removeAttribute('style');
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('replaces any previous theme class instead of stacking them', () => {
    service.setTheme('dark-theme');
    service.setTheme('light-theme');

    expect(root.getAttribute('class')).toBe('light-theme');
  });

  it('preserves root classes that do not belong to the theme', () => {
    root.classList.add('app-ready');

    service.setTheme('dark-theme');
    service.setTheme('light-theme');

    expect(root.classList.contains('app-ready')).toBe(true);
    expect(root.classList.contains('dark-theme')).toBe(false);
  });

  it('falls back to a supported theme for an obsolete theme name', () => {
    service.setTheme('blue-theme');

    expect(root.classList.contains('light-theme')).toBe(true);
    expect(root.style.colorScheme).toBe('light');
  });

  describe('palette generation', () => {
    it('resolves every mapped role to a hex token', () => {
      const vars = generateThemeVars(SEED, false);

      // Every key is a --mat-sys-* variable and every value a hex color
      expect(Object.keys(vars).length).toBeGreaterThan(40);
      Object.entries(vars).forEach(([cssVar, value]) => {
        expect(cssVar.startsWith('--mat-sys-')).toBe(true);
        expect(value).toMatch(/^#[0-9a-f]{6}$/i);
      });
      expect(vars['--mat-sys-primary']).toBeDefined();
      expect(vars['--mat-sys-on-surface']).toBeDefined();
    });

    it('is deterministic for the same seed', () => {
      expect(generateThemeVars(SEED, false)).toEqual(generateThemeVars(SEED, false));
    });

    it('produces different surfaces for dark and light', () => {
      const light = generateThemeVars(SEED, false);
      const dark = generateThemeVars(SEED, true);

      expect(dark['--mat-sys-surface']).not.toBe(light['--mat-sys-surface']);
    });

    it('honours the scheme variant', () => {
      const content = generateThemeVars(SEED, false, 'content');
      const vibrant = generateThemeVars(SEED, false, 'vibrant');

      expect(vibrant['--mat-sys-secondary']).not.toBe(content['--mat-sys-secondary']);
    });

    it('falls back to the content scheme for an unknown variant', () => {
      const unknown = generateThemeVars(SEED, false, 'no-such-variant' as never);

      expect(unknown).toEqual(generateThemeVars(SEED, false, 'content'));
    });

    it('returns only the requested roles from generatePalette', () => {
      const palette = generatePalette(SEED, false, ['primary', 'onPrimary']);

      expect(Object.keys(palette)).toEqual(['primary', 'onPrimary']);
      expect(palette['primary']).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('does not touch the DOM while generating a preview palette', () => {
      generateThemeVars(SEED, true);

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });
  });

  describe('applying', () => {
    it.each([true, false])('synchronizes the class when applying a custom mode: %s', async isDark => {
      service.setTheme(isDark ? 'light-theme' : 'dark-theme');

      await service.applyCustomTheme(SEED, isDark);

      expect(root.className).toBe(isDark ? 'dark-theme' : 'light-theme');
      expect(root.style.colorScheme).toBe(isDark ? 'dark' : 'light');
      expect(service.currentTheme()).toBe(root.className);
    });

    it('writes the palette and the color scheme as inline styles', async () => {
      await service.applyCustomTheme(SEED, true, 'tonalSpot');

      const expected = generateThemeVars(SEED, true, 'tonalSpot');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(expected['--mat-sys-primary']);
      expect(root.style.colorScheme).toBe('dark');
    });

    it('applies a pre-resolved token map verbatim', () => {
      service.applyThemeVars({ '--mat-sys-primary': '#123456' }, false);

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('#123456');
      expect(root.style.colorScheme).toBe('light');
      expect(root.className).toBe('light-theme');
    });

    it('clears stale palette roles before applying a partial stored map', async () => {
      root.style.setProperty('--unrelated', 'kept');
      await service.applyCustomTheme(SEED, true);

      service.applyThemeVars({ '--mat-sys-primary': '#123456' }, false);

      expect(root.style.getPropertyValue('--mat-sys-on-primary')).toBe('');
      expect(root.style.getPropertyValue('--unrelated')).toBe('kept');
    });

    it('removes every mapped token when cleared', async () => {
      await service.applyCustomTheme(SEED, false);

      service.clearCustomTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
      expect(root.style.colorScheme).toBe('light');
      expect(storage.clear).toHaveBeenCalledWith(CUSTOM_THEME_KEY);
    });

    it('keeps the stored theme when clearing without persisting', () => {
      service.clearCustomTheme(false);

      expect(storage.clear).not.toHaveBeenCalled();
    });

    it('returns to the last ordinary theme when clearing a custom preview', async () => {
      service.selectTheme('dark-theme');
      await service.applyCustomTheme(SEED, false);

      service.clearCustomTheme();
      await service.initTheme();

      expect(root.className).toBe('dark-theme');
      expect(root.style.colorScheme).toBe('dark');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });

    it('persists the seed, mode and variant', () => {
      service.saveCustomTheme(SEED, true, 'vibrant', generateThemeVars(SEED, true, 'vibrant'));

      expect(storage.store).toHaveBeenCalledWith(CUSTOM_THEME_KEY, {
        seed: SEED,
        isDark: true,
        variant: 'vibrant',
        vars: generateThemeVars(SEED, true, 'vibrant'),
      });
    });
  });

  describe('initTheme', () => {
    it('migrates a legacy local palette to resolved vars for subsequent initialization', async () => {
      storage.store(CUSTOM_THEME_KEY, { seed: SEED, isDark: true, variant: 'content' });
      await service.initTheme();

      expect(storage.retrieve(CUSTOM_THEME_KEY)).toEqual({
        seed: SEED, isDark: true, variant: 'content', vars: generateThemeVars(SEED, true),
      });
      const generate = vi.spyOn(service, 'applyCustomTheme');
      await service.initTheme();
      expect(generate).not.toHaveBeenCalled();
    });

    it('does not turn a site palette into a local override', async () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });
      await service.initTheme();

      expect(storage.retrieve(CUSTOM_THEME_KEY)).toBeNull();
    });

    it('does not overwrite a newer ordinary selection when generation finishes', async () => {
      storage.store(CUSTOM_THEME_KEY, { seed: SEED, isDark: true, variant: 'content' });
      const pending = service.initTheme();
      service.selectTheme('light-theme');
      await pending;

      expect(root.className).toBe('light-theme');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
      expect(storage.retrieve(CUSTOM_THEME_KEY)).toBeNull();
    });

    it('does not overwrite a newer resolved palette when generation finishes', async () => {
      const pending = service.applyCustomTheme(SEED, true);
      service.applyThemeVars({ '--mat-sys-primary': '#123456' }, false);
      await pending;

      expect(root.className).toBe('light-theme');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('#123456');
    });

    it('retains the base theme if the generator fails to load', async () => {
      setup({ defaultTheme: 'dark-theme', customTheme: { seed: SEED, isDark: false } });
      vi.spyOn(service, 'applyCustomTheme').mockRejectedValue(new Error('Chunk unavailable'));
      const report = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      await service.initTheme();

      expect(root.className).toBe('dark-theme');
      expect(report).toHaveBeenCalled();
    });

    it('applies the base theme class', async () => {
      await service.initTheme();

      expect(root.getAttribute('class')).toBe('light-theme');
    });

    it('prefers the local override over the backend config', async () => {
      const local: ICustomTheme = { seed: '#ff0000', isDark: false, variant: 'content' };
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });
      storage.store(CUSTOM_THEME_KEY, local);

      await service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(
        generateThemeVars('#ff0000', false)['--mat-sys-primary']
      );
      expect(root.style.colorScheme).toBe('light');
    });

    it('falls back to the backend config when there is no local seed', async () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });

      await service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(
        generateThemeVars(SEED, true)['--mat-sys-primary']
      );
    });

    it('applies stored vars directly instead of recomputing the palette', async () => {
      setup({
        customTheme: { seed: SEED, isDark: false, vars: { '--mat-sys-primary': '#abcdef' } },
      });

      await service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('#abcdef');
    });

    it('leaves the tokens untouched when no custom theme is configured', async () => {
      await service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });

    it('keeps a saved ordinary theme instead of restoring the backend palette on reload', async () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });
      storage.store(THEMKEY, 'light-theme');

      await service.initTheme();

      expect(root.className).toBe('light-theme');
      expect(root.style.colorScheme).toBe('light');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
      expect(service.getCustomTheme()).toBeUndefined();
    });

    it('keeps an ordinary selection after a backend custom theme has already been applied', async () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });
      await service.initTheme();

      service.selectTheme('light-theme');
      await service.initTheme();

      expect(root.className).toBe('light-theme');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
      expect(storage.retrieve(CUSTOM_THEME_KEY)).toBeNull();
    });

    it('prefers a saved custom palette over a previous ordinary selection', async () => {
      service.selectTheme('light-theme');
      service.saveCustomTheme(SEED, true, 'content', generateThemeVars(SEED, true));

      await service.initTheme();

      expect(root.className).toBe('dark-theme');
      expect(service.getCustomTheme()).toMatchObject({ seed: SEED, isDark: true });
    });

    it('restores the site custom theme immediately and on the next initialization', async () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'vibrant' } });
      service.selectTheme('light-theme');
      service.saveCustomTheme('#00696e', false, 'content', generateThemeVars('#00696e', false));

      await service.restoreSiteTheme();

      const primary = generateThemeVars(SEED, true, 'vibrant')['--mat-sys-primary'];
      expect(root.className).toBe('dark-theme');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(primary);
      expect(storage.retrieve(THEMKEY)).toBeNull();
      expect(storage.retrieve(CUSTOM_THEME_KEY)).toBeNull();

      await service.initTheme();

      expect(root.className).toBe('dark-theme');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(primary);
    });

    it('restores the configured ordinary site theme when there is no site custom palette', async () => {
      setup({ defaultTheme: 'dark-theme' });
      service.selectTheme('light-theme');

      await service.restoreSiteTheme();

      expect(root.className).toBe('dark-theme');
      expect(root.style.colorScheme).toBe('dark');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });

    it('uses the site theme when the saved ordinary theme was removed from the menu', async () => {
      setup({
        theme: [{ style: 'dark-theme' }],
        customTheme: { seed: SEED, isDark: true, variant: 'content' },
      });
      storage.store(THEMKEY, 'light-theme');

      await service.initTheme();

      expect(root.className).toBe('dark-theme');
      expect(service.getCustomTheme()).toMatchObject({ seed: SEED, isDark: true });
    });
  });

  describe('exportThemeCss', () => {
    it('serializes the palette as a :root block', () => {
      const css = exportThemeCss(SEED, true, 'content');
      const vars = generateThemeVars(SEED, true, 'content');

      expect(css.startsWith(':root {\n  color-scheme: dark;\n')).toBe(true);
      expect(css.trimEnd().endsWith('}')).toBe(true);
      expect(css).toContain(`  --mat-sys-primary: ${vars['--mat-sys-primary']};`);
      // One declaration per mapped token, plus color-scheme
      expect(css.split('\n').filter(line => line.includes('--mat-sys-')).length).toBe(
        Object.keys(vars).length
      );
    });
  });
});
