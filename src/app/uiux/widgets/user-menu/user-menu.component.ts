import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Observable } from 'rxjs';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { IDialog } from '@core/interface/IDialog';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserMenuComponent {
  public user$ = inject<Observable<IUser>>(USER);

  @Input() content: any[];

  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private userService = inject(UserService);
  private uti = inject(UtilitiesService);

  public name = signal<string>('');

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.name.set(this.uti.getIndexTitle(user.display_name || 'N'));
    });
  }

  onLogin(): void {
    this.userService.openLoginDialog();
  }

  openDialog(): void {
    const config: IDialog = {
      title: '账户设置',
      disableActions: true,
      inputData: {
        content: {
          type: 'user-setting',
          fullWidth: true,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '380px',
      panelClass: ['close-outside', 'close-icon-white'],
      data: config,
    });
  }
}
