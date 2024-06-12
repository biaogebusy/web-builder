import { moduleMetadata, Meta } from '@storybook/angular';

import { Hero2v2Component } from '@uiux/combs/hero/hero2v2/hero2v2.component';
import { StorysModule } from '@core/module/storys.module';
import { IHero2v2 } from '@core/interface/combs/IHero';

const meta: Meta<MyComponent> = {
  title: '特色组件/首屏/2v2',
  id: 'hero-2v2',
  component: Hero2v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: IHero2v2 = {
  type: 'hero-2v2',
  spacer: 'lg',
  id: 'xxx',
  bg: {
    classes: 'bg-fill-width overlay',
    img: {
      classes: 'object-fit',
      src: '/assets/images/16-9/business-16.jpeg',
    },
  },
  classes: '',
  body: {
    type: 'text',
    title: {
      label: '开源项目使用 Github actions 自动化',
      style: 'style-v4',
      classes: 'mat-display-1',
    },
    body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
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
};

Default.args = {
  content,
};
