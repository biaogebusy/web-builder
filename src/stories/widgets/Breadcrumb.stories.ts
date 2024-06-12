import { ILink } from '@core/interface/widgets/ILink';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { BreadcrumbComponent } from '@uiux/widgets/breadcrumb/breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: '基础组件/面包屑',
  id: 'breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget bg-primary bg-fill-width p-x p-y">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;
export const Base: Story = {};
const base: ILink[] = [
  {
    label: '首页',
    href: '#',
  },
  {
    label: '组件',
    href: '#',
  },
  {
    label: '横幅',
    href: '#',
  },
];
Base.args = {
  content: base,
};
