import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { PaginationLinksComponent } from '@uiux/widgets/pagination/pagination-links/pagination-links.component';
import { environment } from 'src/environments/environment';
import { StorysModule } from '@core/module/storys.module';
import { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<PaginationLinksComponent> = {
  title: '基础组件/分页/JSONAPI 分页',
  id: 'pagination-links',
  component: PaginationLinksComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `该分页组件是JSONAPI请求后返回的links，JSONAPI 自动处理分页，只需要根据返回的link获取数据即可。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PaginationLinksComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
const content: IPaginationLinks = {
  self: {
    href: `${environment.apiUrl}?page[offset]=3&page[limit]=3`,
  },
  next: {
    href: `${environment.apiUrl}?page[offset]=3&page[limit]=6`,
  },
  prev: {
    href: `${environment.apiUrl}?page[offset]=3&page[limit]=9`,
  },
};
Default.args = {
  links: content,
};
