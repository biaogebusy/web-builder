import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ENABLE_BUILDER_TOOLBAR } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Observable } from 'rxjs';

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
  @Output() uuidChange: EventEmitter<string> = new EventEmitter();
  @HostBinding('class.component-toolbar') hostClass = true;
  dialogRef: any;
  enableBuilderToolbar: boolean;

  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    private dialog: MatDialog,
    @Inject(ENABLE_BUILDER_TOOLBAR)
    public enabelBuilderToolbar$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.enabelBuilderToolbar$.subscribe((state) => {
      this.enableBuilderToolbar = state;
    });
  }

  get type(): string {
    return this.content.type || this.content.content?.type || '';
  }

  addComponent(content: any): any {
    this.builder.pushComponent(content);
    this.util.openSnackbar(`已添加${this.type}到预览页面！`, 'ok');
  }

  onUpdown(index: number, direction: string): void {
    this.builder.upDownComponent(index, direction);
  }

  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${this.type}的JSON！`, 'ok');
  }

  onEditor(content: any, index: number): void {
    const { type } = content;
    const component = type ? content : content.content;
    if (!this.enableBuilderToolbar) {
      // uuid for update not builder page
      const uuid = Date.now().toString();
      this.uuidChange.emit(uuid);
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '1000px',
        data: {
          inputData: {
            content: {
              type: 'jsoneditor',
              index,
              uuid,
              data: component,
              isPreview: this.isPreview,
            },
          },
        },
      });
    } else {
      this.builder.showEditor(component, index);
    }
  }

  onDelete(index: number): void {
    this.builder.deleteComponent(index);
    this.util.openSnackbar(`已在移除${this.type}组件！`, 'ok');
  }
}
