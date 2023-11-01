import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-btn-generater',
  templateUrl: './btn-generater.component.html',
  styleUrls: ['./btn-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnGeneraterComponent implements OnInit {
  @Input() content: any;
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onGenerate(): void {
    this.builder.dynamicContent$.next({
      elements: [
        {
          type: 'builder-generater',
        },
      ],
    });
  }
}
