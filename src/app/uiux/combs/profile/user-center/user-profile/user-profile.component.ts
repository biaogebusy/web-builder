import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import type { IUserConfig } from '@core/interface/IUserConfig';
import { UserService } from '@core/service/user.service';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatButtonModule, MatIconModule, ImgComponent, BtnComponent],
})
export class UserProfileComponent {
  readonly content = input<any>();
  readonly userConfig$ = input<Observable<IUserConfig>>();
  private userService = inject(UserService);


  logout(): void {
    this.userService.logout();
  }
}
