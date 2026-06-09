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
  imports: [IconComponent, BtnComponent, MatMenuModule],
})
export class CustomThemeComponent implements OnInit {
  private themeService = inject(ThemeService);
  private storage = inject(LocalStorageService);
  private util = inject(UtilitiesService);

  readonly seed = signal<string>('#0049db');
  readonly isDark = signal<boolean>(false);
  readonly variant = signal<ThemeVariant>('content');
  readonly dirty = signal<boolean>(false);

  readonly presets: IPreset[] = [
    { name: '靛蓝', seed: '#0049db' },
    { name: '深青', seed: '#00696e' },
    { name: '森绿', seed: '#006952' },
    { name: '赭橙', seed: '#a33e0f' },
    { name: '玫红', seed: '#ba1a4a' },
    { name: 'royal', seed: '#911aaf' },
  ];

  readonly variants: IVariantOption[] = [
    { value: 'content', label: '内容贴合' },
    { value: 'tonalSpot', label: '柔和' },
    { value: 'vibrant', label: '鲜艳' },
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
      { label: 'Primary', bg: p['primary'], fg: p['onPrimary'] },
      { label: 'Secondary', bg: p['secondary'], fg: p['onSecondary'] },
      { label: 'Tertiary', bg: p['tertiary'], fg: p['onTertiary'] },
      { label: 'Error', bg: p['error'], fg: p['onError'] },
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
    this.util.openSnackbar('已应用自定义主题', 'ok');
  }

  onReset(): void {
    this.themeService.clearCustomTheme();
    this.seed.set('#0049db');
    this.isDark.set(false);
    this.variant.set('content');
    this.dirty.set(false);
    this.util.openSnackbar('已重置为默认主题', 'ok');
  }
}
