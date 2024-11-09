import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { MenuListComponent } from '@uiux/widgets/menu-list/menu-list.component';
import { StorysModule } from '@core/module/storys.module';
import { IMenuList } from '@core/interface/widgets/IMenuList';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<MenuListComponent> = {
  title: '基础组件/菜单项',
  id: 'menu-list',
  component: MenuListComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(story => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
type Story = StoryObj<MenuListComponent>;
export const Base: Story = {};
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
