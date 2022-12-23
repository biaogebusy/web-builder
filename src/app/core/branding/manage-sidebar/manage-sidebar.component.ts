import { Component, Inject, Input, OnInit } from '@angular/core';
import { BRANDING, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { IBranding } from '@core/interface/IBranding';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './manage-sidebar.component.html',
  styleUrls: ['./manage-sidebar.component.scss'],
})
export class ManageSidebarComponent implements OnInit {
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    public userSerivice: UserService,
    @Inject(BRANDING) public branding$: Observable<IBranding>
  ) {}

  ngOnInit(): void {}
}
