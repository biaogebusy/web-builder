import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getAnimate } from '@modules/builder/factory/getAnimate';
import { getLayoutSetting } from '@modules/builder/factory/getLayoutSetting';
import { getBtn } from '@modules/builder/factory/getBtn';
import { getBtnVideo } from '@modules/builder/factory/getBtnVideo';
import { getChart } from '@modules/builder/factory/getChart';
import { getContact } from '@modules/builder/factory/getContact';
import { getDivider } from '@modules/builder/factory/getDivider';
import { getIcon } from '@modules/builder/factory/getIcon';
import { getImg } from '@modules/builder/factory/getImg';
import { getLink } from '@modules/builder/factory/getLink';
import { getNone } from '@modules/builder/factory/getNone';
import { getSpacer } from '@modules/builder/factory/getSpacer';
import { getSwiper } from '@modules/builder/factory/getSwiper';
import { getText } from '@modules/builder/factory/getText';
import { getTitleField } from '@modules/builder/factory/getTitleField';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-block-toolbar',
  templateUrl: './block-toolbar.component.html',
  styleUrls: ['./block-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockToolbarComponent implements OnInit {
  @Input() layout: any;
  @Input() block: any;
  @Input() index: number;
  @Input() i: number;
  @Input() lbContent: any;
  @Input() pageIndex: number;
  constructor(
    private builder: BuilderState,
    private builderSerivce: BuilderService,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {}

  onUpDown(direction: string, i: number, index: number): void {
    const { elements } = this.lbContent;
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
    this.builder.updateComponent(this.pageIndex, this.lbContent);
  }

  addBlock(addType: string, content: any, event: any): void {
    this.builderSerivce.addBlock(addType, content, event);
  }

  deleteBlock(i: number, index: number): void {
    const { elements } = this.lbContent;
    elements[i].elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.lbContent);
  }

  onWidgetSetting(widget: any, event: any): void {
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
        fields = getLayoutSetting(widget);
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
}
