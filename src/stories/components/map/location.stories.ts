import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LocationComponent } from '@uiux/combs/map/location/location.component';
import { StorysModule } from '@core/module/storys.module';
import { ILocation } from '@core/interface/combs/IMap';

export default {
  title: '复合组件/地图/位置',
  id: 'location',
  component: LocationComponent,
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
const content: ILocation = {
  type: 'location',
  title: {
    label: '我的位置',
    style: 'banner-title',
    classes: 'm-bottom-0',
  },
  style: {
    height: '500px',
  },
  bg: {
    classes: '',
  },
  classes: '',
  city: '南宁市',
  elements: [
    {
      company: {
        setCenter: true,
        address: '高新区8号创客城',
      },
    },
  ],
};
Default.args = {
  content,
};
