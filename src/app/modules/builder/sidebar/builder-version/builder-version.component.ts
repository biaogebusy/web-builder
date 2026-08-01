import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-version',
  templateUrl: './builder-version.component.html',
  styleUrls: ['./builder-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class BuilderVersionComponent {
  private builder = inject(BuilderState);
  private builderService = inject(BuilderService);

  // 直接读 BuilderState 的 version signal(内存数据源),
  // 避免 localStorage observe 往返造成的历史记录更新不及时
  public version = this.builder.version.asReadonly();

  onDelete(index: number): void {
    this.builder.deleteLocalPage(index);
  }

  onClearHistory(): void {
    this.builder.clearAllHistory();
  }

  onNewPage(): void {
    this.builder.onNewPage();
  }

  onVersion(page: IPage, index: number): void {
    this.builder.switchVersion(page, index);
    this.builderService.checkIsLatestPage(page);
  }

  onClickTitle(event: Event): void {
    event.stopPropagation();
  }

  onUpdateTitle(event: any, index: number): void {
    const {
      target: { textContent },
    } = event;
    if (textContent) {
      this.builder.version.update(list => {
        const next = [...list];
        if (next[index]) {
          next[index] = { ...next[index], title: textContent, dirty: true };
        }
        return next;
      });
      this.builder.saveLocalVersions();
    }
  }
}
