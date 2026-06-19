import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  Injector,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { MatMenuModule } from '@angular/material/menu';
import { take } from 'rxjs';
import {
  CUSTOM_THEME_KEY,
  ICustomTheme,
  ThemeService,
  ThemeVariant,
} from '@core/service/theme.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { NodeService } from '@core/service/node.service';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';
import { BtnComponent } from '../btn/btn.component';

interface IPreset {
  name: string;
  seed: string;
}

interface IVariantOption {
  value: ThemeVariant;
  label: string;
}

interface IPairSwatch {
  label: string;
  bg: string;
  fg: string;
}

const PREVIEW_ROLES = [
  'primary',
  'onPrimary',
  'secondary',
  'onSecondary',
  'tertiary',
  'onTertiary',
  'error',
  'onError',
  'surface',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outlineVariant',
] as const;

const HEX_RE = /^#([0-9a-f]{6})$/i;

@Component({
  selector: 'app-custom-theme',
  templateUrl: './custom-theme.component.html',
  styleUrls: ['./custom-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-custom-theme' },
  imports: [IconComponent, BtnComponent, MatMenuModule, TranslateModule],
})
export class CustomThemeComponent implements OnInit {
  private themeService = inject(ThemeService);
  private storage = inject(LocalStorageService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private document = inject<Document>(DOCUMENT);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private injector = inject(Injector);

  readonly seed = signal<string>('#0049db');
  readonly isDark = signal<boolean>(false);
  readonly variant = signal<ThemeVariant>('content');
  readonly saving = signal<boolean>(false);
  // Resolved /core/base node; null until fetched. The backend-save button stays
  // disabled while null so we never PATCH without a known target node.
  private readonly coreBaseNode = signal<{
    uuid: string;
    langcode?: string;
    config: Record<string, unknown>;
  } | null>(null);
  readonly canSaveBackend = computed(() => !!this.coreBaseNode());
  readonly dirty = signal<boolean>(false);

  readonly presets: IPreset[] = [
    { name: 'CUSTOM_THEME.PRESETS.INDIGO', seed: '#0049db' },
    { name: 'CUSTOM_THEME.PRESETS.TEAL', seed: '#00696e' },
    { name: 'CUSTOM_THEME.PRESETS.GREEN', seed: '#006952' },
    { name: 'CUSTOM_THEME.PRESETS.ORANGE', seed: '#a33e0f' },
    { name: 'CUSTOM_THEME.PRESETS.ROSE', seed: '#ba1a4a' },
    { name: 'CUSTOM_THEME.PRESETS.ROYAL', seed: '#911aaf' },
  ];

  readonly variants: IVariantOption[] = [
    { value: 'content', label: 'CUSTOM_THEME.VARIANTS.CONTENT' },
    { value: 'tonalSpot', label: 'CUSTOM_THEME.VARIANTS.TONAL_SPOT' },
    { value: 'vibrant', label: 'CUSTOM_THEME.VARIANTS.VIBRANT' },
  ];

  readonly variantLabel = computed(
    () => this.variants.find(v => v.value === this.variant())?.label ?? ''
  );

  // Live-generated palette for the seed, recomputed reactively.
  private readonly palette = computed<Record<string, string>>(() =>
    this.themeService.generatePalette(
      this.seed(),
      this.isDark(),
      [...PREVIEW_ROLES],
      this.variant()
    )
  );

  // Accent role pairs proving on-color contrast.
  readonly pairs = computed<IPairSwatch[]>(() => {
    const p = this.palette();
    return [
      { label: 'CUSTOM_THEME.PAIRS.PRIMARY', bg: p['primary'], fg: p['onPrimary'] },
      { label: 'CUSTOM_THEME.PAIRS.SECONDARY', bg: p['secondary'], fg: p['onSecondary'] },
      { label: 'CUSTOM_THEME.PAIRS.TERTIARY', bg: p['tertiary'], fg: p['onTertiary'] },
      { label: 'CUSTOM_THEME.PAIRS.ERROR', bg: p['error'], fg: p['onError'] },
    ];
  });

  // Neutral surface elevation ramp.
  readonly surfaces = computed<string[]>(() => {
    const p = this.palette();
    return [
      p['surface'],
      p['surfaceContainerLow'],
      p['surfaceContainer'],
      p['surfaceContainerHigh'],
      p['surfaceContainerHighest'],
    ];
  });

  readonly outline = computed(() => this.palette()['outlineVariant']);

  ngOnInit(): void {
    // localStorage wins; fall back to the backend config so the picker reflects
    // whatever theme is currently applied.
    const local = this.storage.retrieve(CUSTOM_THEME_KEY) as ICustomTheme | null;
    const custom = local?.seed ? local : this.coreConfig?.customTheme;
    if (custom?.seed) {
      this.seed.set(custom.seed);
      this.isDark.set(custom.isDark);
      this.variant.set(custom.variant ?? 'content');
    }
    if (this.screenService.isPlatformBrowser()) {
      this.resolveCoreBaseNode();
    }
  }

  // Look up the /core/base node so the backend-save button has a target uuid.
  private resolveCoreBaseNode(): void {
    this.nodeService
      .fetch('/api/v3/landingPage?content=/core/base', 'noCache=1')
      .pipe(take(1))
      .subscribe((res: any) => {
        const uuid = res?.uuid ?? res?.data?.id;
        if (!uuid) {
          return;
        }
        this.coreBaseNode.set({
          uuid,
          langcode: res?.langcode ?? res?.data?.attributes?.langcode,
          config: res,
        });
      });
  }

  onSeedChange(value: string): void {
    this.seed.set(value);
    this.preview();
  }

  // Accept manual hex entry; only apply once it parses to a full hex.
  onHexInput(value: string): void {
    const v = value.trim();
    const normalized = v.startsWith('#') ? v : `#${v}`;
    if (HEX_RE.test(normalized)) {
      this.seed.set(normalized.toLowerCase());
      this.preview();
    }
  }

  onMode(dark: boolean): void {
    if (this.isDark() === dark) {
      return;
    }
    this.isDark.set(dark);
    this.preview();
  }

  onPreset(preset: IPreset): void {
    this.seed.set(preset.seed);
    this.preview();
  }

  onVariant(variant: ThemeVariant): void {
    if (this.variant() === variant) {
      return;
    }
    this.variant.set(variant);
    this.preview();
  }

  isActivePreset(seed: string): boolean {
    return this.seed().toLowerCase() === seed.toLowerCase();
  }

  // Live preview: regenerate the M3 palette and write CSS vars immediately.
  private preview(): void {
    this.dirty.set(true);
    this.themeService.applyCustomTheme(this.seed(), this.isDark(), this.variant());
  }

  onSave(): void {
    this.themeService.applyCustomTheme(this.seed(), this.isDark(), this.variant());
    this.themeService.saveCustomTheme(this.seed(), this.isDark(), this.variant());
    this.dirty.set(false);
    this.util.openSnackbar(this.translate.instant('CUSTOM_THEME.SAVED_TOAST'), 'ok');
  }

  // Export the generated palette as a :root CSS block for use outside the app.
  onExportCss(): void {
    const css = this.themeService.exportThemeCss(this.seed(), this.isDark(), this.variant());
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const anchor = this.document.createElement('a');
    anchor.href = url;
    anchor.download = 'custom-theme.css';
    anchor.click();
    URL.revokeObjectURL(url);
    this.util.openSnackbar(this.translate.instant('CUSTOM_THEME.EXPORTED_TOAST'), 'ok');
  }

  // Copy the generated CSS variables to the clipboard.
  onCopy(): void {
    const css = this.themeService.exportThemeCss(this.seed(), this.isDark(), this.variant());
    this.document.defaultView?.navigator.clipboard?.writeText(css).then(() => {
      this.util.openSnackbar(this.translate.instant('CUSTOM_THEME.COPIED_TOAST'), 'ok');
    });
  }

  // Persist the theme (seed config + full token map) into the /core/base node.
  onSaveBackend(): void {
    const node = this.coreBaseNode();
    if (!node) {
      return;
    }
    const customTheme: ICustomTheme = {
      seed: this.seed(),
      isDark: this.isDark(),
      variant: this.variant(),
      vars: this.themeService.generateThemeVars(this.seed(), this.isDark(), this.variant()),
    };
    const body = { ...node.config, customTheme };
    this.saving.set(true);
    this.injector
      .get(BuilderService)
      .updateAttributes(
        { uuid: node.uuid, langcode: node.langcode },
        '/api/v1/node/json',
        { body: JSON.stringify(body) },
        {}
      )
      .pipe(take(1))
      .subscribe(res => {
        this.saving.set(false);
        const key = res ? 'CUSTOM_THEME.SAVE_BACKEND_TOAST' : 'CUSTOM_THEME.SAVE_BACKEND_FAIL';
        this.util.openSnackbar(this.translate.instant(key), 'ok');
      });
  }

  onReset(): void {
    this.themeService.clearCustomTheme();
    this.seed.set('#0049db');
    this.isDark.set(false);
    this.variant.set('content');
    this.dirty.set(false);
    this.util.openSnackbar(this.translate.instant('CUSTOM_THEME.RESET_TOAST'), 'ok');
  }
}
