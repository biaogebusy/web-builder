import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { ArticleComponent } from '@uiux/combs/node/article/article.component';
import { NodeModule } from '@uiux/combs/node/node.module';
import * as MediaListStories from 'src/stories/widgets/media/MediaList.stories';
import * as MeunListStories from 'src/stories/widgets/MeunList.stories';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { StorysModule, sleep } from '@core/storys.module';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { comments } from './comments.json';

export default {
  title: '示例页面/内容类型/小程序广告',
  id: 'advert',
  component: ArticleComponent,
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
    title: '金秋丰收季，爆款惠不停（文末福利持续加码中）',
    config: {
      node: {
        entityId: '28',
        uuid: '0583f653-978b-4d9f-9b90-880db2dc5021',
      },
    },
    body: [
      {
        type: 'advert',
        title: '金秋丰收季，爆款惠不停（文末福利持续加码中）',
        store: {
          logo: '/sites/xhb.zhaobg.com/files/2022-09/%E5%A4%A7%E6%B4%8Blogo.png',
          name: '大洋购物广场',
        },
        date: {
          start: '2022/09/11',
          end: '2022/10/01',
        },
        body: '<img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="18392432-548f-461d-a787-92f2252a3d46" src="/sites/xhb.zhaobg.com/files/inline-images/1_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="79e382c5-0043-4d8a-8b02-a28f0c62e45b" src="/sites/xhb.zhaobg.com/files/inline-images/2.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="2924f9f1-bb7a-4ebe-9d18-433631e4d8c2" src="/sites/xhb.zhaobg.com/files/inline-images/3_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="03f0bf4e-d29a-48be-a1c6-9e9d30d7db26" src="/sites/xhb.zhaobg.com/files/inline-images/4_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="d70c4ed3-848b-45ab-bcdf-6ac91aa54d99" src="/sites/xhb.zhaobg.com/files/inline-images/6_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="187bf9a5-6c24-4bcd-bff7-c14d3c8e0d12" src="/sites/xhb.zhaobg.com/files/inline-images/7_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="31bc5dda-bdcf-4c90-afbd-6045cada6f37" src="/sites/xhb.zhaobg.com/files/inline-images/8_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="1f9a1d0f-b5e6-45a4-a223-efcbcf895ce4" src="/sites/xhb.zhaobg.com/files/inline-images/9_0.jpg" /><img alt="1" data-align="center" data-entity-type="file" data-entity-uuid="b5f404a7-8de3-48d9-82e2-a95ef811d9b0" src="/sites/xhb.zhaobg.com/files/inline-images/10_0.jpg" />\r\n<p>&nbsp;</p>\r\n',
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
        succes: {
          label: '成功发布！',
        },
      },
    ],
  },
  canAccess: true,
};
