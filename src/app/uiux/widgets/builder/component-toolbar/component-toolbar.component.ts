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
import { IS_BUILDER_MODE } from '@core/token/token-providers';
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
  showGrid = false;

  constructor(
    private builder: BuilderState,
    private dialog: MatDialog,
    @Inject(IS_BUILDER_MODE)
    public isBuilderMode$: Observable<boolean>,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.isBuilderMode$.subscribe((state) => {
      this.enableBuilderToolbar = state;
    });
  }

  get type(): string {
    return this.content.type || this.content.content?.type || '';
  }

  onUpdown(index: number, direction: string): void {
    this.builder.upDownComponent(index, direction);
  }

  onCopy(): void {
    const content = this.content.type ? this.content : this.content.content;
    if (content) {
      this.util.copy(JSON.stringify(content));
      this.util.openSnackbar(`已复制${content.type}JSON`);
    }
  }

  onSetting(content: any, pageIndex: number, event: any): void {
    const { type } = content;
    const path = this.util.generatePath(event.target);
    const component = type ? content : content.content;
    const uuid = Date.now().toString();
    this.uuidChange.emit(uuid);
    if (!this.enableBuilderToolbar) {
      // uuid for update not builder page
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '1000px',
        data: {
          inputData: {
            content: {
              type: 'jsoneditor',
              index: pageIndex,
              uuid,
              data: component,
              isPreview: this.isPreview,
            },
          },
        },
      });
    } else {
      this.builder.onComponentSetting(component, pageIndex, uuid, path);
    }
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
    this.builder.showGrid$.next(this.showGrid);
  }

  onDelete(index: number): void {
    this.builder.deleteComponent(index);
  }
}
