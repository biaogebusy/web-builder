import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { IShowcase1v4 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-showcase-1v4',
  templateUrl: './showcase1v4.component.html',
  styleUrls: ['./showcase1v4.component.scss'],
  imports: [TextComponent, DynamicComponentComponent],
})
export class Showcase1v4Component extends BaseComponent {
  @Input() content: IShowcase1v4;
  constructor() {
    super();
  }

}
