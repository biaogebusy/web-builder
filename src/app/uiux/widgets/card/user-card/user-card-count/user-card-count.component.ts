import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { NumberAnimateComponent } from '../../../number-animate/number-animate.component';

@Component({
  selector: 'app-user-card-count',
  templateUrl: './user-card-count.component.html',
  styleUrls: ['./user-card-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NumberAnimateComponent],
})
export class UserCardCountComponent {
  readonly content = input<any>();
  constructor() {}

}
