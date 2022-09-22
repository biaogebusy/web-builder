import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Hero2v1Component } from '@uiux/combs/hero/hero2v1/hero2v1.component';
export default {
  title: '组件/英雄区/2v1',
  component: Hero2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
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

const Template: Story<Hero2v1Component> = (args) => ({
  component: Hero2v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
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
};

export const YCenter = Template.bind({});

YCenter.args = {
  content: {
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
};

export const YCenterXCustom = Template.bind({});

YCenterXCustom.args = {
  content: {
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
};

export const XYCustom = Template.bind({});

XYCustom.args = {
  content: {
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
};
