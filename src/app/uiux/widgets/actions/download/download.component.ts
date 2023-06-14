import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import type { IDownload } from '@core/interface/widgets/IDownload';
import { ScreenService } from '@core/service/screen.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type {
  ICoreConfig,
  ICoreDownload,
  IPage,
} from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadComponent implements OnInit, OnDestroy {
  @Input() content: IDownload;
  @Input() data: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  config: ICoreDownload;
  canAccess: boolean;
  isReqRoles: boolean;
  constructor(
    private screenService: ScreenService,
    private dialog: MatDialog,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>,
    @Inject(USER) public user: IUser
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig?.actions?.download;
      this.checkAccess(this.data);
    }
  }

  checkAccess(data: any): void {
    this.pageContent$.subscribe((page) => {
      const entityId = page.config?.node?.entityId || '';
      this.nodeService
        .checkNodeAccess(data, entityId, this.user)
        .subscribe((access) => {
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('dialog close!');
      });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
