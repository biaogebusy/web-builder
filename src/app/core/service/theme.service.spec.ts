import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_THEME_KEY, ICustomTheme, ThemeService } from '@core/service/theme.service';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';

const createStorageMock = () => ({
  retrieve: vi.fn((): unknown => null),
  store: vi.fn(),
  clear: vi.fn(),
});

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
        { provide: THEME, useValue: 'light' },
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
    service.setTheme('dark');
    service.setTheme('light');

    expect(root.getAttribute('class')).toBe('light');
  });

  describe('palette generation', () => {
    it('resolves every mapped role to a hex token', () => {
      const vars = service.generateThemeVars(SEED, false);

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
      expect(service.generateThemeVars(SEED, false)).toEqual(service.generateThemeVars(SEED, false));
    });

    it('produces different surfaces for dark and light', () => {
      const light = service.generateThemeVars(SEED, false);
      const dark = service.generateThemeVars(SEED, true);

      expect(dark['--mat-sys-surface']).not.toBe(light['--mat-sys-surface']);
    });

    it('honours the scheme variant', () => {
      const content = service.generateThemeVars(SEED, false, 'content');
      const vibrant = service.generateThemeVars(SEED, false, 'vibrant');

      expect(vibrant['--mat-sys-secondary']).not.toBe(content['--mat-sys-secondary']);
    });

    it('falls back to the content scheme for an unknown variant', () => {
      const unknown = service.generateThemeVars(SEED, false, 'no-such-variant' as never);

      expect(unknown).toEqual(service.generateThemeVars(SEED, false, 'content'));
    });

    it('returns only the requested roles from generatePalette', () => {
      const palette = service.generatePalette(SEED, false, ['primary', 'onPrimary']);

      expect(Object.keys(palette)).toEqual(['primary', 'onPrimary']);
      expect(palette['primary']).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('does not touch the DOM while generating a preview palette', () => {
      service.generateThemeVars(SEED, true);

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });
  });

  describe('applying', () => {
    it('writes the palette and the color scheme as inline styles', () => {
      service.applyCustomTheme(SEED, true, 'tonalSpot');

      const expected = service.generateThemeVars(SEED, true, 'tonalSpot');
      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(expected['--mat-sys-primary']);
      expect(root.style.colorScheme).toBe('dark');
    });

    it('applies a pre-resolved token map verbatim', () => {
      service.applyThemeVars({ '--mat-sys-primary': '#123456' }, false);

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('#123456');
      expect(root.style.colorScheme).toBe('light');
    });

    it('removes every mapped token when cleared', () => {
      service.applyCustomTheme(SEED, false);

      service.clearCustomTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
      expect(root.style.colorScheme).toBe('');
      expect(storage.clear).toHaveBeenCalledWith(CUSTOM_THEME_KEY);
    });

    it('keeps the stored theme when clearing without persisting', () => {
      service.clearCustomTheme(false);

      expect(storage.clear).not.toHaveBeenCalled();
    });

    it('persists the seed, mode and variant', () => {
      service.saveCustomTheme(SEED, true, 'vibrant');

      expect(storage.store).toHaveBeenCalledWith(CUSTOM_THEME_KEY, {
        seed: SEED,
        isDark: true,
        variant: 'vibrant',
      });
    });
  });

  describe('initTheme', () => {
    it('applies the base theme class', () => {
      service.initTheme();

      expect(root.getAttribute('class')).toBe('light');
    });

    it('prefers the local override over the backend config', () => {
      const local: ICustomTheme = { seed: '#ff0000', isDark: false, variant: 'content' };
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });
      storage.retrieve.mockReturnValue(local);

      service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(
        service.generateThemeVars('#ff0000', false)['--mat-sys-primary']
      );
      expect(root.style.colorScheme).toBe('light');
    });

    it('falls back to the backend config when there is no local seed', () => {
      setup({ customTheme: { seed: SEED, isDark: true, variant: 'content' } });

      service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe(
        service.generateThemeVars(SEED, true)['--mat-sys-primary']
      );
    });

    it('applies stored vars directly instead of recomputing the palette', () => {
      setup({
        customTheme: { seed: SEED, isDark: false, vars: { '--mat-sys-primary': '#abcdef' } },
      });

      service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('#abcdef');
    });

    it('leaves the tokens untouched when no custom theme is configured', () => {
      service.initTheme();

      expect(root.style.getPropertyValue('--mat-sys-primary')).toBe('');
    });
  });

  describe('exportThemeCss', () => {
    it('serializes the palette as a :root block', () => {
      const css = service.exportThemeCss(SEED, true, 'content');
      const vars = service.generateThemeVars(SEED, true, 'content');

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
