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
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: 'Components/showcase/1v1',
  component: Showcase1v1Component,
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
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-top-xl m-top-xl" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<Showcase1v1Component> = (args) => ({
  component: Showcase1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    classes: 'features-absolute',
    spacer: 'lg',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: 4,
    elements: [
      {
        icon: {
          svg: 'zhihu',
          inline: true,
        },
        style: 'style-v9',
        title: {
          href: '#',
          label: 'Best Financial Advice',
        },
        content: 'The most well-known which is said to have originated',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v9',
        title: {
          href: '#',
          label: 'Authorised Finance Brand',
        },
        content: 'The most well-known which is said to have originated',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v9',
        title: {
          href: '#',
          label: 'Compehensive Advices',
        },
        content: 'The most well-known which is said to have originated',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v9',
        title: {
          href: '#',
          label: 'Best Tax Advantages',
        },
        content: 'The most well-known which is said to have originated',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
    ],
  },
};

export const StyleV1 = Template.bind({});

StyleV1.args = {
  content: {
    title: {
      label: 'Showcase 1 v1 style v1',
      style: 'style-v1',
    },
    row: 4,
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v1',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v1',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v1',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v1',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};

export const StyleV2 = Template.bind({});

StyleV2.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v2',
      style: 'style-v2',
      icon: 'mail',
    },
    row: 4,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v2',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v2',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v2',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v2',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};

export const StyleV3 = Template.bind({});

StyleV3.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v3',
      style: 'style-v3',
    },
    row: 4,
    style: 'style-v3',
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v3',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v3',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v3',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v3',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};

export const StyleV4 = Template.bind({});

StyleV4.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v4',
      style: 'style-v4',
    },
    row: 4,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    elements: [
      {
        style: 'style-v4',
        icon: {
          name: 'verified_user',
        },
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v4',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v4',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v4',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};

export const StyleV5 = Template.bind({});

StyleV5.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v5',
      style: 'style-v5',
    },
    row: 4,
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v5',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v5',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v5',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v5',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};

export const StyleV6 = Template.bind({});

StyleV6.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v6',
      style: 'style-v6',
    },
    row: 4,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v6',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v6',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v6',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v6',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
    ],
  },
};

export const StyleV7 = Template.bind({});

StyleV7.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v7',
      style: 'style-v7',
    },
    row: 4,
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v7',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v7',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v7',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v7',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: 'Read More',
        },
      },
    ],
  },
};
