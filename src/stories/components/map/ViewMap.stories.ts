import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/storys.module';
import { ViewMapComponent } from '@uiux/combs/map/view-map/view-map.component';

export default {
  title: '复合组件/地图/视图地图',
  id: 'viewMap',
  component: ViewMapComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `通过Drupal view的配置把字段映射到地图上。`,
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
    type: 'view-map',
    params: {},
    form: [
      {
        type: 'input',
        key: 'keys',
        templateOptions: {
          label: '搜索职位',
        },
      },
      {
        type: 'mat-select',
        key: 'skill',
        templateOptions: {
          multiple: true,
          search: true,
          hideSelected: true,
          label: '技能',
          options: [
            {
              value: 1,
              label: 'Angular',
            },
            {
              value: 2,
              label: 'React',
            },
            {
              value: 3,
              label: 'Vue',
            },
          ],
        },
      },
    ],
    elements: [
      {
        title: '广西叫酒网络科技',
        subTitle: '前端开发工程师',
        badge: 'Vue',
        meta_1: '7-10k',
        mate_2: '2022-04-30',
        position: '南宁市创客城',
        img: '/assets/images/avatar/04.jpeg',
        url: '/node/1?drawer=true',
      },
      {
        title: '广西猫头鹰科技有限公司',
        subTitle: '产品经理',
        badge: 'Vue',
        meta_1: '7-10k',
        mate_2: '2022-04-30',
        position: '南宁市创客城',
        img: '/assets/images/avatar/04.jpeg',
        url: '/node/1?drawer=true',
      },
    ],
  },
};
