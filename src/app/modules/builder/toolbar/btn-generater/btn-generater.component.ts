import { Component, OnInit, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-btn-generater',
  templateUrl: './btn-generater.component.html',
  styleUrls: ['./btn-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnGeneraterComponent implements OnInit {
  private builder = inject(BuilderState);

  @Input() content: IBtn;

  ngOnInit(): void {}

  onGenerate(): void {
    this.builder.rightContent$.next({
      elements: [
        {
          type: 'builder-generater',
        },
      ],
    });
  }
}
