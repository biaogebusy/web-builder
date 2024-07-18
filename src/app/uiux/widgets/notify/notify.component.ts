import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, NOTIFY_CONTENT, USER } from '@core/token/token-providers';
import { NodeService } from '@core/service/node.service';
import type { IUser } from '@core/interface/IUser';
import { INotify } from '@core/interface/widgets/IWidgets';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit, OnDestroy {
  user: IUser;
  destroy$: Subject<boolean> = new Subject<boolean>();

  nodeService = inject(NodeService);
  constructor(
    @Inject(USER) private user$: Observable<IUser>,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(NOTIFY_CONTENT) public notify$: Observable<INotify[]>,
  ) {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item], this.user.csrf_token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
