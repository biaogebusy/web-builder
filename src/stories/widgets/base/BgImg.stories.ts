import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/基本元素/背景图',
  id: 'bg-img',
  component: BgImgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative" style="z-index:1;height:400px;overflow:hidden">
        ${story}</div>`
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
    type: 'bg-img',
    img: {
      src: '/assets/images/bg/bg-03.jpeg',
      classes: 'object-fit',
    },
  },
};

export const Opacity = Template.bind({});
Opacity.storyName = '不透明度';
Opacity.args = {
  content: {
    type: 'bg-img',
    classes: 'bg-fill-width overlay overlay-80',
    img: {
      src: '/assets/images/bg/bg-03.jpeg',
      classes: 'object-fit',
    },
  },
};
