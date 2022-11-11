import {
  moduleMetadata,
  Meta,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础组件/基本元素/图片',
  id: 'img',
  component: ImgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative" fxFlex="300px" style="height:300px">${story}</div>`
    ),
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
    classes: 'object-fit',
    src: '/assets/images/cases/porto2.jpg',
    alt: 'alt',
  },
};

export const ImgWithLink = Template.bind({});
ImgWithLink.storyName = '带链接';
ImgWithLink.args = {
  content: {
    ...Default.args.content,
    href: '#',
    target: '_blank',
  },
};
