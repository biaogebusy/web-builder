import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TOOLBAR_TOOLTIP_ABOVE, ToolbarKeynavDirective } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

/**
 * 画布图片的悬浮操作条,由 InlineImageService 动态创建并定位在选中图片上方。
 * 动作经 output 交给服务执行(写回/媒体库/上传),组件自身不持有业务状态,
 * 也不反向注入服务,避免与服务文件形成模块循环
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inline-image-bar',
  templateUrl: './inline-image-bar.component.html',
  styleUrl: './inline-image-bar.component.scss',
  providers: [TOOLBAR_TOOLTIP_ABOVE],
  imports: [TranslateModule, MatTooltipModule, BtnComponent, ToolbarKeynavDirective],
})
export class InlineImageBarComponent {
  /** 当前选中的图片;为空时整条隐藏 */
  readonly img = input<HTMLImageElement | null>(null);

  readonly upload = output<void>();
  readonly library = output<void>();
  readonly altApply = output<string>();
  readonly clearStyles = output<void>();
  readonly more = output<void>();
  readonly closed = output<void>();

  private readonly altInput = viewChild<ElementRef<HTMLInputElement>>('altInput');
  private injector = inject(Injector);

  public altPanelOpen = signal(false);
  public altValue = signal('');

  constructor() {
    // 切换选中图片时收起 ALT 输入行,并带入该图片当前的替代文本
    effect(() => {
      const img = this.img();
      this.altPanelOpen.set(false);
      this.altValue.set(img?.getAttribute('alt') ?? '');
    });
  }

  toggleAltPanel(): void {
    this.altPanelOpen.update(open => !open);
    if (this.altPanelOpen()) {
      afterNextRender(() => this.altInput()?.nativeElement.select(), { injector: this.injector });
    }
  }

  applyAlt(value: string): void {
    this.altApply.emit(value.trim());
    this.altPanelOpen.set(false);
  }
}
