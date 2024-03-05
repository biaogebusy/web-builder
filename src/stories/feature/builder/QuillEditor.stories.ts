import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { QuillModule } from 'ngx-quill';
export default {
  title: '特色组件/编辑器/富文本',
  id: 'quill',
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [BlockModule, StorysModule.forRoot(), QuillModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
     <quill-editor  [styles]="{height:content.editor?.height || '250px'}">
    </quill-editor>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.args = {
  content: {},
};
