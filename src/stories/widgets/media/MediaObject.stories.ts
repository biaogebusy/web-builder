import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础/媒体/媒体对象',
  id: 'media-object',
  component: MediaObjectComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
    img: {
      src: '/assets/images/logo/codepen.svg',
      style: {
        width: '45px',
        height: '45px',
      },
      alt: 'logo',
    },
    meta: '2017-08',
    title: '前端开发工程师',
    subTitle: '字节跳动',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
};
