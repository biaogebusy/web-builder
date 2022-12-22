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
import { environment } from 'src/environments/environment';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { DynamicCombsComponent } from '@uiux/combs/dynamic-combs/dynamic-combs/dynamic-combs.component';

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
    private userService: UserService,
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

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout(this.user.logout_token);
  }

  get userLink(): string[] {
    return [environment.drupalProxy ? '/my' : '/me/login'];
  }

  openDialog(dialog: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: dialog.width || '600px',
      data: {
        renderInputComponent: DynamicCombsComponent,
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

  get userPage(): any[] {
    if (environment?.drupalProxy) {
      return ['/my'];
    }
    return [`/me`];
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
