import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getAnimate } from '@modules/builder/factory/getAnimate';
import { getWidgetSetting } from '@modules/builder/factory/getWidgetSetting';
import { LocalStorageService } from 'ngx-webstorage';

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
    // this.builderSerivce.addBlock(addType, content, this.util.generatePath(target));
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
    const animateConfig = getAnimate(widget);
    const fields = getWidgetSetting(widget);

    fields.fieldGroup?.push(animateConfig);
    this.builder.showComponentSetting(widget, [fields], path);
  }
}
