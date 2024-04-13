import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getBlockSetting } from '@modules/builder/factory/getBlockSetting';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private dialog: MatDialog
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

  onDeleteRow(index: number): void {
    const { elements } = this.content;
    elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
    // this.cd.detectChanges();
  }

  onLayoutSettings(layout: any, event: any): void {
    const layoutSetting: ILayoutSetting = {
      type: 'layout-setting',
      fields: getBlockSetting(layout),
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
