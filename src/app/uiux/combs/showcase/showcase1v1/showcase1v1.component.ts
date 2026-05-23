import { Component, Input } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IShowcase1v1 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';

@Component({
  selector: 'app-showcase-1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  imports: [TextComponent, TitleComponent, DynamicComponentComponent],
})
export class Showcase1v1Component extends BaseComponent {
  @Input() content: IShowcase1v1;
}
