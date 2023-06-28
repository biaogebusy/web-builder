import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { components } from './data/combs/export-for-story';
import { widgets } from './data/widgets/export-for-story';
import { environment } from 'src/environments/environment';
import { samples } from './data/sample/export-for-story';
import { BUILDER_SAMPLE_PAGE, UIUX } from '@core/token/token-providers';
import { uiux } from './data/uiux-for-story';
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
          provide: UIUX,
          useValue: uiux,
        },
        {
          provide: BUILDER_SAMPLE_PAGE,
          useValue: samples,
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

if (!environment.production) {
  console.log('comps:', components);
  console.log('widgets:', widgets);
  console.log('sample:', samples);
}
