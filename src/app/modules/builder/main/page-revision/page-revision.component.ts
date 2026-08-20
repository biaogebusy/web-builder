import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import type { IPageRevision, IPageRevisionPanel } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';

/** Revision with the timestamp converted to milliseconds, which is what the date pipe expects */
type IPageRevisionRow = IPageRevision & { time: number };

@Component({
  selector: 'app-page-revision',
  templateUrl: './page-revision.component.html',
  styleUrl: './page-revision.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class PageRevisionComponent implements OnInit {
  readonly content = input.required<IPageRevisionPanel>();

  readonly revisions = signal<IPageRevisionRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private builderService = inject(BuilderService);
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.load();
    }
  }

  load(): void {
    const { nid, langcode } = this.content().content;
    this.loading.set(true);
    this.error.set(false);
    this.builderService
      .getPageRevisions({ nid, langcode })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.loading.set(false);
          if (!res?.status) {
            this.error.set(true);
            return;
          }
          this.revisions.set(
            (res.revisions ?? []).map(revision => ({
              ...revision,
              time: Number(revision.changed) * 1000,
            }))
          );
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        },
      });
  }

  /** Restoring replaces the draft content, so an unsaved draft is only overwritten on purpose */
  onRevision(revision: IPageRevisionRow): void {
    const { nid, langcode } = this.content().content;
    if (!this.builder.isPageDirty({ nid, langcode })) {
      this.builderService.loadPageRevision({ nid, langcode, vid: revision.vid });
      return;
    }
    const config: IDialog = {
      title: this.translate.instant('BUILDER.REVISION.RESTORE_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.REVISION.RESTORE_YES'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.REVISION.RESTORE_CONFIRM', {
            title: this.content().content.title,
          }),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.builderService.loadPageRevision({ nid, langcode, vid: revision.vid });
        }
      });
  }
}
