import { IBuilderSamplePage } from '@core/interface/IBuilder';
import { home_v1 } from './home-v1.builder';
import { home_v10 } from './home-v10.builder';
import { home_v11 } from './home-v11.builder';
import { home_v12 } from './home-v12.builder';
import { home_v13 } from './home-v13.builder';
import { home_v14 } from './home-v14.builder';
import { home_v2 } from './home-v2.builder';
import { home_v3 } from './home-v3.builder';
import { home_v4 } from './home-v4.builder';
import { home_v5 } from './home-v5.builder';
import { home_v6 } from './home-v6.builder';
import { home_v7 } from './home-v7.builder';
import { home_v8 } from './home-v8.builder';
import { home_v9 } from './home-v9.builder';

export const samples: IBuilderSamplePage = {
  label: '示例库',
  elements: [
    {
      label: '经典布局',
      id: 'home',
      icon: {
        svg: 'numeric-1',
      },
      page: home_v1,
    },
    {
      label: '服务介绍',
      id: 'home-v2',
      icon: {
        svg: 'numeric-2',
      },
      page: home_v2,
    },
    {
      label: '应用推广',
      id: 'home-v3',
      icon: {
        svg: 'numeric-3',
      },
      page: home_v3,
    },
    {
      label: '应用介绍',
      id: 'home-v4',
      icon: {
        svg: 'numeric-4',
      },
      page: home_v4,
    },
    {
      label: '在线课程',
      id: 'home-v5',
      icon: {
        svg: 'numeric-5',
      },
      page: home_v5,
    },
    {
      label: '医疗科技',
      id: 'home-v6',
      icon: {
        svg: 'numeric-6',
      },
      page: home_v6,
    },
    {
      label: 'Sass 服务',
      id: 'home-v7',
      icon: {
        svg: 'numeric-7',
      },
      page: home_v7,
    },
    {
      label: '应用市场',
      id: 'home-v8',
      icon: {
        svg: 'numeric-8',
      },
      page: home_v8,
    },
    {
      label: '艺术科学',
      id: 'home-v9',
      icon: {
        svg: 'numeric-9',
      },
      page: home_v9,
    },
    {
      label: 'App 应用',
      id: 'home-v10',
      icon: {
        svg: 'numeric-10',
      },
      page: home_v10,
    },
    {
      label: '客户故事',
      id: 'home-v11',
      icon: {
        svg: 'roman-numeral-1',
      },
      page: home_v11,
    },
    {
      label: '工作室',
      id: 'home-v12',
      icon: {
        svg: 'roman-numeral-2',
      },
      page: home_v12,
    },
    {
      label: '现代商业',
      id: 'home-v13',
      icon: {
        svg: 'roman-numeral-3',
      },
      page: home_v13,
    },
    {
      label: '满屏',
      id: 'home-v14',
      icon: {
        svg: 'roman-numeral-4',
      },
      page: home_v14,
    },
  ],
};
