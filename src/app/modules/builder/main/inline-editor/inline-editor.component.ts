import { buildMediaDialogConfig } from '@core/util/media-dialog';
import { ChangeDetectionStrategy, Component, inject, input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import type { IMetaEdit } from '@core/interface/IBuilder';
import type { IImg } from '@core/interface/widgets/IImg';
import type { FormlyFormOptions } from '@ngx-formly/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '@core/service/manage.service';
import { get } from 'lodash-es';

interface ImageFormModel {
  src?: string;
  style?: Record<string, unknown>;
}

/**
 * Right-side property panel for inline editing in the canvas. Only image (mode: 'img') editing
 * remains; the text mode is retired — formatting and text styles are handled by the tiptap
 * bubble toolbar (InlineEditorService), element-level styles go through component settings
 */
@Component({
  selector: 'app-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS],
})
export class InlineEditComponent implements OnChanges {
  /** Selected canvas image and the fields used by its property form. */
  readonly content = input.required<IMetaEdit>();
  form = new UntypedFormGroup({});
  model: ImageFormModel = {};
  options: FormlyFormOptions = {};

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private manageService = inject(ManageService);
  private selectionActive = true;
  private resettingForm = false;

  constructor() {
    this.builder.pageSelection$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.selectionActive = false;
      this.builder.closeRightDrawer$.next(true);
    });
  }

  /** A new image starts a separate form, even when the panel instance is reused. */
  ngOnChanges(): void {
    this.form = new UntypedFormGroup({});
    this.model = {};
    this.options = {};
    this.selectionActive = true;
  }

  /** Clear both the saved styles and the values that subsequent form edits will submit. */
  onClear(): void {
    const target = this.imageTarget();
    if (!target) {
      return;
    }
    const style = Object.fromEntries(Object.entries(this.model.style ?? {}).map(([key, value]) =>
      [key, key === 'width' || key === 'height' ? value : '']));
    // Formly resets emit control changes; persist only the complete cleared image below.
    this.resettingForm = true;
    try {
      this.options.resetModel?.({ ...this.model, style });
    } finally {
      this.resettingForm = false;
    }
    this.builder.updatePageContentByPath(target.path, { ...target.image, style: {} });
  }

  /** Open the existing media picker for this image form. */
  openMedias(): void {
    this.dialog.open(
      DialogComponent,
      buildMediaDialogConfig(
        { purpose: 'web-image' },
        {
          width: '100%',
          panelClass: this.manageService.mediaDialogClass,
        }
      )
    );
  }

  /** Save valid properties together, preserving dimensions during incomplete numeric input. */
  onModelChange(value: ImageFormModel): void {
    const target = this.imageTarget();
    if (!target || this.resettingForm) {
      return;
    }
    const style: Record<string, unknown> = { ...target.image.style };
    const image = { ...target.image, style };
    for (const [key, fieldValue] of Object.entries(value.style ?? {})) {
      if (key === 'width' || key === 'height') {
        const dimension = typeof fieldValue === 'string' ? Number(fieldValue) : fieldValue;
        if (typeof dimension === 'number' && Number.isSafeInteger(dimension) && dimension > 0) {
          image[key] = dimension;
        }
        delete image.style[key];
      } else if (fieldValue === '' || fieldValue === null || fieldValue === undefined) {
        delete image.style[key];
      } else {
        image.style[key] = fieldValue;
      }
    }
    if (typeof value.src === 'string') {
      image.src = value.src;
    }
    this.builder.updatePageContentByPath(target.path, image);
  }

  private imageTarget(): { path: string; image: IImg } | undefined {
    const content = this.content();
    if (!this.selectionActive || content.mode !== 'img') {
      return undefined;
    }
    const path = content.path.substring(0, content.path.lastIndexOf('.'));
    const image: IImg | undefined = get(this.builder.currentPage.body, path);
    return image && typeof image.src === 'string' ? { path, image } : undefined;
  }
}
