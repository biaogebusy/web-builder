import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  signal,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IDialog } from '@core/interface/IDialog';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class UserMenuComponent {
  public user = inject(USER);

  readonly content = input<any[]>();

  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  public name = signal<string>('');

  constructor() {}

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
