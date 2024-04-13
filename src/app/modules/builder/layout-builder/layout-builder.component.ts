import {
  AfterViewInit,
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
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
})
export class LayoutBuilderComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    private util: UtilitiesService,
    private ele: ElementRef,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {}

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

  addBlock(addType: string, content: any, event: any): void {
    this.dialog.open(DialogComponent, {
      width: '700px',
      position: { bottom: '20px' },
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'widget-picker',
            addType,
            path: this.util.generatePath(event.target),
            content,
          },
        },
      },
    });

    // this.dialog.afterAllClosed.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.cd.detectChanges();
    // });
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
      fields,
      content: widget,
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

  onMoveCol(
    direction: 'left' | 'right',
    lists: any[],
    event: any,
    index: number
  ): void {
    const elements = cloneDeep(lists);
    const path = this.util.generatePath(event.target);
    const lastDotIndex = path.lastIndexOf('.');
    const arrayPath = path.slice(0, lastDotIndex);

    if (direction === 'left') {
      moveItemInArray(elements, index, index - 1);
    }

    if (direction === 'right') {
      moveItemInArray(elements, index, index + 1);
    }
    this.builder.updatePageContentByPath(arrayPath, elements);
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
