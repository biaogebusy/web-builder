import { moduleMetadata, Meta } from '@storybook/angular';
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

export const Price = Template.bind({});
Price.storyName = '价格组件';
Price.args = {
  content: {
    type: 'showcase-1v4',
    spacer: 'lg',
    bg: {
      classes: 'bg- bg-fill-width',
    },
    row: 4,
    text: {
      title: {
        label: 'Charge your creative inspiration',
        style: 'style-v1',
        clsses: 'mat-display-4',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    elements: [
      {
        title: {
          label: 'FREE',
          classes: '',
        },
        type: 'card-1v6',
        prefix: '$',
        number: '0',
        suffix: '/mo',
        body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li></ul>',
        actionsAlign: 'start center',
        actions: [
          {
            type: 'btn',
            href: '/node/1',
            target: '_blank',
            label: 'Buy Now',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
      {
        title: {
          label: 'STARTER',
          classes: 'text-primary',
        },
        type: 'card-1v6',
        prefix: '$',
        number: '39',
        suffix: '/mo',
        classes: 'bg-light',
        body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li><li>Free Installment</li></ul>',
        actionsAlign: 'start center',
        actions: [
          {
            type: 'btn',
            href: '/node/1',
            target: '_blank',
            label: 'Buy Now',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
      {
        title: {
          label: 'PROFESSIONAL',
          classes: '',
        },
        type: 'card-1v6',
        prefix: '$',
        number: '59',
        suffix: '/mo',
        body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li><li>1 Domain Free</li><li>Enhanced Security</li></ul>',
        actionsAlign: 'start center',
        actions: [
          {
            type: 'btn',
            href: '/node/1',
            target: '_blank',
            label: 'Buy Now',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
      {
        title: {
          label: 'ULTIMATE',
          classes: '',
        },
        type: 'card-1v6',
        prefix: '$',
        number: '79',
        suffix: '/mo',
        body: '<ul class="list-done"><li>Full Access</li><li>Enhanced Security</li><li>Source Files</li><li>1 Domain Free</li><li>Free Installment</li></ul>',
        actionsAlign: 'start center',
        actions: [
          {
            type: 'btn',
            href: '/node/1',
            target: '_blank',
            label: 'Buy Now',
            mode: 'raised',
            color: 'primary',
          },
        ],
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
