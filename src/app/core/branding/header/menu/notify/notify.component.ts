import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { NotifyService } from '@core/service/notify.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { NodeService } from '@core/service/node.service';
import type { IUser } from '@core/interface/IUser';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit {
  content: any[] = [];
  apis: any;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser,
    private notifyService: NotifyService,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.apis = this.coreConfig?.notify?.api;
    if (this.apis) {
      const source = interval(
        this.coreConfig?.notify?.params.interval || 2 * 60 * 1000
      );
      source.pipe(startWith(0)).subscribe((time) => {
        this.notifyService.getWatchList().subscribe((res) => {
          for (const item in res) {
            const message = res[item].rows.map((list: any) => {
              return {
                link: {
                  href: list.url,
                  label: list.title,
                },
                icon: {
                  svg: this.apis[item].icon,
                  inline: true,
                },
                message: list.message,
                date: list.date,
                color: this.apis[item].color,
                action: this.apis[item].action,
                uuid: list.uuid,
              };
            });
            this.content = [...message];
          }
          this.cd.detectChanges();
        });
      });
    }
  }

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item], this.user.csrf_token)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
