import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../mobx/user/IUser';
import { UserState } from '../../../mobx/user/UserState';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public userState: UserState,
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

  getIndexTitle(title: string) {
    return title.substring(0, 1);
  }

}
