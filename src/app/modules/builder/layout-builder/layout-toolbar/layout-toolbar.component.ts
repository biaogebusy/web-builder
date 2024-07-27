import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getLayoutSetting } from '@modules/builder/factory/getLayoutSetting';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout-toolbar',
  templateUrl: './layout-toolbar.component.html',
  styleUrls: ['./layout-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutToolbarComponent implements OnInit {
  @Input() lbContent: any;
  @Input() i: number;
  @Input() layout: any;
  @Input() pageIndex: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  util = inject(UtilitiesService);
  builder = inject(BuilderState);
  builderService = inject(BuilderService);
  constructor() {}

  ngOnInit(): void {}

  onMoveCol(
    direction: 'left' | 'right',
    lists: any[],
    target: any,
    index: number,
  ): void {
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

  addBlock(addType: string, content: any, target: any): void {
    this.builderService.addBlock(addType, content, target);
  }

  onDeleteRow(index: number): void {
    const { elements } = this.lbContent;
    elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.lbContent);
  }

  onLayoutSettings(layout: any, target: any): void {
    const layoutSetting: ILayoutSetting = {
      type: 'layout-setting',
      fields: getLayoutSetting(layout),
      content: layout,
      path: this.util.generatePath(target),
    };
    this.builder.rightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '318px',
      },
      elements: [layoutSetting],
    });
  }
}
