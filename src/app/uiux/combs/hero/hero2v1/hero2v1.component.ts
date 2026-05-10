import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ITextHero } from '@core/interface/widgets/IText';

@Component({
    selector: 'app-hero-2v1',
    templateUrl: './hero2v1.component.html',
    styleUrls: ['./hero2v1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Hero2v1Component {
  @Input() content: ITextHero;
  constructor() {}

}
