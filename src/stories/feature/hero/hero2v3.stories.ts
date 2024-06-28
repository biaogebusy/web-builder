import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Hero2v3Component } from '@uiux/combs/hero/hero2v3/hero2v3.component';
import { StorysModule } from '@core/module/storys.module';
import { IHero2v3 } from '@core/interface/combs/IHero';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Hero2v3Component> = {
  title: '特色组件/首屏/2v3',
  id: 'hero-2v3',
  component: Hero2v3Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Hero2v3Component>;
export const Default: Story = {};
const content: IHero2v3 = {
  type: 'hero-2v3',
  id: 'xxx',
  spacer: 'lg',
  shape: true,
  bg: {
    classes: 'bg-center',
    img: {
      hostClasses: 'bg-center',
      src: '/assets/images/bg/bg-04.png',
    },
  },
  classes: '',
  text: {
    title: {
      label: '开源项目使用 Github actions 自动化',
      style: 'none',
      classes: 'mat-headline-1',
    },
    spacer: 'none',
    body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
  },
  elements: [
    {
      img: {
        src: '/assets/images/svg/health.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '高性能',
      },
    },
    {
      img: {
        src: '/assets/images/svg/term-life.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '易用的编辑器',
      },
    },
    {
      img: {
        src: '/assets/images/svg/family-health.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '多语言',
      },
    },
    {
      img: {
        src: '/assets/images/svg/investment.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '更有弹性',
      },
    },
    {
      img: {
        src: '/assets/images/svg/car.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '安全性',
      },
    },
    {
      img: {
        src: '/assets/images/svg/bike.svg',
        href: '/',
      },
      link: {
        href: '/',
        label: '无障碍访问',
      },
    },
  ],
};

Default.args = {
  content,
};
