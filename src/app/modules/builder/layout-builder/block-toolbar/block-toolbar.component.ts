import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getAnimate } from '@modules/builder/factory/getAnimate';
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
import { getTitle } from '@modules/builder/factory/getTitle';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getBuilder } from '@modules/builder/factory/getBuilder';
import { LocalStorageService } from 'ngx-webstorage';
import { getVideo } from '@modules/builder/factory/getVideo';

@Component({
  selector: 'app-block-toolbar',
  templateUrl: './block-toolbar.component.html',
  styleUrls: ['./block-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockToolbarComponent {
  @Input() layout: any;
  @Input() block: any;
  @Input() index: number;
  @Input() i: number;
  @Input() lbContent: any;
  @Input() pageIndex: number;

  private builder = inject(BuilderState);
  private builderSerivce = inject(BuilderService);
  private util = inject(UtilitiesService);
  private storage = inject(LocalStorageService);

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

  addBlock(addType: string, content: any, target: any): void {
    this.builderSerivce.addBlock(addType, content, this.util.generatePath(target));
  }

  onCopy(widget: any): any {
    this.util.openSnackbar(`已复制${widget.type}的JSON`);
    this.util.copy(JSON.stringify(widget));
    this.storage.store(this.builder.COPYWIDGETKEY, widget);
  }

  deleteBlock(i: number, index: number): void {
    const { elements } = this.lbContent;
    elements[i].elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.lbContent);
  }

  onWidgetSetting(widget: any, target: any): void {
    const path = this.util.generatePath(target);
    this.builder.onWidgetSetting(widget, path);
  }
}
