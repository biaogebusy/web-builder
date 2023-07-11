import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';

export default {
  title: '复合组件/幻灯片/时间轴',
  id: 'lineyear',
  component: Carousel1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '时间轴';
const content: ICarouselBase = {
  type: 'carousel-1v1',
  title: {
    label: '信使更新日志',
    style: 'style-v1',
  },
  style: 'text-dark',
  classes: '',
  bg: {
    classes: 'bg-white bg-fill-width',
    img: {
      src: '/assets/images/map.png',
      hostClasses: 'bg-center',
    },
  },
  sliders: {
    params: {
      slidesPerView: 1.2,
      spaceBetween: 20,
      navigation: false,
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'line-year',
        title: '2022/10/09',
        body: `- 移除 mobx-angular；<br>
                - 移除了 ngx-swiper-wrapper 模块依赖；<br>
                - user 通过 useFactory provider 注入；<br>
                - 更新了 storybook 文档；<br>
                - 修复打包报错的问题；<br>
                - 升级 angular 至 11.2.14 版本；<br>
                - 修复最新版无法 build 的问题；`,
      },
      {
        type: 'line-year',
        title: '2022/10/13',
        body: `- 优化了 Storybook import 和 provider；<br>
          - 新建了 StoryModule 统一处理；<br>- 添加了 Storybook 的 play function；`,
      },
      {
        type: 'line-year',
        title: '2022/10/25',
        body: `- 添加了视频播放组件，基于 Video.js；<br>
                - 添加了 btn-video widget；<br>
                - Storybook 升级到 6.5.13;<br>
                - 移除了分散在各处的 api 请求缓存;`,
      },
      {
        type: 'line-year',
        title: '2022/10/31',
        body: `- 使用 MDI 扩展了 icons 库；<br>
                - 添加了 gsap 动画库;<br>
                - 表格默认可以单元格 Sort 排序；<br>
                - 应用可通过 Drawer 参数开启；<br>`,
      },
      {
        type: 'line-year',
        title: '2022/12/27',
        body: `- 动态导入模块组件；<br>
                - 添加了 Manage sidebar 管理边栏<br>
                - 添加了 View Map 通用型地图映射组件；`,
      },
    ],
  },
};
Default.args = {
  content,
};
