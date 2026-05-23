import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { RouteService } from '@core/service/route.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    IconComponent,
    ReqRolesDirective,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
  host: {
    '[class.disabled]': 'content?.disabled ?? false',
  },
})
export class BtnComponent {
  @Input() content: IBtn;
  routeService = inject(RouteService);

  onNav(event: any, content: any): void {
    this.routeService.toNavigate(event, content);
  }
}
