import { ILink } from '@core/interface/widgets/ILink';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BreadcrumbComponent } from '@uiux/widgets/breadcrumb/breadcrumb.component';

export default {
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
        `<div class="widget bg-primary bg-fill-width p-x p-y">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
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
