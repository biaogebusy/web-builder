import { importProvidersFrom } from '@angular/core';
import { IIcon } from '@core/interface/widgets/IIcon';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';

import { IconComponent } from '@uiux/widgets/icon/icon.component';

const meta: Meta<IconComponent> = {
  title: '基本元素/图标',
  id: 'icon',
  component: IconComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),

    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
      imports: [MatIconModule],
    }),
    componentWrapperDecorator(
      story => `<div class="widget relative p-x-md p-y-md">${story}</div>`
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
};
export default meta;
type Story = StoryObj<IconComponent>;
const primary: IIcon = {
  type: 'icon',
  color: 'primary',
  svg: 'border-color',
};

export const Primary: Story = {};
Primary.args = {
  content: primary,
};

export const Accent: Story = {};
const accent: IIcon = {
  type: 'icon',
  color: 'accent',
  name: 'format_color_fill',
};
Accent.args = {
  content: accent,
};

export const Warn: Story = {};
const warn: IIcon = { type: 'icon', color: 'warn', name: 'format_color_fill' };
Warn.args = {
  content: warn,
};

export const svgIcon: Story = {};
const svg: IIcon = { type: 'icon', color: 'primary', svg: 'credit-card-check' };
svgIcon.args = {
  content: svg,
};

export const customStyle: Story = {};
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
