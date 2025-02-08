import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IDownload } from '@core/interface/widgets/IDownload';
import { ScreenService } from '@core/service/screen.service';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, ICoreDownload, IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);
  user$ = inject<Observable<IUser>>(USER);

  @Input() content: IDownload;
  @Input() data: any;
  config: ICoreDownload;
  canAccess: boolean;
  isReqRoles: boolean;
  user: IUser;

  screenService = inject(ScreenService);
  dialog = inject(MatDialog);
  nodeService = inject(NodeService);
  cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig?.actions?.download;
      this.checkAccess(this.data);
    }
  }

  checkAccess(data: any): void {
    this.pageContent$.subscribe(page => {
      const entityId = page.config?.node?.entityId || '';
      this.nodeService
        .checkNodeAccess(data, entityId, this.user)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(access => {
          this.canAccess = access.canAccess;
          this.isReqRoles = access.isReqRoles;
          this.cd.detectChanges();
        });
    });
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.log('dialog close!');
      });
  }
}
