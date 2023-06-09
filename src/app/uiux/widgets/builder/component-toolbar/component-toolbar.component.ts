import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentState } from '@core/state/ContentState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentToolbarComponent implements OnInit {
  @Input() content: IComponentToolbar;
  // for builder preview page
  @Input() isPreview: boolean;

  // for storybook story
  @Input() isStory: boolean;
  @Input() index: number;
  @Output() uuidChange: EventEmitter<number> = new EventEmitter();
  @HostBinding('class.component-toolbar') hostClass = true;
  dialogRef: any;

  constructor(
    private contentState: ContentState,
    private util: UtilitiesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  addComponent(content: any): any {
    this.contentState.addComponent(content);
    this.util.openSnackbar(`已添加${content.type}到预览页面！`, 'ok');
  }

  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${content.type}的JSON！`, 'ok');
  }

  onEditor(content: any, index: number): void {
    const uuid = Date.now();
    this.uuidChange.emit(uuid);
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '1000px',
      height: '650px',
      data: {
        inputData: {
          disableToolbar: true,
          content: {
            type: 'jsoneditor',
            index,
            uuid,
            data: content,
            isPreview: this.isPreview,
            actionsAlign: 'center center',
            actions: [
              {
                type: 'closeDialog',
                label: '保存',
              },
            ],
          },
        },
      },
    });
  }

  onDelete(content: any, index: number): void {
    this.contentState.deleteComponent(index);
    this.util.openSnackbar(`已在移除${content.type}组件！`, 'ok');
  }
}
