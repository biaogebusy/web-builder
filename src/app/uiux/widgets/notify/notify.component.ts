import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, NOTIFY_CONTENT } from '@core/token/token-providers';
import { NodeService } from '@core/service/node.service';
import { INotify } from '@core/interface/widgets/IWidgets';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotifyComponent {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public notify$ = inject<Observable<INotify[]>>(NOTIFY_CONTENT);

  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log(res);
      });
  }
}
