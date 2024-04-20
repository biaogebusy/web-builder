import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep, defaultsDeep, get } from 'lodash-es';
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

  onModelChange(value: any): void {
    const { path } = this.content;
    const { block } = value;
    this.renderLayoutPreview(block);
    let content: any = {};
    Object.keys(value).forEach((config) => {
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
    moveItemInArray(
      this.content.content.elements,
      event.previousIndex,
      event.currentIndex
    );
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

    // layout builder level
    if (path) {
      const json: IJsoneditor = {
        type: 'jsoneditor',
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
