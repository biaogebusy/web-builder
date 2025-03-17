import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MenuItemComponent implements OnInit {
  @Input() content: any;
  @Input() mobileMenu: any;
  showXs: boolean;
  private screen = inject(ScreenState);
  private cd = inject(ChangeDetectorRef);
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe(alia => {
        this.showXs = alia.includes('xs');
        this.cd.detectChanges();
      });
    }
  }
}
