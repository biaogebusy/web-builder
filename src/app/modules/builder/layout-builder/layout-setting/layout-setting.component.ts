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
  fields: FormlyFieldConfig[] = [];
  settings: FormlyFieldConfig[] = [
    {
      type: 'slider',
      key: 'xs',
      defaultValue: 4,
      className: 'width-100',
      templateOptions: {
        label: '移动端',
        min: 1,
        max: 12,
        thumbLabel: true,
      },
    },
    {
      type: 'slider',
      key: 'sm',
      defaultValue: 4,
      className: 'width-100',
      templateOptions: {
        label: '平板电脑',
        min: 1,
        max: 12,
        thumbLabel: true,
      },
    },
    {
      type: 'slider',
      key: 'md',
      defaultValue: 4,
      className: 'width-100',
      templateOptions: {
        label: '桌面电脑',
        min: 1,
        max: 12,
        thumbLabel: true,
      },
    },
    {
      type: 'slider',
      key: 'lg',
      defaultValue: 4,
      className: 'width-100',
      templateOptions: {
        label: '超大桌面',
        min: 1,
        max: 12,
        thumbLabel: true,
      },
    },
  ];
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {
    this.fields = this.settings.map((field: any) => {
      return {
        ...field,
        defaultValue: this.content.layout.row[field.key],
      };
    });
  }

  onModelChange(value: any) {
    this.builder.builderLayoutSetting$.next({
      row: value,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }
}
