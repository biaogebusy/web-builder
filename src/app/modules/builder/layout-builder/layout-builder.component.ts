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
        console.log(data);
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

              if (i !== undefined && index === undefined) {
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
    // TODO: 函数统一处理
    if (widget.type === 'title') {
      fields = [
        {
          key: 'title',
          fieldGroupClassName: 'width-100',
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
            {
              key: 'typed',
              fieldGroup: [
                {
                  key: 'enable',
                  type: 'toggle',
                  defaultValue: widget?.typed?.enable || false,
                  templateOptions: {
                    label: '开启打字效果',
                  },
                },
                {
                  key: 'config',
                  fieldGroup: [
                    {
                      key: 'loop',
                      type: 'toggle',
                      defaultValue: widget?.typed?.config?.loop,
                      templateOptions: {
                        label: '循环',
                      },
                    },
                    {
                      key: 'typeSpeed',
                      type: 'slider',
                      defaultValue: widget?.typed?.config?.typeSpeed || 120,
                      templateOptions: {
                        label: '速度',
                        min: 10,
                        max: 1000,
                        step: 2,
                      },
                      expressionProperties: {
                        'templateOptions.label': '"速度: " + model.typeSpeed',
                      },
                    },
                  ],
                },
                {
                  key: 'strings',
                  type: 'repeat',
                  defaultValue: widget?.typed?.strings || [
                    { label: 'web builder' },
                  ],
                  fieldArray: {
                    fieldGroup: [
                      {
                        key: 'label',
                        type: 'input',
                        defaultValue:
                          widget?.typed?.strings[0]['label'] || 'web builder',
                        modelOptions: {
                          debounce: {
                            default: 2000,
                          },
                        },
                        templateOptions: {
                          label: '文字',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ];
    }
    if (widget.type === 'btn-video') {
      fields = [
        {
          key: 'btnVideo',
          fieldGroup: [
            {
              type: 'select',
              key: 'color',
              className: 'width-100',
              defaultValue: widget.color,
              templateOptions: {
                label: '颜色',
                options: [
                  {
                    label: '无',
                    value: undefined,
                  },
                  {
                    label: 'Primary',
                    value: 'primary',
                  },
                  {
                    label: 'Accent',
                    value: 'accent',
                  },
                  {
                    label: 'Warn',
                    value: 'warn',
                  },
                ],
              },
            },
            {
              key: 'video',
              fieldGroup: [
                {
                  key: 'options',
                  fieldGroup: [
                    {
                      type: 'select',
                      key: 'aspectRatio',
                      className: 'width-100',
                      defaultValue: widget.video.options.aspectRatio,
                      templateOptions: {
                        label: '播放比例',
                        options: [
                          {
                            label: '16:9',
                            value: '16:9',
                          },
                          {
                            label: '6:19',
                            value: '6:19',
                          },
                          {
                            label: '4:3',
                            value: '4:3',
                          },
                          {
                            label: '1:1',
                            value: '1:1',
                          },
                        ],
                      },
                    },
                    {
                      template: `<img class="m-bottom-sm" src="${widget.video.options.poster}" height="50" width="auto" >`,
                    },
                    {
                      key: 'poster',
                      type: 'input',
                      className: 'width-100',
                      defaultValue: widget.video.options.poster,
                      templateOptions: {
                        label: '视频封面',
                      },
                    },
                    {
                      key: 'sources',
                      type: 'repeat',
                      defaultValue: widget.video.options.sources,
                      className: 'width-100',
                      templateOptions: {
                        addText: '新增',
                      },
                      fieldArray: {
                        fieldGroup: [
                          {
                            key: 'src',
                            type: 'input',
                            className: 'width-100',
                            defaultValue: widget.video.options.sources[0].src,
                            templateOptions: {
                              label: '视频地址',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    }
    if (widget.type === 'swiper') {
      fields = [
        {
          key: 'swiper',
          fieldGroup: [
            {
              key: 'params',
              fieldGroup: [
                {
                  className: 'width-100 m-bottom-mmd',
                  template: '<h2>参数</h2>',
                },
                {
                  type: 'select',
                  key: 'direction',
                  className: 'width-100',
                  defaultValue: widget.params?.direction || 'horizontal',
                  templateOptions: {
                    label: '方向',
                    options: [
                      {
                        label: '水平方向',
                        value: 'horizontal',
                      },
                      {
                        label: '垂直方向',
                        value: 'vertical',
                      },
                    ],
                  },
                },
                {
                  key: 'breakpoints',
                  className: 'width-100',
                  fieldGroup: [
                    {
                      key: '600',
                      className: 'width-100',
                      fieldGroupClassName: 'section-group',
                      fieldGroup: [
                        {
                          key: 'slidesPerView',
                          type: 'slider',
                          className: 'width-40',
                          defaultValue:
                            widget.params.breakpoints[600].slidesPerView,
                          templateOptions: {
                            min: 1,
                            max: 10,
                            step: 0.2,
                            thumbLabel: true,
                          },
                          expressionProperties: {
                            'templateOptions.label':
                              '"移动端显示: " + model.slidesPerView',
                          },
                        },
                        {
                          key: 'spaceBetween',
                          type: 'slider',
                          className: 'width-40',
                          defaultValue:
                            widget.params.breakpoints[600].spaceBetween || 0,
                          templateOptions: {
                            min: 1,
                            max: 100,
                            step: 1,
                            thumbLabel: true,
                          },
                          hideExpression: 'model.slidesPerView <= 1',
                          expressionProperties: {
                            'templateOptions.label':
                              '"间隔: " + model.spaceBetween + "px"',
                          },
                        },
                      ],
                    },
                    {
                      key: '960',
                      className: 'width-100',
                      fieldGroupClassName: 'section-group',
                      fieldGroup: [
                        {
                          key: 'slidesPerView',
                          type: 'slider',
                          className: 'width-40',
                          defaultValue:
                            widget.params.breakpoints[960].slidesPerView,
                          templateOptions: {
                            min: 1,
                            max: 10,
                            step: 0.2,
                            thumbLabel: true,
                          },
                          expressionProperties: {
                            'templateOptions.label':
                              '"电脑端显示: " + model.slidesPerView',
                          },
                        },
                        {
                          key: 'spaceBetween',
                          type: 'slider',
                          className: 'width-40',
                          defaultValue:
                            widget.params.breakpoints[960].spaceBetween || 0,
                          templateOptions: {
                            min: 1,
                            max: 100,
                            step: 1,
                            thumbLabel: true,
                          },
                          hideExpression: 'model.slidesPerView <= 1',
                          expressionProperties: {
                            'templateOptions.label':
                              '"间隔: " + model.spaceBetween + "px"',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  className: 'width-100 m-bottom-mmd',
                  template: '<h2>特效</h2>',
                },
                {
                  key: 'effect',
                  type: 'select',
                  className: 'width-100',
                  defaultValue: widget.params.effect || 'slide',
                  templateOptions: {
                    label: `特效`,
                    options: [
                      {
                        label: '默认',
                        value: 'slide',
                      },
                      {
                        label: 'Fade',
                        value: 'fade',
                      },
                      {
                        label: 'Cube',
                        value: 'cube',
                      },
                      {
                        label: 'Coverflow',
                        value: 'coverflow',
                      },
                      {
                        label: 'Fip',
                        value: 'flip',
                      },
                    ],
                  },
                },
                {
                  key: 'speed',
                  type: 'slider',
                  className: 'width-100',
                  defaultValue: widget.params.speed || 300,
                  templateOptions: {
                    description: '',
                    min: 0,
                    max: 10000,
                    step: 100,
                    thumbLabel: true,
                  },
                  expressionProperties: {
                    'templateOptions.label':
                      '"转场时长: " + model.speed + " 毫秒"',
                  },
                },
                {
                  className: 'width-100 m-bottom-mmd',
                  template: '<h2>功能</h2>',
                },
                {
                  key: 'pagination',
                  defaultValue: widget.params.pagination,
                  fieldGroupClassName: 'section-group',
                  fieldGroup: [
                    {
                      key: 'paginationEnable',
                      type: 'toggle',
                      className: 'width-100',
                      defaultValue: widget.params.pagination || false,
                      templateOptions: {
                        label: '页码',
                      },
                    },
                    {
                      key: 'type',
                      type: 'select',
                      className: 'width-40',
                      templateOptions: {
                        label: '类型',
                        options: [
                          {
                            label: 'bullets',
                            value: 'bullets',
                          },
                          {
                            label: 'progressbar',
                            value: 'progressbar',
                          },
                          {
                            label: 'fraction',
                            value: 'fraction',
                          },
                        ],
                      },
                      hideExpression: '!model.paginationEnable',
                    },
                    {
                      key: 'clickable',
                      type: 'toggle',
                      templateOptions: {
                        className: 'width-40',
                        label: '可点击',
                      },
                      expressionProperties: {
                        'templateOptions.disabled': 'model.type !== "bullets"',
                      },
                      hideExpression: '!model.paginationEnable',
                    },
                  ],
                },
                {
                  key: 'navigation',
                  type: 'toggle',
                  className: 'width-100',
                  defaultValue: widget.params.navigation || false,
                  templateOptions: {
                    label: '左右箭头',
                  },
                },
                {
                  key: 'centeredSlides',
                  type: 'toggle',
                  className: 'width-100',
                  defaultValue: widget.params.centeredSlides || false,
                  templateOptions: {
                    label: '居中',
                  },
                },
                {
                  key: 'loop',
                  type: 'toggle',
                  className: 'width-100',
                  defaultValue: widget.params.loop || false,
                  templateOptions: {
                    label: '循环',
                  },
                },
                {
                  key: 'autoplay',
                  type: 'toggle',
                  className: 'width-100',
                  defaultValue: widget.params.autoplay || false,
                  templateOptions: {
                    label: '自动播放',
                  },
                },
                {
                  key: 'mousewheel',
                  type: 'toggle',
                  className: 'width-100',
                  defaultValue: widget.params.mousewheel || false,
                  templateOptions: {
                    label: '鼠标控制',
                  },
                },
              ],
            },
          ],
        },
      ];
    }

    this.showDrawer(i, index, widget.type, fields);
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
    ];
    let fields: FormlyFieldConfig[] = [
      {
        key: 'responsive',
        fieldGroup: [
          {
            key: 'row',
            fieldGroup: responsive,
          },
        ],
      },
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
            label: `第${i + 1}列响应式配置`,
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
