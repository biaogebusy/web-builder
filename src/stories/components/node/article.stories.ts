import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ArticleComponent } from '@uiux/combs/node/article/article.component';
import { NodeModule } from '@uiux/combs/node/node.module';
import * as MediaListStories from 'src/stories/widgets/media/MediaList.stories';
import * as MeunListStories from 'src/stories/widgets/MeunList.stories';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { StorysModule } from '@core/storys.module';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

export default {
  title: '组件/文章/普通文章',
  id: 'article',
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
const MediaList: any = MediaListStories.Base.args;
const MenuList: any = MeunListStories.Base.args;
Default.args = {
  content: {
    title: '使用 DevTools 对 Angular 前端应用性能分析优化',
    banner: {
      img: {
        src: '../assets/images/16-9/nature-08.jpg',
      },
    },
    meta: [
      {
        icon: 'schedule',
        label: '08/01/2022',
      },
      {
        icon: 'folder',
        label: '前端茶馆',
      },
    ],
    body: '在上一篇文章中，有个知友评论说是要 takeUntil 来管理订阅更加清晰明了，那我们就探探究竟。在 Rxjs 中，可以使用 takeUntil 来控制另外一个 Observable 对象数据的产生。使用 takeUntil，上游的数据直接转手给下游，直到takeUntil的参数吐出一个数据或者完结。就像一个水龙头开关，一开始是打开的状态，上游的数据一开始直接流到下游，只要 takeUntil 一旦触发吐出数据，水龙头立刻关闭。利用这点，可以在订阅时时，在管道中添加 takeUntil，在组件销毁时吐出数据，这样这些订阅就会立刻关闭，也就达到回收内存的作用。',
    sidebar: [
      {
        type: 'media-list',
        ...MediaList.content,
      },
      {
        type: 'menu-list',
        ...MenuList.content,
      },
    ],
  },
  canAccess: true,
};

export const Comment = Template.bind({});
Comment.storyName = '带评论';
Comment.args = {
  content: {
    ...Default.args.content,
    params: {
      pay: {
        money: 10,
      },
      require_rule: ['authenticated'],
      comment: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'comment',
          comment_body: {
            format: 'full_html',
          },
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: '19c33b19-bfdc-4a26-9c64-af6171b123cb',
            },
          },
          entity_id: {
            data: {
              type: 'node--article',
              id: '{{entity_uuid}}',
            },
          },
        },
      },
    },
    editor: {
      action: {
        label: '提交',
      },
      succes: {
        label: '成功发布！',
      },
    },
    actions: [
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
          entity_id: '1312',
          relationships: {
            flagged_entity: {
              type: 'node--article',
              id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
            },
          },
        },
      },
      {
        type: 'share',
        button: {
          icon: 'share',
          label: '分享',
        },
        params: {
          url: '/',
        },
      },
      {
        type: 'download',
        label: '下载',
        icon: {
          name: 'file_download',
          inline: true,
        },
        elements: [
          {
            type: 'link',
            label: 'Doc',
            icon: {
              name: 'description',
            },
            href: '#',
          },
          {
            type: 'link',
            label: 'Pdf',
            icon: {
              name: 'picture_as_pdf',
            },
            href: '#',
          },
        ],
      },
    ],
  },
  canAccess: true,
  comments: [
    {
      author: {
        img: {
          src: '/assets/images/avatar/01.jpeg',
          style: { width: '40px', height: '40px', borderRadius: '50%' },
          alt: '小南',
        },
        align: 'center start',
        id: 'b5f0ed94-2ebe-40e9-be07-f480efb50994',
        title: '小南',
        subTitle: '2022-05-20 13:54:31',
      },
      time: '2022-05-20T05:54:31+00:00',
      id: '24213e00-d4b8-4ece-bbea-a588efcc7d8d',
      content:
        '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>',
      child: [
        {
          author: {
            img: {
              src: '/assets/images/avatar/02.jpeg',
              style: { width: '40px', height: '40px', borderRadius: '50%' },
              alt: 'root',
            },
            align: 'center start',
            id: '15765815-07f2-4d7d-8142-cb598f82af2e',
            title: 'root',
            subTitle: '2022-05-23 10:01:38',
          },
          time: '2022-05-23T02:01:38+00:00',
          id: 'bbbe5e9f-9b85-421e-a839-7d50be0eb7ed',
          content: '<p>天选打工人</p>',
          child: [],
          level: 2,
        },
      ],
      level: 1,
    },
    {
      author: {
        img: {
          src: '/assets/images/avatar/03.jpeg',
          style: { width: '40px', height: '40px', borderRadius: '50%' },
          alt: '表歌',
        },
        align: 'center start',
        id: 'd5fb03cb-abca-43ba-baa5-a162a576e67a',
        title: '表歌',
        subTitle: '2022-05-06 14:38:32',
      },
      time: '2022-05-06T06:38:32+00:00',
      id: '2582f1b8-d91b-4a73-86ac-050fda0b10d1',
      content:
        '<p><span style="color: rgb(18, 18, 18);">坑不坑人，面试者也要学会在面试的过程当中去辨别，我从一个面试官的角度去说说，或许能够给你一些启发，以前端开发应聘为例。</span></p><p>一个职位首先公司有人才资源短缺的时候由HR发布招聘信息到相应的渠道，在收集到简历之后，HR会进行初步的筛选，然后把简历给到技术面试官。</p><p>技术面试官根据公司项目的实际情况，包括技术栈、开发能力、项目经验等再进一步筛选确认，HR再去通知预约面试时间。</p><p>为了表示我们是一家靠谱的公司，在面试前，其实我会和面试者在微信做简单的沟通，比如：</p><ul><li>告知面试者公司的官网，可以了解到公司做过的项目案例；告知面试者公司属于外包性质，是给需求方做软件的定制开发；告知面试者公司大部分的项目使用的是比较传统且老旧的技术栈；</li></ul><p>所谓丑话说在前头，事实就是坦诚相告，如果这家公司说不出自己的缺点，这是值得警惕的。</p><p>面试者得到这样的信息，通过几天的综合考量还是愿意来面试，会进一步考察：</p><ol><li>通过面对面沟通，了解面试者项目经验，是否存在夸大不真诚的说辞；通过现场检验过往项目代码查看代码的风格和代码质量；在有限的时间内做技术面试，了解面试者大概的技术水平；</li></ol><p>面试官有时候往往就代表着这家公司或者这个技术团队的“氛围”，是不是坑人就多察言观色，面试的双方平等的。</p><p>技术面试过后，会将评分和综合的评价反馈给公司相关的领导，根据职位的初中高级做考量录用，HR也会和面试者谈薪资。</p><p>录用过后，会发Offer通知。</p><p><span style="color: rgb(18, 18, 18);">以上就是敝司一个正常的技术面试流程，坦诚布公优缺点，使双方都能够找到契合点，尽量让开发者能够有归属感，多去关注细枝末节，了解公司的文化背景，打听老板和领导的处事风格，让自己有更好的客观评价。</span></p>',
      child: [],
      level: 1,
    },
  ],
};
