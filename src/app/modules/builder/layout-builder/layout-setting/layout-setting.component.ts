import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, DestroyRef, Input, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep, defaultsDeep, get } from 'lodash-es';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  standalone: false,
})
export class LayoutSettingComponent {
  @Input() content: ILayoutSetting;
  public model: any = {};

  private doc = inject(DOCUMENT);
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);

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
      title: '一键应用动画',
      noLabel: '取消',
      yesLabel: '确定应用',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: '将会把当前AOS的动画配置应用到页面最外层的所有一级组件，已有动画会被覆盖。',
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
    const { path } = this.content;
    let dialogRef: any;
    let builderList: any;
    if (path && this.content.content.type === 'custom-template') {
      const config: IDialog = {
        disableActions: true,
        inputData: {
          content: {
            type: 'code-editor',
            path,
            content: get(this.builder.currentPage.body, path),
            fullWidth: true,
          },
        },
      };

      dialogRef = this.dialog.open(DialogComponent, {
        width: '85vw',
        hasBackdrop: false,
        panelClass: ['close-outside', 'code-editor-dialog'],
        position: {
          bottom: '0px',
        },
        id: 'code-editor-dialog',
        data: config,
      });

      dialogRef
        .afterOpened()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          builderList = this.doc.querySelector('#builder-list');
          builderList.style.paddingBottom = '500px';
          this.builder.fullScreen$.next(true);
          this.builder.closeRightDrawer$.next(true);
        });

      dialogRef.afterClosed().subscribe(() => {
        builderList.style.paddingBottom = '150px';
        this.builder.fullScreen$.next(false);
      });
    }
  }
}
