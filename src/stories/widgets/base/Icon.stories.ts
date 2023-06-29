import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

export default {
  title: '基础组件/基本元素/图标',
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

Primary.args = {
  content: {
    type: 'icon',
    color: 'primary',
    name: 'format_color_fill',
  },
};

export const Accent = Template.bind({});

Accent.args = {
  content: { type: 'icon', color: 'accent', name: 'format_color_fill' },
};

export const Warn = Template.bind({});

Warn.args = {
  content: { type: 'icon', color: 'warn', name: 'format_color_fill' },
};

export const svgIcon = Template.bind({});
svgIcon.args = {
  content: { type: 'icon', color: 'primary', svg: 'credit-card-check' },
};

export const customStyle = Template.bind({});
customStyle.args = {
  content: {
    type: 'icon',
    color: 'primary',
    svg: 'credit-card-check',
    style: {
      color: 'red',
    },
  },
};
