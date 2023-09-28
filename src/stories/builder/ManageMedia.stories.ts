import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { ManageModule } from '@modules/manage/manage.module';
import { ManageMediaComponent } from '@modules/manage/manage-media/manage-media.component';
import { FormGroup } from '@angular/forms';

export default {
  title: '低代码/媒体库',
  id: 'manage-media',
  component: ManageMediaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [ManageModule, StorysModule.forRoot()],
      providers: [],
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
export const Default = Template.bind({});
Default.storyName = '预览';
Default.args = {
  form: new FormGroup({}),
  model: {},
};
