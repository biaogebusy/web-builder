import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
export default {
  title: '示例页面/首页示例/12 工作室',
  id: 'home-v12',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...defaultHeader,
            ...footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      <div style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: '工作室',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    {
      spacer: 'lg',
      id: 'xxx',
      type: 'hero-2v2',
      bg: {
        classes: 'bg-fill-width overlay',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-16.jpeg',
        },
      },
      body: {
        type: 'text',
        title: {
          label:
            'Present Your Work With <span class="text-primary">Landrick</span> Studio',
          style: 'style-v4',
          classes: 'mat-display-1',
        },
        body: '<p>Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.</p>',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: '了解更多',
            icon: {
              name: 'chat',
              inline: true,
            },
          },
        ],
      },
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      classes: 'bg-shadow',
      sliders: {
        params: {
          slidesPerView: 1.2,
          pagination: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          },
        },
        elements: [
          {
            type: 'img',
            src: '/assets/images/logo/amazon.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/google.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/lenovo.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/paypal.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/shopify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/spotify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/logo10.png',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
        ],
      },
    },
    {
      type: 'showcase-1v4',
      spacer: 'md',
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
    },
    {
      type: 'showcase-1v4',
      spacer: 'md',
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
    {
      type: 'text',
      title: {
        label: 'See everything about your workplace',
        style: 'style-v1',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
      spacer: 'lg',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn',
          mode: 'raised',
          color: 'primary',
          href: '#',
          label: 'Buy Now',
        },
      ],
    },
  ],
});
Page.args = {
  pageContent$: content,
};
