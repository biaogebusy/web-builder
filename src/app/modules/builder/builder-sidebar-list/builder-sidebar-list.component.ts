import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-builder-sidebar-list',
  templateUrl: './builder-sidebar-list.component.html',
  styleUrls: ['./builder-sidebar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarListComponent implements OnInit {
  @Input() content: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  constructor(private contentState: ContentState) {}

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
    this.showChange.emit(content);
  }
}
