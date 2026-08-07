import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import type { IBranding } from '@core/interface/branding/IBranding';
import { HeaderComponent } from '@core/branding/header/header.component';
import { FooterComponent } from '@core/branding/footer/footer.component';

const DESIGN_WIDTH = 1280;

/**
 * Renders the real app-header / app-footer against the edited (unsaved)
 * branding config by overriding the BRANDING token at component level.
 * The canvas keeps the desktop design width and is scaled down to fit the
 * pane; the scale transform also keeps position:fixed children (fixBar)
 * contained inside the preview.
 *
 * Interactive mode lifts the pointer-events shield so dropdown menus, the
 * theme switch and hover menus can open. The canvas is forced to 100% zoom
 * (CDK overlays render unscaled in the global container and would misalign
 * against a scaled canvas), and capture-phase guards block link navigation,
 * form submits and Enter-key searches so the editor never navigates away.
 */
@Component({
  selector: 'app-branding-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BRANDING, useFactory: () => new ReplaySubject<IBranding>(1) }],
  imports: [HeaderComponent, FooterComponent, MatIconModule, TranslateModule],
  template: `
    <div class="preview-toolbar">
      @if (interactive()) {
        <span class="interact-tip">{{ 'BUILDER.EDIT_BRANDING.INTERACTIVE_TIP' | translate }}</span>
      }
      <button
        type="button"
        class="interact-btn"
        [class.on]="interactive()"
        [attr.aria-pressed]="interactive()"
        (click)="toggleInteractive()"
      >
        <mat-icon [svgIcon]="interactive() ? 'gesture-tap' : 'cursor-default-outline'" />
        {{ 'BUILDER.EDIT_BRANDING.INTERACTIVE_MODE' | translate }}
      </button>
    </div>
    <div
      #viewport
      class="preview-viewport"
      [class.interactive]="interactive()"
      [style.height.px]="interactive() ? null : viewportHeight()"
    >
      <div
        #canvas
        class="preview-canvas"
        [class.scaled]="!interactive()"
        [style.width.px]="designWidth"
        [style.transform]="'scale(' + (interactive() ? 1 : scale()) + ')'"
      >
        @if (ready()) {
          @if (mode() === 'header') {
            <app-header />
          } @else {
            <app-footer />
          }
        }
      </div>
    </div>
  `,
  styleUrl: './branding-preview.component.scss',
})
export class BrandingPreviewComponent implements AfterViewInit {
  readonly mode = input.required<'header' | 'footer'>();
  readonly branding = input<IBranding | null>(null);

  readonly designWidth = DESIGN_WIDTH;
  readonly scale = signal(0.5);
  readonly ready = signal(false);
  readonly viewportHeight = signal(160);
  readonly interactive = signal(false);

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly canvas = viewChild<ElementRef<HTMLElement>>('canvas');
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);
  private branding$ = inject(BRANDING) as ReplaySubject<IBranding>;

  constructor() {
    effect(() => {
      const value = this.branding();
      if (value) {
        this.branding$.next(value);
        this.ready.set(true);
      }
    });
  }

  ngAfterViewInit(): void {
    this.bindInteractionGuards();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => this.measure());
    observer.observe(this.host.nativeElement);
    const canvasEl = this.canvas()?.nativeElement;
    if (canvasEl) {
      observer.observe(canvasEl);
    }
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  toggleInteractive(): void {
    this.interactive.set(!this.interactive());
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.measure());
    }
  }

  private measure(): void {
    const width = this.host.nativeElement.clientWidth;
    if (width > 0) {
      this.scale.set(Math.min(1, width / DESIGN_WIDTH));
    }
    const canvasHeight = this.canvas()?.nativeElement.offsetHeight ?? 0;
    this.viewportHeight.set(Math.max(120, Math.ceil(canvasHeight * this.scale())));
  }

  // Capture-phase guards: kill navigation-ish behavior before it reaches
  // RouterLink / submit handlers, while letting plain buttons (menu
  // triggers, theme switch) work normally.
  private bindInteractionGuards(): void {
    const el = this.viewport().nativeElement;
    el.addEventListener('click', this.clickGuard, true);
    el.addEventListener('submit', this.blockGuard, true);
    el.addEventListener('keydown', this.enterGuard, true);
    el.addEventListener('keyup', this.enterGuard, true);
    this.destroyRef.onDestroy(() => {
      el.removeEventListener('click', this.clickGuard, true);
      el.removeEventListener('submit', this.blockGuard, true);
      el.removeEventListener('keydown', this.enterGuard, true);
      el.removeEventListener('keyup', this.enterGuard, true);
    });
  }

  private clickGuard = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a, form')) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private blockGuard = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  private enterGuard = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && (event.target as HTMLElement | null)?.closest('input, form')) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
}
