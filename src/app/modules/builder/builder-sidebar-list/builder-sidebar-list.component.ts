import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-builder-sidebar-list',
  templateUrl: './builder-sidebar-list.component.html',
  styleUrls: ['./builder-sidebar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarListComponent implements OnInit {
  @Input() content: any;
  constructor(
    private contentState: ContentState,
    private builder: BuilderState
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    // 预览上下排序组件
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
