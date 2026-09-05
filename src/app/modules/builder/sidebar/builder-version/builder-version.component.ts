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

  // Read BuilderState's version signal directly (in-memory source) so the history
  // list updates immediately instead of round-tripping through localStorage observe
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
    const title = (event.target.textContent ?? '').trim();
    // Only mark dirty and save when the title actually changed, so focus/blur never flags a synced version as unsaved
    if (title && title !== this.version()[index]?.title) {
      this.builder.version.update(list => {
        const next = [...list];
        if (next[index]) {
          next[index] = { ...next[index], title, dirty: true };
        }
        return next;
      });
      this.builder.saveLocalVersions();
    }
  }
}
