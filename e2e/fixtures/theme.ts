import '@angular/compiler';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  provideZonelessChangeDetection,
  signal,
  WritableSignal,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from 'ngx-webstorage';
import type { ICoreConfig } from '../../src/app/core/interface/IAppConfig';
import { ThemeService } from '../../src/app/core/service/theme.service';
import { CORE_CONFIG } from '../../src/app/core/token/token-providers';
import type { ThemeName } from '../../src/app/core/util/theme.util';

export interface ThemeFixtureApi {
  service: ThemeService;
  localTheme: WritableSignal<ThemeName>;
}

declare global {
  interface Window {
    themeFixture: ThemeFixtureApi;
    themeConfig?: Partial<ICoreConfig>;
  }
}

@Component({
  selector: 'theme-samples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="shad-card">
      <p>Card text</p>
      <input class="shad-input" aria-label="Shadcn input" placeholder="Placeholder text" />
      <button mat-raised-button>Update</button>
    </div>
    <div class="shad-popover">Popover text</div>
    <mat-form-field appearance="outline">
      <mat-label>Material input</mat-label>
      <input matInput value="Input text" />
    </mat-form-field>
    <label>Native control <input type="checkbox" /></label>
    <div class="footer-backdrop">
      <footer class="footer-light"><a href="#">Footer link</a></footer>
    </div>
    <div class="base-text">
      <table>
        <caption>Theme table</caption>
        <thead><tr><th scope="col">Table heading</th></tr></thead>
        <tbody><tr><td>Table cell</td></tr></tbody>
      </table>
    </div>
  `,
})
class ThemeSamplesComponent {}

// A browser harness for the production service, SCSS and Material controls.
// The workspace's actual placement of theme boundaries is covered by its component test.
@Component({
  selector: 'theme-fixture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeSamplesComponent],
  template: `
    <main>
      <h1>Theme regression fixture</h1>
      <section id="root-scope" class="sample-scope" aria-label="Page theme">
        <theme-samples />
      </section>
      <section id="local-scope" class="sample-scope" [class]="localTheme()" aria-label="Local theme">
        <theme-samples />
        <section
          id="inner-scope"
          class="sample-scope"
          [class]="localTheme() === 'dark-theme' ? 'light-theme' : 'dark-theme'"
          aria-label="Nested theme"
        >
          <theme-samples />
        </section>
      </section>
    </main>
  `,
})
class ThemeFixtureComponent {
  readonly localTheme = signal<ThemeName>('dark-theme');
  private theme = inject(ThemeService);

  constructor() {
    this.theme.initTheme();
    window.themeFixture = { service: this.theme, localTheme: this.localTheme };
  }
}

void bootstrapApplication(ThemeFixtureComponent, {
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: CORE_CONFIG,
      useValue: {
        defaultTheme: 'light-theme',
        theme: [{ style: 'light-theme' }, { style: 'dark-theme' }],
        ...window.themeConfig,
      },
    },
    {
      provide: LocalStorageService,
      useValue: {
        retrieve: (key: string) => JSON.parse(localStorage.getItem(key) ?? 'null'),
        store: (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value)),
        clear: (key: string) => localStorage.removeItem(key),
      },
    },
  ],
});
