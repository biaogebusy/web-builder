import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { OtherModule } from '@uiux/combs/other/other.module';
import { NotfoundComponent } from '@uiux/combs/other/notfound/notfound.component';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { INotfound } from '@core/interface/combs/INotfound';

export default {
  title: '示例页面/系统页面/404',
  id: 'notFound',
  component: NotfoundComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [OtherModule, StorysModule.forRoot(), BrandingModule],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `当用户访问的页面不存在时，显示404页面。`,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: INotfound = {
  type: '404',
  img: {
    src: '/assets/images/404.svg',
    alt: '404 not found!',
  },
  bg: { classes: '' },
  classes: '',
  text: {
    spacer: 'none',
    title: {
      label: 'OH!NO <br>页面没有找到',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    body: '很抱歉，您请求的页面可能已经被移除、更改名称或暂时无法使用。在查找更多信息之前，您可以尝试以下操作：<ul class="list-done"><li>检查您输入的URL是否正确</li><li>在浏览器中清除缓存和Cookie</li><li>尝试在不同的浏览器或设备上打开页面</li></ul><p>我们非常感谢您对我们的关注和理解，我们会尽快解决问题并让我们的页面再次正常工作。</p>',
    actionsAlign: 'center center',
    actions: [
      {
        label: '回到首页',
        href: '/home',
        type: 'btn',
        mode: 'raised',
        color: 'primary',
      },
    ],
  },
};
Default.args = {
  content,
};
