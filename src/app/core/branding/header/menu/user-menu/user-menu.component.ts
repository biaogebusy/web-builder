import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DialogService } from '@core/service/dialog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @Input() content: any[];
  dialogRef: any;
  currentUser: IUser;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public utilities: UtilitiesService,
    public screen: ScreenState,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
    public userService: UserService,
    @Inject(USER) public user: IUser
  ) {
    this.currentUser = user;
    this.userService.userSub$.subscribe((currentUser: any) => {
      // login
      if (currentUser) {
        this.currentUser = currentUser;
        this.cd.detectChanges();
      }
      // logout
      if (!currentUser) {
        this.currentUser.authenticated = false;
        this.cd.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    if (!environment.drupalProxy) {
      if (this.user) {
        this.userService.getLoginState().subscribe((state) => {
          if (!state) {
            this.userService.logouLocalUser();
          }
        });
      }
    }
  }

  logout(): void {
    this.userService.logout(this.user.logout_token);
  }

  openDialog(dialog: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: dialog.width || '600px',
      data: {
        inputData: {
          content: dialog.content,
          actions: dialog.actions,
        },
      },
    });
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('dialog after'));
    this.dialogService.dialogState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (!state) {
          this.dialogRef.close();
        }
      });
    this.dialogService.handlerIframe(this.dialog);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
