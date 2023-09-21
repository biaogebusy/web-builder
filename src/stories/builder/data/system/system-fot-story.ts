import * as notfoundStory from '@stories/sample/feedback/404.stories';
import * as searchStory from '@stories/components/search/search.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as dashboardStory from '@stories/sample/manage/dashboard/Dashboard.stories';

const {
  Order: { args: dashboard },
  Advert: { args: advert },
} = dashboardStory;
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
    label: '通用',
    elements: [
      {
        label: '面板 v1',
        icon: {
          svg: 'view-dashboard-outline',
        },
        ...dashboard,
      },
      {
        label: '面板 v2',
        icon: {
          svg: 'view-dashboard-variant-outline',
        },
        ...advert,
      },
      {
        label: '搜索',
        icon: {
          svg: 'magnify',
        },
        ...search,
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
        label: '联系我们',
        icon: {
          svg: 'account-box-outline',
        },
        ...contact,
      },
      {
        label: '404',
        icon: { svg: 'text-search-variant' },
        ...notfound,
      },
    ],
  },
];
