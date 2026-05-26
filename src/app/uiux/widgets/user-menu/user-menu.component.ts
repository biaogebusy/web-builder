import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  signal,
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
  imports: [AsyncPipe, MatButtonModule, MatIconModule],
})
export class UserMenuComponent {
  public user$ = inject<Observable<IUser>>(USER);

  @Input() content: any[];

  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  public name = signal<string>('');

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.name.set((user.display_name || 'N').substring(0, 1));
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
