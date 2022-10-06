import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ShareModule } from '@share/share.module';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/内容/标题',
  id: 'title',
  component: TitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        MatIconModule,
        ShareModule,
        WidgetsModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [SafeHtmlPipe],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const TitleV1 = Template.bind({});
TitleV1.storyName = 'Style V1';
TitleV1.args = {
  content: {
    label: '关于我们',
    style: 'style-v1',
    classes: 'mat-display-1',
  },
};

export const TitleV2 = Template.bind({});
TitleV2.storyName = 'Style V2';
TitleV2.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v2',
    icon: 'mail',
  },
};

export const TitleV3 = Template.bind({});
TitleV3.storyName = 'Style V3';
TitleV3.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v3',
  },
};

export const TitleV4 = Template.bind({});
TitleV4.storyName = 'Style V4';
TitleV4.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v4',
  },
};

export const TitleV5 = Template.bind({});
TitleV5.storyName = 'Style V5';
TitleV5.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v5',
  },
};

export const TitleV6 = Template.bind({});
TitleV6.storyName = 'Style V6';
TitleV6.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v6',
  },
};

export const TitleV7 = Template.bind({});
TitleV7.storyName = 'Style V7';
TitleV7.args = {
  content: {
    ...TitleV1.args.content,
    style: 'style-v7',
  },
};
