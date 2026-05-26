import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { IShowcase1v3 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-showcase-1v3',
  templateUrl: './showcase1v3.component.html',
  styleUrls: ['./showcase1v3.component.scss'],
  imports: [TextComponent, DynamicComponentComponent],
})
export class Showcase1v3Component {
  @Input() content: IShowcase1v3;

}
