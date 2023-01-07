import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { Action1v1Component } from '@uiux/combs/action/action1v1/action1v1.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/引导/Action 1v1',
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
    type: 'action-1v1',
    spacer: 'xl',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    text: {
      title: {
        label: '如何才能帮助到您？',
        style: 'none',
        classes: 'mat-display-1',
      },
      classes: '',
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
                  value: 'angular',
                },
                {
                  label: 'React',
                  value: 'react',
                },
                {
                  label: 'Vue',
                  value: 'vue',
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
                  value: 'drupal',
                },
                {
                  label: 'WP',
                  value: 'wp',
                },
                {
                  label: 'Joomla',
                  value: 'joomla',
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

Default.play = async () => {
  const skillInput = screen.getByLabelText('技能', {
    selector: 'mat-select',
  });

  await userEvent.type(skillInput, 'Angular', {
    delay: 200,
  });

  const cmsInput = screen.getByLabelText('CMS', {
    selector: 'mat-select',
  });

  await userEvent.type(cmsInput, 'Drupal', {
    delay: 200,
  });

  const keysInput = screen.getByLabelText('关键词', {
    selector: 'input',
  });

  await userEvent.type(keysInput, '开发', {
    delay: 300,
  });

  const search = screen.getByRole('button');
  await userEvent.hover(search);
};
