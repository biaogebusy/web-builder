import { IIcon } from '@core/interface/widgets/IIcon';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

export default {
  title: '基本元素/图标',
  id: 'icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget position-relative p-x-md p-y-md">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `Icon使用了 Material的字体图标，也可svg自定义。<br>
        Matetrial 图标库 https://materialdesignicons.com/<br>
        自定义svg图标参考：/src/assets/icons/icons.svg`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
  template: `<app-icon [content]="content"></app-icon>`,
});
export const Primary = Template.bind({});
const primary: IIcon = {
  type: 'icon',
  color: 'primary',
  name: 'format_color_fill',
};
Primary.args = {
  content: primary,
};

export const Accent = Template.bind({});
const accent: IIcon = {
  type: 'icon',
  color: 'accent',
  name: 'format_color_fill',
};
Accent.args = {
  content: accent,
};

export const Warn = Template.bind({});
const warn: IIcon = { type: 'icon', color: 'warn', name: 'format_color_fill' };
Warn.args = {
  content: warn,
};

export const svgIcon = Template.bind({});
const svg: IIcon = { type: 'icon', color: 'primary', svg: 'credit-card-check' };
svgIcon.args = {
  content: svg,
};

export const customStyle = Template.bind({});
const custom: IIcon = {
  type: 'icon',
  color: 'primary',
  svg: 'credit-card-check',
  style: {
    color: 'red',
  },
};
customStyle.args = {
  content: custom,
};
