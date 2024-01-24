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
import type { ILayoutBuilder } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { ENABLE_BUILDER_TOOLBAR } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { defaultsDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';
import { getTitleField } from '../factory/getTitleField';
import { getBtnVideo } from '../factory/getBtnVideo';
import { getSwiper } from '../factory/getSwiper';
import { getBlockSetting } from '../factory/getBlockSetting';

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
    @Inject(ENABLE_BUILDER_TOOLBAR) public enable_toolbar$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.builder.builderLayoutSetting$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const { i, index, value, uuid } = data;
        if (uuid === this.uuid) {
          const { elements } = this.content;
          Object.keys(value).forEach((config) => {
            if (config) {
              if (i >= 0 && index >= 0) {
                elements[i].elements[index] = defaultsDeep(
                  value[config],
                  elements[i].elements[index]
                );
              }
              if (i >= 0 && index === undefined) {
                elements[i] = defaultsDeep(value[config], elements[i]);
              }
            }
          });

          this.builder.updateComponent(this.pageIndex, this.content);
          this.cd.detectChanges();
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
            type: 'popup-select',
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

    this.dialog.afterAllClosed.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onWidgetSetting(i: number, index: number, widget: any): void {
    this.uuid = Date.now().toString();
    let fields: FormlyFieldConfig[] = [];
    if (widget.type === 'title') {
      fields = getTitleField(widget);
    }
    if (widget.type === 'btn-video') {
      fields = getBtnVideo(widget);
    }
    if (widget.type === 'swiper') {
      fields = getSwiper(widget);
    }

    if (fields.length > 0) {
      this.showDrawer(i, index, widget.type, fields);
    }
  }

  showDrawer(
    i: number,
    index: number,
    label: string,
    fields: FormlyFieldConfig[]
  ): void {
    this.builder.builderRightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '260px',
      },
      elements: [
        {
          type: 'layout-setting',
          i,
          index,
          title: {
            label: label,
            style: 'style-v4',
          },
          fields,
          uuid: this.uuid,
        },
      ],
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

  onSettings(i: number, layout: any): void {
    this.uuid = Date.now().toString();

    this.builder.builderRightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '260px',
      },
      elements: [
        {
          type: 'layout-setting',
          i,
          fields: getBlockSetting(layout),
          uuid: this.uuid,
        },
      ],
    });
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
