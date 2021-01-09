import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../mobx/user/IUser';
import { UserState } from '../../../mobx/user/UserState';
import { UtilitiesService } from '../../../service/utilities.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userState.user$.subscribe(user => {
      if (!user.authenticated) {
        this.router.navigate(['/login']);
      }
    })
  }

  logout() {
    this.userState.logout();
  }

  ngOnDestroy() {
    this.userState.user$.unsubscribe();
  }

}
