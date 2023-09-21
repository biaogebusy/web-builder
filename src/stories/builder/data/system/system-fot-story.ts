import * as notfoundStory from '@stories/sample/feedback/404.stories';
import * as searchStory from '@stories/components/search/search.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
const {
  Default: { args: notfound },
} = notfoundStory;
export const {
  Default: { args: search },
} = searchStory;
export const {
  Default: { args: contact },
} = contactStory;
export const systems: any[] = [
  {
    label: '全局',
    elements: [
      {
        label: '404',
        icon: { svg: 'text-search-variant' },
        ...notfound,
      },
      {
        label: '用户登录',
        icon: {
          svg: 'login',
        },
        content: {
          type: 'login',
        },
      },
      {
        label: '搜索',
        icon: {
          svg: 'magnify',
        },
        ...search,
      },
      {
        label: '联系我们',
        icon: {
          svg: 'account-box-outline',
        },
        ...contact,
      },
    ],
  },
];
