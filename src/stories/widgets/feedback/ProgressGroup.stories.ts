import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ProgressGroupComponent } from '@uiux/widgets/progress-group/progress-group.component';

export default {
  title: '基础组件/反馈组件/进度条组',
  id: 'progress-group',
  component: ProgressGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
export const Base = Template.bind({});

Base.args = {
  content: {
    type: 'progress-group',
    elements: [
      {
        label: 'HTML/CSS',
        value: '95',
      },
      {
        label: 'Angular/JavaScript',
        value: '79',
      },
      {
        label: 'Drupal',
        value: '60',
      },
    ],
  },
};
