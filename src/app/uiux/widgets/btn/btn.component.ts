import { ChangeDetectionStrategy, Component, Input, inject, output } from '@angular/core';
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
    '[class.disabled]': 'content?.disabled ?? false',
  },
})
export class BtnComponent {
  @Input() content: IBtn;
  /**
   * 按钮点击输出。无论按钮是"无 href 纯按钮"还是"带 href 的导航按钮",
   * 都会先 emit 再走原有的 RouteService 导航逻辑,让消费者既能做 tracking
   * 又能把 app-btn 当成纯动作按钮(content 不带 href 时,emit 是唯一副作用)。
   *
   * Disabled 状态下原生 button/anchor 已经会阻止点击事件,因此无需额外保护。
   */
  readonly btnClick = output<MouseEvent>();

  routeService = inject(RouteService);

  onNav(event: MouseEvent, content: IBtn): void {
    this.btnClick.emit(event);
    this.routeService.toNavigate(event, content);
  }

  onClick(event: MouseEvent): void {
    this.btnClick.emit(event);
  }
}
