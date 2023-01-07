import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MenuListComponent } from '@uiux/widgets/menu-list/menu-list.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/菜单项',
  id: 'menu-list',
  component: MenuListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
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
    title: '标签',
    elements: [
      {
        link: {
          href: '#',
          label: 'Angular',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Drupal',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Jsonapi',
        },
        label: '2',
      },
    ],
  },
};
