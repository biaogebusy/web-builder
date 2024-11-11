import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit {
  user: IUser;

  nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  constructor(
    @Inject(USER) private user$: Observable<IUser>,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(NOTIFY_CONTENT) public notify$: Observable<INotify[]>
  ) {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item], this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log(res);
      });
  }
}
