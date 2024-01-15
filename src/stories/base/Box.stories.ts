import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { StorysModule } from '@core/module/storys.module';
import { IBox } from '@core/interface/widgets/IBox';
export default {
  title: '基本元素/内容盒子',
  id: 'box',
  component: BoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget p-y" fxFlex="33" fxLayoutAlign="center center">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Box 容器包含了 Icon、标题、内容和链接的组合显示',
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const StyleV1 = Template.bind({});
const v1: IBox = {
  type: 'box',
  style: 'style-v1',
  icon: {
    name: 'fingerprint',
  },
  title: {
    href: '/',
    label: '组件编辑',
  },
  content: '通过简单的管理界面对复杂的可视化编辑',
  more: {
    href: '#',
    label: '更多',
  },
};

StyleV1.args = {
  content: v1,
};

export const StyleV2 = Template.bind({});
const v2: IBox = {
  ...StyleV1.args.content,
  style: 'style-v2',
  icon: {
    name: 'verified_user',
  },
};

StyleV2.args = {
  content: v2,
};

export const StyleV3 = Template.bind({});
const v3: IBox = {
  ...StyleV2.args.content,
  style: 'style-v3',
};

StyleV3.args = {
  content: v3,
};

export const StyleV4 = Template.bind({});
const v4: IBox = {
  ...StyleV2.args.content,
  style: 'style-v4',
};

StyleV4.args = {
  content: v4,
};

export const StyleV5 = Template.bind({});
const v5: IBox = {
  ...StyleV2.args.content,
  style: 'style-v5',
};

StyleV5.args = {
  content: v5,
};

export const StyleV6 = Template.bind({});
const v6: IBox = {
  ...StyleV2.args.content,
  style: 'style-v6',
};
StyleV6.args = {
  content: v6,
};

export const StyleV7 = Template.bind({});
const v7: IBox = {
  ...StyleV2.args.content,
  style: 'style-v7',
};
StyleV7.args = {
  content: v7,
};

export const StyleV9 = Template.bind({});
const v9: IBox = {
  ...StyleV1.args.content,
  style: 'style-v9',
};
StyleV9.args = {
  content: v9,
};

export const StyleV10 = Template.bind({});
const v10: IBox = {
  ...StyleV1.args.content,
  style: 'style-v10',
};
StyleV10.args = {
  content: v10,
};

export const Primary = Template.bind({});
const primary: IBox = {
  type: 'box',
  img: { src: '/assets/images/svg/Asset187.svg', alt: 'browser' },
  style: 'style-v3 use-image',
  title: { href: '#', label: '高性能' },
  content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
};

Primary.args = {
  content: primary,
};
