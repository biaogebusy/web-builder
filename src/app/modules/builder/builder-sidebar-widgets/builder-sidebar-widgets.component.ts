import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBuilderWidget } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-builder-sidebar-widgets',
  templateUrl: './builder-sidebar-widgets.component.html',
  styleUrls: ['./builder-sidebar-widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarWidgetsComponent implements OnInit {
  @Input() content: IBuilderWidget[];
  constructor(
    private contentState: ContentState,
    private builder: BuilderState
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any[]>): void {
    // 预览上下排序组件
    debugger;
    if (event.previousContainer === event.container) {
      this.contentState.dropComponent(event);
    } else {
      // 添加组件到指定位置
      this.contentState.transferComponet(event);
    }
  }

  onShowcase(content?: any) {
    if (content) {
      this.builder.showcase$.next({
        type: 'card-1v1',
        link: {
          href: '#',
          label: content.type,
        },
        components: [content],
      });
    } else {
      this.builder.showcase$.next(content);
    }
  }
}
