import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { AmapService } from '@core/service/amap.service';
import { MapComponent } from '@uiux/combs/map/map/map.component';
import { ConfigService } from '@core/service/config.service';
import { StorysModule } from '@core/module/storys.module';
import { IMap } from '@core/interface/IAmap';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<MapComponent> = {
  title: '基础组件/地图',
  id: 'map',
  component: MapComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      providers: [AmapService, ConfigService],
    }),
    componentWrapperDecorator(
      story => `<div class="widget relative p-x p-y" style="z-index:1;height:500px;">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<MapComponent>;
export const Default: Story = {};
const content: IMap = {
  type: 'map',
  city: '南宁市',
  elements: [],
};
Default.args = {
  content,
};
