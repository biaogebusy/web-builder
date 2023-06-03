import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

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
    private storage: LocalStorageService,
    private contentState: ContentState
  ) {}

  ngOnInit(): void {
    this.storage.observe('builder').subscribe((page) => {
      console.log(page);
      this.builder = page;
    });
  }

  openDrawer(): void {
    this.contentState.drawerOpened$.next(true);
    this.contentState.drawerLoading$.next(true);
    this.contentState.drawerContent$.next(this.builder);
    this.contentState.drawerLoading$.next(false);
  }
}
