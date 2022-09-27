import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { SwiperComponent } from 'ngx-swiper-wrapper';

export default {
  title: '基础/Swiper',
  component: SwiperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule, RouterTestingModule],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
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
};
