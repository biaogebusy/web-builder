import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CalendarComponent } from '@uiux/widgets/date/calendar/calendar.component';
import { StorysModule } from '@core/module/storys.module';
import { random } from 'lodash-es';
import { IFullCalendar } from '@core/interface/combs/ICalendar';
import { CalendarOptions } from '@fullcalendar/angular';
export default {
  title: '基础组件/日历',
  id: 'calendar',
  component: CalendarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const options: CalendarOptions = {
  events: [
    {
      title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
      event: 'meeting',
      start: new Date(),
      user: 'Johnson',
      className: 'bg-primary',
    },
    {
      title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-accent',
    },
    {
      title: '你应该了解的 ANGULAR 最佳实践',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-warn',
    },
    {
      title: 'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-warn',
    },
    {
      title: 'DRUPAL 8 AJAX 弹出框可监听利用的 EVENT 事件',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-pink',
    },
    {
      title: 'DRUPAL8 用户登录后自定义重定向',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-orange',
    },
    {
      title: '如何更改 GIT COMMIT 某个历史提交信息',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-yellow',
    },
    {
      title:
        '开源项目使用 GITHUB ACTIONS 自动化测试部署 ANGULAR 应用到 ECS 服务器',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-red',
    },
    {
      title: 'DRUPAL JSONAPI 初级入门实践',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-purple',
    },
    {
      title: 'RXJS SWITCHMAP 在 DRUPAL API中的应用',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-indigo',
    },
    {
      title: '五年了，再谈南宁和深圳的差距',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() + random(1, 10)),
      user: 'Johnson',
      className: 'bg-blue',
    },
    {
      title:
        '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-cyan',
    },
    {
      title: '南宁IT互联网行业薪资福利待遇如何？',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-teal',
    },
    {
      title: '南宁IT互联网公司，有哪些是双休？',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-green',
    },
    {
      title:
        'JSONA 一款转换 JSONAPI 数据的工具库，也算是解放 DRUPAL JSONAPI 反序列化的利器',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-light-green',
    },
    {
      title: 'ANGULAR 有哪几种不同类型的绑定',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-brown',
    },
    {
      title: 'ANGULAR NG-CONTENT、NG-TEMPLATE、NG-CONTAINER 之间的区别',
      event: 'drupal',
      start: new Date().setDate(new Date().getDate() - random(1, 10)),
      user: 'Johnson',
      className: 'bg-grey',
    },
  ],
};
Default.args = {
  type: 'calendar',
  options,
};
