import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
    selector: 'app-user-card-count',
    templateUrl: './user-card-count.component.html',
    styleUrls: ['./user-card-count.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserCardCountComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
