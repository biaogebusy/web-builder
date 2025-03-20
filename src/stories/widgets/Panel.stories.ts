import { importProvidersFrom } from '@angular/core';
import { StorysModule } from '@core/module/storys.module';
import { moduleMetadata, Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { PanelComponent } from '@uiux/widgets/panel/panel.component';

const meta: Meta<PanelComponent> = {
  title: '基础组件/面板',
  id: 'panel',
  component: PanelComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
  ],
};

export default meta;
type Story = StoryObj<PanelComponent>;
export const Default: Story = {};

Default.args = {
  content: {
    type: 'panel',
    elements: [
      {
        title: '组件驱动开发',
        icon: 'person',
        params: {
          expanded: true,
        },
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
          },
        ],
      },
      {
        title: '组件展示和测试',
        icon: 'faviores',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
          },
        ],
      },
      {
        title: '文档化',
        icon: 'faviores',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
          },
        ],
      },
      {
        title: '插件和工具生态系统',
        icon: 'faviores',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: 'Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。',
          },
        ],
      },
    ],
  },
};
