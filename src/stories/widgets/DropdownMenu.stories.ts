import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { DropdownMenuComponent } from '@uiux/widgets/dropdown-menu/dropdown-menu.component';
import { StorysModule } from '@core/module/storys.module';
import { IDropdowMenu } from '@core/interface/widgets/IWidgets';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<DropdownMenuComponent> = {
  title: '基础组件/下拉菜单',
  id: 'dropdown-menu',
  component: DropdownMenuComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      story =>
        `<div style="width:40%" class="widget relative text-light">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<DropdownMenuComponent>;
export const Default: Story = {};
const content: IDropdowMenu = {
  type: 'dropdown-menu',
  btn: {
    label: '合同预览',
    color: 'primary',
    mode: 'raised',
  },
  child: [
    {
      type: 'btn',
      label: '合同20230312',
      href: '/assets/doc/frontend.xlsx',
      drawerIframe: true,
    },
    {
      type: 'btn',
      label: '合同快照',
      href: '/assets/images/16-9/business-01.jpg',
      drawerIframe: true,
    },
  ],
};
Default.args = {
  content,
};
