import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  showHierarchy: boolean = false;
  constructor(
    private dialog: MatDialog,
    private ele: ElementRef,
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
          value: { flex, ...widget },
          uuid,
        } = data;
        if (uuid === this.uuid) {
          const { elements } = this.content;

          if (flex) {
            const { direction, horizontal, vertical } = flex;
            elements[i].direction = direction;
            elements[i].layoutAlign = `${horizontal.replace(
              'flex-',
              ''
            )} ${vertical.replace('flex-', '')}`;
          }

          Object.keys(widget).forEach((config) => {
            if (config) {
              if (i >= 0 && index >= 0) {
                elements[i].elements[index] = defaultsDeep(
                  widget[config],
                  elements[i].elements[index]
                );
              }

              if (i >= 0 && index === undefined) {
                elements[i] = defaultsDeep(widget[config], elements[i]);
              }
            }
          });

          this.builder.updateComponent(this.pageIndex, this.content);
          this.cd.detectChanges();
        }
      });
  }

  addBlock(row: string, index: number, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '700px',
      position: { bottom: '20px' },
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
        key: 'responsive',
        fieldGroup: [
          {
            key: 'row',
            fieldGroup: [
              {
                type: 'slider',
                key: 'xs',
                className: 'width-100',
                defaultValue: layout.row.xs,
                templateOptions: {
                  min: 1,
                  max: 12,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"移动端: " + model.xs + " 栏"',
                },
              },
              {
                type: 'slider',
                key: 'sm',
                className: 'width-100',
                defaultValue: layout.row.sm,
                templateOptions: {
                  min: 1,
                  max: 12,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"平板电脑: " + model.sm + " 栏"',
                },
              },
              {
                type: 'slider',
                key: 'md',
                className: 'width-100',
                defaultValue: layout.row.md,
                templateOptions: {
                  min: 1,
                  max: 12,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"桌面电脑: " + model.md + " 栏"',
                },
              },
              {
                type: 'slider',
                key: 'lg',
                className: 'width-100',
                defaultValue: layout.row.lg,
                templateOptions: {
                  min: 1,
                  max: 12,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"超大桌面: " + model.lg + " 栏"',
                },
              },
            ],
          },
        ],
      },
    ];
    let flexLayout: FormlyFieldConfig[] = [
      {
        key: 'flex',
        className: 'layout-setting width-100',
        fieldGroupClassName: 'display-flex flex-wrap width-100',
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
    let styles: FormlyFieldConfig[] = [
      {
        key: 'styles',
        className: 'width-100',
        fieldGroup: [
          {
            key: 'style',
            className: 'width-100',
            fieldGroupClassName: 'display-flex flex-wrap width-100',
            fieldGroup: [
              {
                key: 'backgroundColor',
                className: 'width-100',
                type: 'input',
                defaultValue: layout?.style?.backgroundColor || 'initial',
                templateOptions: {
                  type: 'color',
                  label: '背景色',
                },
                modelOptions: {
                  debounce: {
                    default: 500,
                  },
                },
              },
              {
                template: `<div class="p-y-xs bg-shadow m-bottom-sm"></div>`,
                className: 'width-100',
              },
              {
                type: 'slider',
                key: 'paddingTop',
                className: 'width-100',
                defaultValue: layout?.style?.paddingTop?.replace('px', '') || 0,
                templateOptions: {
                  min: 5,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"Padding top: " + model.paddingTop',
                },
              },
              {
                type: 'slider',
                key: 'paddingRight',
                className: 'width-100',
                defaultValue:
                  layout?.style?.paddingRight?.replace('px', '') || 0,
                templateOptions: {
                  min: 5,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"Padding right: " + model.paddingRight',
                },
              },
              {
                type: 'slider',
                key: 'paddingBottom',
                className: 'width-100',
                defaultValue:
                  layout?.style?.paddingBottom?.replace('px', '') || 0,
                templateOptions: {
                  min: 5,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"Padding bottom: " + model.paddingBottom',
                },
              },
              {
                type: 'slider',
                key: 'paddingLeft',
                className: 'width-100',
                defaultValue:
                  layout?.style?.paddingLeft?.replace('px', '') || 0,
                templateOptions: {
                  min: 5,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"Padding left: " + model.paddingLeft',
                },
              },
              {
                template: `<div class="p-y-xs bg-shadow m-bottom-sm"></div>`,
                className: 'width-100',
              },
              {
                type: 'slider',
                key: 'marginTop',
                className: 'width-100',
                defaultValue: layout?.style?.marginTop?.replace('px', '') || 0,
                templateOptions: {
                  min: -200,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"Margin top: " + model.marginTop',
                },
              },
              {
                type: 'slider',
                key: 'marginRight',
                className: 'width-100',
                defaultValue:
                  layout?.style?.marginRight?.replace('px', '') || 0,
                templateOptions: {
                  min: -200,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"Margin right: " + model.marginRight',
                },
              },
              {
                type: 'slider',
                key: 'marginBottom',
                className: 'width-100',
                defaultValue:
                  layout?.style?.marginBottom?.replace('px', '') || 0,
                templateOptions: {
                  min: -200,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label':
                    '"Margin bottom: " + model.marginBottom',
                },
              },
              {
                type: 'slider',
                key: 'marginLeft',
                className: 'width-100',
                defaultValue: layout?.style?.marginLeft?.replace('px', '') || 0,
                templateOptions: {
                  min: -200,
                  max: 100,
                  step: 5,
                  thumbLabel: true,
                },
                expressionProperties: {
                  'templateOptions.label': '"Margin left: " + model.marginLeft',
                },
              },
            ],
          },
        ],
        hooks: {
          onInit: (formGroup: any) => {
            const { form, model } = formGroup;
            form.valueChanges.subscribe((value: any) => {
              const { styles } = value;
              model.style = {
                ...model.style,
                paddingTop: styles.style['paddingTop'] + 'px',
                paddingRight: styles.style['paddingRight'] + 'px',
                paddingBottom: styles.style['paddingBottom'] + 'px',
                paddingLeft: styles.style['paddingLeft'] + 'px',
                marginTop: styles.style['marginTop'] + 'px',
                marginRight: styles.style['marginRight'] + 'px',
                marginBottom: styles.style['marginBottom'] + 'px',
                marginLeft: styles.style['marginLeft'] + 'px',
              };
            });
          },
        },
      },
    ];
    let fields: FormlyFieldConfig[] = [
      {
        type: 'tabs',
        fieldGroup: [
          {
            templateOptions: {
              label: '基础配置',
            },
            fieldGroup: [...responsive, ...flexLayout],
          },
          {
            templateOptions: {
              label: '样式',
            },
            fieldGroup: [...styles],
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
          fields,
          uuid: this.uuid,
        },
      ],
    });
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
  }

  onHierarchy(i: number): void {
    const blocks = this.ele.nativeElement.querySelectorAll('.block');
    if (blocks[i].style.filter) {
      blocks[i].style.filter = '';
    } else {
      blocks[i].style.filter = `blur(8px)`;
    }
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
