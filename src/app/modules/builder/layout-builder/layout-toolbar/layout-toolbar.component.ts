import { moveItemInArray } from '@angular/cdk/drag-drop';
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
  @Input() content: any;
  @Input() i: number;
  @Input() layout: any;
  @Input() pageIndex: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private util: UtilitiesService,
    private builder: BuilderState,
    private builderService: BuilderService
  ) {}

  ngOnInit(): void {}

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

  addBlock(addType: string, content: any, event: any): void {
    this.builderService.addBlock(addType, content, event);
  }

  onDeleteRow(index: number): void {
    const { elements } = this.content;
    elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
  }

  onLayoutSettings(layout: any, event: any): void {
    const layoutSetting: ILayoutSetting = {
      type: 'layout-setting',
      fields: getLayoutSetting(layout),
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
}
