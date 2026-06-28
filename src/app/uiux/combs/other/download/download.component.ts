import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Injector,
  OnInit,
  effect,
  inject,
  input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import type { IDownload } from '@core/interface/widgets/IDownload';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, ICoreDownload, IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@core/service/user.service';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatMenuModule, IconComponent],
})
export class DownloadComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private pageContent = inject(PAGE_CONTENT);
  user = inject(USER);

  readonly content = input.required<IDownload>();
  readonly data = input<any>();
  public config: ICoreDownload;
  public canAccess: boolean;
  private screenService = inject(ScreenService);
  private dialog = inject(MatDialog);
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private injector = inject(Injector);

  constructor() {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig?.actions?.download;
      this.checkAccess(this.data());
    }
  }

  checkAccess(data: any): void {
    effect(() => {
      const page = this.pageContent();
      if (page && typeof page === 'object') {
        const entityId = page.config?.node?.entityId || '';
        const u = this.user();
        this.nodeService
          .checkNodeAccess(data, entityId, u as IUser)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(access => {
            this.canAccess = access.canAccess;
            this.cd.detectChanges();
          });
      }
    }, { injector: this.injector });
  }

  openLogin(): void {
    this.userService.openLoginDialog();
  }
}
