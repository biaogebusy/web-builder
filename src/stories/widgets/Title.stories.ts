import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { TitleComponent } from '../../app/uiux/widgets/title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';

export default {
  title: '基础/标题',
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

const Template: Story<TitleComponent> = (args) => ({
  component: TitleComponent,
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
    label: '我们的故事',
    style: 'style-v2',
    icon: 'mail',
  },
};

export const TitleV3 = Template.bind({});
TitleV3.storyName = 'Style V3';
TitleV3.args = {
  content: {
    label: '职位内推',
    style: 'style-v3',
  },
};

export const TitleV4 = Template.bind({});
TitleV4.storyName = 'Style V4';
TitleV4.args = {
  content: {
    label: '技术分享',
    style: 'style-v4',
  },
};

export const TitleV5 = Template.bind({});
TitleV5.storyName = 'Style V5';
TitleV5.args = {
  content: {
    label: '关于我们',
    style: 'style-v5',
  },
};

export const TitleV6 = Template.bind({});
TitleV6.storyName = 'Style V6';
TitleV6.args = {
  content: {
    label: '关于我们',
    style: 'style-v6',
  },
};

export const TitleV7 = Template.bind({});
TitleV7.storyName = 'Style V7';
TitleV7.args = {
  content: {
    label: '关于我们',
    style: 'style-v7',
  },
};
