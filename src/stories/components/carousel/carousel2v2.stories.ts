import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel2v2Component } from '@uiux/combs/carousel/carousel2v2/carousel2v2.component';
import { StorysModule } from '@core/module/storys.module';
export default {
  title: '复合组件/幻灯片/2v2',
  id: 'carousel-2v2',
  component: Carousel2v2Component,
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
    type: 'carousel-2v2',
    id: '',
    spacer: 'xl',
    classes: 'bg-primary',
    'classes-': 'bg-shadow',
    sliders: {
      params: {
        slidesPerView: 1.2,
        pagination: false,
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
      },
      elements: [
        {
          type: 'img',
          src: '/assets/images/logo/logo7.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo9.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo10.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo11.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo12.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo7.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo10.png',
          href: '#',
          alt: '',
        },
      ],
    },
  },
};
