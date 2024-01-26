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
import { isNumber } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private cd: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.builder.selectedMedia$
      .pipe(takeUntil(this.destroy$))
      .subscribe((img: any) => {
        const { src, fileName } = img;
        const bg = {
          classes: 'bg-fill-width',
          img: {
            src,
            alt: fileName,
            classes: 'object-fit',
          },
        };
        this.content.content.bg = bg;
        this.dialog.closeAll();
        this.builder.builderLayoutSetting$.next({
          value: {
            bg,
          },
          index: this.content.index,
          uuid: this.content.uuid,
        });
        this.cd.detectChanges();
      });
  }

  onDeleteBgImg(): void {
    this.content.content.bg = {
      classes: 'bg-fill-width',
    };
    this.cd.detectChanges();
    this.builder.builderLayoutSetting$.next({
      value: {
        bg: {
          classes: 'bg-fill-width',
        },
      },
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  onModelChange(value: any) {
    const { flex } = value;
    this.renderLayoutPreview(flex);
    this.builder.builderLayoutSetting$.next({
      value,
      i: this.content.i,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  renderLayoutPreview(flex: any): void {
    const box = this.el.nativeElement.querySelector('.wrapper');
    if (flex && box) {
      const { direction, horizontal, vertical } = flex;
      box.style.justifyContent = horizontal;
      box.style.alignItems = vertical;
      box.style.alignContent = vertical;
      box.style.flexDirection = direction;
    }
  }

  openMedias(): void {
    this.dialog.open(DialogComponent, {
      width: '100%',
      data: {
        title: '媒体库',
        inputData: {
          content: {
            type: 'manage-media',
          },
        },
      },
    });
  }

  showCode(): void {
    console.log(this.content);
    const { i, index, pageIndex } = this.content;
    // builder list 一级组件
    if (!this.isLayoutWidget(i, index)) {
      const json: IJsoneditor = {
        type: 'jsoneditor',
        index: this.content.index,
        isPreview: true,
        data: this.builder.currentPage.body[this.content.index],
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

    // layout builder widget
    if (this.isLayoutWidget(i, index)) {
      if (isNumber(pageIndex) && isNumber(i)) {
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

  isLayoutWidget(i: number | undefined, index: number): boolean {
    return i !== undefined && i >= 0 && index >= 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
