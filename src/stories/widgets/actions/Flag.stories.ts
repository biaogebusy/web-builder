import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { FlagComponent } from '@uiux/widgets/actions/flag/flag.component';
import { StorysModule } from '@core/module/storys.module';
import { IFlag } from '@core/interface/widgets/IFlag';

export default {
  title: '基础组件/Actions/收藏',
  id: 'flag',
  component: FlagComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `收藏功能使用 JSONAPI 来做查询和提交，两个前提条件：1. 全局已经开启了收藏功能；2. 用户已登录；`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
// Raname Story
Default.storyName = '预览';
const content: IFlag = {
  type: 'flag',
  label: '收藏',
  icon: {
    name: 'star',
    inline: true,
  },
  params: {
    type: 'flagging--favorite',
    entity_type: 'node',
    entity_id: '1312',
    relationships: {
      flagged_entity: {
        type: 'node--article',
        id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
      },
    },
  },
};

Default.args = {
  content,
};
