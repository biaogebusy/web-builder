import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { DropdownMenuComponent } from '@uiux/widgets/dropdown-menu/dropdown-menu.component';
import { StorysModule } from '@core/module/storys.module';
import { IDropdowMenu } from '@core/interface/widgets/IWidgets';
export default {
  title: '基础组件/下拉菜单',
  id: 'dropdown-menu',
  component: DropdownMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="widget position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
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
