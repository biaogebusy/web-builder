import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { NotifyService } from '@core/service/notify.service';
import { CORE_CONFIG } from '@core/token/token-providers';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit {
  content: any[];
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.notifyService.getWatchList().subscribe((res) => {
      console.log(res);
      const data = {
        '0': {
          rows: [
            {
              id: '0',
              url: '/node/1',
              title: '移动公司A投标已到期',
              date: '2023/03/14 15:30:10',
            },
            {
              id: '2',
              url: '/node/2',
              title: '移动公司B投标已到期',
              date: '2023/03/15 15:30:10',
            },
          ],
          pager: {
            current_page: null,
            total_items: 0,
            total_pages: 0,
            items_per_page: 10,
          },
        },
        '1': {
          rows: [
            {
              id: '0',
              url: '/node/1',
              title: '移动公司A投标已到期',
              date: '2023/03/14 15:30:10',
            },
            {
              id: '2',
              url: '/node/2',
              title: '移动公司B投标已到期',
              date: '2023/03/15 15:30:10',
            },
          ],
          pager: {
            current_page: null,
            total_items: 0,
            total_pages: 0,
            items_per_page: 10,
          },
        },
      };
      for (const item in data) {
        console.log(item);
      }
    });
  }
}
