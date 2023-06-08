import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { NotifyComponent } from '@core/branding/header/menu/notify/notify.component';

export default {
  title: '全局配置/页头/通知',
  id: 'notify',
  component: NotifyComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
// Raname Story
Default.storyName = '通知';

Default.args = {
  content: [
    {
      link: {
        href: '/node/1',
        label: '安全',
      },
      message:
        '各位师生注意，明天校园将进行消防演习，请大家提前做好准备，按照指定路线有序撤离，确保自身安全。',
      date: new Date(),
      icon: {
        svg: 'security',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
    {
      link: {
        href: '/node/1',
        label: '环保',
      },
      message:
        '为了保障校园环境的整洁，特此通知，请大家共同维护卫生，不随意乱扔垃圾，保持校园干净整洁。',
      date: new Date(),
      icon: {
        svg: 'clipboard-text-clock',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
    {
      link: {
        href: '/node/1',
        label: '服务',
      },
      message:
        '为了方便广大师生，校园图书馆将于下周开始延长开放时间，具体时间为早上8点至晚上10点，请大家合理利用。',
      date: new Date(),
      icon: {
        svg: 'creative-commons',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
    {
      link: {
        href: '/node/1',
        label: '安全',
      },
      message:
        '为了加强校园安全管理，校园将于本周开始实行封闭式管理，外来人员需提前报备，校内人员请携带有效证件入校。',
      date: new Date(),
      icon: {
        svg: 'security',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
    {
      link: {
        href: '/node/1',
        label: '教育',
      },
      message:
        '为了加强学生体质锻炼，学校将于下周开始推行每日晨跑活动，所有学生必须参加，迟到者将被扣分。',
      date: new Date(),
      icon: {
        svg: 'school',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
    {
      link: {
        href: '/node/1',
        label: '教育',
      },
      message:
        '为了提高学生的英语水平，学校将于下周开始开设英语角活动，欢迎所有学生参加，共同提高英语口语表达能力。',
      date: new Date(),
      icon: {
        svg: 'school',
        inline: true,
        color: 'primary',
      },
      uuid: 'xxx',
    },
  ],
};
