import { Component, Input } from '@angular/core';
import type { IShowcase2v4 } from '@core/interface/combs/IShowcase';

@Component({
    selector: 'app-showcase-2v4',
    templateUrl: './showcase2v4.component.html',
    styleUrls: ['./showcase2v4.component.scss'],
    standalone: false
})
export class Showcase2v4Component {
  @Input() content: IShowcase2v4;

}
