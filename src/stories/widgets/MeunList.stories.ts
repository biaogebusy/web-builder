import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { MenuListComponent } from '@uiux/widgets/menu-list/menu-list.component';
import { StorysModule } from '@core/module/storys.module';
import { IMenuList } from '@core/interface/widgets/IMenuList';

const meta: Meta<MyComponent> = {
  title: '基础组件/菜单项',
  id: 'menu-list',
  component: MenuListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
export const Base = Template.bind({});
const base: IMenuList = {
  type: 'menu-list',
  title: '标签',
  elements: [
    {
      link: {
        href: '#',
        label: 'Angular',
      },
      label: '3',
    },
    {
      link: {
        href: '#',
        label: 'Drupal',
      },
      label: '3',
    },
    {
      link: {
        href: '#',
        label: 'Jsonapi',
      },
      label: '2',
    },
  ],
};
Base.args = {
  content: base,
};
