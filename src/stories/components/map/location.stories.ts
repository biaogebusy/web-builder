import { moduleMetadata, Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { LocationComponent } from '@uiux/combs/map/location/location.component';
import { StorysModule } from '@core/module/storys.module';
import { ILocation } from '@core/interface/combs/IMap';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<LocationComponent> = {
  title: '复合组件/地图/位置',
  id: 'location',
  component: LocationComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
  ],
  parameters: {
    docs: {
      description: {
        component: `位置信息常用于展示指定位置的地理位置，方便用户查看。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<LocationComponent>;
export const Default: Story = {};
const content: ILocation = {
  type: 'location',
  title: {
    label: '我的位置',
    style: 'style-v1',
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
