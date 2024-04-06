import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { defaultsDeep, get, isNumber } from 'lodash-es';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnDestroy {
  @Input() content: ILayoutSetting;
  form = new FormGroup({});
  model: any = {};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private builder: BuilderState,
    private dialog: MatDialog,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  onModelChange(value: any) {
    const { block } = value;

    this.renderLayoutPreview(block);
    let content: any = {};
    Object.keys(value).forEach((config) => {
      if (config) {
        content = defaultsDeep(value[config], this.content.content);
      }
    });
    this.emitLayoutSetting(content);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.content.content.elements,
      event.previousIndex,
      event.currentIndex
    );

    this.emitLayoutSetting(this.content.content);
  }

  emitLayoutSetting(content: any): void {
    this.builder.builderLayoutSetting$.next({
      value: content,
      pageIndex: this.content.pageIndex,
      uuid: this.content.uuid,
      path: this.content.path,
    });
  }

  onCopy(content: any, i: number): void {
    this.content.content.elements.splice(i, 0, content);
    this.emitLayoutSetting(this.content.content);
  }

  onDelete(index: number): void {
    this.content.content.elements.splice(index, 1);
    this.emitLayoutSetting(this.content.content);
  }

  onAddLoopElement(content: any): void {
    // 有layout builder，有普通的组件
    this.dialog.open(DialogComponent, {
      width: '700px',
      position: { bottom: '20px' },
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'widget-picker',
            pageIndex: this.content.pageIndex,
            content,
            level: 'block',
            uuid: this.content.uuid,
          },
        },
      },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  renderLayoutPreview(block: any): void {
    const box = this.el.nativeElement.querySelector('.wrapper');
    if (block && box) {
      const { direction, horizontal, vertical } = block;
      box.style.justifyContent = horizontal;
      box.style.alignItems = vertical;
      box.style.alignContent = vertical;
      box.style.flexDirection = direction;
    }
  }

  showCode(): void {
    const { pageIndex, path } = this.content;
    // builder list 一级组件
    if (pageIndex !== undefined) {
      if (isNumber(pageIndex)) {
        const json: IJsoneditor = {
          type: 'jsoneditor',
          pageIndex,
          isPreview: true,
          data: this.builder.currentPage.body[pageIndex],
        };
        this.dialog.open(DialogComponent, {
          width: '1000px',
          data: {
            inputData: {
              content: json,
            },
          },
        });
      }
    }

    // layout builder level
    if (path) {
      const json: IJsoneditor = {
        type: 'jsoneditor',
        pageIndex: undefined,
        isLayoutWidget: true,
        path,
        data: get(this.builder.currentPage.body, path),
      };
      this.dialog.open(DialogComponent, {
        width: '1000px',
        data: {
          inputData: {
            content: json,
          },
        },
      });
    }
  }

  isLayoutWidget(i: number | undefined, index: number | undefined): boolean {
    return i !== undefined && i >= 0 && index !== undefined && index >= 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
