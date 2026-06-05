import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import type { IMenuList, IMenuListItem } from '@core/interface/widgets/IMenuList';
import { ScreenService } from '@core/service/screen.service';
import { NgPipesModule } from 'ngx-pipes';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgPipesModule,
    LinkComponent,
  ],
})
export class MenuListComponent implements OnInit {
  private screenService = inject(ScreenService);

  readonly content = input.required<IMenuList>();
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
    const lists = this.content().elements;
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
