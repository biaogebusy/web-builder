import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
export default {
  title: '组件/幻灯片/1v4',
  component: Carousel1v1Component,
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
  parameters: {
    docs: {
      description: {
        component: `该幻灯片组件可自定义内部的文字所在的位置。`,
      },
    },
  },
} as Meta;

const Template: Story<Carousel1v1Component> = (args) => ({
  component: Carousel1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'carousel-1v1',
    spacer: 'lg',
    title: {
      label: 'Meet the team',
      icon: 'email',
      style: 'style-v2',
      classes: 'mat-display-1',
    },
    disableContainer: true,
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: false,
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: 'light text, and xy center',
              style: 'style-v1',
              classes: 'mat-display-4',
            },
            spacer: 'xl',
            classes: 'xy-center',
            'style-': {
              width: '50%',
              left: '0%',
              top: '5%',
            },
            bg: {
              classes: 'bg-shadow overlay overlay-80',
              img: {
                src: '/assets/images/hero/1-6.jpg',
                mobile: '/assets/images/mobile/mobile-03.jpg',
              },
            },
            body: 'The Vabeen’PLUM is designed with a 12ml ultra-large capacity tank to provide more vaping enjoyment than similar products. Every drop of e-liquid maximizes its value. Approx. 3500puffs per pod, which can last a week, free you from frequently filling.The translucent tank allows you to clearly observe the capacity of e - liquid.&nbsp;',
            actionsAlign: 'center center',
            actions: [
              {
                href: '#',
                label: 'Get Started',
              },
              {
                type: 'closeDialog',
                label: 'Ok',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: 'Light text, Y center, enable overlay',
              style: 'style-v4',
              classes: 'mat-display-1',
            },
            spacer: 'xl',
            style: {
              width: '50%',
            },
            classes: 'y-center',
            bg: {
              classes: 'bg-shadow overlay overlay-80',
              img: {
                src: '/assets/images/hero/329.jpg',
                mobile: '/assets/images/mobile/mobile-04.jpg',
              },
            },
            body: 'The Vabeen’PLUM is designed with a 12ml ultra-large capacity tank to provide more vaping enjoyment than similar products. Every drop of e-liquid maximizes its value. Approx. 3500puffs per pod, which can last a week, free you from frequently filling.The translucent tank allows you to clearly observe the capacity of e - liquid. <br> <br>*individual user experience may vary, depending on usage',
            actionsAlign: 'start center',
            actions: [
              {
                href: '#',
                label: 'Get Started',
              },
              {
                type: 'closeDialog',
                label: 'Ok',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: '',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: 'Base text, Y center, X custom, enable overlay',
              style: 'style-v4',
              classes: 'mat-display-1',
            },
            spacer: 'xl',
            style: {
              width: '50%',
              left: '50%',
            },
            classes: 'y-center',
            bg: {
              classes: 'bg-shadow overlay overlay-20',
              img: {
                src: '/assets/images/hero/light-bg.jpeg',
                mobile: '/assets/images/mobile/follower-04.jpg',
              },
            },
            body: 'The Vabeen’PLUM is designed with a 12ml ultra-large capacity tank to provide more vaping enjoyment than similar products. Every drop of e-liquid maximizes its value. Approx. 3500puffs per pod, which can last a week, free you from frequently filling.The translucent tank allows you to clearly observe the capacity of e - liquid. <br> <br>*individual user experience may vary, depending on usage',
            actionsAlign: 'start center',
            actions: [
              {
                href: '#',
                label: 'Get Started',
              },
              {
                type: 'closeDialog',
                label: 'Ok',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: 'Base text, XY custom, enable overlay',
              style: 'style-v4',
              classes: 'mat-h2',
            },
            spacer: 'xl',
            style: {
              width: '50%',
              left: '40%',
              top: '10%',
            },
            classes: 'position-absolute',
            bg: {
              classes: 'bg-shadow overlay overlay-80',
              img: {
                src: '/assets/images/hero/light-bg.jpeg',
                mobile: '/assets/images/mobile/mobile-02.jpg',
              },
            },
            body: 'The Vabeen’PLUM is designed with a 12ml ultra-large capacity tank to provide more vaping enjoyment than similar products. Every drop of e-liquid maximizes its value. Approx. 3500puffs per pod, which can last a week, free you from frequently filling.The translucent tank allows you to clearly observe the capacity of e - liquid. <br> <br>*individual user experience may vary, depending on usage',
            actionsAlign: 'start center',
            actions: [
              {
                href: '#',
                label: 'Get Started',
              },
              {
                type: 'closeDialog',
                label: 'Ok',
              },
            ],
          },
        },
      ],
    },
  },
};
