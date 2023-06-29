import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IRlate } from '@core/interface/node/IRelate';

@Component({
  selector: 'app-relate',
  templateUrl: './relate.component.html',
  styleUrls: ['./relate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelateComponent implements OnInit {
  @Input() content: IRlate;
  constructor() {}

  ngOnInit(): void {}
}
