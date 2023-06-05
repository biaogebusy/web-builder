import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderMenuComponent implements OnInit {
  @Input() content: any;
  @LocalStorage('builder')
  builder: IPage;
  opened = false;
  constructor(
    public contentState: ContentState,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {}

  onPreview(): void {
    if (!this.builder || this.builder.body.length === 0) {
      this.util.openSnackbar('构建页面没有组件，请添加再预览', 'ok');
      return;
    }
    this.opened = !this.opened;
    if (this.opened) {
      this.contentState.drawerOpened$.next(true);
      this.contentState.drawerLoading$.next(true);
      this.contentState.drawerContent$.next(this.builder);
      this.contentState.drawerLoading$.next(false);
    } else {
      this.contentState.drawerOpened$.next(false);
    }
  }

  onCopy(): void {
    this.util.copy(JSON.stringify(this.builder));
    this.util.openSnackbar('已复制页面组件 JSON', 'ok');
  }

  onClear(): void {
    this.contentState.clearComponent();
    this.contentState.drawerOpened$.next(false);
    this.util.openSnackbar('构建页面的组件已清空', 'ok');
  }

  onSubmit(): void {
    this.util.openSnackbar('功能尚未开发，可以手动复制页面 JSON', 'ok');
  }
}
