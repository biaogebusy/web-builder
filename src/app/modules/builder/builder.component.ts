import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @Input() content: IPage;
  @LocalStorage('page')
  page: IPage;
  components: {
    label: string;
    elements: any[];
  }[];
  opened = true;
  panelOpenState = false;
  showcase: ICard1v1 | null;
  constructor(
    private contentState: ContentState,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.content = this.page;
    this.contentState.animateDisable$.next(true);
  }

  ngAfterViewInit(): void {
    this.storage.observe(this.contentState.pageKey).subscribe((page) => {
      this.content = page;
    });
  }

  onShowcase(content?: any): void {
    if (content) {
      this.showcase = {
        type: 'card-1v1',
        link: {
          href: '#',
          label: content.type,
        },
        components: [content],
      };
    } else {
      this.showcase = null;
    }
  }

  onAnimate(): void {
    this.contentState.animateDisable$.next(false);
  }

  drop(event: CdkDragDrop<string[]>): void {
    // 预览上下排序组件
    if (event.previousContainer === event.container) {
      this.contentState.dropComponent(event);
    } else {
      // 添加组件到指定位置
      this.contentState.transferComponet(event);
    }
  }
}
