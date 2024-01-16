import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-btn-generater',
  templateUrl: './btn-generater.component.html',
  styleUrls: ['./btn-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnGeneraterComponent implements OnInit {
  @Input() content: IBtn;
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onGenerate(): void {
    this.builder.builderRightContent$.next({
      elements: [
        {
          type: 'builder-generater',
        },
      ],
    });
  }
}
