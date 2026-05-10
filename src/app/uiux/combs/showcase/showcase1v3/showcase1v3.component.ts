import { Component, Input } from '@angular/core';
import type { IShowcase1v3 } from '@core/interface/combs/IShowcase';

@Component({
    selector: 'app-showcase-1v3',
    templateUrl: './showcase1v3.component.html',
    styleUrls: ['./showcase1v3.component.scss'],
    standalone: false
})
export class Showcase1v3Component {
  @Input() content: IShowcase1v3;

}
