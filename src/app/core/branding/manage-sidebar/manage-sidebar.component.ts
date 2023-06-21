import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { BRANDING, CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import type { IBranding } from '@core/interface/branding/IBranding';
import { Observable } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './manage-sidebar.component.html',
  styleUrls: ['./manage-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSidebarComponent implements OnInit {
  @Input() drawer: MatDrawer;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    public userService: UserService,
    private screenService: ScreenService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      // init sidebar style
      this.screenService.initSidebarStyle(
        this.storage.retrieve('sidebarOpened')
      );
    }
  }

  onToggle(): void {
    const opened = this.drawer.opened;
    this.drawer.toggle();
    this.screenService.initSidebarStyle(!opened);
    this.storage.store('sidebarOpened', !opened);
  }
}
