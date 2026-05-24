import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, DestroyRef, Input, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, defaultsDeep, get } from 'lodash-es';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  imports: [ShareModule, WidgetsModule, FormModule, DragDropModule],
})
export class LayoutSettingComponent {
  @Input() content: ILayoutSetting;
  public model: any = {};

  private doc = inject(DOCUMENT);
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  onModelChange(value: any): void {
    const { path } = this.content;
    let content: any = {};
    Object.keys(value).forEach(config => {
      if (config) {
        content = defaultsDeep(value[config], this.content.content);
      }
    });
    if (path) {
      this.builder.updatePageContentByPath(path, content);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    const { path, content } = this.content;
    moveItemInArray(this.content.content.elements, event.previousIndex, event.currentIndex);
    if (path) {
      this.builder.updatePageContentByPath(path, content);
    }
  }

  onCopy(elements: any[], index: number): void {
    const lists = [...elements];
    const path = this.content.path;
    lists.splice(index, 0, cloneDeep(lists[index]));
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
  }

  onDelete(elements: any[], index: number): void {
    const lists = [...elements];
    const path = this.content.path;
    lists.splice(index, 1);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
  }

  applyAosAllTopComponent(animate: any): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.LAYOUT_SETTING.APPLY_ALL_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.COMMON.CONFIRM_APPLY'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.LAYOUT_SETTING.APPLY_ALL_BODY'),
        },
      },
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data: config,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.builder.bulkUpdateComponent({ animate });
        }
      });
  }

  editorJSON(): void {
    const {
      path,
      content: { type },
    } = this.content;
    // layout builder level
    if (path) {
      const jsonWidget: IJsoneditor = {
        type: 'jsoneditor',
        path,
        fullWidth: true,
        schemaType: type,
        data: get(this.builder.currentPage.body, path),
      };
      const config: IDialog = {
        disableActions: true,
        inputData: {
          content: jsonWidget,
        },
      };
      this.dialog.open(DialogComponent, {
        width: '1000px',
        panelClass: ['close-outside', 'close-icon-white'],
        data: config,
      });
      this.builder.closeRightDrawer$.next(true);
    }
  }

  editorCode(): void {
    this.builder.editorCode(this.content);
  }
}
