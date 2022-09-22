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
import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
export default {
  title: '组件/showcase/1v3',
  component: Showcase1v3Component,
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

const Template: Story<Showcase1v3Component> = (args) => ({
  component: Showcase1v3Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: {
      label: 'Showcase 1v3',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-light',
    bg: {
      classes: 'bg-fill-width overlay overlay-20',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        style: {
          margin: '0 auto',
          'text-align': 'center',
          width: '600px',
        },
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren.',
      },
    ],
    actions: [
      {
        label: 'Read more',
        href: '#',
        style: 'style-v1',
        icon: 'verified_user',
      },
      {
        label: 'Learn more',
        href: '#',
        style: 'style-v1',
        icon: 'fingerprint',
      },
    ],
  },
};
