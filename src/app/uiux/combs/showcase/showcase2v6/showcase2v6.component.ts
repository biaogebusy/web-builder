import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { IShowcase2v6 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-showcase-2v6',
  templateUrl: './showcase2v6.component.html',
  styleUrls: ['./showcase2v6.component.scss'],
  imports: [TextComponent, DynamicComponentComponent],
})
export class Showcase2v6Component {
  @Input() content: IShowcase2v6;

}
