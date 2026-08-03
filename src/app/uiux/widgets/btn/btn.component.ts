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
   * 按钮点击输出。无论按钮是"无 href 纯按钮"还是"带 href 的导航按钮",
   * 都会先 emit 再走原有的 RouteService 导航逻辑,让消费者既能做 tracking
   * 又能把 app-btn 当成纯动作按钮(content 不带 href 时,emit 是唯一副作用)。
   *
   * Disabled 状态下原生 button/anchor 已经会阻止点击事件,因此无需额外保护。
   */
  readonly btnClick = output<MouseEvent>();

  /**
   * 所有模式的无障碍名称兜底(AXE: button-name / link-name):
   * icon/fab/mini-fab 只渲染图标,raised/stroked/flat/text 的 label 也可能为空或纯
   * HTML(如仅图片),CMS 数据又无法保证带 ariaLabel,这里统一兜底:
   * ariaLabel → label(label 经 safeHtml 渲染可能带 HTML 标签,需去掉)→ 图标名。
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
