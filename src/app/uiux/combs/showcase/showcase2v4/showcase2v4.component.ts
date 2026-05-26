import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { IShowcase2v4 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-showcase-2v4',
  templateUrl: './showcase2v4.component.html',
  styleUrls: ['./showcase2v4.component.scss'],
  imports: [TextComponent, DynamicComponentComponent],
})
export class Showcase2v4Component {
  @Input() content: IShowcase2v4;

}
