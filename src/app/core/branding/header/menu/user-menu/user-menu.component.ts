import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Observable } from 'rxjs';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  public user$ = inject<Observable<IUser>>(USER);

  @Input() content: any[];
  private currentUser: IUser | false;

  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private userService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private uti = inject(UtilitiesService);

  public name = signal<string>('');

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.currentUser = user;
      this.name.set(this.uti.getIndexTitle(user.display_name || 'N'));
    });
    this.userService.userSub$.pipe(takeUntilDestroyed()).subscribe((currentUser: any) => {
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
          .subscribe(state => {
            if (!state) {
              this.userService.logoutUser();
            }
          });
      }
    }
  }

  onLogin(): void {
    const { pathname } = window.location;
    const queryParams = {
      returnUrl: pathname,
    };
    this.userService.openLoginDialog(queryParams);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '380px',
      panelClass: ['close-outside', 'close-icon-white'],
      data: {
        title: '账户设置',
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'user-setting',
            fullWidth: true,
          },
        },
      },
    });
  }
}
