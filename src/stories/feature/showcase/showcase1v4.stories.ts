import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Showcase1v4Component } from '@uiux/combs/showcase/showcase1v4/showcase1v4.component';

export default {
  title: '特色组件/展示 Showcase/1v4',
  id: 'showcase-1v4',
  component: Showcase1v4Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
    type: 'showcase-1v4',
    spacer: 'lg',
    bg: {
      classes: 'bg- bg-fill-width',
    },
    row: 3,
    text: {
      title: {
        label: 'Work Process',
        style: 'style-v1',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    elements: [
      {
        type: 'card-1v5',
        title: 'Discuss The Project',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 01.',
          icon: {
            svg: 'chevron-double-right',
          },
        },
      },
      {
        type: 'card-1v5',
        title: 'Develop & Elaborate',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 02.',
          icon: {
            svg: 'chevron-double-right',
          },
        },
      },
      {
        type: 'card-1v5',
        title: 'Final Approvement',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 03.',
          icon: {
            svg: 'check-all',
          },
        },
      },
    ],
    actions: [
      {
        type: 'btn-animate',
        label: '了解更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    ],
  },
};

export const Dynamic = Template.bind({});

Dynamic.args = {
  content: {
    type: 'showcase-1v4',
    spacer: 'lg',
    bg: {
      classes: 'bg- bg-fill-width',
    },
    row: 2,
    text: {
      title: {
        label: 'Our Latest Projects',
        style: 'style-v1',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    elements: [
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: 'Iphone mockup',
        },
        user: '表歌',
        time: '2022/09/27',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/1.jpg',
            alt: 'alt',
          },
        },
        moreLabel: '查看更多',
      },
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: 'Mockup Collection',
        },
        user: '表歌',
        time: '2022/09/27',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/2.jpg',
            alt: 'alt',
          },
        },
        moreLabel: '查看更多',
      },
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: 'Abstract images',
        },
        user: '表歌',
        time: '2022/09/27',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/3.jpg',
            alt: 'alt',
          },
        },
        moreLabel: '查看更多',
      },
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: 'Yellow bg with Books',
        },
        user: '表歌',
        time: '2022/09/27',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/4.jpg',
            alt: 'alt',
          },
        },
        moreLabel: '查看更多',
      },
    ],
    actions: [
      {
        type: 'btn-animate',
        label: '了解更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    ],
  },
};
