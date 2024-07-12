import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { SearchComponent } from '@uiux/combs/search/search.component';
import { StorysModule } from '@core/module/storys.module';
import { nodes } from './search.json';
import { FormGroup } from '@angular/forms';
import { ISearch } from '@core/interface/combs/ISearch';
import { Subject } from 'rxjs';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<SearchComponent> = {
  title: '复合组件/搜索/默认',
  id: 'search',
  component: SearchComponent,
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
type Story = StoryObj<SearchComponent>;
export const Default: Story = {};
const content: ISearch = {
  type: 'search',
  api: '/api/v1/content',
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
        label: '综合搜索',
        style: 'style-v1',
        classes: 'mat-headline-3  text-light',
      },
      spacer: 'xl',
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
      key: 'keys',
      type: 'input',
      className: 'block',
      props: {
        label: '关键词',
        appearance: 'legacy',
        type: 'search',
      },
    },
    {
      type: 'select',
      key: 'skill',
      className: 'block',
      props: {
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
    },
    {
      type: 'select',
      key: 'cms',
      className: 'block',
      props: {
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
    },
    {
      type: 'checkbox',
      key: 'article',
      className: 'block',
      props: {
        label: '文章',
      },
    },
    {
      type: 'checkbox',
      key: 'blog',
      className: 'block',
      props: {
        label: '博客',
      },
    },
  ],
  data: {
    nodes,
    pager: { itemsPerPage: 20, currentPage: 1, totalItems: 22 },
  },
};
Default.args = {
  content,
  form: new FormGroup({}),
  vauleChange$: new Subject<any>(),
};
