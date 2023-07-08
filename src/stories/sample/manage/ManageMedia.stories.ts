import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { ManageModule } from '@modules/manage/manage.module';
import { ManageMediaComponent } from '@modules/manage/manage-media/manage-media.component';
import { FormGroup } from '@angular/forms';
import { MEDIA_ASSETS } from '@core/token/token-providers';
import { of } from 'rxjs';
import { mediaAssets } from '@stories/builder/data/assets/media-assets-for-story';

export default {
  title: '示例页面/中台管理/媒体库',
  id: 'manage-media',
  component: ManageMediaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [ManageModule, StorysModule.forRoot()],
      providers: [
        {
          provide: MEDIA_ASSETS,
          useValue: of(mediaAssets),
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = {
  args: {
    form: new FormGroup({}),
    model: {},
  },
};
