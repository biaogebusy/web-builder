import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { StorysModule } from '@core/module/storys.module';

const meta: Meta<SpacerComponent> = {
  title: '主题/间距大小',
  id: 'spacer',
  component: SpacerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget relative bg-shadow p-y p-x" style="z-index:1;">

          <app-title [content]="{ 'label': 'xs', 'style': 'style-v4', 'classes': 'mat-display-1' }"></app-title>
          <div class="bg-primary">
            <app-spacer [size]="'xs'"></app-spacer>
          </div>

          <app-title [content]="{ 'label': 'sm', 'style': 'style-v4', 'classes': 'mat-display-1' }"></app-title>
          <div class="bg-primary">
            <app-spacer [size]="'sm'"></app-spacer>
          </div>

          <app-title [content]="{ 'label': 'md', 'style': 'style-v4', 'classes': 'mat-display-1' }"></app-title>
          <div class="bg-primary">
           <app-spacer [size]="'md'"></app-spacer>
          </div>

          <app-title [content]="{ 'label': 'lg', 'style': 'style-v4', 'classes': 'mat-display-1' }"></app-title>
          <div class="bg-primary">
           <app-spacer [size]="'lg'"></app-spacer>
          </div>

          <app-title [content]="{ 'label': 'xl', 'style': 'style-v4', 'classes': 'mat-display-1' }"></app-title>
          <div class="bg-primary">
           <app-spacer [size]="'xl'"></app-spacer>
          </div>
        </div>`,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '间距是 UI 元素与元素之间的间隔，组件与组件之间的间距。',
      },
    },
  },
};

export default meta;

type Story = StoryObj<SpacerComponent>;
export const Default: Story = {};
Default.storyName = '预览';

export const Normal: Story = {};
Normal.storyName = '正常';
Normal.args = {
  content: {
    type: 'spacer',
    size: 'sm',
  },
};
