import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Action1v1Component } from '@uiux/combs/action/action1v1/action1v1.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/引导/Action 1v1',
  id: 'action-1v1',
  component: Action1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `通过可选的过滤条件进行对内容的搜索`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    id: 'xxx',
    spacer: 'xl',
    bg: {
      classes: 'bg-shadow',
    },
    text: {
      title: {
        label: '如何才能帮助到您？',
        style: 'none',
        classes: 'mat-display-1',
      },
      spacer: 'none',
      body: '<p>这里有你想要的答案，请根据以下筛选条件选择进行搜索。</p>',
      actions: [
        {
          type: 'search-action',
          button: {
            label: '搜索',
            color: 'primary',
          },
          form: [
            {
              type: 'select',
              key: 'skill',
              label: '技能',
              options: [
                {
                  label: '无',
                  value: '',
                },
                {
                  label: 'Angular',
                  value: '170',
                },
                {
                  label: 'React',
                  value: '162',
                },
                {
                  label: 'Vue',
                  value: '167',
                },
              ],
            },
            {
              type: 'select',
              key: 'cms',
              label: 'CMS',
              options: [
                {
                  label: '无',
                  value: '',
                },
                {
                  label: 'Drupal',
                  value: '170',
                },
                {
                  label: 'WP',
                  value: '162',
                },
                {
                  label: 'Joomla',
                  value: '167',
                },
              ],
            },
            {
              type: 'input',
              key: 'keys',
              placeholder: '请输入关键词搜索',
              controlType: 'search',
              label: '关键词',
              appearance: 'legacy',
            },
          ],
        },
      ],
    },
    shape: true,
  },
};
