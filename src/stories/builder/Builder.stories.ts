import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { components } from './data/combs/export-for-story';
import { environment } from 'src/environments/environment';
import { systems } from './data/system/system-fot-story';
import {
  BUILDER_CURRENT_PAGE,
  IS_BUILDER_MODE,
  UIUX,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-story';
import { of } from 'rxjs';
import { ManageModule } from '@modules/manage/manage.module';
import { widgets } from './data/widgets-for-story';
import { base } from './data/base/export-for-story';
import { mediaAssets } from './data/assets/media-assets-for-story';
import { importProvidersFrom } from '@angular/core';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { builderCurrentPageFactory } from '@core/factory/factory';
import { LocalStorageService } from 'ngx-webstorage';
import { MatIcon } from '@angular/material/icon';
const meta: Meta<BuilderComponent> = {
  title: '低代码/Web builder',
  id: 'builder',
  component: BuilderComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(StorysModule.forRoot()),
        {
          provide: UIUX,
          useValue: uiux,
        },
        {
          provide: IS_BUILDER_MODE,
          useValue: of(true),
        },
        {
          provide: BUILDER_CURRENT_PAGE,
          useFactory: builderCurrentPageFactory,
          deps: [LocalStorageService],
        },
      ],
    }),
    moduleMetadata({
      declarations: [StorysModule.forEntryComponents(), SafeHtmlPipe, MatIcon],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<BuilderComponent>;
export const Default: Story = {};

if (!environment.production) {
  console.log('Base:', base);
  console.log('Comps:', components);
  console.log('Widgets:', widgets);
  console.log('System:', systems);
  console.log('Media:', mediaAssets);
}
