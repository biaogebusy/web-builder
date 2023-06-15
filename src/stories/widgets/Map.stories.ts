import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { AmapService } from '@core/service/amap.service';
import { MapComponent } from '@uiux/widgets/map/map.component';
import { ConfigService } from '@core/service/config.service';
import { StorysModule } from '@core/module/storys.module';

export default {
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
        `<div class="widget position-relative p-x p-y" style="z-index:1;height:500px;">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'map',
    citi: '南宁市',
    elements: [],
  },
};
