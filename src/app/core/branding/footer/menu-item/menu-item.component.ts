import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { AccordionMenuComponent } from '../../accordion-menu/accordion-menu.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatListModule,
    MatMenuModule,
    SafeHtmlPipe,
    IconComponent,
    LinkComponent,
    AccordionMenuComponent,
  ],
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
