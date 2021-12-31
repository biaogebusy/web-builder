import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-widgets',
  templateUrl: './dynamic-widgets.component.html',
  styleUrls: ['./dynamic-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicWidgetsComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
