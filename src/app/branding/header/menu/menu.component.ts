import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../mobx/user/IUser';
import { UserState } from '../../../mobx/user/UserState';
import { UtilitiesService } from '../../../service/utilities.service';
import { ScreenState } from '../../../mobx/screen/ScreenState.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isOpened = false;
  @Input() isDrawer: boolean;
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    private router: Router,
    public screen: ScreenState
  ) {}

  ngOnInit(): void {
    this.userState.user$.subscribe((user) => {
      if (!user.authenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.userState.logout();
  }

  ngOnDestroy() {
    this.userState.user$.unsubscribe();
  }

  onToggle(): void {
    this.isOpened = !this.isOpened;
    this.screen.toggleDrawer(this.isOpened);
  }
}
