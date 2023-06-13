import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import components from './components.json';
import widgets from './widgets.json';
import { BuilderState } from '@core/state/BuilderState';
import { IBuilderComponent, IBuilderWidget } from '@core/interface/IBuilder';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @Input() content: IPage;
  @LocalStorage('page')
  page: IPage;

  @LocalStorage('builderFullSize')
  builderFullSize: boolean;
  components: IBuilderComponent[];
  widgets: IBuilderWidget[];
  opened = true;
  panelOpenState = false;
  constructor(
    private contentState: ContentState,
    private storage: LocalStorageService,
    public builder: BuilderState
  ) {}

  ngOnInit(): void {
    this.content = this.page;
    this.components = components.data;
    this.widgets = widgets.data;
    if (!this.builderFullSize) {
      this.storage.store('builderFullSize', false);
    }
    this.contentState.animateDisable$.next(true);
  }

  ngAfterViewInit(): void {
    this.storage.observe(this.contentState.pageKey).subscribe((page) => {
      this.content = page;
    });
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
