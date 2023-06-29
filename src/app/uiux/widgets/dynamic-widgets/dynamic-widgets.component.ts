import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-widgets',
  templateUrl: './dynamic-widgets.component.html',
  styleUrls: ['./dynamic-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicWidgetsComponent implements OnInit {
  @Input() content: any;
  @Input() data: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
