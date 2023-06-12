import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { PaginationComponent } from '@uiux/widgets/pagination/pagination.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/分页/普通分页',
  id: 'pagination-default',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
     <div classs="widget"> <div *ngFor="let item of [1,2,3,4,5,6,7,8,9,10] | paginate: {itemsPerPage: 2,currentPage: 0,totalItems: 100}"></div>
     <app-pagination></app-pagination></div>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `该分页组件只有上一页和下一页进行页面的分页导航。`,
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
Default.parameters = {
  controls: {
    include: ['id', 'maxSize'],
  },
};
Default.storyName = '预览';
