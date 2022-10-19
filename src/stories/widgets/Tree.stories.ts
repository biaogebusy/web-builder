import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TreeComponent } from '@uiux/widgets/tree/tree.component';

export default {
  title: '基础/树形',
  id: 'tree',
  component: TreeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    label: '开发语言',
    key: 'type',
    expandAll: false,
    value: 245,
    nodes: [
      {
        label: '全部',
        value: '',
      },
      {
        value: 861,
        label: 'CMS 内容管理系统',
        elements: [
          {
            value: 1164,
            label: 'Drupal',
          },
          {
            value: 1165,
            label: 'Joomla',
          },
          {
            value: 875,
            label: 'WordPress',
          },
        ],
      },
      {
        value: 1006,
        label: '前端框架',
        elements: [
          {
            value: 1030,
            label: 'Angular',
          },
          {
            value: 1018,
            label: 'React',
          },
          {
            value: 1018,
            label: 'VUE',
          },
        ],
      },
    ],
  },
};
