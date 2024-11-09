import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { StorysModule } from '@core/module/storys.module';
import { IBox } from '@core/interface/widgets/IBox';
import { importProvidersFrom } from '@angular/core';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { MatIcon } from '@angular/material/icon';

const meta: Meta<BoxComponent> = {
  title: '基本元素/内容盒子',
  id: 'box',
  component: BoxComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [
        ...StorysModule.forEntryComponents(),
        SafeHtmlPipe,
        MatIcon,
      ],
    }),
    componentWrapperDecorator(
      story =>
        `<div class="widget p-y flex w-[300px] justify-center items-center">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Box 容器包含了 Icon、标题、内容和链接的组合显示',
      },
    },
  },
};

export default meta;

type Story = StoryObj<BoxComponent>;

export const StyleV1: Story = {};
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

const v2: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v2',
};

export const StyleV2: Story = {};

StyleV2.args = {
  content: v2,
};

const v3: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v3',
};
export const StyleV3: Story = {};

StyleV3.args = {
  content: v3,
};

const v4: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v4',
};
export const StyleV4: Story = {};
StyleV4.args = {
  content: v4,
};

const v5: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v5',
};
export const StyleV5: Story = {};
StyleV5.args = {
  content: v5,
};

const v6: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v6',
};
export const StyleV6: Story = {};
StyleV6.args = {
  content: v6,
};

const v7: IBox = {
  ...v1,
  icon: {
    name: 'verified_user',
  },
  style: 'style-v7',
};

export const StyleV7: Story = {};
StyleV7.args = {
  content: v7,
};

const v9: IBox = {
  ...v1,
  style: 'style-v9',
};

export const StyleV9: Story = {};
StyleV9.args = {
  content: v9,
};

const v10: IBox = {
  ...v1,
  style: 'style-v10',
};

export const StyleV10: Story = {};
StyleV10.args = {
  content: v10,
};

const primary: IBox = {
  type: 'box',
  img: { src: '/assets/images/svg/Asset187.svg', alt: 'browser' },
  style: 'style-v3 use-image',
  title: { href: '#', label: '高性能' },
  content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
};

export const Primary: Story = {};
Primary.args = {
  content: primary,
};
