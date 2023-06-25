import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-switch-preview',
  templateUrl: './switch-preview.component.html',
  styleUrls: ['./switch-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPreviewComponent implements OnInit {
  constructor(private builderState: BuilderState) {}
  currentPreview = 'none';
  currentIcon = 'cellphone-link';
  previews = [
    {
      icon: {
        svg: 'undo-variant',
      },
      value: 'none',
      label: '恢复',
    },
    {
      icon: {
        svg: 'cellphone',
      },
      value: 'xs',
      label: 'xs',
    },
    {
      icon: {
        svg: 'tablet',
      },
      value: 'sm',
      label: 'sm',
    },
    {
      icon: {
        svg: 'monitor',
      },
      value: 'md',
      label: 'md',
    },
  ];
  ngOnInit(): void {}

  onSwitch(preview: any): void {
    this.currentPreview = preview.value;
    if (preview.value === 'none') {
      this.currentIcon = 'cellphone-link';
    } else {
      this.currentIcon = preview.icon.svg;
    }
    this.builderState.switchPreivew$.next(preview.value);
  }
}
