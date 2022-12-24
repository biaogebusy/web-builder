import { Component, Inject, Input, OnInit } from '@angular/core';
import { BRANDING, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { IBranding } from '@core/interface/IBranding';
import { Observable } from 'rxjs';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './manage-sidebar.component.html',
  styleUrls: ['./manage-sidebar.component.scss'],
})
export class ManageSidebarComponent implements OnInit {
  @Input() opened: boolean;
  main: any;
  sidebar: any;
  container: any;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(DOCUMENT) private doc: Document,
    public userService: UserService,
    private screenState: ScreenState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.main = this.doc.getElementById('main-container');
      this.sidebar = this.doc.getElementById('sidebar');
      this.container = this.sidebar.getElementsByClassName(
        'mat-drawer-inner-container'
      )[0];
      this.screenState.sidebarDrawer$.subscribe(() => {});
    }
  }

  onToggle(): void {
    this.screenState.toggleSidebarDrawer();
    if (this.opened) {
      this.main.style.paddingLeft = '80px';
      this.sidebar.style.overflow = 'visible';
      this.container.style.overflow = 'visible';
    } else {
      this.main.style.paddingLeft = '0';
      this.sidebar.style.overflow = 'auto';
      this.container.style.overflow = 'auto';
    }
  }
}
