import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import type { IPage } from '@core/interface/IAppConfig';
import { MONACO_EDITOR_CONFIG_PROVIDER } from '@core/config/monaco-editor.config';
import { BuilderService } from '@core/service/builder.service';
import { getTitle } from '@core/util/builder-page.util';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { omit } from 'lodash-es';
import { DiffEditorComponent, type DiffEditorModel } from 'ngx-monaco-editor-v2';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

/** One side of the comparison */
export interface IRevisionDiffSide {
  vid: string;
  /** Revision time in milliseconds */
  time: number;
}

/** Payload the revision list hands to the diff dialog */
export interface IRevisionDiffData {
  nid: string;
  langcode?: string;
  /** Page title, so the dialog names what is being compared */
  title: string;
  /** Older revision, rendered on the left */
  original: IRevisionDiffSide;
  /** Newer revision, rendered on the right */
  modified: IRevisionDiffSide;
}

// Response and revision metadata differs between any two revisions by definition
const VOLATILE_KEYS = [
  'status',
  'message',
  'uuid',
  'vid',
  'changed',
  'current',
  'time',
  'dirty',
  'revisionVid',
];

/**
 * Serialize a revision to the text that gets compared.
 *
 * Each body block is unwrapped from its `attributes.body` envelope because every save writes new
 * block ids, and comparing the envelopes would report all blocks as changed on every revision.
 */
export function toRevisionDiffText(page: IPage): string {
  const body = (page.body ?? []).map((block: any) => block?.attributes?.body ?? block);
  return JSON.stringify(
    { ...omit(page, VOLATILE_KEYS), title: getTitle(page.title), body },
    null,
    2
  );
}

@Component({
  selector: 'app-revision-diff',
  templateUrl: './revision-diff.component.html',
  styleUrl: './revision-diff.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MONACO_EDITOR_CONFIG_PROVIDER],
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, DiffEditorComponent],
})
export class RevisionDiffComponent implements OnInit {
  readonly data = inject<IRevisionDiffData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<RevisionDiffComponent>);

  readonly loading = signal(true);
  readonly error = signal(false);
  /** Both revisions serialize to the same text, which the diff editor renders as a blank result */
  readonly identical = signal(false);
  /**
   * Both models at once: the diff editor throws when it initializes with only one of them, so it
   * may not be rendered before the two requests have resolved.
   */
  readonly models = signal<{ original: DiffEditorModel; modified: DiffEditorModel } | null>(null);

  readonly diffOptions = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true,
    readOnly: true,
    renderSideBySide: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    fontSize: 13,
  };

  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const { nid, langcode, original, modified } = this.data;
    this.loading.set(true);
    this.error.set(false);
    forkJoin([
      this.builderService.getPageRevision({ nid, langcode, vid: original.vid }),
      this.builderService.getPageRevision({ nid, langcode, vid: modified.vid }),
    ])
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([left, right]) => {
          this.loading.set(false);
          if (!left?.status || !right?.status) {
            this.error.set(true);
            return;
          }
          const originalCode = toRevisionDiffText(left);
          const modifiedCode = toRevisionDiffText(right);
          this.identical.set(originalCode === modifiedCode);
          this.models.set({
            original: { code: originalCode, language: 'json' },
            modified: { code: modifiedCode, language: 'json' },
          });
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        },
      });
  }
}
