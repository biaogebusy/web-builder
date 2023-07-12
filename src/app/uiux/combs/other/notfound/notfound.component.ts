import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { INotfound } from '@core/interface/combs/INotfound';

@Component({
  selector: 'app-404',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent implements OnInit {
  @Input() content: INotfound;
  constructor() {}

  ngOnInit(): void {}
}
