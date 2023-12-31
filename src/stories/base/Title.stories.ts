import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { StorysModule } from '@core/module/storys.module';
import { ITitle } from '@core/interface/widgets/ITitle';

export default {
  title: '基本元素/标题',
  id: 'title',
  component: TitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
const v1: ITitle = {
  type: 'title',
  label: '关于我们',
  style: 'style-v1',
  classes: 'mat-display-1',
};
TitleV1.args = {
  content: v1,
};

export const TitleV2 = Template.bind({});
TitleV2.storyName = 'Style V2';
const v2: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v2',
  icon: 'mail',
};
TitleV2.args = {
  content: v2,
};

export const TitleV3 = Template.bind({});
TitleV3.storyName = 'Style V3';
const v3: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v3',
};
TitleV3.args = {
  content: v3,
};

export const TitleV4 = Template.bind({});
TitleV4.storyName = 'Style V4';
const v4: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v4',
};
TitleV4.args = {
  content: v4,
};

export const TitleV5 = Template.bind({});
TitleV5.storyName = 'Style V5';
const v5: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v5',
};
TitleV5.args = {
  content: v5,
};

export const TitleV6 = Template.bind({});
TitleV6.storyName = 'Style V6';
const v6: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v6',
};
TitleV6.args = {
  content: v6,
};

export const TitleV7 = Template.bind({});
TitleV7.storyName = 'Style V7';
const v7: ITitle = {
  ...TitleV1.args.content,
  style: 'style-v7',
};
TitleV7.args = {
  content: v7,
};

export const TitleType = Template.bind({});
TitleType.storyName = '打字效果';
const type: ITitle = {
  label: '欢迎使用 <strong class="text-primary"></strong> <br>快速构建页面',
  style: 'style-v4',
  classes: 'mat-display-3 bold',
  typed: {
    enable: true,
    string: ['信使 UI', 'Web builder'],
    config: {
      typeSpeed: 120,
      loop: true,
    },
  },
};

TitleType.args = {
  content: type,
};
