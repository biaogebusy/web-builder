import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { IHeaderParams, IMainMenu } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMenuComponent implements OnInit {
  private screenService = inject(ScreenService);

  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  isMegaMenu: boolean;

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu = !!this.params?.isMegaMenu;
    }
  }
}
