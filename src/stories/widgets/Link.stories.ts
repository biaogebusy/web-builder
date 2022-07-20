import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareModule } from '../../app/share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LinkComponent } from '../../app/uiux/widgets/link/link.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<LinkComponent> = (args) => ({
  component: LinkComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    label: '内推',
    classes: 'bold',
    href: '/lists/jobs',
  },
};

export const queryParams = Template.bind({});

queryParams.args = {
  content: {
    label: '自习室',
    classes: 'bold',
    href: '/lists/blog',
    queryParams: {
      demo: '466',
    },
    fragment: 'title',
  },
};

export const fragment = Template.bind({});

fragment.args = {
  content: {
    label: '案例',
    classes: 'bold',
    href: '/lists/cases',
    fragment: 'title',
  },
};

export const dialog = Template.bind({});

dialog.args = {
  content: {
    label: '更多',
    classes: 'bold',
    dialog: {
      params: {
        width: '800px',
      },
      data: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label:
              '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
            style: 'style-v1',
          },
          body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p><p>查了些文档文章，Github Actions有几个重要的信息如下：</p><ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU, 3.75GB内存，包括网络权限和100GB 磁盘</li><li>在 yml 配置文件中可以使用上下文环境变量，比如分支或者不公开变量</li><li>每个workflow 排队和执行时间最多 58 分钟，最多可以包含100个action，每个仓库同一时刻只能运行两个 workflow</li></ul>',
        },
      ],
    },
  },
};
