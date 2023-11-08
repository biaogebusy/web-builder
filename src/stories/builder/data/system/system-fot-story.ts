import * as notfoundStory from '@stories/sample/feedback/404.stories';
import * as searchStory from '@stories/components/search/search.stories';
import * as dashboardStory from '@stories/sample/manage/dashboard/Dashboard.stories';
import * as calendarStory from '@stories/drupal/Full-calendar.stories';
import * as articleStory from '@stories/sample/node/article.stories';
import * as locationStory from '@stories/components/map/location.stories';
import * as userCenterStory from '@stories/components/profile/userCenter.stories';
import * as bannerStory from '@stories/components/banner/BannerSimple.stories';
import * as profileStory from '@stories/components/profile/profile1v1.stories';
import { drupal } from './drupal.builder';
import { map } from './map.builder';

export const {
  UserProfile: { args: profile },
  Componey: { args: componey },
} = profileStory as any;

export const {
  Default: { args: userCenter },
} = userCenterStory;
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
  Default: { args: calendar },
} = calendarStory;
export const {
  Comment: { args: article },
} = articleStory;

const {
  BannerOverlay: { args: banner },
} = bannerStory as any;

const {
  Default: { args: location },
} = locationStory;
export const systems: any[] = [
  {
    label: '通用',
    elements: [
      {
        label: '横幅',
        icon: {
          svg: 'page-layout-header',
        },
        ...banner,
      },
      {
        label: '文章',
        icon: {
          svg: 'translate',
        },
        ...article,
      },
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
        label: '用户中心',
        icon: {
          svg: 'account-box-outline',
        },
        ...userCenter,
      },
      {
        label: '用户资料',
        icon: {
          svg: 'account-outline',
        },
        ...profile,
      },
      {
        label: '企业资料',
        icon: {
          svg: 'home-variant-outline',
        },
        ...componey,
      },
      {
        label: '搜索',
        icon: {
          svg: 'magnify',
        },
        ...search,
      },
      {
        label: '日历',
        icon: {
          svg: 'calendar-month-outline',
        },
        ...calendar,
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
        label: '位置',
        icon: {
          svg: 'map-marker-outline',
        },
        ...location,
      },
      {
        label: '404',
        icon: { svg: 'text-search-variant' },
        ...notfound,
      },
    ],
  },
  {
    label: 'Drupal',
    id: 'drupal',
    elements: [...drupal],
  },
  {
    label: '地图应用',
    id: 'map',
    elements: [...map],
  },
  {
    label: '配置',
    elements: [
      {
        label: '全局',
        type: 'json',
        provide: 'CORE_CONFIG',
        icon: {
          svg: 'cog',
        },
      },
      {
        label: '菜单',
        type: 'json',
        provide: 'BRANDING',
        icon: {
          svg: 'view-compact-outline',
        },
      },
    ],
  },
];
