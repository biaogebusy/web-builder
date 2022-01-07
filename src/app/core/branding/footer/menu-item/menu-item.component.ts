import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
  @Input() content: any;
  @Input() mobileMenu: any;
  showXs: boolean;
  constructor(
    private screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe((alia) => {
        this.showXs = alia.includes('xs');
        this.cd.detectChanges();
      });
    }
  }
}
