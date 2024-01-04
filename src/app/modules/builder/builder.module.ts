import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '@share/share.module';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderShowcaseComponent } from './main/builder-showcase/builder-showcase.component';
import { BuilderPanelComponent } from './sidebar/builder-panel/builder-panel.component';
import { BuilderGeneraterComponent } from './main/builder-generater/builder-generater.component';
import { BuilderSampleComponent } from './sidebar/builder-sample/builder-sample.component';
import { BuilderListComponent } from './main/builder-list/builder-list.component';
import { BuilderEmptyComponent } from './main/builder-empty/builder-empty.component';
import { SwitchPreviewComponent } from './toolbar/switch-preview/switch-preview.component';
import { PreviewListComponent } from './main/preview-list/preview-list.component';
import { BaseModule } from '@uiux/base/base.module';
import {
  BUILDER_CURRENT_PAGE,
  BUILDER_SAMPLE_PAGE,
  POPUP_SELECT,
  UIUX,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-builder';
import { PreviewComponent } from './preview/preview.component';
import { BuilderToolbarComponent } from './toolbar/builder-toolbar/builder-toolbar.component';
import { samples } from './data/samples-for-builder';
import { BtnGeneraterComponent } from './toolbar/btn-generater/btn-generater.component';
import { BuilderVersionComponent } from './sidebar/builder-version/builder-version.component';
import { builderCurrentPageFactory } from '@core/factory/factory';
import { LocalStorageService } from 'ngx-webstorage';
import { MetaEditComponent } from './main/meta-edit/meta-edit.component';
import { LayoutBuilderComponent } from './layout-builder/layout-builder.component';
import { QuillModule } from 'ngx-quill';
import { PopupSelectComponent } from './main/popup-select/popup-select.component';
import { of } from 'rxjs';

const components = [
  BuilderComponent,
  BuilderListComponent,
  BuilderGeneraterComponent,
  BtnGeneraterComponent,
  MetaEditComponent,
  LayoutBuilderComponent,
  PopupSelectComponent,
];

@NgModule({
  declarations: [
    ...components,
    BuilderToolbarComponent,
    BuilderEmptyComponent,
    BuilderShowcaseComponent,
    BuilderPanelComponent,
    SwitchPreviewComponent,
    BuilderSampleComponent,
    PreviewListComponent,
    PreviewComponent,
    BuilderVersionComponent,
    MetaEditComponent,
  ],
  imports: [
    ShareModule,
    MatSidenavModule,
    WidgetsModule,
    DragDropModule,
    BuilderRoutingModule,
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: UIUX,
      useValue: uiux,
    },
    {
      provide: POPUP_SELECT,
      useValue: of([
        {
          label: '图片',
          icon: {
            svg: 'image-outline',
          },
          content: {
            type: 'img',
            hostClasses: 'text-center',
            classes: '',
            src: '/assets/images/cases/porto3.jpg',
            alt: 'alt',
          },
        },
        {
          label: '按钮',
          icon: {
            svg: 'button-cursor',
          },
          content: {
            type: 'btn',
            href: '/node/1',
            target: '_blank',
            label: '了解更多',
            mode: 'raised',
            color: 'primary',
          },
        },
        {
          label: '链接',
          icon: {
            svg: 'link',
          },
          content: {
            type: 'link',
            label: '链接',
            classes: '',
            href: '/manage',
          },
        },
        {
          label: '背景',
          icon: {
            svg: 'format-color-fill',
          },
          content: {
            type: 'bg-img',
            classes: 'bg-fill-width overlay overlay-80',
            img: {
              src: '/assets/images/bg/bg-03.jpeg',
              classes: 'object-fit',
            },
          },
        },
        {
          label: '视频',
          icon: {
            svg: 'play-box',
          },
          content: {
            type: 'player',
            options: {
              controls: true,
              aspectRatio: '16:9',
              poster: '/assets/video/poster01.png',
              sources: [
                {
                  src: '/assets/video/storybook.mp4',
                  type: 'video/mp4',
                },
              ],
            },
          },
        },
        {
          label: '图标',
          icon: {
            svg: 'svg',
          },
          content: {
            type: 'icon',
            color: 'primary',
            name: 'format_color_fill',
          },
        },
        {
          label: '表单',
          icon: {
            svg: 'checkbox-marked-outline',
          },
          content: {
            type: 'formly',
            fields: [
              {
                type: 'input',
                key: 'total',
                defaultValue: 300,
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '大额红包总金额',
                  type: 'number',
                  required: true,
                  min: 10,
                  max: 10000,
                  description: '最小10元，最大10000元',
                },
                validation: {
                  messages: {
                    min: '不能设置小于 10',
                    max: '不能设置大于 10000',
                  },
                },
              },
              {
                template: '<div><strong>地址:</strong></div>',
              },
              {
                key: 'Textarea',
                type: 'textarea',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '文本域',
                  placeholder: 'Placeholder',
                  description: 'Description',
                  required: true,
                },
              },
              {
                key: 'Checkbox',
                type: 'checkbox',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '接受协议',
                  description: '为了更好的服务，网站将收集用户的Cookies信息。',
                  pattern: 'true',
                  required: true,
                },
                validation: {
                  messages: {
                    pattern: '请勾选协议',
                  },
                },
              },
              {
                key: 'Radio',
                type: 'radio',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '单选框',
                  placeholder: 'Placeholder',
                  description: 'Description',
                  required: true,
                  options: [
                    {
                      value: 1,
                      label: 'Option 1',
                    },
                    {
                      value: 2,
                      label: 'Option 2',
                    },
                    {
                      value: 3,
                      label: 'Option 3',
                    },
                    {
                      value: 4,
                      label: 'Option 4',
                      disabled: true,
                    },
                  ],
                },
              },
              {
                type: 'select',
                key: 'type',
                defaultValue: 'fixed',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '下拉单选',
                  description: '固定金额或者按比例',
                  options: [
                    {
                      label: '固定金额',
                      value: 'fixed',
                    },
                    {
                      label: '比例',
                      value: 'prop',
                    },
                  ],
                },
              },
              {
                type: 'mat-select',
                key: 'customer',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  multiple: true,
                  search: true,
                  hideSelected: true,
                  label: '下拉多选',
                  options: [
                    {
                      value: 1,
                      label: 'Option 1',
                    },
                    {
                      value: 2,
                      label: 'Option 2',
                    },
                    {
                      value: 3,
                      label: 'Option 3',
                    },
                    {
                      value: 4,
                      label: 'Option 4',
                      disabled: true,
                    },
                  ],
                },
              },
              {
                type: 'date-range',
                key: 'date',
                templateOptions: {
                  label: '期间',
                  value: '',
                  placeholder: '请选择日期',
                },
                className: 'display-block m-bottom-sm',
                fieldGroup: [
                  {
                    type: 'input',
                    key: 'start',
                  },
                  {
                    type: 'input',
                    key: 'end',
                  },
                ],
              },
              {
                key: 'isPromote',
                type: 'toggle',
                className: 'display-block m-bottom',
                templateOptions: {
                  label: '开关',
                  description: '超过推广次数则推广结束',
                },
              },
            ],
          },
        },
      ]),
    },
    {
      provide: BUILDER_SAMPLE_PAGE,
      useValue: samples,
    },
    {
      provide: BUILDER_CURRENT_PAGE,
      useFactory: builderCurrentPageFactory,
      deps: [LocalStorageService],
    },
  ],
  exports: [...components],
})
export class BuilderModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
