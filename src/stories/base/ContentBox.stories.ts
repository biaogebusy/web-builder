import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ContentBoxComponent } from '@uiux/widgets/content-box/content-box.component';
import { StorysModule } from '@core/module/storys.module';
import { IContentBox } from '@core/interface/widgets/IContentWidget';

const meta: Meta<MyComponent> = {
  title: '基本元素/内容块',
  id: 'content-box',
  component: ContentBoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="widget relative">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: IContentBox = {
  type: 'content-box',
  ratios: 'media-140',
  subTitle: {
    label: '信使',
    href: '/search',
  },
  title: {
    label: '基于 Drupal 的 Angular 前端框架',
    href: '/search',
  },
  img: {
    classes: 'object-fit',
    src: '/assets/images/cases/porto1.jpg',
    alt: 'alt',
  },
};
Default.args = {
  content,
};
