import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { AmapService } from '@core/service/amap.service';
import { MapComponent } from '@uiux/widgets/map/map.component';
import { ConfigService } from '@core/service/config.service';
import { StorysModule } from '@core/module/storys.module';
import { IMap } from '@core/interface/IAmap';

const meta: Meta<MyComponent> = {
  title: '基础组件/地图',
  id: 'map',
  component: MapComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [AmapService, ConfigService],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget relative p-x p-y" style="z-index:1;height:500px;">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: IMap = {
  type: 'map',
  city: '南宁市',
  elements: [],
};
Default.args = {
  content,
};
