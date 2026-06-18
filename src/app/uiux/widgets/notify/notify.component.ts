import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { INotify } from '@core/interface/widgets/IWidgets';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG, NOTIFY_CONTENT } from '@core/token/token-providers';
import { NgPipesModule } from 'ngx-pipes';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatBadgeModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    NgPipesModule,
    IconComponent,
    LinkComponent,
  ],
})
export class NotifyComponent {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public notify = inject(NOTIFY_CONTENT);
  public lists = computed(() => {
    const v = this.notify();
    return Array.isArray(v) ? v : undefined;
  });

  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);

  onRead(item: any): void {
    this.nodeService
      .deleteFlagging(item.action, [item])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
