import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { StorysModule } from '@core/module/storys.module';
import { AdvertComponent } from '@uiux/combs/node/advert/advert.component';
import { comments } from './comments.json';
import { of } from 'rxjs';

export default {
  title: '示例页面/内容类型/小程序预览',
  id: 'advert',
  component: AdvertComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), UserModule, NodeModule],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `通用的普遍文章，一般包含标题和内容相关属性信息，还包括文章相关联的数据等等。`,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content = {
  type: 'advert',
  title: '金秋丰收季，爆款惠不停',
  store: {
    logo: '/assets/images/logo/google.svg',
    name: '购物广场',
  },
  date: {
    start: '2022/09/11',
    end: '2022/10/01',
  },
  body: '<img alt="1" data-align="center" src="/assets/images/1-1/business-01.png" /><img alt="1" data-align="center" src="/assets/images/1-1/business-02.png" /><img alt="1" data-align="center" src="/assets/images/1-1/business-03.png" />',
  view: '50',
  params: {
    comment: {
      type: 'comment--advert_comment',
      attributes: {
        entity_type: 'node',
        field_name: 'comment',
      },
      relationships: {
        comment_type: {
          data: {
            type: 'comment_type--comment_type',
            id: 'bc6d70b1-b12f-42d9-b99f-e18d5f6615f3',
          },
        },
        entity_id: {
          data: {
            type: 'node--advert',
            id: '0583f653-978b-4d9f-9b90-880db2dc5021',
          },
        },
      },
    },
  },
  actions: [
    {
      type: 'share',
      button: {
        icon: 'share',
        label: '分享',
      },
      params: {
        url: '/node/28',
      },
    },
    {
      type: 'flag',
      label: '收藏',
      icon: {
        name: 'star',
        inline: true,
      },
      params: {
        type: 'flagging--favorite',
        entity_type: 'node',
        entity_id: '28',
        relationships: {
          flagged_entity: {
            type: 'node--advert',
            id: '0583f653-978b-4d9f-9b90-880db2dc5021',
          },
        },
      },
    },
    {
      label: '导航到店',
      icon: {
        name: 'location2',
        inline: true,
      },
      params: {
        lat: ',',
      },
    },
  ],
  editor: {
    label: '输入评论内容',
    dialog: {
      title: '添加评论',
      placeholder: '请输入评论',
    },
  },
  comment: {
    actions: ['update', 'delete', 'reply'],
    title: true,
  },
  succes: {
    label: '成功发布！',
  },
};
Default.args = {
  content,
  comments$: of(comments),
};
