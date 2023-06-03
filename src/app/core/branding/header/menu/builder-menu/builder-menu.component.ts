import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
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
  constructor(
    public contentState: ContentState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
    }
  }

  openDrawer(): void {
    this.contentState.drawerOpened$.next(true);
    this.contentState.drawerLoading$.next(true);
    this.contentState.drawerContent$.next(this.builder);
    this.contentState.drawerLoading$.next(false);
  }
}
