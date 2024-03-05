import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutBuilder, ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { defaultsDeep, isNumber } from 'lodash-es';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { delay, takeUntil } from 'rxjs/operators';
import { getTitleField } from '../factory/getTitleField';
import { getBtnVideo } from '../factory/getBtnVideo';
import { getSwiper } from '../factory/getSwiper';
import { getBlockSetting } from '../factory/getBlockSetting';
import { getLink } from '../factory/getLink';
import { getBtn } from '../factory/getBtn';
import { getSpacer } from '../factory/getSpacer';
import { getNone } from '../factory/getNone';
import { getChart } from '../factory/getChart';
import { getContact } from '../factory/getContact';
import { getText } from '../factory/getText';
import { getImg } from '../factory/getImg';
import { getIcon } from '../factory/getIcon';
import { getAnimate } from '../factory/getAnimate';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBuilderComponent implements OnInit, OnDestroy {
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showGrid: boolean = false;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.builder.builderLayoutSetting$
      .pipe(takeUntil(this.destroy$), delay(200))
      .subscribe((data) => {
        const { i, index, value, uuid } = data;
        if (uuid === this.uuid) {
          const { elements } = this.content;
          if (this.isLayoutWidget(i, index) && isNumber(i) && isNumber(index)) {
            elements[i].elements[index] = value;
          }
          if (i !== undefined && i >= 0 && index === undefined) {
            elements[i] = value;
          }
          this.builder.updateComponent(this.pageIndex, this.content);
          this.cd.detectChanges();
        }
      });

    this.builder.jsoneditorContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const { isLayoutWidget, i, index, data } = value;
        if (isLayoutWidget) {
          const { elements } = this.content;
          elements[i].elements[index] = defaultsDeep(
            data,
            elements[i].elements[index]
          );
          this.cd.detectChanges();
        }
      });
  }

  isLayoutWidget(i: number | undefined, index: number | undefined): boolean {
    return i !== undefined && i >= 0 && index !== undefined && index >= 0;
  }

  addBlock(row: string, i: number, content: any, index?: number): void {
    this.dialog.open(DialogComponent, {
      width: '700px',
      position: { bottom: '20px' },
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'widget-picker',
            row,
            i,
            index,
            pageIndex: this.pageIndex,
            uuid: this.uuid,
            content,
          },
        },
      },
    });

    this.dialog.afterAllClosed.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onLayoutSettings(i: number, layout: any): void {
    this.uuid = Date.now().toString();
    const layoutSetting: ILayoutSetting = {
      type: 'layout-setting',
      i,
      fields: getBlockSetting(layout),
      uuid: this.uuid,
      level: 'layout',
      content: layout,
    };
    this.builder.builderRightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '260px',
      },
      elements: [layoutSetting],
    });
  }

  onWidgetSetting(i: number, index: number, widget: any): void {
    this.uuid = Date.now().toString();
    let fields: FormlyFieldConfig[] = [];
    const animateConfig = getAnimate(widget);
    switch (widget.type) {
      case 'title':
        fields = getTitleField(widget, [animateConfig]);
        break;
      case 'btn-video':
        fields = getBtnVideo(widget, [animateConfig]);
        break;
      case 'swiper':
        fields = getSwiper(widget, [animateConfig]);
        break;
      case 'link':
        fields = getLink(widget, [animateConfig]);
        break;
      case 'btn':
        fields = getBtn(widget, [animateConfig]);
        break;
      case 'spacer':
        fields = getSpacer(widget);
        break;
      case 'chart':
        fields = getChart(widget, [animateConfig]);
        break;
      case 'contact-us':
        fields = getContact(widget, [animateConfig]);
        break;
      case 'text':
        fields = getText(widget, [animateConfig]);
        break;
      case 'img':
        fields = getImg(widget, [animateConfig]);
        break;
      case 'icon':
        fields = getIcon(widget, [animateConfig]);
        break;
      default:
        fields = getNone(widget, [animateConfig]);
    }

    if (fields.length > 0) {
      this.showWidgetSetting(i, index, widget, fields);
    }
  }

  showWidgetSetting(
    i: number,
    index: number,
    widget: any,
    fields: FormlyFieldConfig[]
  ): void {
    const data: ILayoutSetting = {
      type: 'layout-setting',
      i,
      pageIndex: this.pageIndex,
      index,
      uuid: this.uuid,
      fields,
      content: widget,
      level: 'widget',
    };
    this.builder.builderRightContent$.next({
      mode: 'over',
      hasBackdrop: false,
      style: {
        width: '260px',
      },
      elements: [data],
    });
  }

  onMoveCol(i: number, direction: string): void {
    const { elements } = this.content;
    if (direction === 'left') {
      [elements[i - 1], elements[i]] = [elements[i], elements[i - 1]];
    }
    if (direction === 'right') {
      [elements[i], elements[i + 1]] = [elements[i + 1], elements[i]];
    }
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onUpDown(direction: string, i: number, index: number): void {
    const { elements } = this.content;
    if (direction === 'up') {
      [elements[i].elements[index - 1], elements[i].elements[index]] = [
        elements[i].elements[index],
        elements[i].elements[index - 1],
      ];
    } else {
      [elements[i].elements[index], elements[i].elements[index + 1]] = [
        elements[i].elements[index + 1],
        elements[i].elements[index],
      ];
    }
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onDeleteCol(i: number, index: number): void {
    const { elements } = this.content;
    elements[i].elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onDeleteRow(index: number): void {
    const { elements } = this.content;
    elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
