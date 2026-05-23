import { Component, Input } from '@angular/core';
import type { IShowcase3v9 } from '@core/interface/combs/IShowcase';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-showcase-3v9',
  templateUrl: './showcase3v9.component.html',
  styleUrls: ['./showcase3v9.component.scss'],
  imports: [DynamicComponentComponent],
})
export class Showcase3v9Component {
  @Input() content: IShowcase3v9;
}
