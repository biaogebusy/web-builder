import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { QuillModule } from 'ngx-quill';
const meta: Meta<any> = {
  title: '特色组件/编辑器/富文本',
  id: 'quill',
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), QuillModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
     <quill-editor  [styles]="{height:content.editor?.height || '250px'}">
    </quill-editor>
    `,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<any>;
export const Default: Story = {};
Default.args = {
  content: {},
};
