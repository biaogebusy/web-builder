import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { UserCardComponent } from '@uiux/widgets/card/user-card/user-card.component';
import { StorysModule } from '@core/module/storys.module';
import { IUserCard } from '@core/interface/widgets/ICard';

export default {
  title: '基础组件/卡片/用户卡片',
  id: 'user-card',
  component: UserCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div fxFlex="300px" class="widget position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '预览';
const content: IUserCard = {
  type: 'user-card',
  menu: [
    {
      type: 'link',
      label: '资料更新',
      dialog: {
        params: {
          width: '1200px',
          disableClose: true,
        },
        afterClosed: {
          success: {
            label: '更新资料成功！',
          },
          emit: true,
        },
        data: [
          {
            type: 'text',
            spacer: 'sm',
            title: {
              label: 'link 组件的 Dialog 参数可以添加各种widget组件',
              style: 'style-v1',
            },
            body: '<p>这样可以根据需要弹出组件或者iframe页面。</p>',
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
        ],
      },
    },
  ],
  count: [
    {
      digit: {
        value: 100,
        from: 0,
        duration: 2,
        style: {
          color: 'red',
        },
      },
      title: '发布',
    },
    {
      digit: {
        value: 55,
        from: 0,
        duration: 2,
      },
      title: '回复',
    },
    {
      digit: {
        value: 12,
        from: 0,
        duration: 2,
      },
      title: '审批',
    },
  ],
};
Default.args = {
  content,
};
