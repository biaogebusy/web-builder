import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { StorysModule } from '@core/module/storys.module';
import { ITitle } from '@core/interface/widgets/ITitle';

const meta: Meta<TitleComponent> = {
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
};

export default meta;
type Story = StoryObj<TitleComponent>;

export const TitleV1: Story = {};
TitleV1.storyName = 'Style V1';
const v1: ITitle = {
  type: 'title',
  label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
  classes: 'mat-display-1 bold',
  style: 'style-v4',
};
TitleV1.args = {
  content: v1,
};

export const TitleV2: Story = {};
TitleV2.storyName = 'Style V2';
const v2: ITitle = {
  type: 'title',
  label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
  classes: 'mat-display-1 bold',
  style: 'style-v2',
  icon: 'mail',
};
TitleV2.args = {
  content: v2,
};

export const TitleV3: Story = {};
TitleV3.storyName = 'Style V3';
const v3: ITitle = {
  type: 'title',
  label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
  classes: 'mat-display-1 bold',
  style: 'style-v3',
};
TitleV3.args = {
  content: v3,
};

export const TitleV4: Story = {};
TitleV4.storyName = 'Style V4';
const v4: ITitle = {
  type: 'title',
  label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
  classes: 'mat-display-1 bold',
  style: 'style-v4',
};
TitleV4.args = {
  content: v4,
};

export const TitleV5: Story = {};
TitleV5.storyName = 'Style V5';
const v5: ITitle = {
  type: 'title',
  label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
  classes: 'mat-display-1 bold',
  style: 'style-v5',
};
TitleV5.args = {
  content: v5,
};

export const TitleType: Story = {};
TitleType.storyName = '打字效果';
const type: ITitle = {
  label: '欢迎使用 <strong class="text-primary"></strong> <br>快速构建页面',
  style: 'style-v4',
  classes: 'mat-display-2 bold',
  typed: {
    enable: true,
    strings: [{ label: '信使 UI' }, { label: 'Web builder' }],
    config: {
      typeSpeed: 120,
      loop: true,
    },
  },
};

TitleType.args = {
  content: type,
};
