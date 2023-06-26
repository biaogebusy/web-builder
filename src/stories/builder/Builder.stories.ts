import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { components } from './data/component-for-builder';
import { widgets } from './data/widgets-for-builder';
import { environment } from 'src/environments/environment';
import { tabs } from './data/tabs.builder';
import { samples } from './data/samples.builder';
import { BUILDER_TABS } from '@core/token/token-providers';
export default {
  title: 'Builder',
  id: 'builder',
  component: BuilderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        BlockModule,
        StorysModule.forRoot(),
        BrandingModule,
        BuilderModule,
      ],
      providers: [
        {
          provide: BUILDER_TABS,
          useValue: tabs,
        },
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '页面构建器';
Default.args = {
  samples: samples,
};

if (!environment.production) {
  console.log('comps:', components);
  console.log('widgets:', widgets);
  console.log('sample:', samples);
}
