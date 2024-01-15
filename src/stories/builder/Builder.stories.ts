import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { components } from './data/combs/export-for-story';
import { environment } from 'src/environments/environment';
import { samples } from './data/sample/samples-for-story';
import { systems } from './data/system/system-fot-story';
import {
  BUILDER_SAMPLE_PAGE,
  ENABLE_BUILDER_TOOLBAR,
  UIUX,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-story';
import { of } from 'rxjs';
import { ManageModule } from '@modules/manage/manage.module';
import { widgets } from './data/widgets-for-story';
export default {
  title: '低代码/Web builder',
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
        ManageModule,
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
        {
          provide: ENABLE_BUILDER_TOOLBAR,
          useValue: of(true),
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

if (!environment.production) {
  console.log('comps:', components);
  console.log('widgets:', widgets);
  console.log('sample:', samples);
  console.log('system:', systems);
}
