import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { SearchModule } from '@uiux/combs/search/search.module';
import { SearchComponent } from '@uiux/combs/search/search.component';
import { sleep, StorysModule } from '@core/module/storys.module';
import { nodes } from './search.json';
import { FormGroup } from '@angular/forms';
import { ISearch } from '@core/interface/combs/ISearch';

export default {
  title: '复合组件/搜索/默认',
  id: 'search',
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), SearchModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ISearch = {
  type: 'search',
  header: {
    bg: {
      classes: 'bg-shadow overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/hero/1-6.jpg',
        mobile: '/assets/images/mobile/mobile-03.jpg',
      },
    },
    text: {
      title: {
        label: '综合搜索',
        style: 'style-v1',
        classes: 'mat-display-1  text-light',
      },
      spacer: 'xl',
      'style-': {
        width: '50%',
        left: '0%',
        top: '5%',
      },
      body: '<p class="text-center text-light">这里有你想要的答案。</p>',
    },
    input: {
      placeholder: '请输入你的关键词',
    },
  },
  label: {
    clear: '清空',
    filter: '过滤条件',
  },
  sidebar: [
    {
      appearance: 'legacy',
      controlType: 'search',
      key: 'keys',
      label: '关键词',
      type: 'input',
    },
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
      type: 'checkbox',
      label: '文章<span>50</span>',
      key: 'article',
      value: true,
    },
    {
      type: 'checkbox',
      label: '博客<span>20</span>',
      key: 'blog',
      value: true,
    },
  ],
  data: {
    nodes,
    pager: { itemsPerPage: 20, currentPage: 1, totalItems: 22 },
  },
};
Default.args = {
  content,
  form: new FormGroup({}),
};
Default.play = async () => {
  const Keys = screen.getByPlaceholderText('请输入你的关键词');
  await userEvent.type(Keys, 'Angular', {
    delay: 300,
  });

  await sleep(2000);
  const Clear = screen.getByText('清空');
  await userEvent.click(Clear);

  await sleep(2000);
};
