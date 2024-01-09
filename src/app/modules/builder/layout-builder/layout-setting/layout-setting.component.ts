import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit {
  @Input() content: ILayoutSetting;
  form = new FormGroup({});
  model: any = {};

  constructor(private builder: BuilderState, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onModelChange(value: any) {
    this.builder.builderLayoutSetting$.next({
      value,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  showCode(): void {
    this.dialog.open(DialogComponent, {
      width: '1000px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            index: this.content.index,
            isPreview: true,
            data: this.content.content,
          },
        },
      },
    });
  }
}
