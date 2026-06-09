import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { MatMenuModule } from '@angular/material/menu';
import {
  CUSTOM_THEME_KEY,
  ICustomTheme,
  ThemeService,
  ThemeVariant,
} from '@core/service/theme.service';
import { UtilitiesService } from '@core/service/utilities.service';
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

  readonly seed = signal<string>('#0049db');
  readonly isDark = signal<boolean>(false);
  readonly variant = signal<ThemeVariant>('content');
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
    const custom = this.storage.retrieve(CUSTOM_THEME_KEY) as ICustomTheme | null;
    if (custom?.seed) {
      this.seed.set(custom.seed);
      this.isDark.set(custom.isDark);
      this.variant.set(custom.variant ?? 'content');
    }
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

  onReset(): void {
    this.themeService.clearCustomTheme();
    this.seed.set('#0049db');
    this.isDark.set(false);
    this.variant.set('content');
    this.dirty.set(false);
    this.util.openSnackbar(this.translate.instant('CUSTOM_THEME.RESET_TOAST'), 'ok');
  }
}
