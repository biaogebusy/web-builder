import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderMenuComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() showPreview = true;
  @LocalStorage('page')
  page: IPage;
  total: number;

  constructor(
    public contentState: ContentState,
    private builder: BuilderState,
    private util: UtilitiesService,
    private cd: ChangeDetectorRef,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getTotal();
  }

  getTotal(): void {
    const localPage = this.storage.retrieve(this.builder.pageKey);
    if (localPage) {
      this.total = localPage.body.length;
    } else {
      this.total = 0;
    }
    this.cd.detectChanges();
    this.storage.observe(this.builder.pageKey).subscribe((page) => {
      if (page && page.body) {
        this.total = page.body.length;
      } else {
        this.total = 0;
      }
      this.cd.detectChanges();
    });
  }

  onPreview(): void {
    if (!this.page || this.page.body.length === 0) {
      this.util.openSnackbar('预览页面没有组件，请添加再预览', 'ok');
      return;
    }
    this.contentState.drawerOpened$.next(true);
    this.contentState.drawerContent$.next(this.page);
  }

  onCopy(): void {
    this.util.copy(JSON.stringify(this.page));
    this.util.openSnackbar('已复制页面组件 JSON', 'ok');
  }

  onClear(): void {
    this.builder.initPage();
    this.contentState.drawerOpened$.next(false);
    this.util.openSnackbar('预览页面的组件已清空', 'ok');
  }

  onSubmit(): void {
    this.util.openSnackbar('功能尚未开发，可以手动复制页面 JSON', 'ok');
  }
}
