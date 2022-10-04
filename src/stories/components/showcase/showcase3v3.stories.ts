import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase3v3Component } from '@uiux/combs/showcase/showcase3v3/showcase3v3.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory } from '@core/factory/factory';
export default {
  title: '组件/展示/3v3',
  component: Showcase3v3Component,
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
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
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
    title: {
      label: 'Blog title for sample',
      href: '#',
    },
    spacer: 'none',
    date: '12/09/2016',
    commentCount: '2',
    category: 'Design',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est',
    details: {
      label: 'Read more',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};

export const Image = Template.bind({});

Image.args = {
  content: {
    title: {
      label: 'Blog title for sample',
      href: '#',
    },
    spacer: 'none',
    showImage: true,
    feature: {
      fullIcon: 'fullscreen',
      openIcon: 'open_in_new',
      ratios: 'media-16-9',
      link: '#',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/blog1-large.jpeg',
        alt: 'lazyload',
      },
    },
    date: '12/09/2016',
    commentCount: '2',
    category: 'Design',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est',
    details: {
      label: 'Read more',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};
