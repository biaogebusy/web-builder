import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { Carousel1v2Component } from '@uiux/combs/carousel/carousel1v2/carousel1v2.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase2v1Story from '@stories/feature/showcase/showcase2v1.stories';
export default {
  title: '复合组件/幻灯片/1v2',
  id: 'carousel-1v2',
  component: Carousel1v2Component,
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
const {
  Default: { args: showcase2v1 },
} = showcase2v1Story as any;
Default.args = {
  content: {
    type: 'carousel-1v2',
    title: {
      label: 'Gallery',
      style: 'style-v6 line-full-width',
    },
    bg: {
      classes: 'bg-white bg-fill-width',
    },
    sliders: {
      params: {
        slidesPerView: 1.2,
        spaceBetween: 10,
        navigation: false,
        pagination: false,
        breakpoints: {
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      },
      classes: 'p-bottom',
      elements: [...showcase2v1.content.elements],
    },
  },
};

Default.play = async () => {
  const Next = screen.getByTestId('next');
  await userEvent.click(Next);
};
