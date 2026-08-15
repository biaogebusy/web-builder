import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TOOLBAR_TOOLTIP_ABOVE, ToolbarKeynavDirective } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

/**
 * Floating action bar for canvas images, dynamically created by
 * InlineImageService and positioned above the selected image. Actions are
 * handed to the service via outputs (write-back/media library/upload); the
 * component holds no business state and does not inject the service back,
 * avoiding a module cycle with the service file.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inline-image-bar',
  templateUrl: './inline-image-bar.component.html',
  styleUrl: './inline-image-bar.component.scss',
  providers: [TOOLBAR_TOOLTIP_ABOVE],
  imports: [TranslateModule, MatTooltipModule, BtnComponent, ToolbarKeynavDirective],
})
export class InlineImageBarComponent {
  /** Currently selected image; the whole bar hides when null */
  readonly img = input<HTMLImageElement | null>(null);

  readonly upload = output<void>();
  readonly library = output<void>();
  readonly altApply = output<string>();
  readonly clearStyles = output<void>();
  readonly more = output<void>();
  readonly closed = output<void>();

  private readonly altInput = viewChild<ElementRef<HTMLInputElement>>('altInput');
  private injector = inject(Injector);

  public altPanelOpen = signal(false);
  public altValue = signal('');

  constructor() {
    // Collapse the ALT input row on selection change and pull in the image's current alt text
    effect(() => {
      const img = this.img();
      this.altPanelOpen.set(false);
      this.altValue.set(img?.getAttribute('alt') ?? '');
    });
  }

  toggleAltPanel(): void {
    this.altPanelOpen.update(open => !open);
    if (this.altPanelOpen()) {
      afterNextRender(() => this.altInput()?.nativeElement.select(), { injector: this.injector });
    }
  }

  applyAlt(value: string): void {
    this.altApply.emit(value.trim());
    this.altPanelOpen.set(false);
  }
}
