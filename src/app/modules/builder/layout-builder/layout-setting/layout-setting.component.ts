import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuilderState } from '@core/state/BuilderState';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};

  constructor(private builder: BuilderState) {}

  ngOnInit(): void {}

  onModelChange(value: any) {
    this.builder.builderLayoutSetting$.next({
      value,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }
}
