import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { PaginationLinksComponent } from '@uiux/widgets/pagination/pagination-links/pagination-links.component';
import { environment } from 'src/environments/environment';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础/分页/JSONAPI 分页',
  id: 'pagination-links',
  component: PaginationLinksComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
      ${story}
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `该分页组件是JSONAPI请求后返回的links，JSONAPI 自动处理分页，只需要根据返回的link获取数据即可。`,
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
// Raname Story
Default.storyName = '预览';
Default.args = {
  links: {
    self: `${environment.apiUrl}?page[offset]=3&page[limit]=3`,
    next: `${environment.apiUrl}?page[offset]=3&page[limit]=6`,
    prev: `${environment.apiUrl}?page[offset]=3&page[limit]=9`,
  },
};
