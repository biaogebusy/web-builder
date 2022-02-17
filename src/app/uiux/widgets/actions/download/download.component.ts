import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IDownload } from '@core/interface/widgets/IDownload';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  constructor(
    public appState: AppState,
    private screenService: ScreenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.appState?.actions?.download;
    }
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
