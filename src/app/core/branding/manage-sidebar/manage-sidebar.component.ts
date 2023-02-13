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
import type { IBranding } from '@core/interface/IBranding';
import { Observable } from 'rxjs';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-manage-sidebar',
  templateUrl: './manage-sidebar.component.html',
  styleUrls: ['./manage-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSidebarComponent implements OnInit {
  @Input() opened: boolean;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    public userService: UserService,
    private screenState: ScreenState,
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
    this.screenState.toggleSidebarDrawer();
    this.screenService.initSidebarStyle(!this.opened);
  }
}
