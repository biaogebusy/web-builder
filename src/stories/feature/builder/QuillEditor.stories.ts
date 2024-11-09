import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { QuillModule } from 'ngx-quill';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<any> = {
  title: '特色组件/编辑器/富文本',
  id: 'quill',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
      imports: [QuillModule.forRoot()],
    }),
    componentWrapperDecorator(
      story => `
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
};

export default meta;
type Story = StoryObj<any>;
export const Default: Story = {};
Default.args = {
  content: {},
};
