import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IDownload } from '@core/interface/widgets/IDownload';
import { ScreenService } from '@core/service/screen.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { UserState } from '@core/mobx/user/UserState';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';

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
  config: any;
  canAccess: boolean;
  isPayed: boolean;
  isReqRule: boolean;
  payUrl: string;
  reqMoney: number;
  constructor(
    private screenService: ScreenService,
    private dialog: MatDialog,
    private nodeService: NodeService,
    public userState: UserState,
    private cd: ChangeDetectorRef,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig?.actions?.download;
      this.checkAccess(this.data);
    }
  }

  checkAccess(data: any): void {
    this.nodeService.checkNodeAccess(data).subscribe((access) => {
      this.canAccess = access.canAccess;
      this.isReqRule = access.isReqRule;
      this.isPayed = access.isPayed;
      this.payUrl = access.payUrl;
      this.reqMoney = access.reqMoney;
      this.cd.detectChanges();
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
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
