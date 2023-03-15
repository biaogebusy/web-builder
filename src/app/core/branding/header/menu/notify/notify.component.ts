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
      this.content = [
        {
          title: '测试11',
          date: '2023/03/14 15:30:10',
        },
        {
          title: '测试12',
          date: '2023/03/14 15:30:10',
        },
      ];
    });
  }
}
