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
          index,
          value: { row, layoutAlign },
          uuid,
        } = data;
        if (uuid === this.uuid) {
          console.log(data);
          if (row) {
            const { elements } = this.content;
            elements[index].row = row;
          }
          if (layoutAlign) {
            const { horizontal, vertical } = layoutAlign;
            this.content.layoutAlign = `${horizontal.replace(
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

  onAlign(i: number, align: string): void {
    const { elements } = this.content;
    elements[i].align = align;
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
        key: 'layoutAlign',
        fieldGroup: [
          {
            className: 'width-100 m-bottom-md',
            template: `<div class="layout-preview"><div class="wrapper" layoutpreview><div class="block bg-primary">1</div><div  class="block bg-orange">2</div><div class="block bg-green">3</div><div class="block bg-blue">4</div><div  class="block bg-cyan">5</div></div></div>`,
          },
          {
            type: 'select',
            key: 'horizontal',
            className: 'width-100',
            defaultValue: this.getLayoutAlign(0, this.content.layoutAlign),
            templateOptions: {
              label: '水平对齐',
              options: [
                {
                  label: 'None',
                  value: 'none',
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
            defaultValue: this.getLayoutAlign(1, this.content.layoutAlign),
            templateOptions: {
              label: '垂直对齐',
              options: [
                {
                  label: 'None',
                  value: 'none',
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
          index: i,
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
