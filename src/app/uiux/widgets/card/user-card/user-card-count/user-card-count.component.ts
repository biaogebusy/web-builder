import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-user-card-count',
    templateUrl: './user-card-count.component.html',
    styleUrls: ['./user-card-count.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserCardCountComponent {
  @Input() content: any;
  constructor() {}

}
