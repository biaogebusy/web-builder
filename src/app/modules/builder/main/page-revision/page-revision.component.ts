import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import type { IPageRevision, IPageRevisionPanel } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { BuilderState } from '@core/state/BuilderState';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import {
  RevisionDiffComponent,
  type IRevisionDiffData,
} from './revision-diff/revision-diff.component';

/** Revision with the timestamp converted to milliseconds, which is what the date pipe expects */
type IPageRevisionRow = IPageRevision & { time: number };

/** Two revisions make a comparison, so the checkboxes stop accepting a third */
const COMPARE_COUNT = 2;

@Component({
  selector: 'app-page-revision',
  templateUrl: './page-revision.component.html',
  styleUrl: './page-revision.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, MatCheckboxModule],
})
export class PageRevisionComponent implements OnInit {
  readonly content = input.required<IPageRevisionPanel>();

  readonly revisions = signal<IPageRevisionRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  /** The list request was rejected as unauthorized, so signing in is the only way forward */
  readonly forbidden = signal(false);
  /** Revision ids ticked for comparison, in the order they were picked */
  readonly selectedVids = signal<string[]>([]);
  readonly canCompare = computed(() => this.selectedVids().length === COMPARE_COUNT);


  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private builderService = inject(BuilderService);
  private screenService = inject(ScreenService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.load();
    }
    // Any save adds a revision, so the list has to be refetched to stay in sync while it is open
    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.load();
    });
  }

  load(): void {
    const { nid, langcode } = this.content().content;
    this.loading.set(true);
    this.error.set(false);
    this.forbidden.set(false);
    this.selectedVids.set([]);
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
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          if (err.status === 403) {
            this.forbidden.set(true);
            return;
          }
          this.error.set(true);
        },
      });
  }

  /** Reload once the dialog reports a successful login, so the list appears without a click */
  async openLogin(): Promise<void> {
    const dialogRef = await this.userService.openLoginDialog();
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.load();
        }
      });
  }

  isSelected(vid: string): boolean {
    return this.selectedVids().includes(vid);
  }

  toggleCompare(vid: string): void {
    this.selectedVids.update(vids =>
      vids.includes(vid) ? vids.filter(item => item !== vid) : [...vids, vid]
    );
  }

  /**
   * Open the diff with the older revision on the left, whichever order the two were ticked in, so
   * the comparison always reads as what changed over time.
   */
  onCompare(): void {
    const [original, modified] = this.revisions()
      .filter(revision => this.isSelected(revision.vid))
      .sort((a, b) => a.time - b.time);
    const { nid, langcode, title } = this.content().content;
    const data: IRevisionDiffData = {
      nid,
      langcode,
      title,
      original: { vid: original.vid, time: original.time },
      modified: { vid: modified.vid, time: modified.time },
    };
    this.dialog.open(RevisionDiffComponent, {
      data,
      width: '92vw',
      maxWidth: '1400px',
      height: '86vh',
    });
  }

  /** Previewing replaces the draft content, so an unsaved draft is only overwritten on purpose */
  onRevision(revision: IPageRevisionRow): void {
    const { nid, langcode } = this.content().content;
    if (!this.builder.isPageDirty({ nid, langcode })) {
      this.builderService.loadPageRevision({ nid, langcode, vid: revision.vid });
      return;
    }
    const config: IDialog = {
      title: this.translate.instant('BUILDER.REVISION.PREVIEW_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.REVISION.PREVIEW_YES'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.REVISION.PREVIEW_CONFIRM', {
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
