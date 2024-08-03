import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
  inject,
  DestroyRef,
} from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DialogService } from '@core/service/dialog.service';
import { Observable, Subject } from 'rxjs';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '@modules/user/login/login.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @Input() content: any[];
  dialogRef: any;
  currentUser: IUser | false;

  utilities = inject(UtilitiesService);
  screen = inject(ScreenState);
  dialog = inject(MatDialog);
  dialogService = inject(DialogService);
  cd = inject(ChangeDetectorRef);
  userService = inject(UserService);
  router = inject(Router);
  storage = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  constructor(@Inject(USER) public user$: Observable<IUser>) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.currentUser = user;
    });
    this.userService.userSub$
      .pipe(takeUntilDestroyed())
      .subscribe((currentUser: any) => {
        // login
        if (currentUser) {
          this.currentUser = currentUser;
          this.cd.detectChanges();
        }
        // logout
        if (!currentUser) {
          this.currentUser = false;
          this.cd.detectChanges();
        }
      });
  }

  ngOnInit(): void {
    if (!environment.drupalProxy) {
      if (this.currentUser && environment.production) {
        this.userService
          .getLoginState()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((state) => {
            if (!state) {
              this.userService.logoutUser();
            }
          });
      }
    }
  }

  logout(): void {
    const logoutToken = this.storage.retrieve(this.userService.logoutToken);
    this.userService.logout(logoutToken);
  }

  onLogin(): void {
    const { pathname } = window.location;
    const queryParams = {
      returnUrl: pathname,
    };
    this.router.navigate([], { queryParams });
    this.dialog.open(LoginComponent);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => console.log('dialog after'));
    this.dialogService.dialogState$
      .pipe(takeUntilDestroyed(this.destroyRef))
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
}
