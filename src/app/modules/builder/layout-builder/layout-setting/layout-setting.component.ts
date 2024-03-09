import {
  ChangeDetectionStrategy,
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
import { defaultsDeep, isNumber } from 'lodash-es';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit, OnDestroy {
  @Input() content: ILayoutSetting;
  form = new FormGroup({});
  model: any = {};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private builder: BuilderState,
    private dialog: MatDialog,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  onModelChange(value: any) {
    const { block } = value;

    this.renderLayoutPreview(block);
    let content: any = {};
    Object.keys(value).forEach((config) => {
      if (config) {
        content = defaultsDeep(value[config], this.content.content);
      }
    });
    this.builder.builderLayoutSetting$.next({
      value: content,
      i: this.content.i,
      index: this.content.index,
      pageIndex: this.content.pageIndex,
      uuid: this.content.uuid,
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
    const { i, index, pageIndex } = this.content;
    // builder list 一级组件
    if (!this.isLayoutWidget(i, pageIndex)) {
      if (isNumber(this.content.pageIndex)) {
        const json: IJsoneditor = {
          type: 'jsoneditor',
          index: this.content.pageIndex,
          isPreview: true,
          data: this.builder.currentPage.body[this.content.pageIndex],
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

    // layout builder widget
    if (this.isLayoutWidget(i, index)) {
      if (
        isNumber(pageIndex) &&
        isNumber(i) &&
        isNumber(this.content.index) &&
        isNumber(index)
      ) {
        const json: IJsoneditor = {
          type: 'jsoneditor',
          i,
          index: this.content.index,
          isLayoutWidget: true,
          data: this.builder.currentPage.body[pageIndex].elements[i].elements[
            index
          ],
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
  }

  isLayoutWidget(i: number | undefined, index: number | undefined): boolean {
    return i !== undefined && i >= 0 && index !== undefined && index >= 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
