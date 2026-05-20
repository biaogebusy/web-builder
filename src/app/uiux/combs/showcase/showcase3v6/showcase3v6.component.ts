import { Component, Input } from '@angular/core';
import type { IShowcase3v6 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-showcase-3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
  imports: [TextComponent, MediaObjectComponent, DynamicComponentComponent],
})
export class Showcase3v6Component extends BaseComponent {
  @Input() content: IShowcase3v6;

}
