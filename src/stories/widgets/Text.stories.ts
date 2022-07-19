import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ShareModule } from '@share/share.module';
import {
  storiesOf,
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Text',
  component: TextComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule],
      providers: [SafeHtmlPipe],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<TextComponent> = (args) => ({
  component: TextComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    spacer: 'sm',
    title: {
      label:
        '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
      style: 'style-v1',
    },
    body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p><p>查了些文档文章，Github Actions有几个重要的信息如下：</p><ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU, 3.75GB内存，包括网络权限和100GB 磁盘</li><li>在 yml 配置文件中可以使用上下文环境变量，比如分支或者不公开变量</li><li>每个workflow 排队和执行时间最多 58 分钟，最多可以包含100个action，每个仓库同一时刻只能运行两个 workflow</li></ul>',
    actionsAlign: 'center center',
    actions: [
      {
        href: '#',
        label: '开始',
      },
      {
        type: 'closeDialog',
        label: 'Ok',
      },
      {
        type: 'btn-animate',
        label: '了解更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    ],
  },
};
