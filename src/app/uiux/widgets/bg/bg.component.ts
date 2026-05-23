import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { IBg } from '@core/interface/widgets/IBg';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent {
  readonly content = input.required<IBg>();
  readonly classes = computed(() => {
    const { classes, variant, overlay } = this.content();
    return `${classes}${variant ? `-${variant}` : ''} ${overlay} bg-fill-width`;
  });
}
