import { StorysModule } from '@core/module/storys.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { PanelComponent } from '@uiux/widgets/panel/panel.component';

export default {
  title: '基础组件/面板',
  id: 'panel',
  component: PanelComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
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
    type: 'panel',
    text: {
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
        style: 'style-v1',
        classes: 'mat-display-3 bold',
      },
      body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul><p>Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。</p><br>',
      spacer: 'sm',
    },
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
