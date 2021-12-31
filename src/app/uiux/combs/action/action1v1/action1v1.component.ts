import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-action1v1',
  templateUrl: './action1v1.component.html',
  styleUrls: ['./action1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Action1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
