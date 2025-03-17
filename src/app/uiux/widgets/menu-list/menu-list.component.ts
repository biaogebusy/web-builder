import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import type { IMenuList, IMenuListItem } from '@core/interface/widgets/IMenuList';
import { ScreenService } from '@core/service/screen.service';

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MenuListComponent implements OnInit {
  private screenService = inject(ScreenService);

  @Input() content: IMenuList;
  list: IMenuListItem[];
  initList: IMenuListItem[];
  expand = false;
  row = 12;

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initContent(this.expand);
    }
  }

  initContent(expand: boolean): void {
    const lists = this.content.elements;
    this.initList = lists;
    this.updateList(this.expand);
  }

  updateList(expand: boolean): void {
    if (expand) {
      this.list = this.initList;
    } else {
      this.list = this.initList.slice(0, this.row - 1);
    }
  }

  onExpand(): void {
    this.expand = !this.expand;
    this.updateList(this.expand);
  }
}
