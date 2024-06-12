import { moduleMetadata, Meta } from '@storybook/angular';

import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { components } from './data/combs/export-for-story';
import { environment } from 'src/environments/environment';
import { systems } from './data/system/system-fot-story';
import { IS_BUILDER_MODE, UIUX } from '@core/token/token-providers';
import { uiux } from './data/uiux-for-story';
import { of } from 'rxjs';
import { ManageModule } from '@modules/manage/manage.module';
import { widgets } from './data/widgets-for-story';
import { base } from './data/base/export-for-story';
import { mediaAssets } from './data/assets/media-assets-for-story';
const meta: Meta<MyComponent> = {
  title: '低代码/Web builder',
  id: 'builder',
  component: BuilderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        RenderModule,
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
          provide: IS_BUILDER_MODE,
          useValue: of(true),
        },
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};

if (!environment.production) {
  console.log('Base:', base);
  console.log('Comps:', components);
  console.log('Widgets:', widgets);
  console.log('System:', systems);
  console.log('Media:', mediaAssets);
}
