import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentToolbarComponent implements OnInit {
  @Input() content: IComponentToolbar;
  @Input() isPreview: boolean;
  @Input() index: number;
  @HostBinding('class.component-toolbar') hostClass = true;
  constructor(
    private contentState: ContentState,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {}

  addComponent(content: any): any {
    this.contentState.addComponent(content);
    this.util.openSnackbar(`已添加${content.type}到构建页面！`, 'ok');
  }

  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${content.type}的JSON！`, 'ok');
  }

  onDelete(index: number): void {
    this.contentState.deleteComponent(index);
    this.util.openSnackbar(`已在构建页面移除组件！`, 'ok');
  }
}
