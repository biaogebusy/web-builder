import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getLayoutSetting } from '@modules/builder/factory/getLayoutSetting';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { cloneDeep } from 'lodash-es';
import { BtnComponent } from '../../../btn/btn.component';
import { IconComponent } from '../../../icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-toolbar',
  templateUrl: './layout-toolbar.component.html',
  styleUrls: ['./layout-toolbar.component.scss'],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    BtnComponent,
    IconComponent,
  ],
})
export class LayoutToolbarComponent {
  @Input() lbContent: any;
  @Input() i: number;
  @Input() layout: any;
  @Input() target: Element;

  private util = inject(UtilitiesService);
  private builder = inject(BuilderState);
  private builderService = inject(BuilderService);


  onMoveCol(direction: 'left' | 'right', lists: any[], target: Element, index: number): void {
    const elements = cloneDeep(lists);
    const path = this.util.generatePath(target);
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

  addBlock(addType: string, content: any): void {
    this.builderService.addBlock(addType, content, this.util.generatePath(this.target));
  }

  onDeleteRow(target: Element): void {
    const path = this.util.generatePath(target);
    this.builder.updatePageContentByPath(path, this.lbContent, 'remove');
  }

  onLayoutSettings(layout: any, target: Element): void {
    const path = this.util.generatePath(target);
    const fields: FormlyFieldConfig[] = getLayoutSetting(layout);
    this.builder.showComponentSetting(layout, fields, path);
  }

  hiddenWidgetPicker(): void {
    this.builder.closeRightDrawer$.next(true);
  }
}
