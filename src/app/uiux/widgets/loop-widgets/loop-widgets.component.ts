import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-loop-widgets',
  templateUrl: './loop-widgets.component.html',
  styleUrls: ['./loop-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoopWidgetsComponent implements OnInit {
  @Input() content: any[];
  constructor() {}

  ngOnInit(): void {}
}
