import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgComponent } from '@uiux/widgets/bg/bg.component';
import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Media/Media-object',
  component: MediaObjectComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<MediaObjectComponent> = (args) => ({
  component: MediaObjectComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    icon: {
      name: 'gavel',
    },
    meta: '2022/08',
    link: {
      label: '你应该了解的 ANGULAR 最佳实践',
      href: '#',
    },
    subTitle: 'Johnson',
    content:
      '遵循最佳实践可以让你的 Angular 应用保持性能优越，使团队的代码风格一致，以下代码摘自南宁IT派官网项目。 把默认的变更检测设置为 OnPush Angular 默认变更检测是 Defualt，只要在组件中有任意一个值发生改变或者 Dom中有事件的更新都会触发整个应用自上而下的变更...',
  },
};
