import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IShowcase1v1 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-showcase-1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  imports: [TextComponent, TitleComponent, DynamicComponentComponent],
})
export class Showcase1v1Component extends BaseComponent {
  readonly content = input<IShowcase1v1>();
}
