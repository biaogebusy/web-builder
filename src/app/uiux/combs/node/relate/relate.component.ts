import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IRelate } from '@core/interface/node/IRelate';

@Component({
  selector: 'app-relate',
  templateUrl: './relate.component.html',
  styleUrls: ['./relate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelateComponent implements OnInit {
  @Input() content: IRelate;
  constructor() {}

  ngOnInit(): void {}
}
