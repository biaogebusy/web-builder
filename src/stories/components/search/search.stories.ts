import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { SearchModule } from '@uiux/combs/search/search.module';
import { SearchComponent } from '@uiux/combs/search/search.component';
import { sleep, StorysModule } from '@core/module/storys.module';
import { nodes } from './search.json';

export default {
  title: '复合组件/搜索/默认',
  id: 'search',
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), SearchModule],
    }),
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
    type: 'search',
    header: {
      bg: {
        classes: 'bg-shadow overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/hero/1-6.jpg',
          mobile: '/assets/images/mobile/mobile-03.jpg',
        },
      },
      text: {
        title: {
          label: '信使搜索',
          style: 'style-v1',
          classes: 'mat-display-1  text-light',
        },
        spacer: 'xl',
        'style-': {
          width: '50%',
          left: '0%',
          top: '5%',
        },
        body: '<p class="text-center text-light">这里有你想要的答案。</p>',
      },
      input: {
        placeholder: '请输入你的关键词',
      },
    },
    label: {
      clear: '清空',
      filter: '过滤条件',
    },
    sidebar: [
      {
        appearance: 'legacy',
        controlType: 'search',
        key: 'keys',
        label: '关键词',
        type: 'input',
      },
      {
        type: 'select',
        key: 'skill',
        label: '技能',
        options: [
          {
            label: '无',
            value: '',
          },
          {
            label: 'Angular',
            value: 'angular',
          },
          {
            label: 'React',
            value: 'react',
          },
          {
            label: 'Vue',
            value: 'vue',
          },
        ],
      },
      {
        type: 'select',
        key: 'cms',
        label: 'CMS',
        options: [
          {
            label: '无',
            value: '',
          },
          {
            label: 'Drupal',
            value: 'drupal',
          },
          {
            label: 'WP',
            value: 'wp',
          },
          {
            label: 'Joomla',
            value: 'joomla',
          },
        ],
      },
      {
        type: 'checkbox',
        label: '文章<span>50</span>',
        key: 'article',
        value: true,
      },
      {
        type: 'checkbox',
        label: '博客<span>20</span>',
        key: 'blog',
        value: true,
      },
    ],
  },
  nodes,
  pager: { itemsPerPage: 20, currentPage: 1, totalItems: 22 },
};
Default.play = async () => {
  const Keys = screen.getByPlaceholderText('请输入你的关键词');
  await userEvent.type(Keys, 'Angular', {
    delay: 300,
  });

  await sleep(2000);
  const Clear = screen.getByText('清空');
  await userEvent.click(Clear);

  await sleep(2000);
};

export const Dialog = Template.bind({});
Dialog.args = {
  content: {
    type: 'search',
    filterDialog: {
      filter: {
        title: {
          label: '文章分类',
          style: 'style-v4',
        },
        params: {
          expand: {
            show: 10,
            less: '收起',
            more: '展开更多',
          },
        },
        key: 'category',
        elements: [
          {
            label: '财政与税务',
            value: '1',
            dialogFrom: 0,
          },
          {
            label: '一委一行两会',
            value: '2',
            dialogFrom: 0,
          },
          {
            label: '自贸区与一带一路金融',
            value: '3',
            dialogFrom: 0,
          },
          {
            label: '政府与社会资本合作',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '国际投资与外汇',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '全球金融法',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融科技与大数据',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融单位及政府信息公开',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '基础设施、建工金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '房地产金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: 'P2P及非法金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '投资人并消费者权益保护',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '不良债权处置',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融衍生品与创新',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融公司管理与重整',
            value: '4',
            dialogFrom: 0,
          },
        ],
      },
      dialog: [
        {
          key: 'search_category',
          actions: [
            {
              type: 'btn',
              label: '生成',
              color: 'primary',
              mode: 'raised',
            },
          ],
          elements: [
            {
              label: '案由分类',
              value: 1,
            },
            {
              label: '合同范本',
              value: 2,
            },
            {
              label: '法律依据',
              value: 3,
            },
            {
              label: '司法判例',
              value: 4,
            },
            {
              label: '合规审查',
              value: 5,
            },
            {
              label: '律师务实',
              value: 6,
            },
            {
              label: '焦点研判',
              value: 7,
            },
            {
              label: '金融数据',
              value: 8,
            },
            {
              label: '智能生成',
              value: 9,
            },
            {
              label: '金融律师',
              value: 10,
            },
          ],
        },
      ],
    },
  },
};
