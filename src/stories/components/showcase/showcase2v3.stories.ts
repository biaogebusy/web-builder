import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase2v3Component } from '@uiux/combs/showcase/showcase2v3/showcase2v3.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/展示/2v3',
  component: Showcase2v3Component,
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
    componentWrapperDecorator((story) => `${story}`),
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
    spacer: 'md',
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'display-v2',
      },
    },
    bg: {
      classes: 'bg-fill-width',
      img: {
        hostClasses: '',
        src: '/assets/images/illustration/home-shape.png',
        mobile: '/assets/images/illustration/home-shape.png',
      },
    },
    row: '3',
    elements: [
      {
        title: 'PUFF<br>BAR',
        subTitle: '400 puffs<br>17 Flavors',
        link: {
          label: 'More',
          href: '#',
          color: 'primary',
        },
        img: {
          src: '/assets/images/showcase/arc.png',
          alt: 'arcvap',
          href: '#',
        },
      },
      {
        title: 'PUFF<br>BAR',
        subTitle: '400 puffs<br>17 Flavors',
        link: {
          label: 'More',
          href: '#',
          color: 'primary',
        },
        img: {
          src: '/assets/images/showcase/arc.png',
          alt: 'arcvap',
          href: '#',
        },
      },
      {
        title: 'PUFF<br>BAR',
        subTitle: '400 puffs<br>17 Flavors',
        link: {
          label: 'More',
          href: '#',
          color: 'primary',
        },
        img: {
          src: '/assets/images/showcase/arc.png',
          alt: 'arcvap',
          href: '#',
        },
      },
    ],
  },
};
