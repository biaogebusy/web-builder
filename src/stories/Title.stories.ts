import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

storiesOf('Title', module)
  .addDecorator(
    moduleMetadata({
      imports: [WidgetsModule],
      declarations: [],
      providers: [SafeHtmlPipe],
    })
  )
  .add('Title v1', () => ({
    component: TitleComponent,
    props: {
      content: {
        label:
          '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
        style: 'style-v1',
      },
    },
  }));
