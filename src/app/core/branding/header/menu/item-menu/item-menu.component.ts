import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type {
  IHeaderParams,
  IMainMenu,
} from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMenuComponent implements OnInit {
  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  isMegaMenu: boolean;

  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu = !!this.params?.isMegaMenu;
    }
  }
}
