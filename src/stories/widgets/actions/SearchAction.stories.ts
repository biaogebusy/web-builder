import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { SearchActionComponent } from '@uiux/widgets/actions/search-action/search-action.component';
import { StorysModule } from '@core/module/storys.module';
import { ISearchAction } from '@core/interface/widgets/IActions';

export default {
  title: '基础组件/Actions/搜索控件',
  id: 'search-action',
  component: SearchActionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `搜索控件可以让人到页面的组件当中，提交时会路由到/search页面并带上queryParams参数，所以search页面要做好router queryParams 的订阅。`,
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
// Raname Story
Default.storyName = '预览';
const content: ISearchAction = {
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
};

Default.args = {
  content,
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
