import { Component, Inject, Input, OnInit } from '@angular/core';
import { CORE_CONFIG, BRANDING, USER } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { IBranding } from '@core/interface/IBranding';
import { Observable } from 'rxjs';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './manage-sidebar.component.html',
  styleUrls: ['./manage-sidebar.component.scss'],
})
export class ManageSidebarComponent implements OnInit {
  @Input() content: any;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(USER) public user: IUser,
    public userSerivice: UserService
  ) {}

  ngOnInit(): void {}
}
