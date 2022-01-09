import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBox } from '@core/interface/widgets/IBox';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnInit {
  @Input() content: IBox;
  constructor() {}

  ngOnInit(): void {}
}
