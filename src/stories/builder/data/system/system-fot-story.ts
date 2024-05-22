import * as notfoundStory from '@stories/sample/system/404.stories';
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

export const systems: any[] = [
  {
    label: '通用',
    elements: [
      {
        label: '横幅',
        icon: {
          svg: 'page-layout-header',
        },
        content: bannerStory.BannerOverlay?.args?.content,
      },
      {
        label: '文章',
        icon: {
          svg: 'translate',
        },
        content: articleStory.Comment?.args?.content,
      },
      {
        label: '面板 v1',
        icon: {
          svg: 'view-dashboard-outline',
        },
        content: dashboardStory.Order?.args?.content,
      },
      {
        label: '面板 v2',
        icon: {
          svg: 'view-dashboard-variant-outline',
        },
        content: dashboardStory.Advert?.args?.content,
      },
      {
        label: '用户中心',
        icon: {
          svg: 'account-box-outline',
        },
        content: userCenterStory.Default?.args?.content,
      },
      {
        label: '用户资料',
        icon: {
          svg: 'account-outline',
        },
        content: profileStory.UserProfile?.args?.content,
      },
      {
        label: '企业资料',
        icon: {
          svg: 'home-variant-outline',
        },
        content: profileStory.Componey?.args?.content,
      },
      {
        label: '搜索',
        icon: {
          svg: 'magnify',
        },
        content: searchStory.Default?.args?.content,
        form: {},
        vauleChange$: {},
      },
      {
        label: '日历',
        icon: {
          svg: 'calendar-month-outline',
        },
        content: calendarStory.Default?.args?.content,
      },
      {
        label: '位置',
        icon: {
          svg: 'map-marker-outline',
        },
        content: locationStory.Default?.args?.content,
      },
      {
        label: '404',
        icon: { svg: 'text-search-variant' },
        content: notfoundStory.Default?.args?.content,
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
];
