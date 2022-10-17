import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LocationComponent } from '@uiux/combs/map/location/location.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/地图/位置',
  id: 'location',
  component: LocationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `位置信息常用于展示指定位置的地理位置，方便用户查看。`,
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
    title: {
      label: '我的位置',
      style: 'banner-title',
      classes: 'm-bottom-0',
    },
    style: {
      height: '500px',
    },
    city: '南宁市',
    params: {
      zoomEnable: false,
      draggable: false,
    },
    elements: [
      {
        company: {
          setCenter: true,
          address: '高新区8号创客城',
        },
      },
    ],
  },
};
