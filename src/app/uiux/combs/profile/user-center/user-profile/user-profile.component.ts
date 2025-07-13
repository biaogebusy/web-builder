import { Component, OnInit, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { IUserConfig } from '@core/interface/IUserConfig';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  @Input() content: any;
  @Input() userConfig$: Observable<IUserConfig>;
  private userService = inject(UserService);

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout();
  }
}
