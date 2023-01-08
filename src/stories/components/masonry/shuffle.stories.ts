import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { ShuffleComponent } from '@uiux/combs/masonry/shuffle/shuffle.component';
import { sleep, StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/瀑布流/图片洗牌',
  id: 'shuffle',
  component: ShuffleComponent,
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
    title: {
      label: 'Our Blog',
      style: 'style-v1',
    },
    filter: [
      {
        label: '全部',
        value: 'all',
        selected: true,
      },
      {
        label: '设计',
        value: 'design',
      },
      {
        label: 'CMS',
        value: 'cms',
      },
      {
        label: '框架',
        value: 'frontEnd',
      },
    ],
    row: '4',
    elements: [
      {
        type: 'card',
        category: 'design',
        subTitle: '2016/03/04',
        avatar: {
          src: '/assets/images/showcase/weather.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'design',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/browser.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'cms,design',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/clipboard.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'frontEnd,drupal',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/console.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto4.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'design,cms',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto5.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'cms',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto6.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'design,frontEnd',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto7.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'drupal,frontEnd',
        subTitle: '2016/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
          alt: '',
        },
        carousel: {
          params: {
            slidesPerView: 1,
            navigation: false,
            autoplay: {
              delay: 5000,
            },
            breakpoints: null,
          },
          elements: [
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto8.jpg',
                alt: 'lazyload',
              },
            },
          ],
        },
        link: {
          href: '/node/1',
          label: 'FLAT LOGO DESIGN',
        },
      },
    ],
  },
};

Default.play = async () => {
  const Desige = screen.getByText('设计');
  await userEvent.click(Desige);

  await sleep(2000);
  const CMS = screen.getByText('CMS');
  await userEvent.click(CMS);

  await sleep(2000);
  const FW = screen.getByText('框架');
  await userEvent.click(FW);

  await sleep(2000);
  const All = screen.getByText('全部');
  await userEvent.click(All);
};
