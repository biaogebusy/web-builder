import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBtnAnimate } from '@core/interface/widgets/IBtnAnimate';

@Component({
  selector: 'app-btn-animate',
  templateUrl: './btn-animate.component.html',
  styleUrls: ['./btn-animate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnAnimateComponent implements OnInit {
  @Input() content: IBtnAnimate;
  constructor() {}

  ngOnInit(): void {}
}
