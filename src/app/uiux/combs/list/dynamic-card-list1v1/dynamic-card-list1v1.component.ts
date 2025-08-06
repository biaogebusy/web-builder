import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { ScreenService } from '@core/service/screen.service';
import type { IDynamicCardList1v1 } from '@core/interface/combs/IList';
import { IPager } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-dynamic-card-list-1v1',
  templateUrl: './dynamic-card-list1v1.component.html',
  styleUrls: ['./dynamic-card-list1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DynamicCardList1v1Component extends BaseComponent implements OnInit {
  nodeService = inject(NodeService);
  routerService = inject(RouteService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);

  @Input() content: IDynamicCardList1v1;

  page: number;
  pager: IPager;
  loading = false;
  nodes: any[];

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.nodeSearch({});
    }
  }

  nodeSearch(options: any): void {
    this.loading = true;
    const state = this.getParamsState({}, options);
    const params = this.getApiParams(state);
    this.nodeService.fetch(this.getParams(this.content, 'type'), params).subscribe(
      data => {
        this.updateList(data);
        this.loading = false;
        this.cd.detectChanges();
      },
      error => {
        console.log(error);
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }

  updateList(data: any): void {
    this.pager = this.handlerPager(data.pager);
    this.nodes = data.rows.map((item: any) => {
      return {
        link: {
          label: item.title,
          href: item.url,
        },
        user: item.user,
        time: item.date,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: item.url,
          ratios: this.content.ratios || 'media-4-3',
          img: {
            classes: 'object-fit',
            src: item.image,
            title: item.title,
          },
        },
        moreLabel: '查看更多',
      };
    });
    this.cd.detectChanges();
  }

  onPageChange(page: number): void {
    this.page = page - 1;
    this.nodeSearch({ page: this.page });
  }
}
