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
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';

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
        const {
          i,
          index,
          value: { row, flex, title },
          uuid,
        } = data;
        if (uuid === this.uuid) {
          if (row) {
            const { elements } = this.content;
            elements[i].row = row;
          }

          if (title) {
            const { elements } = this.content;
            elements[i].elements[index] = {
              ...elements[i].elements[index],
              ...title,
            };
          }

          if (flex) {
            const { elements } = this.content;
            const { direction, horizontal, vertical } = flex;
            elements[i].direction = direction;
            elements[i].layoutAlign = `${horizontal.replace(
              'flex-',
              ''
            )} ${vertical.replace('flex-', '')}`;
          }
          this.builder.updateComponent(this.pageIndex, this.content);
          this.cd.detectChanges();
        }
      });
  }

  addBlock(row: string, index: number, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '100vw',
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'popup-select',
            row,
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
    if (widget.type === 'title') {
      let fields: FormlyFieldConfig[] = [
        {
          key: 'title',
          fieldGroup: [
            {
              type: 'select',
              key: 'style',
              className: 'width-100',
              defaultValue: widget.style,
              templateOptions: {
                label: '风格',
                options: [
                  {
                    label: '无',
                    value: 'none',
                  },
                  {
                    label: 'V1',
                    value: 'style-v1',
                  },
                  {
                    label: 'V3',
                    value: 'style-v3',
                  },
                  {
                    label: 'V4',
                    value: 'style-v4',
                  },
                  {
                    label: 'V5',
                    value: 'style-v5',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'classes',
              className: 'width-100',
              defaultValue: widget.classes,
              templateOptions: {
                label: '大小',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: '1级',
                    value: 'mat-display-1 bold',
                  },
                  {
                    label: '2级',
                    value: 'mat-display-2 bold',
                  },
                  {
                    label: '3级',
                    value: 'mat-display-3 bold',
                  },
                  {
                    label: '4级',
                    value: 'mat-display-4 bold',
                  },
                ],
              },
            },
          ],
        },
      ];
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
              label: '标题配置',
              style: 'style-v4',
            },
            fields,
            uuid: this.uuid,
          },
        ],
      });
    }
  }

  onMove(de: string, i: number, index: number): void {
    const { elements } = this.content;
    if (de === 'up') {
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
    let responsive: FormlyFieldConfig[] = [
      {
        type: 'slider',
        key: 'xs',
        className: 'width-100',
        defaultValue: layout.row.xs,
        templateOptions: {
          label: '移动端',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'sm',
        className: 'width-100',
        defaultValue: layout.row.sm,
        templateOptions: {
          label: '平板电脑',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'md',
        className: 'width-100',
        defaultValue: layout.row.md,
        templateOptions: {
          label: '桌面电脑',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'lg',
        className: 'width-100',
        defaultValue: layout.row.lg,
        templateOptions: {
          label: '超大桌面',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
    ];
    let fields: FormlyFieldConfig[] = [
      {
        key: 'row',
        fieldGroup: responsive,
      },
      {
        key: 'flex',
        className: 'layout-setting',
        fieldGroup: [
          {
            className: 'width-100 m-bottom-md',
            template: `<div class="layout-preview"><div class="wrapper ${
              layout.direction
            } horizontal-${this.getLayoutAlign(
              0,
              layout.layoutAlign
            )} vertical-${this.getLayoutAlign(
              1,
              layout.layoutAlign
            )}" layoutpreview><div class="block bg-primary">1</div><div class="block bg-orange">2</div><div class="block bg-green">3</div></div></div>`,
          },
          {
            type: 'select',
            key: 'direction',
            className: 'width-100',
            defaultValue: layout.direction,
            templateOptions: {
              label: '当前列布局方向',
              options: [
                {
                  label: 'Column',
                  value: 'column',
                },
                {
                  label: 'Row',
                  value: 'row',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'horizontal',
            className: 'width-100',
            defaultValue: this.getLayoutAlign(0, layout.layoutAlign),
            templateOptions: {
              label: '水平对齐',
              options: [
                {
                  label: 'None',
                  value: 'flex-start',
                },
                {
                  label: 'start',
                  value: 'flex-start',
                },
                {
                  label: 'center',
                  value: 'center',
                },
                {
                  label: 'end',
                  value: 'flex-end',
                },
                {
                  label: 'space-around',
                  value: 'space-around',
                },
                {
                  label: 'space-between',
                  value: 'space-between',
                },
                {
                  label: 'space-evenly',
                  value: 'space-evenly',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'vertical',
            className: 'width-100',
            defaultValue: this.getLayoutAlign(1, layout.layoutAlign),
            templateOptions: {
              label: '垂直对齐',
              options: [
                {
                  label: 'None',
                  value: 'stretch',
                },
                {
                  label: 'start',
                  value: 'flex-start',
                },
                {
                  label: 'center',
                  value: 'center',
                },
                {
                  label: 'end',
                  value: 'flex-end',
                },
                {
                  label: 'stretch',
                  value: 'stretch',
                },
              ],
            },
          },
        ],
      },
    ];

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
          title: {
            label: '响应式配置',
            style: 'style-v4',
          },
          fields,
          uuid: this.uuid,
        },
      ],
    });
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
  }

  getLayoutAlign(index: number, layoutAlign: string): string {
    const align = layoutAlign.split(' ')[index];
    switch (align) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      default:
        return align;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
