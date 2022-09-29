import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Carousel2v1Component } from '@uiux/combs/carousel/carousel2v1/carousel2v1.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/幻灯片/2v1',
  component: Carousel2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
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
export const Default = Template.bind({});

Default.args = {
  content: {
    title: {
      label: 'WHAT THEY SAY ABOUT ME',
      style: 'style-v1',
    },
    bg: {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        src: '/assets/images/bg-03.jpeg',
        hostClasses: 'bg-center',
      },
    },
    sliders: {
      params: {
        slidesPerView: 1,
        pagination: false,
        autoplay: {
          delay: 5000,
        },
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'testimonial',
          style: 'style-v2',
          title: 'Johnson',
          subTitle: 'FrontEnd',
          img: {
            src: '/assets/images/client1.jpeg',
            alt: '',
          },
          body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        },
        {
          type: 'testimonial',
          style: 'style-v2',
          title: 'Will',
          subTitle: 'FrontEnd',
          img: {
            src: '/assets/images/client2.jpeg',
            alt: '',
          },
          body: 'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。 ',
        },
        {
          type: 'testimonial',
          style: 'style-v2',
          title: 'Ammy',
          subTitle: 'Backend',
          img: {
            src: '/assets/images/client3.jpeg',
            alt: '',
          },
          body: 'Sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
        },
        {
          type: 'testimonial',
          style: 'style-v2',
          title: 'Alen',
          subTitle: 'FrontEnd',
          img: {
            src: '/assets/images/client4.jpeg',
            alt: '',
          },
          body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
        },
      ],
    },
  },
};

export const Light = Template.bind({});
Light.storyName = '自定义背景不透明度';
Light.args = {
  content: {
    ...Default.args.content,
    bg: {
      classes: 'bg-fill-width overlay overlay-60',
    },
  },
};
