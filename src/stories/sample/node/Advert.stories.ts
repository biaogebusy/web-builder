import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ArticleComponent } from '@uiux/combs/node/article/article.component';
import { NodeModule } from '@uiux/combs/node/node.module';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { StorysModule, sleep } from '@core/storys.module';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { comments } from './comments.json';
import { AdvertComponent } from '@uiux/combs/node/advert/advert.component';

export default {
  title: '示例页面/内容类型/小程序广告',
  id: 'advert',
  component: AdvertComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [LoginComponent, DialogComponent],
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
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.args = {
  content: {
    type: 'advert',
    title: '金秋丰收季，爆款惠不停（文末福利持续加码中）',
    store: {
      logo: 'https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/2022-09/%E5%A4%A7%E6%B4%8Blogo.png',
      name: '大洋购物广场',
    },
    date: {
      start: '2022/09/11',
      end: '2022/10/01',
    },
    body: '<img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/1_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/2.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/3_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/4_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/6_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/7_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/8_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/9_0.jpg" /><img alt="1" data-align="center" src="https://xhb.zhaobg.com/sites/xhb.zhaobg.com/files/inline-images/10_0.jpg" />\r\n<p>&nbsp;</p>\r\n',
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
      redpacket: [],
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
  },
};
