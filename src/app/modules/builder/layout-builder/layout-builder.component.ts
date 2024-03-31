import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type {
  ILayoutBlock,
  ILayoutBuilder,
  ILayoutSetting,
} from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { isNumber } from 'lodash-es';
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
import { UtilitiesService } from '@core/service/utilities.service';
import { getDivider } from '../factory/getDivider';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBuilderComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showGrid: boolean = false;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    private util: UtilitiesService,
    private ele: ElementRef,
    private screenService: ScreenService,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.builder.builderLayoutSetting$
        .pipe(takeUntil(this.destroy$), delay(200))
        .subscribe((data) => {
          const { value, uuid, path } = data;
          if (uuid === this.uuid) {
            this.builder.updatePageContentByPath(path, value);
            if (this.pageIndex) {
              // TODO:是否使用 updatePageContentByPath
              this.builder.updateComponent(this.pageIndex, this.content);
            }
            this.cd.detectChanges();

            // layout animate
            this.layoutAnimate();
          }
        });

      this.builder.jsoneditorContent$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          const { isLayoutWidget, data, path } = value;
          if (isLayoutWidget) {
            this.builder.updatePageContentByPath(path, data);
            this.cd.detectChanges();
          }
        });
    }
  }

  ngAfterViewInit(): void {
    this.layoutAnimate();
  }

  layoutAnimate(): void {
    this.content.elements.map((item: ILayoutBlock, index) => {
      if (item.animate) {
        const animateEle = this.ele.nativeElement.querySelectorAll(
          `.layout-${index} .for-animate`
        )[0];
        this.util.initAnimate(item, animateEle, this.ele.nativeElement);
      }
    });
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

  onLayoutSettings(layout: any, event: any): void {
    this.uuid = Date.now().toString();
    const layoutSetting: ILayoutSetting = {
      type: 'layout-setting',
      fields: getBlockSetting(layout),
      uuid: this.uuid,
      level: 'layout',
      content: layout,
      path: this.util.generatePath(event.target),
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

  onWidgetSetting(widget: any, event: any): void {
    this.uuid = Date.now().toString();
    const path = this.util.generatePath(event.target);
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
      case 'layout-builder':
        fields = getBlockSetting(widget);
        break;
      case 'divider':
        fields = getDivider(widget);
        break;
      default:
        fields = getNone(widget, [animateConfig]);
    }

    if (fields.length > 0) {
      this.showWidgetSetting(widget, fields, path);
    }
  }

  showWidgetSetting(
    widget: any,
    fields: FormlyFieldConfig[],
    path: string
  ): void {
    const data: ILayoutSetting = {
      type: 'layout-setting',
      pageIndex: this.pageIndex,
      path,
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
