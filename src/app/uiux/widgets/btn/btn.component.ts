import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  input,
} from '@angular/core';
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
  imports: [MatButtonModule, IconComponent, ReqRolesDirective, ContenteditDirective, SafeHtmlPipe],
  host: {
    '[class.disabled]': 'content()?.disabled ?? false',
  },
})
export class BtnComponent {
  readonly content = input<IBtn>();
  /**
   * Button click output. Whether the button is a plain button without href or a
   * navigation button with href, it emits first and then runs the original
   * RouteService navigation, so consumers can both track and use app-btn as a
   * pure action button (when content has no href, the emit is the only side effect).
   *
   * When disabled, the native button/anchor already blocks click events, so no
   * extra guard is needed.
   */
  readonly btnClick = output<MouseEvent>();

  /**
   * Fallback accessible name for all modes (AXE: button-name / link-name):
   * icon/fab/mini-fab render only an icon, raised/stroked/flat/text labels may be
   * empty or pure HTML (e.g. image only), and CMS data cannot guarantee an
   * ariaLabel. Unified fallback here: ariaLabel -> label (safeHtml-rendered label
   * may carry HTML tags, so strip them) -> icon name.
   */
  readonly ariaLabel = computed(() => {
    const content = this.content();
    if (!content) {
      return null;
    }
    if (content.ariaLabel) {
      return content.ariaLabel;
    }
    const label = String(content.label ?? '')
      .replace(/<[^>]+>/g, ' ')
      .trim();
    return label || content.icon?.svg || content.icon?.name || null;
  });

  routeService = inject(RouteService);

  onNav(event: MouseEvent, content: IBtn): void {
    this.btnClick.emit(event);
    this.routeService.toNavigate(event, content);
  }

  onClick(event: MouseEvent): void {
    this.btnClick.emit(event);
  }
}
