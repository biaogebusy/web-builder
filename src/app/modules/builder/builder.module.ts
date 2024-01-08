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
import { LayoutSettingComponent } from './layout-builder/layout-setting/layout-setting.component';

const components = [
  BuilderComponent,
  BuilderListComponent,
  BuilderGeneraterComponent,
  BtnGeneraterComponent,
  MetaEditComponent,
  LayoutBuilderComponent,
  PopupSelectComponent,
  LayoutSettingComponent,
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
          label: '标题',
          icon: {
            svg: 'format-header-2',
          },
          content: {
            type: 'title',
            label: '关于我们',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
        },
        {
          label: '富文本',
          id: 'text',
          icon: {
            svg: 'format-size',
          },
          content: {
            type: 'text',
            spacer: 'md',
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
          },
        },
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
          label: '间距',
          icon: {
            svg: 'border-horizontal',
          },
          content: {
            type: 'spacer',
            size: 'md',
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
          label: '表格',
          icon: {
            svg: 'table',
          },
          content: {
            type: 'dynamic-table',
            header: [
              {
                label: '模块',
                key: 'module',
              },
              {
                label: '描述',
                key: 'info',
              },
              {
                label: '安装量',
                key: 'tatol',
              },
              {
                label: '备注',
                key: 'remarks',
                dialog: {
                  shorten: 5,
                  label: '更多',
                },
              },
            ],
            elements: [
              {
                module: 'Slick Carousel',
                tatol: 8944,
                info: 'Slick 轮播，强大响应式且性能优异的图片轮播解决方案，有非常丰富的配置选项，slick 官网自己调侃这是你最后使用的图片轮播',
                remarks: '查看',
              },
              {
                module: 'Views Slideshow',
                tatol: 3733,
                info: '视图轮播模块，该模块是最受欢迎的幻灯片模块，可放任何内容，高度定制\t',
                remarks: '查看',
              },
              {
                module: 'Colorbox',
                tatol: 3407,
                info: '轻量级高可定制幻灯片模块，高度集成在 Drupal 中，可放图片，Iframed 或者在线内容等等\t',
                remarks: '查看',
              },
              {
                module: 'Flex Slider',
                tatol: 8111,
                info: '响应式、可调整大小、适配浏览器和移动设备，支持移动设备手势滑动\t',
                remarks: '查看',
              },
              {
                module: 'Owl Carousel',
                tatol: 1000,
                info: '提供视图样式，字段格式化和管理 UI，支持响应式、移动手势、高定制幻灯片，CSS3 动画，JSON，有可用的回调，自定义事件等\t',
                remarks: '查看',
              },
            ],
          },
        },
        {
          label: '图表',
          icon: {
            svg: 'chart-line',
          },
          data: {
            toggle: [
              {
                label: '饼图',
                icon: {
                  name: 'pie_chart',
                  inline: true,
                },
                value: 'pie',
              },
              {
                label: '柱状图',
                icon: {
                  name: 'equalizer',
                  inline: true,
                },
                value: 'bar',
              },
              {
                label: '折线图',
                icon: {
                  name: 'show_chart',
                  inline: true,
                },
                value: 'line',
              },
            ],
          },
          content: {
            type: 'chart',
            title: {
              text: '年度活动金额预算',
              subtext: '南宁',
            },
            legend: {
              bottom: '10px',
            },
            tooltip: {
              trigger: 'axis',
            },
            dataset: {
              source: [
                ['红包预算', '2020', '2021', '2022'],
                ['第一季度', 3037, 4338, 3292],
                ['第二季度', 4762, 7251, 6732],
                ['第三季度', 6116, 3769, 8949],
              ],
            },
            xAxis: {
              type: 'category',
            },
            yAxis: {},
            series: [
              {
                type: 'bar',
              },
              {
                type: 'bar',
              },
              {
                type: 'bar',
              },
            ],
          },
        },
        {
          label: '面板',
          icon: {
            svg: 'format-line-weight',
          },
          content: {
            type: 'panel',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul><p>Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。</p><br>',
              spacer: 'sm',
            },
            elements: [
              {
                title: '组件驱动开发',
                icon: 'person',
                params: {
                  expanded: true,
                },
                elements: [
                  {
                    type: 'text',
                    spacer: 'none',
                    body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                  },
                ],
              },
              {
                title: '组件展示和测试',
                icon: 'faviores',
                elements: [
                  {
                    type: 'text',
                    spacer: 'none',
                    body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                  },
                ],
              },
              {
                title: '文档化',
                icon: 'faviores',
                elements: [
                  {
                    type: 'text',
                    spacer: 'none',
                    body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                  },
                ],
              },
              {
                title: '插件和工具生态系统',
                icon: 'faviores',
                elements: [
                  {
                    type: 'text',
                    spacer: 'none',
                    body: 'Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。',
                  },
                ],
              },
            ],
          },
        },
        {
          label: '幻灯片',
          icon: {
            svg: 'view-array-outline',
          },
          content: {
            type: 'swiper',
            params: {
              slidesPerView: 1.2,
              spaceBetween: 20,
              navigation: false,
              breakpoints: {
                '600': {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                '960': {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              },
            },
            classes: '',
            elements: [
              {
                type: 'card',
                title: '高性能',
                subTitle: 'High Performance',
                classes: 'card-no-shadow',
                body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto1.jpg',
                    alt: 'alt',
                  },
                },
              },
              {
                type: 'card',
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto7.jpg',
                    alt: 'alt',
                  },
                },
                title: '易用的编辑器',
                subTitle: 'Simplicity for Editors',
                classes: 'card-no-shadow',
                body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
              },
              {
                type: 'card',
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto2.jpg',
                    alt: 'alt',
                  },
                },
                title: '多语言',
                subTitle: 'Leader in Multilingual',
                classes: 'card-no-shadow',
                body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
              },
              {
                type: 'card',
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto3.jpg',
                    alt: 'alt',
                  },
                },
                title: '更有弹性',
                subTitle: 'Flexibility',
                classes: 'card-no-shadow',
                body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
              },
              {
                type: 'card',
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto4.jpg',
                    alt: 'alt',
                  },
                },
                title: '安全性',
                subTitle: 'Rigorous Security',
                classes: 'card-no-shadow',
                body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
              },
            ],
          },
        },
        {
          label: '感言',
          icon: {
            svg: 'format-wrap-square',
          },
          content: {
            type: 'testimonial',
            style: 'style-v2',
            title: 'Johnson',
            subTitle: 'FrontEnd',
            img: {
              src: '/assets/images/avatar/01.jpeg',
              alt: '',
            },
            body: '作为一名非专业的Web开发者，我曾经因为缺乏编码和设计技能而感到十分困惑。然而自从我开始使用Builder构建页面后，我的许多顾虑就消失了。',
          },
        },
        {
          label: '进度组',
          icon: {
            svg: 'format-list-group',
          },
          content: {
            type: 'progress-group',
            elements: [
              {
                label: 'HTML/CSS',
                value: 95,
              },
              {
                label: 'Angular/JavaScript',
                value: 79,
              },
              {
                label: 'Drupal',
                value: 60,
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
