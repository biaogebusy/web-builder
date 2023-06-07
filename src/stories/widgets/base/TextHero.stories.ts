import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TextHeroComponent } from '@uiux/widgets/text-hero/text-hero.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/基本元素/英雄区内容',
  id: 'text-hero',
  component: TextHeroComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
    type: 'text-hero',
    theme: 'text-light',
    params: {
      height: '750px',
    },
    text: {
      title: {
        label: '为什么你将会喜欢信使？',
        style: 'style-v4',
        classes: 'mat-display-2 bold',
      },
      classes: 'y-center',
      style: [],
      bg: {
        classes: 'bg-shadow overlay overlay-20',
        img: {
          src: '/assets/images/hero/1-3.jpg',
          hostClasses: '',
        },
      },
      body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一</p>',
      actionsAlign: 'start center',
      actions: [
        {
          type: 'btn',
          mode: 'raised',
          color: 'primary',
          href: '',
          label: '了解更多',
        },
      ],
    },
  },
};
