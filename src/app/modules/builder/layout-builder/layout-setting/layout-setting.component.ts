import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep, defaultsDeep, get } from 'lodash-es';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent {
  @Input() content: ILayoutSetting;
  form = new UntypedFormGroup({});
  model: any = {};

  doc = inject(DOCUMENT);
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  cd = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  builderService = inject(BuilderService);

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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data: {
        title: '一键应用动画',
        closeLabel: '确定应用',
        inputData: {
          content: {
            type: 'text',
            fullWidth: true,
            body: '将会把当前AOS的动画配置应用到页面最外层的所有一级组件，已有动画会被覆盖。',
          },
        },
      },
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

  onWidgetPicker(): void {
    // 有layout builder，有普通的组件
    const { content, path } = this.content;
    this.dialog.open(DialogComponent, {
      width: '700px',
      position: { bottom: '20px' },
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'widget-picker',
            content,
            path,
          },
        },
      },
    });

    this.dialog.afterAllClosed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cd.detectChanges();
    });
  }

  editorJSON(): void {
    const { path } = this.content;

    // layout builder level
    if (path) {
      const json: IJsoneditor = {
        type: 'jsoneditor',
        path,
        data: get(this.builder.currentPage.body, path),
      };
      this.dialog.open(DialogComponent, {
        width: '1000px',
        panelClass: ['close-outside', 'close-icon-white'],
        data: {
          disableCloseButton: true,
          inputData: {
            content: json,
          },
        },
      });
    }
  }

  editorCode(): void {
    const { path } = this.content;
    let dialogRef: any;
    let builderList: any;
    if (path && this.content.content.type === 'custom-template') {
      dialogRef = this.dialog.open(DialogComponent, {
        width: '85vw',
        hasBackdrop: false,
        panelClass: 'close-outside',
        position: {
          bottom: '0px',
        },
        data: {
          disableCloseButton: true,
          inputData: {
            content: {
              type: 'code-editor',
              path,
              content: get(this.builder.currentPage.body, path),
            },
          },
        },
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

      dialogRef
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          builderList.style.paddingBottom = '150px';
          this.builder.fullScreen$.next(false);
        });
    }
  }
}
