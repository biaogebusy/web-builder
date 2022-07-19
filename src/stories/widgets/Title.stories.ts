import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ShareModule } from '@share/share.module';
import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Title',
  component: TitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatIconModule, ShareModule, WidgetsModule],
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

TitleV1.args = {
  content: {
    label: '关于我们',
    style: 'style-v1',
    classes: 'mat-display-1',
  },
};

export const TitleV2 = Template.bind({});

TitleV2.args = {
  content: {
    label: '我们的故事',
    style: 'style-v2',
    icon: 'mail',
  },
};

export const TitleV3 = Template.bind({});

TitleV3.args = {
  content: {
    label: '职位内推',
    style: 'style-v3',
  },
};

export const TitleV4 = Template.bind({});

TitleV4.args = {
  content: {
    label: '技术分享',
    style: 'style-v4',
  },
};

export const TitleV5 = Template.bind({});

TitleV5.args = {
  content: {
    label: 'Showcase 1 v1 style v5',
    style: 'style-v5',
  },
};

export const TitleV6 = Template.bind({});

TitleV6.args = {
  content: {
    label: 'Showcase 1 v1 style v6',
    style: 'style-v6',
  },
};

export const TitleV7 = Template.bind({});

TitleV7.args = {
  content: {
    label: 'Showcase 1 v1 style v7',
    style: 'style-v7',
  },
};
