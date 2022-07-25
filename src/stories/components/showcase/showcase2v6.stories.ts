import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Showcase2v6Component } from '@uiux/combs/showcase/showcase2v6/showcase2v6.component';
export default {
  title: 'Components/showcase/2v6',
  component: Showcase2v6Component,
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

const Template: Story<Showcase2v6Component> = (args) => ({
  component: Showcase2v6Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>',
    },
    spacer: 'md',
    row: '2',
    fullWidth: true,
    elements: [
      {
        type: 'card-1v2',
        link: {
          href: '#',
          label: 'Sustainability Toolkit: What GCs Need to Know',
        },
        subTitle: 'TOOLKIT',
        img: {
          href: '#',
          src: '/assets/images/showcase/card-1v2-1.jpg',
          alt: 'alt',
        },
        bg: {
          classes: 'object-fit',
          img: {
            hostClasses: '',
            src: '/assets/images/showcase/pattern-01.png',
          },
        },
      },
      {
        type: 'card-1v2',
        link: {
          href: '#',
          label: 'Global Problem Solving from Covington',
        },
        subTitle: 'CASE STUDIES',
        img: {
          href: '#',
          src: '/assets/images/showcase/card-1v2-2.jpg',
          alt: 'alt',
        },
        bg: {
          classes: 'object-fit',
          img: {
            hostClasses: '',
            src: '/assets/images/showcase/pattern-02.png',
          },
        },
      },
    ],
  },
};
