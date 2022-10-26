import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Hero2v1Component } from '@uiux/combs/hero/hero2v1/hero2v1.component';
import { SwiperModule } from 'swiper/angular';
import { StorysModule } from '@core/storys.module';

export default {
  title: '复合组件/英雄区/2v1',
  id: 'hero-2v1',
  component: Hero2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SwiperModule, StorysModule.forRoot()],
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
          type: 'btn',
          mode: 'raised',
          color: 'primary',
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
YCenter.storyName = 'Y轴中心';
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
          type: 'btn',
          mode: 'raised',
          color: 'primary',
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
YCenterXCustom.storyName = 'Y 轴中心 X 轴自定义';
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
          type: 'btn',
          mode: 'raised',
          color: 'primary',
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
XYCustom.storyName = 'XY 轴自定义';
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
          type: 'btn',
          mode: 'raised',
          color: 'primary',
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
