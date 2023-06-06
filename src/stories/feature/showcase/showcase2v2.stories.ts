import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v2Component } from '@uiux/combs/showcase/showcase2v2/showcase2v2.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/展示 Showcase/2v2',
  id: 'showcase-2v2',
  component: Showcase2v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
    type: 'showcase-2v2',
    text: {
      title: {
        label: 'Xinshi Product List',
        style: 'style-v1',
        classes: 'mat-display-0 bold',
      },
      body: '<p class="text-center">Wlecome share your story!</p>',
    },
    row: '4',
    elements: [
      {
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
              ratios: 'media-140',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'lazyload',
              },
            },
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-140',
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
        body: '<ul><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
      {
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
              ratios: 'media-140',
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
        body: '<ul class="list-done"><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
      {
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
              ratios: 'media-140',
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
        body: '<ul class="list-done"><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
      {
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
              ratios: 'media-140',
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
        body: '<ul class="list-done"><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
      {
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
              ratios: 'media-140',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto6.jpg',
                alt: 'lazyload',
              },
            },
            {
              type: 'feature-box',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-140',
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
        body: '<ul><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
      {
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
              ratios: 'media-140',
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
        body: '<ul class="list-done"><li>Stylish Desige</li><li>4 Airflow Options</li><li>Type-C Charging</li></ul>',
      },
    ],
  },
};
