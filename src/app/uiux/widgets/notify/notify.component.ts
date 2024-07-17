import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, NOTIFY_CONTENT, USER } from '@core/token/token-providers';
import { NodeService } from '@core/service/node.service';
import type { IUser } from '@core/interface/IUser';
import { INotify } from '@core/interface/widgets/IWidgets';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit {
  user: IUser;
  nodeService = inject(NodeService);
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) private user$: Observable<IUser>,
    @Inject(NOTIFY_CONTENT) public notify$: Observable<INotify[]>,
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item], this.user.csrf_token)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
