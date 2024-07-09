import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { ManageMediaComponent } from '@modules/manage/manage-media/manage-media.component';
import { FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<ManageMediaComponent> = {
  title: '低代码/媒体库',
  id: 'manage-media',
  component: ManageMediaComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [StorysModule.forEntryComponents()],
      imports: [MatIconModule],
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
};

export default meta;
type Story = StoryObj<ManageMediaComponent>;
export const Default: Story = {};
Default.storyName = '预览';
Default.args = {
  form: new FormGroup({}),
  model: {},
};
